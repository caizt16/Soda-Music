import "./Login.css";
import { loginUrl } from "./Spotify";

export default function Login() {
  console.log("loginUrl", loginUrl);

  return (
    <div className="login">
      <img src="https://i.imgur.com/Doa9nmh.png" alt="" />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}
