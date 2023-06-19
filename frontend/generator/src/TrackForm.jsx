import React from "react";
import { useContext } from "react";
import { TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DisplayPlaylistsSelected from "./DisplayPlaylistsSelected";
import MyButton from "./MyButton";
import "./style/Form.css";
import IDs from "./context/playlistIDs";

function TrackForm({
	trackSize,
	setPlaylistSize,
	generateTrack,
	alignment,
	setAlignment,
}) {
	const { playlists } = useContext(IDs);

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	return (
		<>
			<div className='center-container'>
				<div className='track-form-container'>
					<div className='title'>Choose your playlist setup</div>
					<div className='track-form-box'>
						<TextField
							id='standard-number'
							className='numeric-input'
							label='Number of Tracks'
							type='number'
							w
							variant='filled'
							defaultValue={trackSize}
							sx={{ width: "150px" }}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(e) => setPlaylistSize(e.target.value)}
						/>
					</div>

					{playlists && (
						<>
							<DisplayPlaylistsSelected
								playlists={playlists}
								title={"Selected playlists"}
							/>
						</>
					)}
					<MyButton
						onClick={generateTrack}
						buttonColor={"green"}
						disabled={playlists === undefined || playlists === null}
					>
						Generate track
					</MyButton>
				</div>
			</div>
		</>
	);
}
export default TrackForm;
