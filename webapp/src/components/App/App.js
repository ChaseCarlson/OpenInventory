import logo from '../../logo.svg';
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add';
import MainAppBar from "../MainAppBar/MainAppBar"
import React from 'react';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				<MainAppBar />
				{this.props.children}
			</div>
		);
	}
}
