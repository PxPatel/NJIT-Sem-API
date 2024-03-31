export const queryLimitParam = (rawLimit: string): number => {
    const MAX_LIMIT = 10_000;

    if (rawLimit === null) {
        return MAX_LIMIT;
    }

    const limit = rawLimit === "" ? MAX_LIMIT : Number(rawLimit);
    if (Number.isNaN(limit) || limit < 0) {
        return -1;
    }

    return limit;
};
