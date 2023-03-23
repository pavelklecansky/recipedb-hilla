import {RecipeEndpoint, TagEndpoint} from 'Frontend/generated/endpoints';
import React, {useEffect, useState} from 'react';
import {Notification} from "@hilla/react-components/Notification.js";
import {useNavigate, useParams} from "react-router-dom";
import TagEntity from "Frontend/generated/cz/klecansky/recipedb/tag/io/TagEntity";
import {Menu, MenuItem} from "@szhsin/react-menu";
import {ConfirmDialog} from "@hilla/react-components/ConfirmDialog.js";
import RecipeCard from "Frontend/components/card/RecipeCard";
import {recipeSortCriteria} from "Frontend/utils/core.utils";
import DataGrid from "Frontend/components/grid/DataGrid";
import BasicTagResponse from "Frontend/generated/cz/klecansky/recipedb/tag/endpoints/response/BasicTagResponse";

export default function TagView() {
    const empty = {
        id: "",
        name: "",
    } as TagEntity;

    const [tag, setTag] = useState<BasicTagResponse>(empty);
    const [opened, setOpened] = useState(false);

    let {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id != null) {
            TagEndpoint.findById(id).then((tag) => {
                setTag(tag);
            }).catch(reason => {
                Notification.show(reason, {theme: "error"});
                navigate("/recipe");
            });
        }
    }, []);

    const deleteTag = () => {
        if (id != null) {
            TagEndpoint.deleteTag(id).then(() => {
                Notification.show("Tag was successfully deleted", {theme: "success"});
                navigate("/tag");
            }).catch(reason => {
                Notification.show(reason, {theme: "error"});
                navigate("/tag");
            });
        }
    }


    return (
        <div className={"mx-4"}>
            <ConfirmDialog
                opened={opened}
                onOpenedChanged={({detail: {value}}) => setOpened(value)}
                confirmTheme="error primary"
                header='Delete Tag'
                cancel={true}
                cancelText='Cancel'
                confirmText='Delete'
                onConfirm={() => deleteTag()}
            >
                Do you really want to delete this tag?
            </ConfirmDialog>
            <div className={'flex gap-m justify-between mt-4'}>
                <h2 className={"mt-0"}><i className="las la-tag text-black"></i> {tag.name}</h2>
                <Menu menuButton={<i className="las la-ellipsis-v text-3xl"></i>} transition>
                    <span className={"text-red-700 hover:underline"}><MenuItem
                        onClick={() => setOpened(!opened)}>Delete</MenuItem></span>
                </Menu>
            </div>
            <DataGrid id={id} dataLoad={RecipeEndpoint.findAllByTagId} sortCriteria={recipeSortCriteria} Card={RecipeCard}/>
        </div>
    );
}
