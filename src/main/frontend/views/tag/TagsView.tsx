import TagCard from "Frontend/components/card/TagCard";
import AddTagDialog from "Frontend/components/dialog/AddTagDialog";
import DataGrid from "Frontend/components/grid/DataGrid";
import { TagEndpoint } from "Frontend/generated/endpoints";
import { tagSortCriteria } from "Frontend/utils/core.utils";

export default function TagsView() {
  return (
    <div className={"mx-4"}>
      <DataGrid
        PageSize={27}
        dataLoad={TagEndpoint.findAllPagination}
        sortCriteria={tagSortCriteria}
        Dialog={AddTagDialog}
        Card={TagCard}
      />
    </div>
  );
}
