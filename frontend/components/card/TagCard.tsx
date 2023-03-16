import React, {useState} from "react";
import RecipeEntity from "Frontend/generated/cz/klecansky/recipedb/recipe/io/RecipeEntity";
import BasicTagResponse from "Frontend/generated/cz/klecansky/recipedb/tag/endpoints/response/BasicTagResponse";

type TagCardProps = {
    tag: BasicTagResponse;
};
export default function TagCard({tag}: TagCardProps) {

    return (
        <div className="text-center bg-white border border-gray-200 rounded-lg">
            <a href={`/tag/${tag.id}`}>
                <h4 className="text-2xl m-3 font-bold tracking-tight text-gray-900">
                    <i className="text-black las la-tag"></i> {tag.name}
                </h4>
            </a>
        </div>

    );
}