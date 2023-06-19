class Track {
	constructor({ preview_url, name, artists, album }, type) {
		this.url = preview_url;
		this.artists = artists;
		this.name = name;
		this.type = type;
		this.album = album;
	}

	get revealTrack() {
		return {
			playerAnswer: this.playerAnswer,
			correctAnswer: this.correctAnswer,
			correct: this.correct,
			url: this.url,
			name: this.name,
			artists: this.artists,
			album: this.album,
		};
	}
}

class Playlist {
	constructor(numberOfTracks, trackArray, type) {
		this.numberOfTracks = numberOfTracks;
		this.trackArray = trackArray;
		this.currentTrackIndex = 0;
		this.finished = false;
		this.type = type;
	}

	selectTrack() {
		return this.trackArray[this.currentTrackIndex];
	}

	nextTrack() {
		if (this.trackArray.length > this.currentTrackIndex + 1) {
			this.currentTrackIndex++;
		} else this.finished = true;
		return this.finished;
	}

	end() {
		return this.trackArray;
	}

	replay() {
		this.currentTrackIndex = 0;
		this.finished = false;
	}
}

const getPlaylist = async (trackSize, newKey, token, url) => {
	const axios = require("axios");
	const playlists = [];

	const fetchRecursive = async (url, rec = false) => {
		try {
			const { data: playlist } = await axios.get(
				url,
				!rec
					? {
							headers: {
								Authorization: `Bearer ${token}`,
							},
							params: {
								market: "PL",
								fields: "tracks(next, items(track))",
							},
					  }
					: {
							headers: {
								Authorization: `Bearer ${token}`,
							},
					  }
			);
			const tracks = playlist.tracks?.items || playlist?.items;
			const nextUrl = playlist.tracks?.next || playlist?.next;

			playlists.push(...tracks);
			nextUrl && (await fetchRecursive(nextUrl, true));
		} catch (e) {
			console.log(e);
		}
	};

	for (let i = 0; i < newKey.length; i++) {
		await fetchRecursive(`${url}/playlists/${newKey[i]}`);
	}

	const tracksSize = playlists.length;
	const tracksSizeArray = [];

	for (let i = 0; i < tracksSize; i++) {
		tracksSizeArray[i] = i;
	}

	const order = [];
	while (tracksSizeArray.length > 0 && order.length < trackSize) {
		const index = Math.floor(Math.random() * tracksSizeArray.length);
		console.log(index);
		order.push(tracksSizeArray[index]);
		tracksSizeArray.splice(index, 1);
	}

	const trackArray = [];
	for (const [index, number] of order.entries()) {
		trackArray[index] = playlists[number];
	}

	return [trackSize, trackArray];
};

module.exports = { getPlaylist, Track, Playlist };
