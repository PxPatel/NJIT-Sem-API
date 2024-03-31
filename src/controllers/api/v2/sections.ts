import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import {
    queryLimitParam,
    removeZerosPadding,
} from "../../../util/paramValidation";
import {
    AltCourseType,
    AltSectionType,
    oneCourseType,
} from "../../../types/collection";
import { querySemesterParam } from "../../../util/paramValidation/querySemesterParam";

const COURSES_SEMESTER = "course_semester";

/**
 * @name Section
 * @slugs [semester, department, courseNumber, classLevel, limit]
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const semester = querySemesterParam((req.query.semester as string) ?? null);
    const department = (req.query.department as string) ?? null;
    const courseNumber = (req.query.courseNumber as string) ?? null;
    const classLevel = (req.query.classLevel as string) ?? null;
    const isValidClassLevel = classLevel !== null && Number(classLevel) >= 1;
    const limit = queryLimitParam((req.query.limit as string) ?? null);

    if (limit < 0) {
        res.status(400).send({ error: "Invalid limit parameter" });
        return;
    }

    if (!semester.isValid) {
        res.status(400).send({ error: "Invalid semester parameter" });
        return;
    }

    let sectionsQuery = supabase
        .from(COURSES_SEMESTER)
        .select("*, course_id!inner(*), alt_sections(*)")
        .eq("semester_id", `${semester.season}_${semester.year}`);

    if (department) {
        sectionsQuery = sectionsQuery.eq(
            "course_id.department",
            department.toUpperCase(),
        );
    }

    if (courseNumber) {
        sectionsQuery = sectionsQuery.eq(
            "course_id.course_number",
            courseNumber,
        );
    }

    if (classLevel) {
        if (isValidClassLevel) {
            const root = removeZerosPadding(classLevel);
            sectionsQuery = sectionsQuery.like(
                "course_id.course_number",
                `${root}%`,
            );
        } else {
            res.status(422).send({ error: "Invalid class level parameter" });
            return;
        }
    }

    const { data, error } = await sectionsQuery
        .limit(limit)
        .returns<oneCourseType[]>();
    if (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
        return;
    }

    let filteredData = data;

    if (isValidClassLevel) {
        const trimmedClassLevel = Number(classLevel).toString(10);

        filteredData = data.filter(course_sem => {
            const numericalPart =
                course_sem.course_id.course_number.match(/\d+/);
            return (
                numericalPart !== null &&
                numericalPart[0] &&
                numericalPart[0].length === trimmedClassLevel.length
            );
        });
    }

    const modifiedData = formatMultiSectionData(filteredData);

    const curatedResponse = {
        item_count: modifiedData.length,
        data: modifiedData,
    };

    res.send(curatedResponse);
    return;
};

function formatMultiSectionData(dataArray: oneCourseType[]) {
    const formatedDataArray: {
        row_id: string;
        semester: string;
        course_info: AltCourseType;
        sections: AltSectionType[];
    }[] = [];

    if (
        dataArray === null ||
        dataArray.length === 0 ||
        !Array.isArray(dataArray)
    ) {
        return formatedDataArray;
    }

    for (const data of dataArray) {
        const modifiedData = {
            row_id: data.co_sem_id,
            course_info: {
                course_id: data.course_id.course_id,
                department: data.course_id.department,
                course_number: data.course_id.course_number,
                course_name: data.course_id.course_name,
                credits: data.course_id.credits,
            },
            semester: data.semester_id,
            sections: data.alt_sections,
        };

        formatedDataArray.push(modifiedData);
    }

    return formatedDataArray;
}
