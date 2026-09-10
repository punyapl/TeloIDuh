export const getFormattedIndex = (i: number | string) => {
    return String(Number(i) + 1).padStart(2, "0")
}