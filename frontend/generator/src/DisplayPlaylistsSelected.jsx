import React, { useContext } from "react";
import PlaylistComponentSelected from "./PlaylistComponentSelected";

function DisplayPlaylistsSelected(props) {
	const displayPlaylists = (playlist) => {
		return playlist.map((item) => {
			const { name, description, images, owner, id, isSelected } = item;
			return (
				<PlaylistComponentSelected
					name={name}
					description={description}
					img={images ? images[0] : null}
					author={owner?.display_name}
					id={id}
					key={id}
					isSelected={props.disabled ? false : isSelected}
					disabled={props.disabled}
				/>
			);
		});
	};
	return (
		<div className='playlist-section'>
			<div className='playlist-section-title'>
				{props.playlists ? props.title : null}
			</div>
			<div className='playlist-containter'>
				<div className='playlist-display'>
					{props.playlists && displayPlaylists(props.playlists)}
				</div>
			</div>
		</div>
	);
}
export default DisplayPlaylistsSelected;
