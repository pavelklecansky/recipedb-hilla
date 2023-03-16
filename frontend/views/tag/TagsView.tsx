import {RecipeEndpoint, TagEndpoint} from 'Frontend/generated/endpoints';
import React, {useEffect, useState} from 'react';
import RecipeEntity from "Frontend/generated/cz/klecansky/recipedb/recipe/io/RecipeEntity";
import AddTagDialog from "Frontend/components/dialog/AddTagDialog";
import {Button} from "@hilla/react-components/Button.js";
import BasicTagResponse from "Frontend/generated/cz/klecansky/recipedb/tag/endpoints/response/BasicTagResponse";
import TagCard from 'Frontend/components/card/TagCard';

export default function TagsView() {
    const [tags, setTags] = useState<BasicTagResponse[]>([]);
    const [opened, setDialogOpened] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const handleOpenDialog = () => {
        setDialogOpened(true);
    };

    const handleSetDialogOpened = (value: boolean) => {
        setDialogOpened(value);
        loadData();
    };

    const loadData = () => {
        TagEndpoint.findAll().then(value => setTags(value));
    }

    return (
        <div className={"mx-4"}>
            <div className={'flex p-l gap-m justify-end'}>
                <AddTagDialog open={opened} setOpened={handleSetDialogOpened}/>
                <Button onClick={handleOpenDialog}>Add new tag</Button>
            </div>
            <div className={"grid-cols-2 md:grid-cols-3 xl:grid-cols-6 grid gap-4"}>
                {tags.map(value => (<TagCard key={value.id} tag={value}/>))}
            </div>

        </div>
    );
}
