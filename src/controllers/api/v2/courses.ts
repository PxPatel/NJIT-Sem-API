import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import {
    queryLimitParam,
    removeZerosPadding,
} from "../../../util/paramValidation";
import { querySemesterParam } from "../../../util/paramValidation/querySemesterParam";
import { AltCourseType, MultiCoursesType } from "../../../types/collection";

const COURSES_SEMESTER = "course_semester";

/**
 * @name Courses
 * @slugs [semester, department, classLevel, limit]
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const semester = querySemesterParam((req.query.semester as string) ?? null);
    const department = (req.query.department as string) ?? null;
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

    let coursesQuery = supabase
        .from(COURSES_SEMESTER)
        .select("*, course_id!inner(*)")
        .eq("semester_id", `${semester.season}_${semester.year}`);

    if (department) {
        coursesQuery = coursesQuery.eq(
            "course_id.department",
            department.toUpperCase(),
        );
    }

    if (classLevel) {
        if (isValidClassLevel) {
            const root = removeZerosPadding(classLevel);
            coursesQuery = coursesQuery.like(
                "course_id.course_number",
                `${root}%`,
            );
        } else {
            res.status(422).send({ error: "Invalid class level parameter" });
            return;
        }
    }

    const { data, error } = await coursesQuery
        .limit(limit)
        .returns<MultiCoursesType[]>();
    if (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
        return;
    }

    let filteredData: MultiCoursesType[] = data;

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

    console.log(filteredData.length);
    const modifiedData = formatMultiCourseData(filteredData);

    const curatedResponse = {
        item_count: modifiedData.length,
        data: modifiedData,
    };

    res.send(curatedResponse);
    return;
};

const formatMultiCourseData = (dataArray: MultiCoursesType[]) => {
    const formatedDataArray: {
        row_id: string;
        semester: string;
        course_info: AltCourseType;
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
            semester: data.semester_id,
            course_info: {
                course_id: data.course_id.course_id,
                department: data.course_id.department,
                course_number: data.course_id.course_number,
                course_name: data.course_id.course_name,
                credits: data.course_id.credits,
            },
        };

        formatedDataArray.push(modifiedData);
    }

    return formatedDataArray;
};
