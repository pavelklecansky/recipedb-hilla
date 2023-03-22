import {RecipeEndpoint} from 'Frontend/generated/endpoints';
import React, {useEffect, useMemo, useState} from 'react';
import {Button} from "@hilla/react-components/Button.js";
import RecipeCard from "Frontend/components/card/RecipeCard";
import RecipeWithImageResponse
    from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/RecipeWithImageResponse";
import Pagination from 'Frontend/components/grid/Pagination';
import {Select, SelectItem} from "@hilla/react-components/Select.js";
import {TextField} from "@hilla/react-components/TextField.js";

let PageSize = 6;

export default function RecipesView() {
    const [recipes, setRecipes] = useState<RecipeWithImageResponse[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [criteria, setCriteria] = useState<SelectItem[]>();
    const [sort, setSort] = useState<string>("name|ASC");

    useEffect(() => setCriteria([
        {label: 'Name ⬆️', value: 'name|ASC'},
        {label: 'Name ⬇️', value: 'name|DESC'},
        {label: 'Rating ⬆️', value: 'rating|ASC'},
        {label: 'Rating ⬇️', value: 'rating|DESC'},
        {label: 'Servings ⬆️', value: 'servings|ASC'},
        {label: 'Servings ⬇️', value: 'servings|DESC'},
        {label: 'Preparation time ⬆️', value: 'prepTimeInMinutes|ASC'},
        {label: 'Preparation time ⬇️', value: 'prepTimeInMinutes|DESC'},
        {label: 'Cook time ⬆️', value: 'cookTimeInMinutes|ASC'},
        {label: 'Cook time ⬇️', value: 'cookTimeInMinutes|DESC'},
    ]), []);

    useEffect(() => {
        loadNewData().then(value => setTimeout(() => {
            setLoaded(true);
        }, 50));
    }, [currentPage, sort, search]);


    const loadNewData = () => RecipeEndpoint.findAll(currentPage - 1, PageSize, sort, search).then(value => {
            setRecipes(value.data!)
            setTotalCount(value.count);
        }
    );

    return (
        <>
            {loaded && <div>
                <div className={'flex p-l gap-m justify-end'}>
                    <TextField
                        className={"w-full"}
                        name='search'
                        placeholder={"Search..."}
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                    <Select
                        items={criteria}
                        value={sort}
                        onChange={event => setSort(event.target.value)}
                    />
                    <a href="/recipe/add"><Button>Add new recipe</Button></a>
                </div>
                <div className={"grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid gap-4"}>
                    {recipes.map(value => (<RecipeCard key={value.id} recipe={value}/>))}
                </div>
                <div className={"flex justify-center mb-4"}>
                    <Pagination
                        currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </div>}
        </>
    );
}
