import React, {useEffect, useState} from "react";
import {RecipeEndpoint, TagEndpoint} from "Frontend/generated/endpoints";
import Select, {MultiValue, SingleValue} from "react-select";
import BasicTagResponse from "Frontend/generated/cz/klecansky/recipedb/tag/endpoints/response/BasicTagResponse";
import {Option} from "Frontend/types/core.types";
import {createOption} from 'Frontend/utils/core.utils';
import BasicIngredient from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/BasicIngredient";
import CreatableSelect from "react-select/creatable";

interface IngredientSelectProps {
    name: string;
    className?: string | undefined;
    value?: string
    onChange?: (values: BasicIngredient) => void
    onBlur?: (name: string, values: boolean) => void
}

export default function IngredientSelect({name, className, value, onChange, onBlur}: IngredientSelectProps) {
    const [options, setOptions] = useState<BasicIngredient[]>([]);
    const [optionsString, setOptionsString] = useState<readonly Option[]>([]);
    const [selectValue, setSelectValue] = useState<Option | null>();
    console.log(value);

    const handleChange = (selectedOption: SingleValue<Option>) => {
        let basicIngredient = options.find(value1 => value1.name == selectedOption?.value);
        console.log(basicIngredient);
        if (onChange) {
            onChange(basicIngredient!);
        }
    };

    const handleBlur = () => {
        if (onBlur) {
            onBlur(name, true);
        }
    };

    function loadTags() {
        RecipeEndpoint.findAllIngredients().then((ingrediance) => {
            setOptions(ingrediance)
            setOptionsString(ingrediance.map(value => createOption(value.name)));
        })
    }

    const handleCreate = async (inputValue: string) => {
        const basicIngredient = await RecipeEndpoint.createNewIngredient(inputValue);
        const newOption = createOption(basicIngredient.name);
        setOptionsString((prev) => [...prev, newOption]);
        setSelectValue(newOption);
    };

    useEffect(() => {
        loadTags();
    }, []);

    return (<>
        <CreatableSelect
            isClearable
            name={name}
            className={className}
            options={optionsString}
            defaultValue={createOption(value ?? "")}
            onChange={handleChange}
            onBlur={handleBlur}
            onCreateOption={handleCreate}
            value={selectValue}
        />
    </>);
}