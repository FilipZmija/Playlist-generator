import React from "react";
import TrackComponent from "./TrackComponent";
import MyButton from "./MyButton";
function EndView({ trackReveal, replayPlaylist, deletePlaylist }) {
	const displayPlaylists = (playlist) => {
		return playlist.map((item) => {
			const { track } = item;
			return <TrackComponent track={track} isAnswered={true} />;
		});
	};
	return (
		<>
			<div className='playlist-section'>
				<div className='playlist-section-title'>
					<div className='finished-view-box'>
						<h1 className='finished-view'>Playlist finished!</h1>
						<div className='btn-section'>
							<MyButton onClick={replayPlaylist} buttonColor={"green"}>
								Replay playlist
							</MyButton>
							<MyButton onClick={deletePlaylist}>
								Create new playlist
							</MyButton>
						</div>
					</div>

					{trackReveal && "Songs from the Playlist"}
				</div>
				<div className='playlist-containter'>
					<div className='playlist-display'>
						{trackReveal && displayPlaylists(trackReveal)}
					</div>
				</div>
			</div>
		</>
	);
}
export default EndView;
