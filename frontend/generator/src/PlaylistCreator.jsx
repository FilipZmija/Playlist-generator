import React, { useEffect } from "react";
import FetchPlaylist from "./FetchPlaylist";
import Track from "./Track";
import { useState, useContext } from "react";

import axios from "axios";
import DeleteID from "./context/deleteID";
import IDs from "./context/playlistIDs";
import SearchKey from "./context/searchKey";
import EndView from "./EndView";
import TrackForm from "./TrackForm";
function PlaylistCreator() {
	const { searchKey } = useContext(SearchKey);
	const [currentTrack, setCurrentTrack] = useState();
	const [trackSize, setPlaylistSize] = useState(10);
	const [alignment, setAlignment] = useState("artist");
	const [deleteID, setDeleteID] = useState();
	const [trackReveal, setTrackReveal] = useState();
	const [playlists, setPlaylists] = useState();

	useEffect(() => console.log("Use effect PlaylistCreator"), []);
	//used to call for callback to generate track on backend server
	const generateTrack = async () => {
		const realToken = window.sessionStorage.getItem("token");
		const playlistIDs = playlists.map((playlist) => playlist.id);
		const response = await axios.post("http://localhost:3001/track/create", {
			trackSize,
			newKey: playlistIDs,
			token: realToken,
			type: alignment,
		});
		setCurrentTrack(response.data.currentTrack);
	};
	const replayPlaylist = async () => {
		const response = await axios.get("http://localhost:3001/track/replay");
		setCurrentTrack(response.data.currentTrack);
		setTrackReveal(false);
	};
	const deletePlaylist = () => {
		setCurrentTrack();
		setTrackReveal();
	};

	return (
		<>
			<IDs.Provider value={{ playlists, setPlaylists }}>
				<DeleteID.Provider value={{ deleteID, setDeleteID }}>
					{currentTrack ? (
						!trackReveal ? (
							<Track
								setTrackReveal={setTrackReveal}
								currentTrack={currentTrack}
								setCurrentTrack={setCurrentTrack}
								alignment={alignment}
							/>
						) : (
							<EndView
								trackReveal={trackReveal}
								replayPlaylist={replayPlaylist}
								playlists={playlists}
								deletePlaylist={deletePlaylist}
							/>
						)
					) : (
						<div>
							<div className='track-creator'>
								<TrackForm
									trackSize={trackSize}
									setPlaylistSize={setPlaylistSize}
									generateTrack={generateTrack}
									alignment={alignment}
									setAlignment={setAlignment}
								/>
							</div>

							<FetchPlaylist searchKey={searchKey} />
						</div>
					)}
				</DeleteID.Provider>
			</IDs.Provider>
		</>
	);
}
export default PlaylistCreator;
