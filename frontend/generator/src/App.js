import React, { useEffect } from "react";
import "./style/App.css";
import { useState } from "react";
import PlaylistCreator from "./PlaylistCreator";
import Auth from "./context/auth";
import AppBarMenu from "./AppBar";
import SearchKey from "./context/searchKey";
import axios from "axios";

const Audio = () => {
	const [searchKey, setSearchKey] = useState("");
	const [auth, setAuth] = useState(false);
	useEffect(() => {
		const refreshToken = async () => {
			const { data } = await axios.get("http://localhost:3001/refresh");
			const { token, expires_in } = data;
			window.sessionStorage.setItem("token", token);
			setAuth(true);
			console.log(token);
			const timeout = expires_in * 1000 - 60000;
			setTimeout(() => refreshToken(), timeout);
		};
		refreshToken();
	}, []);
	useEffect(() => console.log("Use effect App"), []);

	return (
		<>
			<Auth.Provider value={{ auth, setAuth }}>
				<SearchKey.Provider value={{ searchKey, setSearchKey }}>
					<AppBarMenu />
					<div className='App'>{auth ? <PlaylistCreator /> : null}</div>
				</SearchKey.Provider>
			</Auth.Provider>
		</>
	);
};

export default Audio;
