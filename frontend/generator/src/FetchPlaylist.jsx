import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./style/Playlist.css";
import PlaylistCarousel from "./PlaylistCarousel";
import url from "./url";
function FetchPlaylist({ searchKey }) {
	const [playlists, setPlaylists] = useState();
	const [usersPlaylists, setUsersPlaylists] = useState([]);

	const getPlaylistID = (url) => {
		const start = url.indexOf("/playlist/");
		const end =
			url.indexOf("?", start + "/playlist/".length) === -1
				? url.length
				: url.indexOf("?", start + "/playlist/".length);

		const newKey = url.substring(start + "/playlist/".length, end);
		return newKey ?? false;
	};

	useEffect(() => {
		const realToken = window.sessionStorage.getItem("token");
		const offset = 0;
		async function getUsersPlaylists(offset) {
			try {
				const { data: playlists } = await axios.get(`${url}/me/playlists`, {
					headers: {
						Authorization: `Bearer ${realToken}`,
					},
					params: {
						limit: 8,
						offset: offset,
					},
				});
				setUsersPlaylists((prevPlaylists) => [
					...prevPlaylists,
					...playlists.items,
				]);
				if (offset + 8 < playlists.total) getUsersPlaylists(offset + 8);
			} catch (e) {
				console.log(e);
			}
		}
		getUsersPlaylists(offset);
	}, []);

	useEffect(() => {
		const realToken = window.sessionStorage.getItem("token");

		const fetchPlaylistInfo = () => {
			const playlistID = getPlaylistID(searchKey);

			if (playlistID) {
				async function getPlaylistInfoByID() {
					try {
						const { data: playlist } = await axios.get(
							`${url}/playlists/${playlistID}`,
							{
								headers: {
									Authorization: `Bearer ${realToken}`,
								},
								params: {
									market: "PL",
								},
							}
						);
						setPlaylists([playlist]);
					} catch (e) {
						console.log(e);
					}
				}
				getPlaylistInfoByID();
			} else if (searchKey) {
				const array = [];

				async function getPlaylistInfoByName(urls) {
					try {
						const { data: playlists } = await axios.get(
							urls ||
								`${url}/search?q=${searchKey}&type=playlist&market=PL&locale=pl-PL&limit=8`,
							{
								headers: {
									Authorization: `Bearer ${realToken}`,
								},
							}
						);
						array.push(playlists.playlists?.items);
						playlists.playlists.next &&
							array.length < 3 &&
							getPlaylistInfoByName(playlists.playlists.next);
						array.length === 3 && setPlaylists(array);
					} catch (e) {
						console.log(e);
					}
				}
				getPlaylistInfoByName();
			}
		};
		fetchPlaylistInfo();
	}, [searchKey]);

	//used to call for callback to generate track on backend server
	const getChunks = (usersPlaylists) => {
		const playlistChunks = [];
		for (let i = 0; i < usersPlaylists?.length; i += 8) {
			playlistChunks.push(usersPlaylists.slice(i, i + 8));
		}
		return playlistChunks;
	};
	return (
		<>
			{playlists ? (
				<PlaylistCarousel playlists={playlists} title={"Search result"} />
			) : null}
			<PlaylistCarousel
				playlists={getChunks(usersPlaylists)}
				title={"Your playlists"}
			/>
		</>
	);
}
export default FetchPlaylist;
