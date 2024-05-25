type daysSelectionOptions = "COMMON" | "SUBSET";

type queryDSOReturnType = {
    isValid: boolean;
    option: daysSelectionOptions;
};

export const queryDaysSelectionOptionParam = (
    rawDSO: string,
): queryDSOReturnType => {
    const falseObject: queryDSOReturnType = {
        isValid: false,
        option: null,
    };

    if (rawDSO === null || rawDSO.length === 0) {
        const trueObject: queryDSOReturnType = {
            isValid: true,
            option: "SUBSET",
        };
        return trueObject;
    }

    const DSO = rawDSO.toUpperCase();

    if (DSO !== "COMMON" && DSO !== "SUBSET") return falseObject;

    const trueObject: queryDSOReturnType = {
        isValid: true,
        option: DSO,
    };

    return trueObject;
};
