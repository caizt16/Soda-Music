import React from "react";
import "./SongRow.css";
import { Howl } from "howler";
import { useDataLayerValue } from "./DataLayer";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function SongRow({ track, index, playNext, onClick }) {
  const [{ selectedID, sound }, dispatch] = useDataLayerValue();

  const playPreview = (src) => {
    console.log("preview url", src);
    sound?.pause();
    const src_sound = new Howl({
      src,
      html5: true,
      onend: () => playNext(index + 1)
    });
    dispatch({
      type: "SET_SOUND",
      sound: src_sound
    });
    src_sound.play();
  };

  const onSongRowClick = () => {
    playPreview(track.preview_url);
    console.log("onclicked");
    dispatch({
      type: "SET_ITEM",
      item: track
    });
    dispatch({
      type: "SET_PLAYING",
      playing: true
    });
    dispatch({
      type: "SET_SELECTEDID",
      selectedID: index
    });
  };

  return (
    <div
      className={`songRow${selectedID === index ? "_hover" : ""}`}
      onClick={onClick ? onClick : onSongRowClick}
    >
      <img className="songRow__album" src={track.album.images[0].url} alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
      <div
        className="songRow__liked"
        style={{ visibility: track.likedAvatar ? "visible" : "hidden" }}
      >
        <img src={track.likedAvatar} alt="" />
        <div className="heart">
          <FavoriteIcon sx={{ color: "#ff5c00", fontSize: 15 }} />
        </div>
      </div>
      <div>
        <MoreVertIcon sx={{ fontSize: 20 }} />
      </div>
    </div>
  );
}
