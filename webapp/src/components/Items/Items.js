import React from "react";
import App from "../App/App"
import ItemCard from '../ItemCard/ItemCard';
import { Grid, Box, Fab, Tooltip } from "@mui/material";
import { useParams } from "react-router";
import api from "../Api/Api"
import AddIcon from "@mui/icons-material/Add"
import AddItemDialog from "./AddItemDialog/AddItemDialog"
import { useQuery } from "react-query";


export default function Items(props) {
	const id = Number(useParams().id);
	const [addDialogOpen, setAddDialogOpen] = React.useState(false);

	const fetchItems = ({signal}) => api.get("/item/"+id+"/children", {signal});

	function openAddDialog() {
		setAddDialogOpen(true);
	}

	function closeAddDialog() {
		setAddDialogOpen(false);
	}

	const query = useQuery(["items", id], fetchItems);

	console.log("render");

	return (
		<App>
			<Box fixed sx={{m:2}}>
				<Grid container spacing={{xs: 2, md: 3, lg:2}} columnSpacing={{ xs: 0, sm: 1, md: 1, lg: 2}}>
					{query.isSuccess &&
						query.data.data.map((item, i) => (
							<Grid item key={item.id} xs={12} sm={6} md={4} lg={2}>
								<ItemCard item={item} image={process.env.PUBLIC_URL + '/shelf.jpg'} />
							</Grid>
						))
					}
				</Grid>
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
			<AddItemDialog parent={id} open={addDialogOpen} onClose={closeAddDialog}/>
		</App>
	);
}