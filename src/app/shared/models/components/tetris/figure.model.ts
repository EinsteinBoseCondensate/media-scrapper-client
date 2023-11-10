import { SanitizeCurrentIndexesArgument } from "./sanitize.current-index.argument";

export interface Figure{
    initialIndexes: number[],
    currentIndexes: number[]
    class: string,
    miniatureClass: string,
    placed: boolean,
    sanitizeIndexesForRotation: (argument: SanitizeCurrentIndexesArgument) => number[]
    
}

export const defaultFigure = (): Figure => ({
    initialIndexes: [],
    currentIndexes: [],
    class: '',
    miniatureClass: '',
    placed: false,
    sanitizeIndexesForRotation: argument => []
})