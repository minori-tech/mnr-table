export const isObjectEmpty = (obj: any) => {
    return !obj || typeof obj !== 'object' || Object.keys(obj).length === 0
}

export const isArrayEmpty = (arr: Array<any>) => {
    return !arr || arr.length === 0 || !Array.isArray(arr)
}

export const isStrEmpty = (str: string) => {
    return !str || typeof str !== 'string' || str.length === 0 || str.trim().length === 0
}
