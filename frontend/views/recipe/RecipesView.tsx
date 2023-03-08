import {RecipeEndpoint} from 'Frontend/generated/endpoints';
import React, {useEffect, useState} from 'react';
import RecipeEntity from "Frontend/generated/cz/klecansky/recipedb/recipe/io/RecipeEntity";
import AddRecipeDialog from "Frontend/components/dialog/AddRecipeDialog";
import {Button} from "@hilla/react-components/Button.js";
import RecipeCard from "Frontend/components/card/RecipeCard";

export default function RecipesView() {
    const [recipes, setRecipes] = useState<RecipeEntity[]>([]);

    useEffect(() => {
        RecipeEndpoint.findAll().then(value => setRecipes(value));
    }, []);

    return (
        <>
            <div className={'flex p-l gap-m justify-end'}>
                <a href="/recipe/add"><Button>Add new recipe</Button></a>
            </div>
            {recipes.map(value => (<RecipeCard recipe={value}/>))}
        </>
    );
}
