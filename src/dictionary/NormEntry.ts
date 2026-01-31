import {NormSeverity} from "./NormSeverity";

export type NormEntry = {
    severity: NormSeverity;
    errorCode: string;
    errorMessage: string;
    range?: number;
}