import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import { CourseWithSections } from "../../../types/collection";

const COURSES = "courses";

/**
 * @name Course
 * @description Returns all sections within a course, if the specified course exists
 * @slugs [department, courseNumber]
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const department = (req.query.department as string) ?? null;
    const courseNumber = (req.query.courseNumber as string) ?? null;

    if (!(department && courseNumber)) {
        res.status(400).send({
            error: "Not all or invalid query parameters provided",
        });
        return;
    }
    let courseQuery = supabase.from(COURSES).select("*, sections(*)");

    courseQuery = courseQuery.eq("department", department.toUpperCase());
    courseQuery = courseQuery.eq("course_number", courseNumber);

    const { data, error } = await courseQuery.returns<CourseWithSections[]>();

    if (error) {
        res.status(500).send({ error: "Internal Server Error" });
        return;
    }
    const filteredData: CourseWithSections = data[0] || {};

    const curatedResponse = {
        exists: Boolean(data[0]),
        data: filteredData,
    };

    res.send(curatedResponse);
    return;
};
