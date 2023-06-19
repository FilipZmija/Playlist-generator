import * as React from "react";
import { useEffect, useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";

import Login from "./Login";
import logo from "./png/Spotify_Logo_RGB_White.png";
import SearchIcon from "@mui/icons-material/Search";
import SearchKey from "./context/searchKey";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));
function AppBarMenu() {
	const { setSearchKey } = useContext(SearchKey);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' style={{ backgroundColor: "black" }}>
				<Toolbar>
					<img src={logo} alt='Spotify' className={"spotify-logo"}></img>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							onChange={(e) => setSearchKey(e.target.value)}
							placeholder='Search…'
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<Login />
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default AppBarMenu;
