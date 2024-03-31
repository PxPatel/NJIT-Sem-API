export const removeZerosPadding = (str: string): string => {
    if (Number.isNaN(parseInt(str, 10))) {
        return "";
    }

    let maxSubstring = "";
    let currentSubstring = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] === "0") {
            if (currentSubstring !== "") {
                currentSubstring += "0";
            }
        } else {
            currentSubstring += str[i];
            maxSubstring = currentSubstring;
        }
    }

    return maxSubstring;
};
