import IngredientRequest from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/request/IngredientRequest";
import React, {useState} from "react";
import Measurement from "Frontend/generated/cz/klecansky/recipedb/recipe/io/Measurement";
import IngredientEditor from "Frontend/components/input/IngredientEditor";
import {Button} from "@hilla/react-components/Button.js";

interface DynamicIngredientEditorProps {
    name: string;
    className?: string | undefined;
    value?: IngredientRequest[]
    onChange?: (values: IngredientRequest[]) => void
    onBlur?: (name: string, values: boolean) => void
}

export default function DynamicIngredientEditor({
                                                    name,
                                                    className,
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }: DynamicIngredientEditorProps) {


    const [inputFields, setInputFields] = useState<IngredientRequest[]>(value!);

    console.log(inputFields);

    const handleFormChange = (index: number, ingredient: IngredientRequest) => {
        let data = [...inputFields];
        data[index] = ingredient;
        setInputFields(data);
        if (onChange) {
            console.log(data);
            onChange(data);
        }
    }

    const addFields = () => {
        let newfield = {
            amount: 0,
            measurement: Measurement.gram,
            name: ""
        }
        setInputFields([...inputFields, newfield])
    }
    const removeFields = (index: number) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
        if (onChange) {
            onChange(data);
        }
    }

    const handleBlur = () => {
        if (onBlur) {
            onBlur(name, true);
        }
    };


    return (<>
        <div className={"w-full"}>
            <p className={"text-gray-500 text-l"}>Ingredients</p>
            {inputFields.map((input, index) => {
                return (
                    <div className={"flex justify-between mt-3"} key={index}>
                        <IngredientEditor className={"flex-grow"} name={"ingre"} value={input}
                                          onChange={ingrediant => handleFormChange(index, ingrediant)}
                                          onBlur={handleBlur}/>
                        <Button className={"ml-6"} onClick={() => removeFields(index)}>Remove</Button>
                    </div>
                )
            })}
        </div>
        <div className={"w-full flex justify-end"}>
            <Button onClick={addFields}>Add More..</Button>
        </div>

    </>);
}