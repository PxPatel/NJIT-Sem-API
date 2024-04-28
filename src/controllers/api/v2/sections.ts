import { Request, Response } from "express";
import supabase from "../../../supabase/initialize";
import {
    queryDaysParam,
    queryDaysSelectionOptionParam,
    queryLimitParam,
    querySemesterParam,
} from "../../../util/paramValidation";
import {
    AltSectionType,
    AltSectionTypeWithChildCourseSemesterInfo,
    CourseSemesterType,
} from "../../../types/collection";

const SECTIONS = "alt_sections";

/**
 * @name Section
 * @slugs [semester, course, status, credits, instructor, days, daysSelectionOption, limit]
 *
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const semester = querySemesterParam(
            (req.query.semester as string) ?? null,
        );
        const limit = queryLimitParam((req.query.limit as string) ?? null);
        const status = (req.query.status as string) ?? null;
        const credits = (req.query.credits as string) ?? null;
        const instructor = (req.query.instructor as string) ?? null;
        const days = queryDaysParam((req.query.days as string) ?? null);
        const daysSelectionOption = queryDaysSelectionOptionParam(
            (req.query.DSO as string) ?? null,
        );
        let course = (req.query.course as string) ?? null;

        if (limit < 0) {
            res.status(400).send({
                error: `Invalid limit parameter: ${req.query.limit as string}`,
            });
            return;
        }

        if (!semester.isValid) {
            res.status(400).send({
                error: `Invalid semester parameter: ${
                    (req.query.semester as string) ?? null
                }`,
            });
            return;
        }

        if (!days.isValid && typeof req.query.days !== "undefined") {
            res.status(400).send({
                error: `Invalid days parameter: ${req.query.days as string}`,
            });
            return;
        }

        const sectionsQuery = supabase
            .from(SECTIONS)
            .select("*, co_sem_id!inner(*)")
            .eq("co_sem_id.semester_id", `${semester.season}_${semester.year}`);

        if (course) {
            course = course.toUpperCase();
            sectionsQuery.eq(
                "co_sem_id",
                `${semester.season}${semester.year}_${course}`,
            );
        }
        if (status) {
            sectionsQuery.eq("status", status);
        }

        if (credits) {
            const numCredits = Number(credits);
            if (!Number.isNaN(numCredits)) {
                sectionsQuery.eq("credits", numCredits);
            } else {
                res.status(400).send({
                    error: `Invalid credits parameter: ${req.query.credits}`,
                });
                return;
            }
        }

        if (days.isValid && daysSelectionOption.isValid) {
            if (daysSelectionOption.option === "COMMON") {
                //Atleast one common element
                sectionsQuery.overlaps("days", days.days);
            } else if (daysSelectionOption.option === "SUBSET") {
                //All days for class must be present in arr, but arr can also have more days
                //class is a subset of arr
                sectionsQuery.containedBy("days", days.days);
            }
        }

        if (instructor) {
            sectionsQuery.eq("instructor", instructor);
        }

        const { data, error } = await sectionsQuery
            .limit(limit)
            .returns<AltSectionTypeWithChildCourseSemesterInfo[]>();
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
            return;
        }

        const modifiedData = formatMultiSectionData(data);

        const curatedResponse = {
            item_count: modifiedData.length,
            data: modifiedData,
        };

        res.send(curatedResponse);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

interface FormatedReturnType extends Omit<AltSectionType, "co_sem_id"> {
    course_semester_info: CourseSemesterType;
}

function formatMultiSectionData(
    dataArray: AltSectionTypeWithChildCourseSemesterInfo[],
) {
    const formatedDataArray: FormatedReturnType[] = [];

    if (
        dataArray === null ||
        dataArray.length === 0 ||
        !Array.isArray(dataArray)
    ) {
        return formatedDataArray;
    }

    for (const data of dataArray) {
        const modifiedData = { course_semester_info: data.co_sem_id, ...data };
        delete modifiedData.co_sem_id;

        formatedDataArray.push(modifiedData);
    }

    return formatedDataArray;
}
