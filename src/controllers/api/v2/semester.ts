import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import { Tables } from "../../../types/database.types";

const SEMESTER = "alt_semesters";

/**
 * @name Semester
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const semesterQuery = supabase.from(SEMESTER).select("*");

    const { data, error } = await semesterQuery;
    if (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
        return;
    }

    const filteredData: Tables<"alt_semesters">[] = data;

    const curatedResponse = {
        item_count: filteredData.length,
        data: filteredData,
    };

    res.send(curatedResponse);
    return;
};
