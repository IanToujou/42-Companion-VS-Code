import {NormEntry} from "./NormEntry";
import {NormSeverity} from "./NormSeverity";

export type NormDictionary = {
    data: NormEntry[];
};

export default function defaultDictionary(): NormDictionary {

    return {
        data: [
            {severity: NormSeverity.Warning, errorCode: "TOO_MANY_LINES", errorMessage: "kill yourself", range: 1},
            {severity: NormSeverity.Error, errorCode: "SPACE_BEFORE_FUNC", errorMessage: "Space before function name", range: 1},
            {severity: NormSeverity.Error, errorCode: "NO_ARGS_VOID", errorMessage: "buy a gun and off yourself", range: -1},
            {severity: NormSeverity.Error, errorCode: "DECL_ASSIGN_LINE", errorMessage: "djndh8db23u9bu9gd9", range: -99}
        ]
    };

}