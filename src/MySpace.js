import "./MySpace.css";
import { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import axios from "axios";
import { Link } from "react-router-dom";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";

import { useDataLayerValue } from "./DataLayer";
import { avatar } from "./Avatar";
import { MashupPlaylists, MyFavorite } from "./SavedPlaylist";

function StatusCount({ title, count }) {
  return (
    <div className="StatusCount">
      <p>{count}</p>
      <p2>{title}</p2>
    </div>
  );
}

function Match({ value }) {
  return (
    <div className="Match">
      <Link to="/mashup" state={{ match: value }}>
        <CircularProgressbarWithChildren
          value={value.Score}
          styles={buildStyles({
            pathColor: "#ff5c00",
            trailColor: "transparent"
          })}
          counterClockwise
        >
          <img
            src={avatar[value.User]}
            alt={value.User}
            style={{ marginTop: -1 }}
          />
        </CircularProgressbarWithChildren>
      </Link>
      <p>{value.User}</p>
      <h1>{value.Score}%</h1>
    </div>
  );
}

export default function MySpace({ spotify }) {
  const [{ user, playing, sound }, dispatch] = useDataLayerValue();
  const [matches, setMatches] = useState(null);

  useEffect(() => {
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
    dispatch({
      type: "SET_ITEM",
      item: null
    });
  }, [playing, sound, dispatch]);

  useEffect(() => {
    axios
      .get(
        `https://1dmrpbm5k9.execute-api.us-west-2.amazonaws.com/default/fetchDynamoDBdata`
      )
      .then((response) => {
        const matches = response.data.body.Items.filter(
          (ele) => ele.id === user?.display_name
        )[0]?.matches;
        matches?.sort((a, b) => {
          return b.Score - a.Score;
        });
        setMatches(matches);
      });
  }, [user, matches]);
  return (
    <div className="MySpace">
      <div className="MySpace_Header">
        <div className="header_top">
          <h1>{user?.display_name}</h1>
          <div className="header_top_action">
            <AddBoxOutlinedIcon />
            <MenuIcon />
          </div>
        </div>
        <div className="header_profile">
          <img
            src={
              user?.images[0]?.url ||
              "https://pyxis.nymag.com/v1/imgs/34c/cae/ce8997338cbad42766ca705559b6e0ad6f-elon-musk-.rsquare.w700.jpg"
            }
            alt=""
          />
          <div className="header_profile_right_section">
            <div className="header_profile_status">
              <StatusCount title="POPs" count="80" />
              <StatusCount title="Friends" count="138" />
              <StatusCount title="Following" count="253" />
            </div>

            <div className="header_profile_action">
              <button>My Music Data</button>
              <button>Edit</button>
            </div>
          </div>
        </div>
      </div>
      {matches && (
        <div className="TasteMatches">
          <div className="TasteMatches_title">
            <h1>Taste Matches</h1>
            <NavigateNextIcon />
          </div>
          <div className="TasteMatches_content">
            {matches?.map((match) => (
              <Match value={match} />
            ))}
          </div>
        </div>
      )}
      <MyFavorite spotify={spotify} />
      <MashupPlaylists spotify={spotify} />
    </div>
  );
}
