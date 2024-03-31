import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import { oneCourseType } from "../../../types/collection";
import { querySemesterParam } from "../../../util/paramValidation/querySemesterParam";

const COURSES_SEMESTER = "course_semester";

/**
 * @name Course
 * @description Returns all sections within a course, if the specified course exists
 * @slugs [semester, department, courseNumber]
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const semester = querySemesterParam((req.query.semester as string) ?? null);
    const department = (req.query.department as string) ?? null;
    const courseNumber = (req.query.courseNumber as string) ?? null;

    if (!(semester.isValid && department && courseNumber)) {
        console.log(semester);
        console.log(courseNumber);
        console.log(department);

        res.status(400).send({
            error: "Not all or invalid query parameters provided",
        });
        return;
    }

    const oneCourseQuery = supabase
        .from(COURSES_SEMESTER)
        .select(
            `*, 
            course_id!inner(*), 
            alt_sections(*)`,
        )
        .eq("semester_id", `${semester.season}_${semester.year}`)
        .eq("course_id.department", department.toUpperCase())
        .eq("course_id.course_number", courseNumber);

    const { data, error } = await oneCourseQuery.returns<oneCourseType[]>();

    if (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
        return;
    }
    const modifiedData = formatOneCourseData(data[0]);

    const curatedResponse = {
        exists: data.length !== 0,
        data: modifiedData,
    };

    res.status(200).send(curatedResponse);
};

function formatOneCourseData(data: oneCourseType) {
    if (data === null || typeof data === "undefined") {
        return {};
    }

    const modifiedData = {
        row_id: data.co_sem_id,
        course_info: {
            course_id: data.course_id.course_id,
            department: data.course_id.department,
            course_number: data.course_id.course_number,
            course_name: data.course_id.course_name,
            credits: data.course_id.credits,
        },
        semester_id: data.semester_id,
        sections: data.alt_sections,
    };

    return modifiedData;
}
