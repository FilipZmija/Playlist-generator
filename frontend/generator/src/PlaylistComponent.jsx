import React from "react";
import { useEffect, useState, useContext } from "react";
import IDs from "./context/playlistIDs";
import DeleteID from "./context/deleteID";
function PlaylistComponent(props) {
	const [descriptionItem, setDescriptionItem] = useState("");
	const [isSelected, setSelected] = useState(props.isSelected);
	const { playlists, setPlaylists } = useContext(IDs);
	const { deleteID, setDeleteID } = useContext(DeleteID);
	useEffect(() => {
		return () => setSelected(false);
	}, []);

	const { author, description, id, img, name } = props;

	useEffect(() => {
		const playlistData = {
			author,
			description,
			id,
			images: [img],
			name,
			isSelected,
		};
		if (isSelected) {
			setPlaylists((prev) => {
				if (prev?.length > 0) {
					const array = [...prev];
					array.push(playlistData);
					return array;
				} else return [playlistData];
			});
		} else if (!isSelected) {
			setPlaylists((prev) => {
				if (prev?.length > 0) {
					const array = [...prev];
					for (let i = array?.length - 1; i >= 0; i--) {
						if (array[i].id === id) {
							array.splice(i, 1);
						}
					}
					if (array.length > 0) return array;
					else return;
				} else return prev;
			});
		}
	}, [isSelected, author, description, id, img, name]);

	const toggleSelection = () => {
		setSelected((prev) => !prev);
	};

	useEffect(() => {
		const exceptions = ["<", ">", "<a>", "</a>"];
		exceptions.forEach((item) => {
			if (props.description.includes(item)) {
				setDescriptionItem("");
			} else {
				setDescriptionItem(props.description);
			}
		});
		return () => setDescriptionItem("");
	}, [props.description]);

	useEffect(() => {
		if (deleteID === props.id) setSelected(false);
		setDeleteID();
	}, [playlists]);

	return (
		<>
			<div
				className={
					isSelected
						? "playlist-box playlist-box-selected"
						: "playlist-box"
				}
				onClick={toggleSelection}
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
					{`${!descriptionItem ? "Author: " : ""} ${
						descriptionItem || props.author
					}`}
				</div>
			</div>
		</>
	);
}
export default PlaylistComponent;
