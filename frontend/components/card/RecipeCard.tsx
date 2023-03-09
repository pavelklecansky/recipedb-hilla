import React, {useState} from "react";
import RecipeEntity from "Frontend/generated/cz/klecansky/recipedb/recipe/io/RecipeEntity";

type RecipeCardProps = {
    recipe: RecipeEntity
};
export default function RecipeCard({recipe}: RecipeCardProps) {

    let imageSrc = recipe.imageBase64 || "https://dummyimage.com/720x400";
    return (
        <div className="p-4 sm:w-1/3">
            <div
                className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <a href={"/recipe/" + recipe.id}><img className="h-48 lg:h-48 md:h-36 w-full object-cover object-center"
                                                      src={imageSrc} alt="Recipe image"/></a>
                <div className="p-3">
                    <a href={"/recipe/" + recipe.id}><h1
                        className="title-font text-lg font-medium text-gray-900 mb-3">{recipe.name}</h1></a>
                    <p className="leading-relaxed mb-3">{recipe.description}</p>
                </div>
            </div>
        </div>
    );
}