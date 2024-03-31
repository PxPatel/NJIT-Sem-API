import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import {
    queryLimitParam,
    removeZerosPadding,
} from "../../../util/paramValidation";
import { SectionsWithCourse } from "../../../types/collection";

const SECTIONS = "sections";

/**
 * @name Section
 * @slugs [department, courseNumber, classLevel, limit]
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const department = (req.query.department as string) ?? null;
    const courseNumber = (req.query.courseNumber as string) ?? null;
    const classLevel = (req.query.classLevel as string) ?? null;
    const isValidClassLevel = classLevel !== null && Number(classLevel) >= 1;
    const limit = queryLimitParam((req.query.limit as string) ?? null);

    let sectionsQuery = supabase
        .from(SECTIONS)
        .select("*, course!inner(course_number, department)");

    if (limit < 0) {
        res.status(400).send({ error: "Invalid limit parameter" });
        return;
    }

    if (department) {
        sectionsQuery = sectionsQuery.eq(
            "course.department",
            department.toUpperCase(),
        );
    }

    if (courseNumber) {
        sectionsQuery = sectionsQuery.eq("course.course_number", courseNumber);
    }

    if (classLevel) {
        if (isValidClassLevel) {
            const root = removeZerosPadding(classLevel);
            sectionsQuery = sectionsQuery.like(
                "course.course_number",
                `${root}%`,
            );
        } else {
            res.status(422).send({ error: "Invalid class level parameter" });
            return;
        }
    }

    const { data, error } = await sectionsQuery
        .limit(limit)
        .returns<SectionsWithCourse[]>();
    if (error) {
        res.status(500).send({ error: "Internal Server Error" });
        return;
    }

    let filteredData: SectionsWithCourse[] = data;

    if (isValidClassLevel) {
        const trimmedClassLevel = Number(classLevel).toString(10);

        filteredData = data.filter(section => {
            const numericalPart = section.course.course_number.match(/\d+/);
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
