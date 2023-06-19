import React, { useEffect } from "react";
import axios from "axios";
import { useState, useRef } from "react";
import MyButton from "./MyButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import TrackComponent from "./TrackComponent";
import "./style/Track.css";

function Track({ currentTrack, setCurrentTrack, setTrackReveal }) {
	const [answer, setAnswer] = useState("");
	const myAudio = useRef(null);
	const [isAudioPlaying, setIsAudioPlaying] = useState(false);
	console.log(currentTrack);
	useEffect(() => setIsAudioPlaying(false), [currentTrack.url]);

	const nextTrack = async () => {
		const response = await axios.get("http://localhost:3001/track/next");
		if (response.data.currentTrack) {
			setCurrentTrack(response.data.currentTrack);
			setAnswer("");
		} else {
			setCurrentTrack(true);
			setTrackReveal(response.data.songs);
		}
	};

	const deleteSetup = () => {
		setCurrentTrack();
	};

	const handlePlay = () => {
		myAudio.current.play();
		setIsAudioPlaying(!myAudio.current.paused);
	};
	const handlePause = () => {
		myAudio.current.pause();
		setIsAudioPlaying(!myAudio.current.paused);
	};

	const handleEnded = () => {
		setIsAudioPlaying(false);
	};

	return (
		<>
			<div className='track-section'>
				<div className='track-box'>
					<div className='Playlist-section'>
						<TrackComponent
							track={currentTrack}
							isAnswered={!(currentTrack.correct === undefined)}
							correct={currentTrack.correct}
						/>
						<audio
							src={currentTrack.url}
							id='player'
							ref={myAudio}
							onEnded={handleEnded}
						></audio>
						<MyButton
							onClick={isAudioPlaying ? handlePause : handlePlay}
							buttonColor={"green"}
							shape={"circular"}
						>
							{isAudioPlaying ? <PauseIcon /> : <PlayArrowIcon />}
						</MyButton>

						<div className='Track-btn'>
							<MyButton buttonColor={"green"} onClick={nextTrack}>
								Next
							</MyButton>

							<MyButton onClick={deleteSetup}>Delete setup</MyButton>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Track;
