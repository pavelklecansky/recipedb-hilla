import RecipeCard from "Frontend/components/card/RecipeCard";
import DataGrid from "Frontend/components/grid/DataGrid";
import { RecipeEndpoint } from "Frontend/generated/endpoints";
import { recipeSortCriteria } from "Frontend/utils/core.utils";

export default function RecipesView() {
  return (
    <>
      <DataGrid
        dataLoad={RecipeEndpoint.findAll}
        sortCriteria={recipeSortCriteria}
        Card={RecipeCard}
        addNewLink={"/recipe/add"}
      />
    </>
  );
}
