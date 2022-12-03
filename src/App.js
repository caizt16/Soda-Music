import "./Styles.css";
import Login from "./Login";
import Mashup from "./Mashup";
import MySpace from "./MySpace";
import SpotifyWebApi from "spotify-web-api-js";

import { useEffect } from "react";
import { getTokenFromUrl } from "./Spotify";
import { useDataLayerValue } from "./DataLayer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SongRow from "./SongRow";

import { CircularProgressbar } from "react-circular-progressbar";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const spotify = new SpotifyWebApi();

export default function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify
      });

      spotify.setAccessToken(_token);
      spotify
        .getMe()
        .then((user) => {
          console.log("user", user);
          dispatch({
            type: "SET_USER",
            user: user
          });
        })
        .catch((error) => console.log(error));
    }
    console.log("token", token);
  }, [token, dispatch]);

  const tmp = {
    album: {
      name: "Sit Still, Look Pretty",
      images: [
        {
          url:
            "https://i.scdn.co/image/ab67616d0000b273499bc87c1341c44bcc52da15"
        }
      ]
    },
    name: "Sit Still, Look Pretty",
    artists: [{ name: "Daya" }]
  };
  const tmp2 = {
    album: {
      name: "Sit Still, Look PrettySit Still, Look Pretty",
      images: [
        {
          url:
            "https://i.scdn.co/image/ab67616d0000b273499bc87c1341c44bcc52da15"
        }
      ]
    },
    name: "Sit Still, Look Pretty,Sit Still, Look Pretty",
    artists: [{ name: "DayaSit Still, Look PrettySit Still, Look Pretty" }]
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              {token ? <MySpace spotify={spotify} /> : <Login />}
              {/* <SongRow track={tmp} />
              <SongRow track={tmp2} /> */}
            </div>
          }
        />
        <Route path="mashup" element={<Mashup spotify={spotify} />} />
      </Routes>
    </Router>
  );
}
