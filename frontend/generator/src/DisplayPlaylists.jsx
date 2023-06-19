import React from "react";
import PlaylistComponent from "./PlaylistComponent";
function DisplayPlaylist(props) {
	const displayPlaylists = (playlist) => {
		return playlist.map((item) => {
			const { name, description, images, owner, id, isSelected } = item;
			return (
				<PlaylistComponent
					name={name}
					description={description}
					img={images ? images[0] : null}
					author={owner?.display_name}
					id={id}
					key={id}
					isSelected={isSelected}
				/>
			);
		});
	};
	return (
		<div className='playlist-section'>
			<div className='playlist-containter'>
				<div className='playlist-display'>
					{props.playlists && displayPlaylists(props.playlists)}
				</div>
			</div>
		</div>
	);
}
export default DisplayPlaylist;
