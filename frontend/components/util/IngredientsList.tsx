import RecipeWithImageResponse
    from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/RecipeWithImageResponse";
import React from "react";

export function IngredientsList(props: { recipe: RecipeWithImageResponse }) {
    return <ul className={"text-xl list-disc  ml-8"}>
        {props.recipe.ingredients.map(value => (
            <li key={value.name}>{value?.amount} {value?.measurement} {value?.name}</li>))}
    </ul>;
}