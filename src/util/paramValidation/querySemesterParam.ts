export const querySemesterParam = (
    rawSemester: string,
): { isValid: boolean; year: string; season: string } => {

    const falseObject: { isValid: boolean; year: string; season: string } = {
        isValid: false,
        year: null,
        season: null,
    };

    if (rawSemester === null || rawSemester.length === 0) {
        return falseObject;
    }

    const semester = rawSemester.toUpperCase();

    // Regular expression to validate the semester format
    const semesterRegex = /^(SPRING|SUMMER|FALL|WINTER)_(\d{4})(-\d{4})?$/;

    // Check if the semester string matches the expected format
    if (!semesterRegex.test(semester)) return falseObject;

    // Split the semester into season and year
    const [rawSeason, rawYear] = semester.split("_");
    const isYearRange = rawYear.includes("-");
    if (isYearRange) {
        const [startYear, endYear] = rawYear.split("-").map(Number);
        if (startYear >= endYear) return falseObject;

        if (endYear - startYear !== 1) return falseObject;
    }


    //Year range is exclusive to yearRange
    if (rawSeason.toUpperCase() !== "WINTER" && isYearRange) return falseObject;

    if (rawSeason.toUpperCase() === "WINTER" && !isYearRange)
        return falseObject;

    const season =
        rawSeason.charAt(0).toUpperCase() + rawSeason.slice(1).toLowerCase();


    const trueObject = { isValid: true, year: rawYear, season };

    return trueObject;
};
