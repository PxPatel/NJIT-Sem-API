import { queryDaysParam } from "../util/paramValidation";

type T = { isValid: boolean; days: string[] };

describe.only("queryDaysParam", () => {
    test("Valid input with correct format", () => {
        const input = "M,W,F";
        const expectedResult: T = { isValid: true, days: ["M", "W", "F"] };
        expect(queryDaysParam(input)).toEqual(expectedResult);
    });

    test("Invalid input with double comma", () => {
        const input = "M,,F";
        const expectedResult: T = {
            isValid: false,
            days: null,
        };
        expect(queryDaysParam(input)).toEqual(expectedResult);
    });

    test("No Input", () => {
        const input = "";
        const expectedResult: T = {
            isValid: false,
            days: null,
        };
        expect(queryDaysParam(input)).toEqual(expectedResult);
    });

    test("Input in Array Form", () => {
        const input = "[M,W,F]";
        const expectedResult: T = {
            isValid: false,
            days: null,
        };
        expect(queryDaysParam(input)).toEqual(expectedResult);
    });

    test("Reverse order input", () => {
        const input = "F,W,M";
        const expectedResult: T = {
            isValid: true,
            days: ["F", "W", "M"],
        };
        expect(queryDaysParam(input)).toEqual(expectedResult);
    });

    test("Out of correct input", () => {
        const input = "M,S,W,F,T";
        const expectedResult: T = {
            isValid: true,
            days: ["M", "S", "W", "F", "T"],
        };
        expect(queryDaysParam(input)).toEqual(expectedResult);
    });

    test("Spaces between letter", () => {
        const input = "T, R, S";
        const expectedResult: T = {
            isValid: false,
            days: null,
        };
        expect(queryDaysParam(input)).toEqual(expectedResult);
    });
});
