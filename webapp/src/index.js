import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import App from './components/App/App';
import Items from './components/Items/Items';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Routes>
				<Route path="/app" element={<App />} />
				<Route path="/app/items/" element={<Navigate replace to="/app/items/0/children" />} />
				<Route path="/app/items/:id/children" element={<Items />} />
				<Route path="*" element={<Navigate replace to="/app" />} />
			</Routes>
		</BrowserRouter>
	</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
