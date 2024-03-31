import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import { queryLimitParam } from "../../../util/paramValidation";
import { querySemesterParam } from "../../../util/paramValidation/querySemesterParam";

const DEPARTMENT_FUNCTION = "get_unique_departments_in_semester";

/**
 * @name Department
 * @slugs [semester, limit]
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const semester = querySemesterParam((req.query.semester as string) ?? null);
    const limit = queryLimitParam((req.query.limit as string) ?? null);

    if (limit < 0) {
        res.status(400).send({ error: "Invalid limit parameter" });
        return;
    }

    if (!semester.isValid) {
        res.status(400).send({ error: "Invalid semester parameter" });
        return;
    }

    const { data, error } = await supabase.rpc(DEPARTMENT_FUNCTION, {
        semester_id_param: `${semester.season}_${semester.year}`,
        limit_param: limit,
    });
    if (error) {
        console.log(error);
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
