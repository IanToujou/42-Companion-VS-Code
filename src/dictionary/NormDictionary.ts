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
                errorMessage: "Expected tab characters instead of spaces.",
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
                errorMessage: "Cannot assign and declare a variable on the same line.",
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
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "IMPLICIT_VAR_TYPE",
                errorMessage: "Variable types must be declared explicitly.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "SPACE_BEFORE_FUNC",
                errorMessage: "Expected a tab before the function declaration.",
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
                errorCode: "BRACE_NEWLINE",
                errorMessage: "Expected a newline before a brace.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "BRACE_SHOULD_EOL",
                errorMessage: "Expected a newline after a brace.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TOO_MANY_TAB",
                errorMessage: "Too many tabs for this indent level.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TOO_FEW_TAB",
                errorMessage: "Not enough tabs for this indent level.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "SPACE_AFTER_KW",
                errorMessage: "A space is required after a keyword.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["\t", " "],
                    endDelimiters: [";", "(", "{", "\n"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "NEWLINE_PRECEDES_FUNC",
                errorMessage: "Functions must be seperated by an empty line.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "CONSECUTIVE_NEWLINES",
                errorMessage: "Consecutive new lines are not allowed.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "MULT_DECL_LINE",
                errorMessage: "Multiple variable declarations on the same line are not allowed.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["\t", " "],
                    endDelimiters: [","]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TERNARY_FBIDDEN",
                errorMessage: "Ternary operators are forbidden.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "GOTO_FBIDDEN",
                errorMessage: "The goto keyword is forbidden.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "LINE_TOO_LONG",
                errorMessage: "A line cannot be longer than 80 characters.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "INVALID_HEADER",
                errorMessage: "The file must start with a valid 42 header.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "SPACE_EMPTY_LINE",
                errorMessage: "Empty lines must be truly empty and not contain any spaces.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TOO_MANY_LINES",
                errorMessage: "A function cannot be longer than 25 lines.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "INCLUDE_HEADER_ONLY",
                errorMessage: "Include statements must include a .h file.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TOO_MANY_ARGS",
                errorMessage: "Functions cannot have more than 4 arguments.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["("],
                    endDelimiters: [")"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TOO_MANY_VARS_FUNC",
                errorMessage: "Functions cannot have more than 5 variables.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TOO_MANY_FUNCS",
                errorMessage: "There cannot be more than 5 functions in a file.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "FORBIDDEN_TYPEDEF",
                errorMessage: "The typedef keyword is not allowed in .c files.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: [" ", "\t"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "FORBIDDEN_STRUCT",
                errorMessage: "The struct keyword is not allowed in .c files.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: [" ", "\t"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "FORBIDDEN_UNION",
                errorMessage: "The union keyword is not allowed in .c files.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: [" ", "\t"]
                }
            }
            ,
            {
                severity: NormSeverity.Error,
                errorCode: "FORBIDDEN_ENUM",
                errorMessage: "The enum keyword is not allowed in .c files.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: [" ", "\t"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "EMPTY_LINE_FILE_START",
                errorMessage: "The file cannot start with an empty line.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "SPC_BEFORE_NL",
                errorMessage: "There must be no space before a newline.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: ["\n"],
                    invertStartDelimiters: true,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "CONSECUTIVE_SPC",
                errorMessage: "Consecutive spaces are not allowed here.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" "],
                    endDelimiters: [" "],
                    invertStartDelimiters: true,
                    invertEndDelimiters: true,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "MIXED_SPACE_TAB",
                errorMessage: "Spaces and tabs should not be mixed here.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: [" ", "\t"],
                    invertStartDelimiters: true,
                    invertEndDelimiters: true,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "MISALIGNED_VAR_DECL",
                errorMessage: "The variable declaration is not aligned properly.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["\t", " "],
                    endDelimiters: ["\t", " "],
                    invertStartDelimiters: true,
                    invertEndDelimiters: true,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "RETURN_PARENTHESIS",
                errorMessage: "The return value must be in parenthesis.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["\t", " "],
                    endDelimiters: [";"],
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "FORBIDDEN_CS",
                errorMessage: "Switch statements, for loops and goto statements are forbidden.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["\t", " "],
                    endDelimiters: ["\t", " "],
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "SPC_BFR_OPERATOR",
                errorMessage: "There are missing spaces before the operator.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "SPC_AFTER_OPERATOR",
                errorMessage: "There are missing spaces after the operator.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "NO_SPC_BFR_OPR",
                errorMessage: "There are too many spaces before the operator.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "NO_SPC_AFR_OPR",
                errorMessage: "There are too many spaces after the operator.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "SPC_AFTER_PAR",
                errorMessage: "There are missing spaces after the parenthesis.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "SPC_BFR_PAR",
                errorMessage: "There are missing spaces before the parenthesis.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "NO_SPC_AFR_PAR",
                errorMessage: "There too many spaces after the parenthesis.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "NO_SPC_BFR_PAR",
                errorMessage: "There too many spaces before the parenthesis.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "EMPTY_LINE_FUNCTION",
                errorMessage: "An unexpected empty line is inside the function.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "EMPTY_LINE_EOF",
                errorMessage: "An unexpected empty line is at the end of the file.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TAB_INSTEAD_SPC",
                errorMessage: "Found tab characters instead of spaces.",
                range: {
                    type: NormRangeType.LINE
                }
            }
            ,
            {
                severity: NormSeverity.Error,
                errorCode: "SPC_INSTEAD_TAB",
                errorMessage: "Found tab characters instead of spaces.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TOO_MANY_INSTR",
                errorMessage: "There are too many instructions in this line.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "WRONG_SCOPE_VAR",
                errorMessage: "The variable is not declared in the correct scope.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "WRONG_SCOPE_COMMENT",
                errorMessage: "A comment is invalid in this scope. It must be outside a function.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "HEADER_PROT_NAME",
                errorMessage: "Header protection names must be uppercase and end with _H.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" "],
                    endDelimiters: [" "],
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "PREPROC_BAD_INDENT",
                errorMessage: "Preprocessor directives must be properly aligned with spaces after the # symbol.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "PREPROC_START_LINE",
                errorMessage: "Preprocessor directives must be at the start of the line.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "HEADER_PROT_NODEF",
                errorMessage: "Header protection names must be defined after #ifndef and before #endif.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "USER_DEFINED_TYPEDEF",
                errorMessage: "Type definitions must start with a t_ prefix.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "}", ";", ",", "\t"],
                    endDelimiters: [" ", ";"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "STRUCT_TYPE_NAMING",
                errorMessage: "Structs must start with a s_ prefix.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "}", ";", ",", "\t"],
                    endDelimiters: [" ", ";"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "ENUM_TYPE_NAMING",
                errorMessage: "Enums must start with an e_ prefix.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "}", ";", ",", "\t"],
                    endDelimiters: [" ", ";"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "UNION_TYPE_NAMING",
                errorMessage: "Unions must start with a u_ prefix.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "}", ";", ",", "\t"],
                    endDelimiters: [" ", ";"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "GLOBAL_VAR_NAMING",
                errorMessage: "Global variables must start with a g_ prefix.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "}", ";", ",", "\t"],
                    endDelimiters: [" ", ";"]
                }
            },
            {
                severity: NormSeverity.Info,
                errorCode: "GLOBAL_VAR_DETECTED",
                errorMessage: "Global variable detected. Make sure it is a reasonable choice.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: [" ", "\t", ",", ";"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "MACRO_NAME_CAPITAL",
                errorMessage: "Macro statements must be in uppercase.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: [" ", "\t"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "HEADER_PROT_UPPER",
                errorMessage: "Header protection must be in uppercase.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: [" ", "\t"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "MACRO_FUNC_FORBIDDEN",
                errorMessage: "Macro statements cannot contain a function.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "MISSING_TYPEDEF_ID",
                errorMessage: "Type definitions need an id or name.",
                range: {
                    type: NormRangeType.LINE
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "NL_AFTER_PREPROC",
                errorMessage: "A newline is required after preprocessor statements.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "NL_AFTER_VAR_DECL",
                errorMessage: "A newline is required after variable declarations.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1,
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "PREPROC_CONSTANT",
                errorMessage: "Preprocessor statements must only contain constant defines.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: [" ", "\t"],
                    endDelimiters: [" ", "\t", "(", ";"]
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "MISALIGNED_FUNC_DECL",
                errorMessage: "The function declaration is not aligned properly.",
                range: {
                    type: NormRangeType.DELIMITER,
                    startDelimiters: ["\t", " "],
                    endDelimiters: ["\t", " ", "("],
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TOO_MANY_WS",
                errorMessage: "Too many whitespaces for this indent level.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "TAB_REPLACE_SPACE",
                errorMessage: "Spaces are required, but found tabs here.",
                range: {
                    type: NormRangeType.NUMERIC,
                    start: 0,
                    end: 1
                }
            },
            {
                severity: NormSeverity.Error,
                errorCode: "CHAR_AS_STRING",
                errorMessage: "A character should only contain one single character.",
                range: {
                    type: NormRangeType.LINE
                }
            }
        ]
    };

}