import React from "react";
import App from "../App/App"
import ItemCard from '../ItemCard/ItemCard';
import { Grid, Box, Typography, Fab, Tooltip } from "@mui/material";
import { useParams } from "react-router";
import api from "../Api/Api"
import AddIcon from "@mui/icons-material/Add"
import AddItemDialog from "./AddItemDialog/AddItemDialog"


export default function Items(props) {
	const id = useParams().id;
	const [items, setItems] = React.useState([]);
	const [hasQueriedAPI, setHasQueriedAPI] = React.useState(false);
	const [addDialogOpen, setAddDialogOpen] = React.useState(false);

	React.useEffect(() => {
		api.get("/item/"+id+"/children")
		.then((res) => {
			var data = res.data;
			setHasQueriedAPI(true);
			setItems(data);
		}).catch(() => {
			window.location.href = "/app/items/0/children" // Redirect to root if there is an error (expectedly a 404 NOT FOUND response) when trying to retrieve the current item's children
		});
	}, [id, addDialogOpen]);

	function hasChildren() {
		if (hasQueriedAPI && items.length > 0) {
			return true;
		}
		else {
			return false;
		}
	}

	function createItem(fields) {
		api.post("/item", {
			parent: id,
			title: fields.title
		})
		.then(() => {
			closeAddDialog();
		});
	}

	function openAddDialog() {
		setAddDialogOpen(true);
	}

	function closeAddDialog() {
		setAddDialogOpen(false);
	}

	return (
		<App>
			<Box fixed sx={{m:2}}>
				<Grid container spacing={{xs: 2, md: 3, lg:2}} columnSpacing={{ xs: 0, sm: 1, md: 1, lg: 2}}>
				{items.map((item, i) => (
					<Grid item key={item.id} xs={12} sm={6} md={4} lg={2}>
						<ItemCard item={item} image={process.env.PUBLIC_URL + '/shelf.jpg'} />
					</Grid>
				))}
				</Grid>
				{!hasChildren() &&
				<Grid container justifyContent="center">
						<Typography>
							Sorry. No items.
						</Typography>
					</Grid>
				}
			</Box>
			<Tooltip title="Add Item" placement="top">
				<Fab
					sx={{position: 'fixed', bottom: 24, right: 24,}}
					color="primary"
					onClick={openAddDialog}
				>
					<AddIcon />
				</Fab>
			</Tooltip>

			<AddItemDialog open={addDialogOpen} success={createItem} close={closeAddDialog} />
		</App>
	);
}