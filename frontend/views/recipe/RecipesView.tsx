import {RecipeEndpoint} from 'Frontend/generated/endpoints';
import React, {useEffect, useState} from 'react';
import {Button} from "@hilla/react-components/Button.js";
import RecipeCard from "Frontend/components/card/RecipeCard";
import RecipeWithImageResponse
    from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/RecipeWithImageResponse";

export default function RecipesView() {
    const [recipes, setRecipes] = useState<RecipeWithImageResponse[]>([]);

    useEffect(() => {
        RecipeEndpoint.findAll().then(value => setRecipes(value));
    }, []);

    return (
        <>
            <div className={'flex p-l gap-m justify-end'}>
                <a href="/recipe/add"><Button>Add new recipe</Button></a>
            </div>
            <div className={"grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid gap-4"}>
                {recipes.map(value => (<RecipeCard key={value.id} recipe={value}/>))}
            </div>

        </>
    );
}
