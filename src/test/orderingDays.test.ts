import {
    DAYS,
    orderDaysOfWeekWithSwaps,
    seperateDaysData,
} from "../util/playground/daysHelperFunctions";

type T = { days: DAYS[] | [""]; swapCoordinates: number[] };
type R = {
    days: DAYS[] | [""];
    rawDaysArray: string[];
    swapCoordinates: number[];
};

describe("Order Days Of Week Tests", () => {
    test("Valid input with correct format - 1", () => {
        const input = ["M", "R"];
        const expectedResult: T = { days: ["M", "R"], swapCoordinates: [0, 1] };
        expect(orderDaysOfWeekWithSwaps(input)).toEqual(expectedResult);
    });

    test("Valid input with correct format - 2", () => {
        const input = ["M", "W", "R"];
        const expectedResult: T = {
            days: ["M", "W", "R"],
            swapCoordinates: [0, 1, 2],
        };
        expect(orderDaysOfWeekWithSwaps(input)).toEqual(expectedResult);
    });

    test("Unordered input - 1", () => {
        const input = ["M", "F", "R", "T"];
        const expectedResult: T = {
            days: ["M", "T", "R", "F"],
            swapCoordinates: [0, 3, 2, 1],
        };
        expect(orderDaysOfWeekWithSwaps(input)).toEqual(expectedResult);
    });

    test("Empty String - 1", () => {
        const input = [""];
        const expectedResult: T = { days: [""], swapCoordinates: [0] };
        orderDaysOfWeekWithSwaps(input);
        expect(orderDaysOfWeekWithSwaps(input)).toEqual(expectedResult);
    });

    test("Empty String - 2", () => {
        const input = ["X"];
        const expectedResult: T = { days: ["X"], swapCoordinates: [0] };
        orderDaysOfWeekWithSwaps(input);
        expect(orderDaysOfWeekWithSwaps(input)).toEqual(expectedResult);
    });

    test("Duplicate Sample", () => {
        const input = ["F", "R", "S", "F", "M", "W"];
        const expectedResult: T = {
            days: ["M", "W", "R", "F", "F", "S"],
            swapCoordinates: [3, 2, 5, 4, 0, 1],
        };
        expect(orderDaysOfWeekWithSwaps(input)).toEqual(expectedResult);
    });

    test("Harder unordered Sample", () => {
        const input = ["F", "R", "S", "M", "W"];
        const expectedResult: T = {
            days: ["M", "W", "R", "F", "S"],
            swapCoordinates: [3, 2, 4, 0, 1],
        };
        expect(orderDaysOfWeekWithSwaps(input)).toEqual(expectedResult);
    });

    test("Using a blank day", () => {
        const input = ["F", "R", "S", "M", "X"];
        const expectedResult: T = {
            days: ["M", "R", "F", "S", "X"],
            swapCoordinates: [2, 1, 3, 0, 4],
        };
        expect(orderDaysOfWeekWithSwaps(input)).toEqual(expectedResult);
    });

    test("Using two blank days", () => {
        const input = ["F", "R", "S", "M", "X", "X"];
        const expectedResult: T = {
            days: ["M", "R", "F", "S", "X", "X"],
            swapCoordinates: [2, 1, 3, 0, 4, 5],
        };
        expect(orderDaysOfWeekWithSwaps(input)).toEqual(expectedResult);
    });
});

describe("Seperate Days Data", () => {
    test("1", () => {
        const input = ["MR"];
        const expectedResult: R = {
            days: ["M", "R"],
            rawDaysArray: input,
            swapCoordinates: [0, 1],
        };
        expect(seperateDaysData(input)).toEqual(expectedResult);
    });

    test("2", () => {
        const input = ["FM"];
        const expectedResult: R = {
            days: ["M", "F"],
            rawDaysArray: input,
            swapCoordinates: [1, 0],
        };
        expect(seperateDaysData(input)).toEqual(expectedResult);
    });

    test("3", () => {
        const input = ["MR", "W"];
        const expectedResult: R = {
            days: ["M", "W", "R"],
            rawDaysArray: input,
            swapCoordinates: [0, 2, 1],
        };
        expect(seperateDaysData(input)).toEqual(expectedResult);
    });

    test("4", () => {
        const input = ["MR", "TR"];
        const expectedResult: R = {
            days: ["M", "T", "R", "R"],
            rawDaysArray: input,
            swapCoordinates: [0, 2, 1, 3],
        };
        expect(seperateDaysData(input)).toEqual(expectedResult);
    });

    test("5", () => {
        const input = ["MR", "MR"];
        const expectedResult: R = {
            days: ["M", "M", "R", "R"],
            rawDaysArray: input,
            swapCoordinates: [0, 2, 1, 3],
        };
        expect(seperateDaysData(input)).toEqual(expectedResult);
    });

    test("Empty Set", () => {
        const input = [""];
        const expectedResult: R = {
            days: ["X"],
            rawDaysArray: ["X"],
            swapCoordinates: [0],
        };
        expect(seperateDaysData(input)).toEqual(expectedResult);
    });

    test("Multiple Empty Days", () => {
        const input = ["", ""];
        const expectedResult: R = {
            days: ["X", "X"],
            rawDaysArray: ["X", "X"],
            swapCoordinates: [0, 1],
        };
        expect(seperateDaysData(input)).toEqual(expectedResult);
    });
});
