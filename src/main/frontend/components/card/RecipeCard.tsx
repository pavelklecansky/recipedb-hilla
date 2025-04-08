import RecipeWithImageResponse from "Frontend/generated/cz/klecansky/recipedb/recipe/endpoints/response/RecipeWithImageResponse";

type RecipeCardProps = {
  value: RecipeWithImageResponse;
};
export default function RecipeCard({ value }: RecipeCardProps) {
  let imageSrc = value.imageBase64 || "https://dummyimage.com/720x400";
  return (
    <div className="p-4">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <a href={"/recipe/" + value.id}>
          <img
            className="h-48 lg:h-48 md:h-36 w-full object-cover object-center"
            src={imageSrc}
            alt="Recipe image"
          />
        </a>
        <div className="p-3">
          <a href={"/recipe/" + value.id}>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {value.name}
            </h1>
          </a>
          <p className="leading-relaxed mb-3">{value.description}</p>
        </div>
      </div>
    </div>
  );
}
