import { useDataLayerValue } from "./DataLayer";
import SongRow from "./SongRow";

export default function Playlist({ spotify }) {
  const [{ tracks, player }, dispatch] = useDataLayerValue();
  const playSong = (id) => {
    player.activateElement().then(() => {
      spotify
        .play({
          uris: [`spotify:track:${id}`]
        })
        .then((res) => {
          spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
              type: "SET_ITEM",
              item: r.item
            });
            dispatch({
              type: "SET_PLAYING",
              playing: true
            });
          });
        });
    });
  };

  return (
    <div className="playlist">
      {tracks.map((item) => (
        <SongRow track={item} />
      ))}
    </div>
  );
}
