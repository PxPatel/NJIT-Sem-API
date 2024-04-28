export type DAYS = "M" | "T" | "W" | "R" | "F" | "S" | "X";

export function orderDaysOfWeekWithSwaps(days: string[]): {
    days: DAYS[] | [""];
    swapCoordinates: number[];
} {
    // Define a mapping of days of the week to their positions
    const dayOrder = { M: 1, T: 2, W: 3, R: 4, F: 5, S: 6, X: 7 };

    // Create an array to hold the sorted days and their original indices
    const indexedDays: { day: DAYS; index: number }[] = days.map(
        (day, index) => ({ day: <DAYS>day, index }),
    );

    // Sort the array based on the mapping of days of the week
    indexedDays.sort(
        (a, b) => dayOrder[a.day] - dayOrder[b.day] || a.index - b.index,
    );

    // Extract sorted days and original indices
    const sortedDays = indexedDays.map(({ day }) => day as DAYS);
    const sortedDaysCopy = [...sortedDays];

    const swapCoordinates = days.map(day => {
        const swapIndex = sortedDaysCopy.indexOf(<DAYS>day);
        sortedDaysCopy[swapIndex] = null;
        return swapIndex;
    });

    return { days: sortedDays, swapCoordinates };
}

export function seperateDaysData(daysArray: string[]): any {
    const rawDaysArray = daysArray.map(dayString => {
        return dayString === "" ? "X" : dayString;
    });

    const unorderedDaysArray = [];
    for (let i = 0; i < rawDaysArray.length; i++) {
        const dayString = rawDaysArray[i];

        if (dayString.length > 1) {
            const daysInString = Array.from(dayString);
            unorderedDaysArray.push(...daysInString);
        } else {
            unorderedDaysArray.push(dayString);
        }
    }

    const { days, swapCoordinates } =
        orderDaysOfWeekWithSwaps(unorderedDaysArray);

    return { days, rawDaysArray, swapCoordinates };
}
