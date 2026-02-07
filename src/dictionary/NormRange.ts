export enum NormRangeType {
    NUMERIC,
    DELIMITER,
    LINE
}

/**
 * Represents a normalized range with a start and an end value.
 *
 * The range can contain numeric values but can also use a delimiter to automatically calculate the range.
 * A numeric value is always an offset to the indicated value by norminette. For instance, a starting number
 * of `-1` will start one character before the indicated value. The default number is `0`, which is the origin of
 * the norminette.
 *
 * @property {NormRangeType} type The type of range.
 * @property {number} start The starting value of the range.
 * @property {number} end The ending value of the range.
 * @property {string[]} startDelimiters Array of characters that mark the start of the range.
 * @property {string[]} endDelimiters Array of characters that mark the end of the range.
 * @property {boolean} invertStartDelimiters If true, stops when encountering any character NOT in startDelimiters.
 * @property {boolean} invertEndDelimiters If true, stops when encountering any character NOT in endDelimiters.
 */
export type NormRange = {
    type: NormRangeType,
    start?: number,
    end?: number,
    startDelimiters?: string[],
    endDelimiters?: string[],
    invertStartDelimiters?: boolean,
    invertEndDelimiters?: boolean
};