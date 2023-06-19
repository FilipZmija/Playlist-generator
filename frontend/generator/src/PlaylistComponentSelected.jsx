import React from "react";
import { useContext } from "react";
import IDs from "./context/playlistIDs";
import DeleteID from "./context/deleteID";

function PlaylistComponentSelected(props) {
	const { setPlaylists } = useContext(IDs);
	const { setDeleteID } = useContext(DeleteID);

	const handleClick = () => {
		setDeleteID(props.id);
		setPlaylists((prev) => {
			const array = [...prev];
			for (let i = array.length - 1; i >= 0; i--) {
				if (array[i].id === props.id) {
					array.splice(i, 1);
				}
			}
			return array.length > 0 ? array : null;
		});
	};

	return (
		<>
			<div
				className={
					props.isSelected
						? "playlist-box playlist-box-selected"
						: "playlist-box"
				}
				onClick={props.disabled ? null : handleClick}
			>
				<div className='playlist-imgbox'>
					{props.img ? (
						<img
							src={props.img?.url}
							className='playlist-img'
							alt='Playlist'
						/>
					) : (
						<div className='playlist-icon'>
							<svg role='img' height='80' width='80' viewBox='0 0 24 24'>
								<path
									fill='#b3b3b3'
									d='M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z'
								></path>
							</svg>
						</div>
					)}
				</div>
				<div className='playlist-title'>{props.name}</div>
				<div className='playlist-artist'>
					{`${!props.description ? "Author: " : ""} ${
						props.description || props.author
					}`}
				</div>
			</div>
		</>
	);
}
export default PlaylistComponentSelected;
