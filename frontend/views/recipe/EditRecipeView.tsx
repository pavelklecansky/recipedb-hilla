import React, {useEffect, useState} from "react";
import RecipeEntity from "Frontend/generated/cz/klecansky/recipedb/recipe/io/RecipeEntity";
import {useNavigate, useParams} from "react-router-dom";
import {RecipeEndpoint} from "Frontend/generated/endpoints";
import {Notification} from "@hilla/react-components/Notification.js";
import {FormikErrors, useFormik} from "formik";
import {EndpointValidationError} from "@hilla/frontend";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {NumberField} from "@hilla/react-components/NumberField.js";
import {TextArea} from "@hilla/react-components/TextArea.js";
import {Upload} from "@hilla/react-components/Upload.js";
import {readAsDataURL} from "promise-file-reader";

export default function EditRecipeView() {
    const empty: RecipeEntity = {
        name: "",
        description: "",
        directions: "",
        ingredients: "",
        servings: 0,
        cookTimeInMinutes: 0,
        prepTimeInMinutes: 0,
    }

    const [recipe, setRecipe] = useState<RecipeEntity>({});
    let {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id != null) {
            RecipeEndpoint.findById(id).then((recipe) => setRecipe(recipe))
                .catch(reason => {
                    console.log(reason);
                    Notification.show(reason, {theme: "error"});
                    navigate("/recipe");
                });
        }
    }, []);

    const getData = () => recipe || empty;

    const formik = useFormik({
        initialValues: getData(),
        enableReinitialize: true,
        onSubmit: async (value: RecipeEntity, {setSubmitting, setErrors}) => {
            try {
                if (id != null) {
                    const saved = await RecipeEndpoint.update(id, value) ?? value;
                    formik.resetForm();
                    Notification.show("Recipe was successfully edited", {theme: "success"})
                    navigate(`/recipe/${id}`);
                }
            } catch (e: unknown) {
                if (e instanceof EndpointValidationError) {
                    const errors: FormikErrors<RecipeEntity> = {}
                    for (const error of e.validationErrorData) {
                        if (typeof error.parameterName === 'string' && error.parameterName in recipe) {
                            const key = error.parameterName as (string & keyof RecipeEntity);
                            errors[key] = error.message;
                        }
                    }
                    setErrors(errors);
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
                    className={"w-full"}
                    name='name'
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                />
                <TextArea
                    className={"w-full"}
                    name='description'
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                />
                <div className={"w-full flex align-middle"}>

                    <div className={"w-2/5"}>
                        <p>Upload recipe image</p>
                        <Upload accept="image/*"
                                max-files="1"
                                onUploadBefore={async e => {
                                    const file = e.detail.file;
                                    e.preventDefault();
                                    const base64Image = await readAsDataURL(file);
                                    console.log(base64Image);
                                    formik.values.imageBase64 = base64Image;
                                }}
                        />
                    </div>
                    <div className={"w-1/2"}>
                        <img className="h-48 lg:h-48 md:h-36 w-full object-scale-down object-center"
                             src={recipe.imageBase64} alt="Recipe image"/>
                    </div>
                </div>
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
                <TextArea
                    className={"w-full"}
                    name='ingredients'
                    label="Ingredients"
                    value={formik.values.ingredients}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                />
                <TextArea
                    className={"w-full"}
                    name='directions'
                    label="Directions"
                    value={formik.values.directions}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                />
                <Button
                    className={"w-full"}
                    theme="primary"
                    disabled={formik.isSubmitting}
                    onClick={formik.submitForm}
                >Edit</Button>
            </div>
        </>
    );
}
