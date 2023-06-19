import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MyButton from "./MyButton";
import Auth from "./context/auth";
import url from "./url";

function LoginComponent() {
	const [url, setUrl] = useState("");
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { auth, setAuth } = useContext(Auth);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	useEffect(() => {
		async function fetchData() {
			const response = await axios.get("http://localhost:3001/login");
			setUrl(response.data.url);
		}
		fetchData();
		const hash = window.location.hash;
		let token = window.sessionStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];

			window.location.hash = "";
			window.sessionStorage.setItem("token", token);
			setAuth(true);
		}
	}, []);

	const logout = () => {
		window.sessionStorage.removeItem("token");
		setAuth(false);
	};

	return (
		<div className='appbar-login'>
			{!auth ? (
				<a className='login-btn' href={`${url}`}>
					<MyButton>Login</MyButton>
				</a>
			) : (
				<div>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						onClick={handleMenu}
						color='inherit'
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id='menu-appbar'
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
						<MenuItem onClick={logout}>Logout</MenuItem>
					</Menu>
				</div>
			)}
		</div>
	);
}
export default LoginComponent;
