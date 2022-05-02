import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setToken: Dispatch<SetStateAction<string>>;
  setName: Dispatch<SetStateAction<string>>;
  setRoom: Dispatch<SetStateAction<string>>;
  name: string;
  room: string;
};

function Signin({ setToken, setName, setRoom, name, room }: Props) {
  async function handleSubmit(
    event: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) {
    event.preventDefault();
    // const url = "http://localhost:3001/video-token";
    const url = "https://video-call-5421-dev.twil.io/video-token";
    const data = {
      identity: name,
      room: room,
    };
    const result = await axios.post(url, data);
    console.log(result);
    setToken(result.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name{" "}
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <label htmlFor="room">
          Room{" "}
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRoom(e.target.value)
            }
          />
        </label>
      </label>
      <button type="submit">Join the chat</button>
    </form>
  );
}

export default Signin;
