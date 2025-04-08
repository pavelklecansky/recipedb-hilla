import Placeholder from "Frontend/components/placeholder/Placeholder";
import { ViewRouteMatch } from "Frontend/types/core.types";
import AuthControl from "Frontend/views/AuthControl";
import NotFoundView from "Frontend/views/helper/NotFoundView";
import LoginView from "Frontend/views/login/LoginView";
import MainLayout from "Frontend/views/MainLayout.js";
import AddRecipeView from "Frontend/views/recipe/AddRecipeView";
import EditRecipeView from "Frontend/views/recipe/EditRecipeView";
import RecipeView from "Frontend/views/recipe/RecipeView";
import TagsView from "Frontend/views/tag/TagsView";
import TagView from "Frontend/views/tag/TagView";
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  useMatches,
} from "react-router";
import RecipesView from "./views/recipe/RecipesView";

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];
export const routes: readonly RouteObject[] = [
  {
    element: (
      <AuthControl fallback={<Placeholder />}>
        <MainLayout />
      </AuthControl>
    ),
    handle: { icon: "null", title: "Main" },
    errorElement: <NotFoundView />,
    children: [
      {
        path: "/",
        element: <Navigate to="/recipe" replace />,
        handle: { title: "Recipes", requiresLogin: true },
      },
      {
        path: "/recipe",
        element: <RecipesView />,
        handle: { icon: "la la-book", title: "Recipes", requiresLogin: true },
      },
      {
        path: "/recipe/:id",
        element: <RecipeView />,
        handle: { title: "Recipe", requiresLogin: true },
      },
      {
        path: "/recipe/add",
        element: <AddRecipeView />,
        handle: { title: "Add new recipe", requiresLogin: true },
      },
      {
        path: "/recipe/:id/edit",
        element: <EditRecipeView />,
        handle: { title: "Edit recipe", requiresLogin: true },
      },
      {
        path: "/tag",
        element: <TagsView />,
        handle: { icon: "la la-tags", title: "Tags", requiresLogin: true },
      },
      {
        path: "/tag/:id",
        element: <TagView />,
        handle: { title: "Tag", requiresLogin: true },
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
    handle: { icon: "null", title: "Login", requiresLogin: true },
  },
];

const router = createBrowserRouter([...routes]);
export default router;
