import {MakefileEntry} from "./MakefileEntry";
import {MakefileSeverity} from "./MakefileSeverity";

export type MakefileDictionary = {
    data: MakefileEntry[];
}

export default function defaultDictionary(): MakefileDictionary {

    return {
        data: [
            {
                pattern: /^(SRCS?|SRC?|SOURCES?|FILES?)\s*[+:!?]?=.*(\*\.\w+|\$\(wildcard\s)/i,
                errorMessage: "Wildcards are not allowed to specify source files.",
                severity: MakefileSeverity.Error,
                getRange: (line: string, lineNumber: number) => {
                    const wildcardMatch = line.match(/(\*\.\w+|\$\(wildcard\s)/);
                    if (wildcardMatch) {
                        const startCol = line.indexOf(wildcardMatch[0]);
                        const endCol = startCol + wildcardMatch[0].length;
                        return { start: startCol, end: endCol };
                    }
                    return null;
                }
            }
        ]
    };

}