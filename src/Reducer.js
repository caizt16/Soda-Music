export const initialState = {
  user: null,
  device_id: null,
  spotify: null,
  tracks: [],
  sound: null,
  playing: false,
  item: null,
  token: null,
  selectedID: null
};

const reducer = (state, action) => {
  console.log("action", action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };

    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing
      };

    case "SET_SOUND":
      return {
        ...state,
        sound: action.sound
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token
      };

    case "SET_PLAYER":
      return {
        ...state,
        player: action.player
      };

    case "SET_DEVICEID":
      return {
        ...state,
        device_id: action.device_id
      };

    case "SET_SELECTEDID":
      return {
        ...state,
        selectedID: action.selectedID
      };

    case "SET_TRACKS":
      return {
        ...state,
        tracks: action.tracks
      };
    default:
      return state;
  }
};

export default reducer;
