import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@mui/material"
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import api from "../../Api/Api";

export default function AddItemDialog(props) {
	const [title, setTitle] = React.useState();

	const queryClient = useQueryClient();

	const addMutation = useMutation(addItem, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(["items", props.parent]);
		},
	});

	function addItem(newItem) {
		return api.post("/item", {
			parent: newItem.parent,
			title: newItem.title
		});
	}

	function createPressed() {
		addMutation.mutate({parent: props.parent, title: title.value});
		props.onClose();
	}

	return (
		<Dialog open={props.open} onClose={props.onClose} maxWidth="xs" fullWidth={true}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="outlined"
						inputRef={setTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={createPressed}>Create</Button>
        </DialogActions>
      </Dialog>
	);
}