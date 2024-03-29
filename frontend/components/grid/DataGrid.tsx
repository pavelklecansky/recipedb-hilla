import React, {ComponentType, ReactNode, useEffect, useState} from "react";
import RecipeWithImageResponse
    from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/RecipeWithImageResponse";
import {Select, SelectItem} from "@hilla/react-components/Select.js";
import {recipeSortCriteria} from "Frontend/utils/core.utils";
import {RecipeEndpoint} from "Frontend/generated/endpoints";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import RecipeCard from "Frontend/components/card/RecipeCard";
import Pagination from "Frontend/components/grid/Pagination";
import IngredientRequest from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/request/IngredientRequest";
import PageResponse from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/PageResponse";
import PaginationRequest from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/request/PaginationRequest";
import AddTagDialog from "Frontend/components/dialog/AddTagDialog";





interface CardProps<T extends { id?: string }> {
    value: T
}

interface DialogProps<T extends { id?: string }> {
    open: boolean;
    setOpened: (value: boolean) => void;
}

interface DataGridProps<T extends { id?: string }> {
    id?: string,
    dataLoad: (pagination: PaginationRequest) => Promise<PageResponse>;
    sortCriteria: SelectItem[];
    Card: ComponentType<CardProps<T>>;

    Dialog?: ComponentType<DialogProps<T>>;

    addNewLink?: string;

    PageSize?: number;
}

export default function DataGrid<T extends { id?: string }>({
                                                                id,
                                                                dataLoad,
                                                                sortCriteria,
                                                                Card,
                                                                Dialog,
                                                                addNewLink,
                                                                PageSize = 6,
                                                            }: DataGridProps<T>) {
    const [recipes, setRecipes] = useState<T[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [criteria, setCriteria] = useState<SelectItem[]>(sortCriteria);
    const [sort, setSort] = useState<string>(sortCriteria[0]?.value ?? "");
    const [opened, setDialogOpened] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpened(true);
    };

    const handleSetDialogOpened = (value: boolean) => {
        setDialogOpened(value);
        loadNewData();
    };

    useEffect(() => {
        loadNewData().then(() => setTimeout(() => {
            setLoaded(true);
        }, 50));
    }, [currentPage, sort, search]);

    const loadNewData = () => {
        return dataLoad({id: id, page: currentPage - 1, pageSize: PageSize, sort, search}).then(value => {
                setRecipes(value.data!)
                setTotalCount(value.count);
            }
        );
    }


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
                    {addNewLink &&
                        <a href={addNewLink}><Button>Add new recipe</Button></a>}

                    {Dialog &&
                        <div>
                            <Dialog open={opened} setOpened={handleSetDialogOpened}/>
                            <Button onClick={handleOpenDialog}>Add new tag</Button>
                        </div>
                    }
                </div>
                <div className={"grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid gap-4"}>
                    {recipes.map(value => (<Card key={value.id} value={value}/>))}
                </div>
                <div className={"flex justify-center mb-4 mt-4"}>
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