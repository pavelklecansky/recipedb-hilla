export function RecipeImage(props: { src: string }) {
  return (
    <div className="lg:max-w-md lg:w-2/3 md:w-1/2 w-5/6 mt-2">
      <img
        className="object-cover object-center rounded"
        alt="Recipe image"
        src={props.src}
      />
    </div>
  );
}
