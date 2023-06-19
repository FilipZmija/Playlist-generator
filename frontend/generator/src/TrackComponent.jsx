import React from "react";
import { Skeleton } from "@mui/material";

function TrackComponent(props) {
	const track = props.track;
	const correct = props.track.correct ?? props.correct;
	return (
		<>
			<div
				className={`track-box ${
					correct === true
						? "correct-answer"
						: correct === false
						? "incorrect-answer"
						: null
				}`}
			>
				{track ? (
					<>
						<img
							src={track.album.images[0].url}
							className='track-img'
							alt='Playlist'
						/>
						<div className='song-title'>{track.name}</div>
						<div className='artist-name'>
							{track.artists.map((artist) => artist.name).join(", ")}
						</div>
					</>
				) : (
					<>
						<div className='Track-note'>
							<svg
								role='img'
								height='110'
								width='110'
								viewBox='0 0 24 24'
								style={{ position: "absolute", zIndex: 100 }}
							>
								<path
									fill='#b3b3b3'
									d='M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z'
								></path>
							</svg>
							<Skeleton
								className='skeleton-img'
								variant='rectangular'
								width={256}
								height={256}
							/>
						</div>
						<Skeleton className='song-title' variant='text' height={50} />
						<Skeleton
							className='artist-name'
							variant='text'
							height={28}
						/>
					</>
				)}
			</div>
		</>
	);
}
export default TrackComponent;
