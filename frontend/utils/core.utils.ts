export const createOption = (label: string) => ({
    label,
    value: label,
});

export function ToArray(enumme: { [x: string]: any; }) {
    return Object.keys(enumme)
        .map(key => enumme[key]);
}