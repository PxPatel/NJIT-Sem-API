import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import { Tables } from "../../../types/database.types";
import {
    queryLimitParam,
    removeZerosPadding,
} from "../../../util/paramValidation";

const COURSES = "courses";

/**
 * @name Courses
 * @slugs [department, classLevel, limit]
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const department = (req.query.department as string) ?? null;
    const classLevel = (req.query.classLevel as string) ?? null;
    const isValidClassLevel = classLevel !== null && Number(classLevel) >= 1;
    const limit = queryLimitParam((req.query.limit as string) ?? null);

    let coursesQuery = supabase.from(COURSES).select("*");

    if (limit < 0) {
        res.status(400).send({ error: "Invalid limit parameter" });
        return;
    }

    if (department) {
        coursesQuery = coursesQuery.eq("department", department.toUpperCase());
    }

    if (classLevel) {
        if (isValidClassLevel) {
            const root = removeZerosPadding(classLevel);
            coursesQuery = coursesQuery.like("course_number", `${root}%`);
        } else {
            res.status(422).send({ error: "Invalid class level parameter" });
            return;
        }
    }

    const { data, error } = await coursesQuery.limit(limit);
    if (error) {
        res.status(500).send({ error: "Internal Server Error" });
        return;
    }
    let filteredData: Tables<"courses">[] = data;

    if (isValidClassLevel) {
        const trimmedClassLevel = Number(classLevel).toString(10);

        filteredData = data.filter(course => {
            const numericalPart = course.course_number.match(/\d+/);
            return (
                numericalPart !== null &&
                numericalPart[0] &&
                numericalPart[0].length === trimmedClassLevel.length
            );
        });
    }

    const curatedResponse = {
        item_count: filteredData.length,
        data: filteredData,
    };

    res.send(curatedResponse);
    return;
};
