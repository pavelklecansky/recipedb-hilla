import {ConfirmDialog} from "@hilla/react-components/ConfirmDialog.js";
import React from "react";

export default function DeleteConfirmDialog(props: {
    opened: boolean,
    onOpenedChanged: ({detail: {value}}: { detail: { value: any } }) => void,
    onConfirm: () => void
}) {
    return <ConfirmDialog
        opened={props.opened}
        onOpenedChanged={props.onOpenedChanged}
        confirmTheme="error primary"
        header="Delete Tag"
        cancel={true}
        cancelText="Cancel"
        confirmText="Delete"
        onConfirm={props.onConfirm}
    >
        Do you really want to delete this tag?
    </ConfirmDialog>;
}