export const queryDaysParam = (
    rawDays: string,
): { isValid: boolean; days: string[] } => {
    const falseObject: { isValid: boolean; days: string[] } = {
        isValid: false,
        days: null,
    };

    if (rawDays === null || rawDays.length === 0) {
        return falseObject;
    }

    const daysStr = rawDays.toUpperCase();

    const daysRegex = /^(?:[MTWRFSc],?)+$/i;
    if (!daysRegex.test(daysStr)) return falseObject;

    const trueObject = { isValid: true, days: daysStr.split(",") };
    return trueObject;
};
