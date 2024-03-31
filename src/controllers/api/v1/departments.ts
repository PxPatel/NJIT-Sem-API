import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import { queryLimitParam } from "../../../util/paramValidation";

const DEPARTMENT = "unique_dep";

/**
 * @name Department
 * @slugs [limit]
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const limit = queryLimitParam((req.query.limit as string) ?? null);

    const departmentQuery = supabase.from(DEPARTMENT).select("*");

    if (limit < 0) {
        res.status(400).send({ error: "Invalid limit parameter" });
        return;
    }

    const { data, error } = await departmentQuery.limit(limit);
    if (error) {
        res.status(500).send({ error: "Internal Server Error" });
        return;
    }

    const filteredData: string[] = data.map(({ department }) => department);

    const curatedResponse = {
        item_count: filteredData.length,
        data: filteredData,
    };

    res.send(curatedResponse);
    return;
};
