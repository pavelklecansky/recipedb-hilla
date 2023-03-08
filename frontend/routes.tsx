import HelloReactView from 'Frontend/views/helloreact/HelloReactView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import {createBrowserRouter, IndexRouteObject, NonIndexRouteObject, useMatches} from 'react-router-dom';
import RecipesView from './views/recipe/RecipesView';
import RecipeView from "Frontend/views/recipe/RecipeView";
import React from "react";
import NotFoundView from "Frontend/views/helper/NotFoundView";
import AddRecipeDialog from "Frontend/components/dialog/AddRecipeDialog";
import AddRecipeView from "Frontend/views/recipe/AddRecipeView";
import EditRecipeView from "Frontend/views/recipe/EditRecipeView";

export type MenuProps = Readonly<{
    icon?: string;
    title?: string;
}>;

export type ViewMeta = Readonly<{ handle?: MenuProps }>;

type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
    Override<NonIndexRouteObject, ViewMeta>,
    {
        children?: ViewRouteObject[];
    }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];

export const routes: readonly ViewRouteObject[] = [
    {
        element: <MainLayout/>,
        handle: {icon: 'null', title: 'Main'},
        errorElement: <NotFoundView/>,
        children: [
            {path: '/', element: <HelloReactView/>, handle: {icon: 'la la-globe', title: 'Hello React'}},
            {path: '/recipe', element: <RecipesView/>, handle: {icon: 'la la-book', title: 'Recipes'}},
            {path: '/recipe/:id', element: <RecipeView/>, handle: {title: 'Recipe'}},
            {path: '/recipe/add', element: <AddRecipeView/>, handle: {title: 'Add new recipe'}},
            {path: '/recipe/:id/edit', element: <EditRecipeView/>, handle: {title: 'Edit recipe'}},
        ],
    },
];

const router = createBrowserRouter([...routes]);
export default router;
