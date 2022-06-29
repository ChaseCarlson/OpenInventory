import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom"

export default class SidebarItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ListItem button component={Link} to={this.props.href}>
				<ListItemIcon>
					{this.props.icon}
				</ListItemIcon>
				<ListItemText primary={this.props.title} />
			</ListItem>
		);
	}
}