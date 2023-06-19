import * as React from "react";
import { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import url from "./url";
import axios from "axios";

function SearchField({ answer, setAnswer, alignment, correct }) {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	useEffect(() => {
		setOptions(null);
		setAnswer("");
	}, []);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	useEffect(() => {
		const realToken = window.sessionStorage.getItem("token");
		let active = true;
		async function search() {
			try {
				let response = await axios.get(
					`${url}/search?q=${answer}&type=${
						alignment !== "both" ? alignment : "track"
					}&limit=6`,
					{
						headers: {
							Authorization: `Bearer ${realToken}`,
						},
					}
				);
				const artist = response.data.artists?.items.map(
					(item) => item.name
				);

				const track = response.data.tracks?.items.map((item) => item.name);

				const both = response.data.tracks?.items.map(
					(item) =>
						item.name +
						" - " +
						item.artists.map((artist) => artist.name)[0]
				);
				const uniqueArtist = new Set(eval(alignment));
				if (active) {
					setOptions([...uniqueArtist]);
				}
			} catch (e) {
				console.log(e);
				setOptions([]);
			}
		}
		answer ? search() : setOptions([]);
		return () => {
			active = false;
		};
	}, [answer, alignment]);

	useEffect(() => {
		answer?.length > 0 && setOpen(true);
		answer?.length === 0 && setOpen(false);
	}, [answer]);

	return (
		<div style={{ bacgroundColor: "white" }}>
			<Autocomplete
				disabled={correct !== undefined}
				filterOptions={(option, state) => {
					const newArray = [];
					const skip = ["-", "'"];
					let newOption;
					option.forEach((item) => {
						for (let i = 0; i < skip.length; i++) {
							newOption = item.replace(/\s/g, "").replace(skip[i], "");
						}
						console.log(newOption);
						if (newOption.toLowerCase().includes(state.inputValue))
							newArray.push(item);
					});

					return newArray;
				}}
				color='primary'
				sx={{ width: 420 }}
				open={open}
				onOpen={() => {
					if (options?.length > 0) setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				onChange={(e, value) => setAnswer(value)}
				isOptionEqualToValue={(option, value) => option !== value}
				getOptionLabel={(option) => option}
				options={options}
				loading={loading}
				value={answer}
				displayValue={answer}
				renderInput={(params) => (
					<TextField
						className={`${
							correct
								? "correct-answer"
								: correct === false
								? "incorrect-answer"
								: null
						}`}
						{...params}
						onChange={(e) => setAnswer(e.target.value)}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress color='inherit' size={20} />
									) : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
			/>
		</div>
	);
}
export default SearchField;
