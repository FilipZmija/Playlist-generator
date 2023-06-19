import React from "react";
import Carousel from "react-material-ui-carousel";
import DisplayPlaylist from "./DisplayPlaylists";

function PlaylistCarousel(props) {
	return (
		<>
			<h1 className='carousel-title'>{props.title}</h1>

			<Carousel
				className='carousel-playlist'
				cycleNavigation={false}
				autoPlay={false}
				animation={"slide"}
				duration={200}
				swipe={false}
				fullHeightHover={false}
			>
				{props.playlists?.map((item, i) => {
					return (
						<div className='carousel-item-section'>
							<DisplayPlaylist key={i} playlists={item} />
						</div>
					);
				})}
			</Carousel>
		</>
	);
}

export default PlaylistCarousel;
