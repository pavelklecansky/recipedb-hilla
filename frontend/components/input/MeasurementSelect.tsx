import React, {useEffect, useState} from "react";
import {TagEndpoint} from "Frontend/generated/endpoints";
import Select, {MultiValue, SingleValue} from "react-select";
import BasicTagResponse from "Frontend/generated/cz/klecansky/recipedb/tag/endpoints/response/BasicTagResponse";
import {Option} from "Frontend/types/core.types";
import {createOption, ToArray} from 'Frontend/utils/core.utils';
import Measurement from "Frontend/generated/cz/klecansky/recipedb/recipe/io/Measurement";

interface TagSelectProps {
    name: string;
    className?: string | undefined;
    value?: Measurement
    onChange?: (values: Measurement) => void
    onBlur?: (name: string, values: boolean) => void
}

export default function TagSelect({name, className, value, onChange, onBlur}: TagSelectProps) {
    const [optionsString, setOptionsString] = useState<readonly Option[]>(ToArray(Measurement).map(value => createOption(value)));

    const handleChange = (selectedOption: SingleValue<Option>) => {
        let measurementElement: Measurement = selectedOption?.value as Measurement;
        if (onChange) {
            onChange(measurementElement);
        }
    };

    const handleBlur = () => {
        if (onBlur) {
            onBlur(name, true);
        }
    };

    return (<>
        <Select
            name={name}
            className={className}
            options={optionsString}
            defaultValue={createOption(value ?? Measurement.gram)}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    </>);
}