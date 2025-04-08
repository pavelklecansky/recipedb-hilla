import {RecipeEndpoint} from 'Frontend/generated/endpoints';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {Notification} from '@vaadin/react-components/Notification.js';
import {Menu, MenuItem} from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import RecipeWithImageResponse
    from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/RecipeWithImageResponse";
import {Rating} from "react-simple-star-rating";
import MDEditor from "@uiw/react-md-editor";
import DeleteConfirmDialog from "Frontend/components/dialog/DeleteConfirmDialog";
import {TagLinkBar} from "Frontend/components/tag/TagLinkBar";
import {CookingInfoCard} from "Frontend/components/card/CookingInfoCard";
import {RecipeImage} from "Frontend/components/util/RecipeImage";
import {IngredientsList} from "Frontend/components/util/IngredientsList";

export default function RecipeView() {
    const empty: RecipeWithImageResponse = {
        id: "",
        name: "",
        description: "",
        directions: "",
        ingredients: [],
        servings: 0,
        cookTimeInMinutes: 0,
        prepTimeInMinutes: 0,
        rating: 0,
        imageBase64: "",
        tags: [],
    }

    const [recipe, setRecipe] = useState<RecipeWithImageResponse>(empty);
    const [opened, setOpened] = useState(false);
    const [imgUrl, setImageUrl] = useState("https://dummyimage.com/720x400");
    let {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id != null) {
            RecipeEndpoint.findById(id).then((recipe) => {
                setRecipe(recipe);
                setImageUrl(recipe.imageBase64 || "https://dummyimage.com/720x400");
            }).catch(reason => {
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
            <DeleteConfirmDialog opened={opened} onOpenedChanged={({detail: {value}}) => setOpened(value)}
                                 onConfirm={() => deleteRecipe()}/>
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
                    <div>
                        <Rating
                            className={"mb-4 mt-0"}
                            emptyStyle={{display: "flex"}} fillStyle={{display: "-webkit-inline-box"}}
                            initialValue={recipe.rating}
                            readonly={true}
                        />
                    </div>
                    <TagLinkBar recipe={recipe}/>
                    <p className="mb-8 leading-relaxed text-2xl">{recipe.description}</p>
                    <CookingInfoCard recipe={recipe}/>
                </div>
                <RecipeImage src={imgUrl}/>
            </div>
            <div className="container mx-auto flex md:flex-row flex-col items-left lg:items-center">
                <div>
                    <div>
                        <h2>Ingredients</h2>
                        <IngredientsList recipe={recipe}/>
                    </div>
                    <div>
                        <h2>Directions</h2>
                        <span className={"text-xl"}>
                        <MDEditor.Markdown source={recipe.directions}/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
