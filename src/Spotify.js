// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "36f7b231e7c8494ea373aa29939bdab0";

const scopes = [
  // "user-read-currently-playing",
  // "user-read-recently-played",
  // "user-read-playback-state",
  // "user-top-read",
  // "user-modify-playback-state",
  // Web Player SDK
  // "streaming",
  // "user-read-email",
  // "user-read-private",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-read"
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURI(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${
  window.location
}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
