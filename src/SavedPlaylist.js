import "./SavedPlaylist.css";

import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { avatar } from "./Avatar";
import { useDataLayerValue } from "./DataLayer";

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win?.focus();
}

export function MyFavorite({ spotify }) {
  const [{ user }, dispatch] = useDataLayerValue();
  const [count, setCount] = useState(null);
  useEffect(() => {
    spotify.getMySavedTracks({ limit: 1 }).then((r) => {
      console.log("getMyFavorite Success");
      setCount(r.total);
    });
  }, [count]);
  if (count) {
    return (
      <div className="MyFavorite">
        <div
          className="MyFavorite_Thumbnail"
          style={{
            backgroundSize: "contain",
            backgroundImage: `url(${
              user?.images[0]?.url ||
              "https://pyxis.nymag.com/v1/imgs/34c/cae/ce8997338cbad42766ca705559b6e0ad6f-elon-musk-.rsquare.w700.jpg"
            })`
          }}
        >
          <FavoriteIcon className="heart" />
        </div>
        <div className="Content">
          <h1>My Favorite</h1>
          <p>{count} songs</p>
        </div>
      </div>
    );
  }
}

function MashupPlaylist({ item }) {
  const [{ user }, dispatch] = useDataLayerValue();
  return (
    <div
      className="MashupPlaylist"
      onClick={() => openInNewTab(item.external_urls.spotify)}
    >
      <div
        className="MashupPlaylist_Thumbnail"
        style={{
          backgroundSize: "contain",
          backgroundImage: `url(${avatar[item.matchedUser]})`
        }}
      >
        <img
          src={
            user?.images[0]?.url ||
            "https://pyxis.nymag.com/v1/imgs/34c/cae/ce8997338cbad42766ca705559b6e0ad6f-elon-musk-.rsquare.w700.jpg"
          }
          alt=""
        />
      </div>
      <div className="Content">
        <h1>{item.name}</h1>
        <p>{item.tracks.total} songs</p>
      </div>
    </div>
  );
}

export function MashupPlaylists({ spotify }) {
  const [{ user }, dispatch] = useDataLayerValue();
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (user) {
      spotify.getUserPlaylists(user.id, { limit: 5 }).then((r) => {
        console.log("getSpotifyPlaylists Success");
        setItems(r.items);
      });
    }
  }, [user]);
  if (items) {
    return (
      <div className="MashupPlaylists">
        <div className="MashupPlaylists_header">
          <h1>Mashup Playlist</h1>
          <div style={{ display: "flex" }}>
            <AddIcon sx={{ color: "#505050", fontSize: 20 }} />
            <MoreVertIcon sx={{ color: "#505050", fontSize: 20 }} />
          </div>
        </div>
        {items
          .filter((item) => {
            const matchedUserName = Object.keys(avatar).find((key) =>
              item.name.includes(key)
            );
            item.matchedUser = matchedUserName;
            return matchedUserName !== undefined;
          })
          .map((item) => (
            <MashupPlaylist item={item} />
          ))}
      </div>
    );
  }
}
