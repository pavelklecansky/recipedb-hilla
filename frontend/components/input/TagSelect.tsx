import Creatable from 'react-select/creatable';
import React, {ChangeEvent, useEffect, useState} from "react";
import {TagEndpoint} from "Frontend/generated/endpoints";
import TagEntity from "Frontend/generated/cz/klecansky/recipedb/tag/io/TagEntity";
import Select, {MultiValue} from "react-select";
import BasicTagResponse from "Frontend/generated/cz/klecansky/recipedb/tag/endpoints/response/BasicTagResponse";

interface Option {
    readonly label: string;
    readonly value: string;
}

const createOption = (label: string) => ({
    label,
    value: label,
});

interface TagSelectProps {
    name: string;
    className?: string | undefined;
    value?: BasicTagResponse[]
    onChange?: (values: BasicTagResponse[]) => void
    onBlur?: (name: string, values: boolean) => void
}

export default function TagSelect({name, className, value, onChange, onBlur}: TagSelectProps) {
    const [options, setOptions] = useState<BasicTagResponse[]>([]);
    const [optionsString, setOptionsString] = useState<readonly Option[]>([]);
    const [selectOptions, setSelectOptions] = useState<Option[]>([]);

    const handleChange = (selectedOption: MultiValue<Option>) => {
        setSelectOptions([...selectedOption]);
        value = options.filter(option => selectedOption.map(selected => selected.value).includes(option.name));
        console.log(value);
        if (onChange) {
            onChange(value);
        }
    };

    const handleBlur = () => {
        if (onBlur) {
            console.log(name, true)
            onBlur(name, true);
        }
    };

    function loadTags() {
        TagEndpoint.findAll().then((tags) => {
            setOptions(tags)
            setOptionsString(tags.map(value => createOption(value.name)));

        });
    }

    useEffect(() => {
        loadTags();
    }, []);


    return (<>

        <Select
            name={name}
            className={className}
            isMulti
            options={optionsString}
            /*TODO tagSelect is not showing*/
            defaultValue={value?.map(tags => createOption(tags.name))}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    </>);
}