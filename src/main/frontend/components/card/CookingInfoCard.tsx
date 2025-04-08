import RecipeWithImageResponse from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/RecipeWithImageResponse";

export function CookingInfoCard(props: { recipe: RecipeWithImageResponse }) {
  return (
    <div className="p-4 w-full">
      <div className="flex rounded-lg bg-gray-100 p-4 flex-col xl:flex-row flex-wrap">
        <div className={"w-full xl:w-1/2"}>
          <h3>Prep Time:</h3>
          <span className={"text-xl"}>
            {props.recipe.prepTimeInMinutes} minutes
          </span>
        </div>
        <div className={"w-full xl:w-1/2"}>
          <h3>Cook Time:</h3>
          <span className={"text-xl"}>
            {props.recipe.cookTimeInMinutes} minutes
          </span>
        </div>
        <div className={"w-full xl:w-1/2"}>
          <h3>Total Time:</h3>
          <span className={"text-xl"}>
            {(props.recipe.prepTimeInMinutes ?? 0) +
              (props.recipe.cookTimeInMinutes ?? 0)}{" "}
            minutes
          </span>
        </div>
        <div className={"w-full xl:w-1/2"}>
          <h3>Servings:</h3>
          <span className={"text-xl"}>{props.recipe.servings}</span>
        </div>
      </div>
    </div>
  );
}
