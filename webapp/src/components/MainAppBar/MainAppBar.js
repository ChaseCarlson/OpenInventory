import React from "react";
import { ReactDOM } from "react";
import { AppBar, Breadcrumbs } from "@mui/material";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import InventoryIcon from "@mui/icons-material/Inventory"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { Typography } from "@mui/material";
import { Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Drawer } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import SidebarItem from "./SidebarItem/SidebarItem"
import api from "../Api/Api"
import { useParams } from "react-router";



export default function MainAppBar(props) {
	const id = useParams().id;
	const [sidebarOpen, setSidebarOpen] = React.useState(false);
	const [parentId, setParentId] = React.useState(0);

	React.useEffect(() => {
		api.get("/item/"+id)
		.then((res) => {
			var data = res.data;
			if (data.parent) {
				setParentId(data.parent);
			}
			else {
				setParentId(0);
			}
		});
	});

	function menuButtonClicked(event) {
		setSidebarOpen(true);
	}

	const toggleSidebar = (open) => event => {
		setSidebarOpen(false);
	}

	const sidebarElements = () => (
		<Box
			sx={{'width':250}}
			onClick={toggleSidebar(false)}
		>
			<List>
				<SidebarItem title="Home" href="/app" icon={<HomeIcon />} />
				<SidebarItem title="Items" href="/app/items" icon={<InventoryIcon />} />
			</List>
		</Box>
	)


	return (
		<Box sx={{flexGrow:1}}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={menuButtonClicked}
					>
						<MenuIcon />
					</IconButton>
					<Drawer
						anchor="left"
						open={sidebarOpen}
						onClose={toggleSidebar(false)}
					>
						{sidebarElements()}
					</Drawer>

					<Typography
						variant="h6"
					>
					</Typography>

					<IconButton
						size="small"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						href={"/app/items/"+parentId+"/children"}
					>
						<ArrowUpwardIcon />
					</IconButton>
					<Breadcrumbs 
						sx={{display:"block"}} color="inherit"
						separator={<NavigateNextIcon fontSize="small" />}
						maxItems={4}
					>
						<Link underline="hover" color="inherit" href="/app">Home</Link>
						<Link underline="hover" color="inherit" href="/app/items">Items</Link>


					</Breadcrumbs>
				</Toolbar>
			</AppBar>
		</Box>
	);
}