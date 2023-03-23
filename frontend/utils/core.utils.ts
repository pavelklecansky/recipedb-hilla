
export const recipeSortCriteria = [
    {label: 'Name ⬆️', value: 'name|ASC'},
    {label: 'Name ⬇️', value: 'name|DESC'},
    {label: 'Rating ⬆️', value: 'rating|ASC'},
    {label: 'Rating ⬇️', value: 'rating|DESC'},
    {label: 'Servings ⬆️', value: 'servings|ASC'},
    {label: 'Servings ⬇️', value: 'servings|DESC'},
    {label: 'Preparation time ⬆️', value: 'prepTimeInMinutes|ASC'},
    {label: 'Preparation time ⬇️', value: 'prepTimeInMinutes|DESC'},
    {label: 'Cook time ⬆️', value: 'cookTimeInMinutes|ASC'},
    {label: 'Cook time ⬇️', value: 'cookTimeInMinutes|DESC'},
];

export const tagSortCriteria = [
    {label: 'Name ⬆️', value: 'name|ASC'},
    {label: 'Name ⬇️', value: 'name|DESC'},
];

export const createOption = (label: string) => ({
    label,
    value: label,
});

export function ToArray(enumme: { [x: string]: any; }) {
    return Object.keys(enumme)
        .map(key => enumme[key]);
}

