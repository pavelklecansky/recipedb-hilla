import React, {useState} from "react";
import Measurement from "Frontend/generated/cz/klecansky/recipedb/recipe/io/Measurement";
import MeasurementSelect from "Frontend/components/input/MeasurementSelect";
import IngredientSelect from "Frontend/components/input/IngredientSelect";
import {NumberField} from "@hilla/react-components/NumberField.js";
import IngredientRequest from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/request/IngredientRequest";
import BasicIngredient from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/BasicIngredient";

interface IngredientEditorProps {
    name: string;
    className?: string | undefined;
    value?: IngredientRequest
    onChange?: (values: IngredientRequest) => void
    onBlur?: (name: string, values: boolean) => void
}

export default function ({name, className, value, onChange, onBlur}: IngredientEditorProps) {
    const [options, setOptions] = useState<IngredientRequest>(value!);

    const handleChangeMeasurement = (newMeasurment: Measurement) => {
        let data = {...options, measurement: newMeasurment}
        setOptions(data)
        if (onChange) {
            onChange(data);
        }
    };

    const handleChangeIngrediance = (newIngrediance: BasicIngredient) => {
        let data = {...options, name: newIngrediance.name};
        setOptions(data);
        console.log(data);
        if (onChange) {
            onChange(data);
        }
    };

    const handleChangeAmount = (newAmount: string) => {
        let data = {...options, amount: Number(newAmount)};
        setOptions(data)
        if (onChange) {
            onChange(data);
        }
    };


    const handleBlur = () => {
        if (onBlur) {
            onBlur(name, true);
        }
    };

    return (
        <div className={`${className} grid-cols-3 grid gap-4`}>
            <NumberField value={String(options.amount)} className={"w-full"} onChange={e => handleChangeAmount(e.target.value)} onBlur={handleBlur}/>
            <MeasurementSelect value={options.measurement} name="ingreadiance" onChange={handleChangeMeasurement} onBlur={handleBlur}/>
            <IngredientSelect value={options.name} name="ingreadiance" onChange={handleChangeIngrediance} onBlur={handleBlur}/>
        </div>
    );
}