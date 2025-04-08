import { Menu, MenuItem } from "@szhsin/react-menu";
import { Notification } from "@vaadin/react-components/Notification.js";
import RecipeCard from "Frontend/components/card/RecipeCard";
import DeleteConfirmDialog from "Frontend/components/dialog/DeleteConfirmDialog";
import DataGrid from "Frontend/components/grid/DataGrid";
import BasicTagResponse from "Frontend/generated/cz/klecansky/recipedb/tag/endpoints/response/BasicTagResponse";
import TagEntity from "Frontend/generated/cz/klecansky/recipedb/tag/io/TagEntity";
import { RecipeEndpoint, TagEndpoint } from "Frontend/generated/endpoints";
import { recipeSortCriteria } from "Frontend/utils/core.utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function TagView() {
  const empty = {
    id: "",
    name: "",
  } as TagEntity;

  const [tag, setTag] = useState<BasicTagResponse>(empty);
  const [opened, setOpened] = useState(false);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id != null) {
      TagEndpoint.findById(id)
        .then((tag) => {
          setTag(tag);
        })
        .catch((reason) => {
          Notification.show(reason, { theme: "error" });
          navigate("/recipe");
        });
    }
  }, []);

  const deleteTag = () => {
    if (id != null) {
      TagEndpoint.deleteTag(id)
        .then(() => {
          Notification.show("Tag was successfully deleted", {
            theme: "success",
          });
          navigate("/tag");
        })
        .catch((reason) => {
          Notification.show(reason, { theme: "error" });
          navigate("/tag");
        });
    }
  };

  return (
    <div className={"mx-4"}>
      <DeleteConfirmDialog
        opened={opened}
        onOpenedChanged={({ detail: { value } }) => setOpened(value)}
        onConfirm={() => deleteTag()}
      />
      <div className={"flex gap-m justify-between mt-4"}>
        <h2 className={"mt-0"}>
          <i className="las la-tag text-black"></i> {tag.name}
        </h2>
        <Menu
          menuButton={<i className="las la-ellipsis-v text-3xl"></i>}
          transition
        >
          <span className={"text-red-700 hover:underline"}>
            <MenuItem onClick={() => setOpened(!opened)}>Delete</MenuItem>
          </span>
        </Menu>
      </div>
      <DataGrid
        id={id}
        dataLoad={RecipeEndpoint.findAllByTagId}
        sortCriteria={recipeSortCriteria}
        Card={RecipeCard}
      />
    </div>
  );
}
