import {MakefileSeverity} from "./MakefileSeverity";

export type MakefileEntry = {
    severity: MakefileSeverity;
    pattern: RegExp;
    errorMessage: string;
    getRange?: (line: string, lineNumber: number) => { start: number; end: number } | null
};