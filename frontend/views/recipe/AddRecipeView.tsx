import React, {useEffect, useState} from "react";
import RecipeEntity from "Frontend/generated/cz/klecansky/recipedb/recipe/io/RecipeEntity";
import {useNavigate} from "react-router-dom";
import {RecipeEndpoint} from "Frontend/generated/endpoints";
import {Notification} from "@hilla/react-components/Notification.js";
import {FormikErrors, useFormik} from "formik";
import {EndpointError, EndpointValidationError} from "@hilla/frontend";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {NumberField} from "@hilla/react-components/NumberField.js";
import {TextArea} from "@hilla/react-components/TextArea.js";
import {Upload} from "@hilla/react-components/Upload.js";
import {readAsDataURL} from 'promise-file-reader';
import TagSelect from "Frontend/components/input/TagSelect";
import SaveRecipe from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/request/SaveRecipe";
import {Rating} from "react-simple-star-rating";
import MeasurementSelect from "Frontend/components/input/MeasurementSelect";
import IngredientSelect from "Frontend/components/input/IngredientSelect";
import IngredientEditor from "Frontend/components/input/IngredientEditor";
import DynamicIngredientEditor from "Frontend/components/input/DynamicIngredientEditor";
import Measurement from "Frontend/generated/cz/klecansky/recipedb/recipe/io/Measurement";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

export default function AddRecipeView() {
    const empty: SaveRecipe = {
        name: "",
        description: "",
        directions: "",
        ingredients: [{
            amount: 0,
            measurement: Measurement.gram,
            name: ""
        }],
        servings: 0,
        cookTimeInMinutes: 0,
        prepTimeInMinutes: 0,
        rating: 0,
        imageBase64: [],
        tags: [],
    };
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: empty,
        onSubmit: async (value: SaveRecipe, {setSubmitting, setErrors}) => {
            try {
                console.log(value);
                const saved = await RecipeEndpoint.saveRecipe(value) ?? value;
                formik.resetForm();
                Notification.show("Recipe add successfully", {theme: "success"})
                navigate("/recipe");

            } catch (e: unknown) {
                if (e instanceof EndpointValidationError) {
                    const errors: FormikErrors<RecipeEntity> = {}
                    for (const error of e.validationErrorData) {
                        if (typeof error.parameterName === 'string' && error.parameterName in empty) {
                            const key = error.parameterName as (string & keyof RecipeEntity);
                            errors[key] = error.message;
                        }
                    }
                    setErrors(errors);
                }
                if (e instanceof EndpointError) {
                    Notification.show((e as EndpointError).message, {theme: "error"});
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <div className="m-m flex justify-between content-stretch flex-wrap items-baseline gap-m">
                <TextField
                    required={true}
                    className={"w-full"}
                    name='name'
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                />
                <div>
                    <p className="text-gray-500 text-md">Rating</p>
                    <Rating
                        emptyStyle={{display: "flex"}} fillStyle={{display: "-webkit-inline-box"}}
                        initialValue={formik.values.rating}
                        onClick={values => formik.setFieldValue("rating", values)}
                    />
                </div>

                <TextArea
                    className={"w-full"}
                    name='description'
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                />
                <p>Upload recipe image</p>
                <Upload className={"w-full"}
                        accept="image/*"
                        max-files="1"
                        onUploadBefore={async e => {
                            const file = e.detail.file;
                            e.preventDefault();
                            const base64Image = await file.arrayBuffer();
                            formik.values.imageBase64 = [...new Uint8Array(base64Image)];
                        }}
                />
                <NumberField
                    className={"w-full md:w-1/4"}
                    name='cookTimeInMinutes'
                    label="Cooking time in minutes"
                    value={String(formik.values.cookTimeInMinutes)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                />
                <NumberField
                    className={"w-full md:w-1/4 flex-grow"}
                    name='prepTimeInMinutes'
                    label="Preparation time in minutes"
                    value={String(formik.values.prepTimeInMinutes)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                />
                <NumberField
                    className={"w-full md:w-1/4"}
                    name='servings'
                    label="Servings"
                    value={String(formik.values.servings)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                />
                <DynamicIngredientEditor className={"w-full"} name='ingredients' value={formik.values.ingredients}
                                         onChange={values => formik.setFieldValue("ingredients", values)}
                                         onBlur={formik.handleChange}/>
                <div className="container">
                    <MDEditor
                        id={"directions"}
                        value={formik.values.directions}
                        onChange={values => formik.setFieldValue("directions", values)}
                        onBlur={formik.handleChange}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                    />
                </div>
                <TagSelect
                    className={"w-full"}
                    name='tags'
                    value={formik.values.tags}
                    onChange={values => formik.setFieldValue("tags", values)}
                    onBlur={formik.handleChange}
                />
                <Button
                    className={"w-full"}
                    theme="primary"
                    disabled={formik.isSubmitting}
                    onClick={formik.submitForm}
                >Add</Button>
            </div>
        </>
    );
}
