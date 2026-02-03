import {NormSeverity} from "./NormSeverity";
import {NormRange} from "./NormRange";

export type NormEntry = {
    severity: NormSeverity;
    errorCode: string;
    errorMessage: string;
    range?: NormRange;
}