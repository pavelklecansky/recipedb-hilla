import RecipeWithImageResponse from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/RecipeWithImageResponse";

export function TagLinkBar(props: { recipe: RecipeWithImageResponse }) {
  return (
    <>
      {props.recipe.tags.length > 0 && (
        <div className={"rounded-lg bg-gray-100 p-2"}>
          {props.recipe.tags.map((value) => (
            <a
              key={value.id}
              href={`/tag/${value.id}`}
              className={"text-lg mr-3"}
            >
              <i className="text-black la la-tag"></i> {value.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
