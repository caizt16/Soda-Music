import "./Mashup.css";
import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";

import background from "./img/mashup_header_background.png";
import { avatar } from "./Avatar";
import { ConfirmDialog } from "./Module";

import { FiSend } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { SiSpotify } from "react-icons/si";

import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";

import SongRow from "./SongRow";

export default function Mashup({ spotify }) {
  const location = useLocation();
  const { match } = location.state;
  const containerRef = useRef(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [
    { user, item, tracks, token, playing, sound },
    dispatch
  ] = useDataLayerValue();

  useEffect(() => {
    if (sound != null) {
      sound.on("play", function () {
        const progressUpdate = () => {
          const seek = sound.seek();
          // console.log("seek", seek);
          // console.log("duration", sound.duration());
          setProgress((seek / sound.duration()) * 100);

          if (sound.playing()) {
            requestAnimationFrame(progressUpdate);
          }
        };

        requestAnimationFrame(progressUpdate);
      });
    }
  }, [sound]);

  useEffect(() => {
    // spotify.setAccessToken(token);
    // spotify.getMyCurrentPlaybackState().then((r) => {
    //   console.log("PlayBackState", r);

    //   dispatch({
    //     type: "SET_PLAYING",
    //     playing: r.is_playing
    //   });

    //   dispatch({
    //     type: "SET_ITEM",
    //     item: r.item
    //   });
    // });
    console.log("match", match);
    getMashup();
  }, [match, spotify, token, dispatch]);

  const getMashup = () => {
    spotify
      .getRecommendations({
        limit: 20,
        market: "US",
        seed_artists: match.Artists[0] || "",
        seed_genres: match.Genres[0] || "",
        seed_tracks: [
          match.Tracks.ShortTerm[0],
          match.Tracks.MediumTerm[0],
          match.Tracks.LongTerm[0]
        ]
          .filter((ele) => ele !== undefined)
          .join()
      })
      .then((r) => {
        console.log("recommandation", r);

        const tracks = r.tracks
          .filter((ele) => ele.preview_url !== null)
          .slice(0, 10);
        tracks.forEach((track) => {
          track.likedAvatar = getLikedAvatar();
        });

        dispatch({
          type: "SET_TRACKS",
          tracks: tracks
        });
      })
      .catch((error) => console.log(error));
  };

  const saveMashup = () => {
    setDialogOpen(true);
    spotify
      .createPlaylist(user.id, {
        name: `Soda - ${user?.display_name} + ${match.User}`,
        public: false
      })
      .then((r) => {
        console.log(r);
        spotify
          .addTracksToPlaylist(
            r.id,
            tracks.map((item) => item.uri)
          )

          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const handlePlayPause = () => {
    if (playing) {
      // spotify.pause();
      sound.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false
      });
    } else if (!sound) {
      containerRef.current.children[2].click();
    } else {
      // player.activateElement().then(() => {
      //   player.togglePlay();
      //   spotify.play();
      // });
      sound.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true
      });
    }
  };

  const playNext = (index) => {
    console.log("playnext", index);
    dispatch({
      type: "SET_SELECTEDID",
      selectedID: index
    });
    containerRef.current.children[(index + 2) % tracks.length].click();
  };

  const playAll = () => {
    if (playing) {
      // spotify.pause();
      sound.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false
      });
    }
    dispatch({
      type: "SET_SOUND",
      sound: null
    });
    handlePlayPause();
  };

  const getLikedAvatar = () => {
    const random = Math.random();
    if (random < 0.15) {
      return user?.images[0]?.url;
    } else if (random > 0.85) {
      return avatar[match.User];
    } else {
      return null;
    }
  };

  return (
    <div className="mashup" ref={containerRef}>
      {/* <WebPlayback token={token} spotify={spotify} /> */}
      {/* <Playlist spotify={spotify} /> */}
      <div
        className="header"
        style={{
          backgroundImage: `url("${background}")`
        }}
      >
        <div className="header_action_list">
          <Link to="/">
            <IoIosArrowBack size={30} />
          </Link>
          <div>
            <img
              style={{ position: "relative", left: "10px" }}
              src={
                user?.images[0]?.url ||
                "https://pyxis.nymag.com/v1/imgs/34c/cae/ce8997338cbad42766ca705559b6e0ad6f-elon-musk-.rsquare.w700.jpg"
              }
              alt=""
            />
            <img
              style={{ position: "relative", left: "-10px" }}
              src={
                avatar[match.User] ||
                "https://bloximages.newyork1.vip.townnews.com/wrex.com/content/tncms/assets/v3/editorial/9/da/9da47658-267c-5d4c-a408-bb7cae4ed24e/63724a6a98bd9.image.jpg?crop=324%2C324%2C126%2C0&resize=200%2C200&order=crop%2Cresize"
              }
            />
          </div>
          <FiSend size={20} />
        </div>
        <h1>
          {user?.display_name} & {match.User}
        </h1>
        <p>
          The compiled mashup playlist consist of 60% new songs & 40% liked
          songs based on both of your listening history
        </p>
      </div>

      <div className="action_list">
        <div className="play_all" onClick={playAll}>
          <PlayCircleOutlinedIcon sx={{ color: "#ff5c00", fontsize: 20 }} />
          <p>Play All</p>
        </div>
        <ReplayOutlinedIcon
          sx={{ color: "#ff5c00", fontsize: 20 }}
          onClick={getMashup}
        />
        <div className="save_all" onClick={saveMashup}>
          <SiSpotify className="save_button" color="green" />
          <p>Save All</p>
        </div>
      </div>
      {tracks.map((item, index) => (
        <SongRow track={item} index={index} playNext={playNext} />
      ))}

      <div className="bottom_spacing" />

      <Paper
        className="bottom_control"
        sx={{
          backgroundColor: "#121212",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0
        }}
        elevation={3}
      >
        {/* {item ? (
          <footer className="mashup_songInfo">
            <h1>{item.name}</h1>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </footer>
        ) : (
          <footer className="mashup_songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </footer>
        )} */}

        {item && (
          <div
            onClick={handlePlayPause}
            style={{
              color: "white",
              marginLeft: "25px",
              marginRight: "-15px"
            }}
          >
            {playing ? (
              <PauseIcon sx={{ fontsize: 35 }} />
            ) : (
              <PlayArrowRoundedIcon sx={{ fontsize: 35 }} />
            )}
          </div>
        )}
        {item && <SongRow track={item} onClick={handlePlayPause} />}
      </Paper>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0
        }}
        elevation={3}
      >
        {item && (
          <LinearProgress
            className="duration_progress"
            sx={{ width: "100%" }}
            variant="determinate"
            value={progress}
          />
        )}
      </Paper>
      <ConfirmDialog open={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
