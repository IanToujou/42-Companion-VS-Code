import {NormEntry} from "./NormEntry";
import {NormSeverity} from "./NormSeverity";
import {NormRangeType} from "./NormRange";

export type NormDictionary = {
    data: NormEntry[];
};

export default function defaultDictionary(): NormDictionary {

    return {
        data: [
            {
                severity: NormSeverity.Error,
                errorCode: "SPACE_REPLACE_TAB",
                errorMessage: "You need to use tabs instead of spaces.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" "],
                    endDelimiters: [" "],
                    invertStartDelimiters: true,
                    invertEndDelimiters: true
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "DECL_ASSIGN_LINE",
                errorMessage: "You cannot assign and declare a variable on the same line.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["\t", " "],
                    endDelimiters: [";"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "NO_ARGS_VOID",
                errorMessage: "Functions with no parameters should contain void and not be empty.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: -1,
                    end: 1
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "VAR_DECL_START_FUNC",
                errorMessage: "Variable declarations should be at the start of the function.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["\n", "\t"],
                    endDelimiters: ["\n"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "IMPLICIT_VAR_TYPE",
                errorMessage: "Variable types must be declared explicitly.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["\t", "\n"],
                    endDelimiters: ["\n"]
                }
            }
        ]
    };

}