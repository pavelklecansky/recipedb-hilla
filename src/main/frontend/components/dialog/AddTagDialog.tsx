import React from "react";
import {Button} from "@vaadin/react-components/Button.js";
import {VerticalLayout} from "@vaadin/react-components/VerticalLayout.js";
import {Dialog, DialogOpenedChangedEvent} from "@vaadin/react-components/Dialog.js";
import {TextField} from "@vaadin/react-components/TextField.js";
import {useFormik} from "formik";
import {TagEndpoint} from "Frontend/generated/endpoints";
import {Notification} from "@vaadin/react-components/Notification.js";
import {EndpointError} from "@vaadin/hilla-frontend";


type AddTagDialogProps = {
    open: boolean;
    setOpened: (value: boolean) => void;
};

type FormikTag = {
    tag: string
};

export default function AddTagDialog({open, setOpened}: AddTagDialogProps) {
    const dialogChange = (value: DialogOpenedChangedEvent) => {
        console.log(value);
        setOpened(value.detail.value);
    }

    const formik = useFormik({
        initialValues: {tag: ""},
        enableReinitialize: true,
        onSubmit: async (value: FormikTag, {setSubmitting, setErrors}) => {
            try {
                const saved = await TagEndpoint.newTag(value.tag) ?? value;
                formik.resetForm();
                Notification.show("Tag was successfully add", {theme: "success"})
            } catch (error: unknown) {
                if (error instanceof EndpointError) {
                    Notification.show((error as EndpointError).message, {theme: "error"});
                } else {
                    Notification.show("Adding tag was not successful", {theme: "error"});
                }
            } finally {
                formik.resetForm();
                setSubmitting(false);
                setOpened(false);
            }
        },
    });

    return (
        <Dialog
            opened={open}
            onOpenedChanged={(value) => dialogChange(value)}
            header={
                <h3 className={'m-0'}>
                    New Tag
                </h3>
            }
            footer={
                <div className={'flex gap-m'}>
                    <Button onClick={() => setOpened(false)}>Cancel</Button>
                    <Button disabled={formik.isSubmitting}
                            onClick={formik.submitForm} theme='primary'>Add</Button>
                </div>
            }>
            <VerticalLayout style={{width: '18rem', alignItems: 'stretch'}}>
                <TextField name='tag'
                           label="tag"
                           value={formik.values.tag}
                           onChange={formik.handleChange}
                           onBlur={formik.handleChange}/>
            </VerticalLayout>
        </Dialog>

    );
}