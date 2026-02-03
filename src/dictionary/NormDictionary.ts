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
                    startDelimiters: ["\n"],
                    endDelimiters: [" ", "\t"],
                    invertEndDelimiters: true
                }
            }
        ]
    };

}