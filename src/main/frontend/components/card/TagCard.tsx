import BasicTagResponse from "Frontend/generated/cz/klecansky/recipedb/tag/endpoints/response/BasicTagResponse";

type TagCardProps = {
  value: BasicTagResponse;
};
export default function TagCard({ value }: TagCardProps) {
  return (
    <div className="text-center bg-white border border-gray-200 rounded-lg">
      <a href={`/tag/${value.id}`}>
        <h4 className="text-2xl m-3 font-bold tracking-tight text-gray-900">
          <i className="text-black las la-tag"></i> {value.name}
        </h4>
      </a>
    </div>
  );
}
