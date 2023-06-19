//API PIPE

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const axios = require("axios");
//my modules
const { getPlaylist, Track, Playlist } = require("./generator.js");
const { url } = require("./url.js");
let CurrentTrack;
let currentTrack;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:3000",
		// origin: " http://192.168.1.187:3000",
	})
);

app.get("/login", (req, res) => {
	fs.readFile("data/refresh_token.json", (err, data) => {
		const {
			client_id: CLIENT_ID,
			redirect_uri: REDIRECT_URI,
			auth_endpoint: AUTH_ENDPOINT,
			response_type: RESPONSE_TYPE,
			scopes,
		} = JSON.parse(data);

		const url = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
			"%20"
		)}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
		res.send({ url: url });
	});
});

app.get("/refresh", (req, res) => {
	fs.readFile("data/refresh_token.json", (err, data) => {
		const {
			client_id: CLIENT_ID,
			refresh_token: REFRESH_TOKEN,
			client_secret: CLIENT_SECRET,
			auth_endpoint_two,
		} = JSON.parse(data);

		const fetchAccessToken = async () => {
			try {
				const response = await axios.post(auth_endpoint_two, null, {
					params: {
						grant_type: "refresh_token",
						refresh_token: REFRESH_TOKEN,
					},
					headers: {
						Authorization:
							"Basic " +
							new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString(
								"base64"
							),
					},
				});
				const { access_token, expires_in } = response.data;
				res.send({ token: access_token, expires_in });
			} catch (error) {
				res.send({ error });
			}
		};

		fetchAccessToken();
	});
});

//called by user pressing next button
app.get("/track/next", (req, res) => {
	const isFinished = CurrentTrack.nextTrack();
	let response;

	if (!isFinished) {
		currentTrack = new Track(
			CurrentTrack.selectTrack().track,
			CurrentTrack.type
		);
		response = { currentTrack: currentTrack.revealTrack };
	} else if (isFinished) {
		const songs = CurrentTrack.end();
		response = { songs };
	}
	res.send(response);
});

app.post("/track/create", async (req, res) => {
	const { trackSize, newKey, token, type } = req.body;
	const trackSetup = await getPlaylist(trackSize, newKey, token, url);
	CurrentTrack = new Playlist(...trackSetup, type);
	currentTrack = new Track(
		CurrentTrack.selectTrack().track,
		CurrentTrack.type
	);
	res.send({
		currentTrack: currentTrack.revealTrack,
	});
});

app.get("/track/replay", async (req, res) => {
	CurrentTrack.replay();
	currentTrack = new Track(
		CurrentTrack.selectTrack().track,
		CurrentTrack.type
	);
	res.send({
		currentTrack: currentTrack.revealTrack,
	});
});

app.listen(3001, () => {
	console.log("Server listening on port 3001");
});
