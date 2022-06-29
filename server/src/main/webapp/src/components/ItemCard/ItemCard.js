import * as React from 'react';
import {Card, CardHeader, CardMedia, CardContent, CardActions, CardActionArea} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Link } from "react-router-dom"
import api from "../Api/Api"
import { useMutation, useQueryClient } from 'react-query';

export default function ItemCard(props) {
	const [anchorEl, setAnchorEl] = React.useState();
	const [menuOpen, setMenuOpen] = React.useState(false);

	const queryClient = useQueryClient();

	const deleteMutation = useMutation(deleteItem, {
		onSuccess: (data, variables, context) => {
			let t = ["items", props.item.parent];
			queryClient.invalidateQueries(t);
		},
	});


	const handleOpenMenu = (event) => {
		cancelClickEventPropagation(event);
		setAnchorEl(event.currentTarget);
		setMenuOpen(true);
	}

	const handleCloseMenu = () => {
		setAnchorEl(null);
		setMenuOpen(false);
	}

	function cancelClickEventPropagation(event) {
		event.stopPropagation();
		event.preventDefault();
	}

	function deletePressed() {
	  handleCloseMenu();
		deleteMutation.mutate({id: props.item.id});
	}

	function deleteItem(item) {
	  return api.delete("/item/"+item.id);
	}


	return (
		<Card sx={{ maxWidth: 1}} raised={true}>
			<CardActionArea component={Link} to={"/app/items/"+props.item.id+"/children"}>
				<CardHeader
					action={
						<IconButton aria-label="settings"
							onClick={handleOpenMenu}
						>
							<MoreVertIcon />
						</IconButton>
					}
					title={props.item.title}
				/>
				<CardMedia
					component="img"
					height="200"
					image={props.image}
					alt=""
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary" noWrap={true}>
						{props.description}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<Tooltip title="Favorite">
					<IconButton aria-label="add to favorites">
						<FavoriteIcon sx={{color: pink[300]}} />
					</IconButton>
					</Tooltip>
					<Tooltip title="Open">
					<IconButton aria-label="open">
						<DescriptionIcon />
					</IconButton>
					</Tooltip>
				</CardActions>
			</CardActionArea>

		<Menu
			id="basic-menu"
			anchorEl={anchorEl}
			open={menuOpen}
			onClose={handleCloseMenu}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}
		>
			<MenuItem onClick={deletePressed}>
				<ListItemIcon>
					<DeleteIcon fontSize="medium"/>
				</ListItemIcon>
				Delete
			</MenuItem>
		</Menu>
	</Card>
	);

}