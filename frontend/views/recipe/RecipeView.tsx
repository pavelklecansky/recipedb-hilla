import {RecipeEndpoint} from 'Frontend/generated/endpoints';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import RecipeEntity from "Frontend/generated/cz/klecansky/recipedb/recipe/io/RecipeEntity";
import {Notification} from '@hilla/react-components/Notification.js';
import {Menu, MenuItem} from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import {ConfirmDialog} from "@hilla/react-components/ConfirmDialog.js";

export default function RecipeView() {
    const [recipe, setRecipe] = useState<RecipeEntity>({});
    const [opened, setOpened] = useState(false);
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

    const deleteRecipe = () => {
        if (id != null) {
            RecipeEndpoint.deleteRecipe(id).then(() => {
                Notification.show("Recipe was successfully deleted", {theme: "success"});
                navigate("/recipe");
            }).catch(reason => {
                Notification.show(reason, {theme: "error"});
                navigate("/recipe");
            });
        }
    }

    return (
        <div className="px-5 py-4">
            <ConfirmDialog
                opened={opened}
                onOpenedChanged={({detail: {value}}) => setOpened(value)}
                confirmTheme="error primary"
                header='Delete Recipe'
                cancel={true}
                cancelText='Cancel'
                confirmText='Delete'
                onConfirm={() => deleteRecipe()}
            >
                Do you really want to delete this recipe?
            </ConfirmDialog>
            <div className={'flex gap-m justify-end'}>
                <Menu menuButton={<i className="las la-ellipsis-v text-3xl"></i>} transition>
                    <a href={`/recipe/${id}/edit`}><MenuItem>Edit</MenuItem></a>
                    <span className={"text-red-700 hover:underline"}><MenuItem
                        onClick={() => setOpened(!opened)}>Delete</MenuItem></span>
                </Menu>
            </div>
            <div className="container mx-auto flex md:flex-row flex-col items-center">
                <div
                    className="lg:flex-grow w-full md:w-1/2 lg:pr-16 md:pr-8 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 mt-0">
                        {recipe.name}
                    </h1>
                    <p className="mb-8 leading-relaxed">{recipe.description}</p>
                    <div className="p-4 w-full">
                        <div className="flex rounded-lg bg-gray-100 p-4 flex-col xl:flex-row flex-wrap">
                            <div className={"w-full xl:w-1/2"}>
                                <h3>Prep Time:</h3>
                                <span>{recipe.prepTimeInMinutes} minutes</span>
                            </div>
                            <div className={"w-full xl:w-1/2"}>
                                <h3>Cook Time:</h3>
                                <span>{recipe.cookTimeInMinutes} minutes</span>
                            </div>
                            <div className={"w-full xl:w-1/2"}>
                                <h3>Total Time:</h3>
                                <span>{(recipe.prepTimeInMinutes ?? 0) + (recipe.cookTimeInMinutes ?? 0)} minutes</span>
                            </div>
                            <div className={"w-full xl:w-1/2"}>
                                <h3>Servings:</h3>
                                <span>{recipe.servings}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:max-w-md lg:w-2/3 md:w-1/2 w-5/6 mt-2">
                    <img className="object-cover object-center rounded" alt="hero"
                         src="https://dummyimage.com/720x600"/>
                </div>
            </div>
            <div>
                <div>
                    <h2>Ingredients</h2>
                    <span>
                        {recipe.ingredients}
                    </span>
                </div>
                <div>
                    <h2>Directions</h2>
                    <span>
                        {recipe.directions}
                    </span>
                </div>

            </div>
        </div>
    );
}
