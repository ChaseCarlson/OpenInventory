import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@mui/material"
import React from "react";

export default function AddItemDialog(props) {
	const [title, setTitle] = React.useState();

	function createPressed() {
		props.success({
			title:title.value
		});
	}

	return (
		<Dialog open={props.open} onClose={props.close} maxWidth="xs" fullWidth={true}>
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
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={createPressed}>Create</Button>
        </DialogActions>
      </Dialog>
	);
}