import React from "react";
import { useRef, useEffect } from "react";
import TwilioVideo from "twilio-video";

type Props = {
  token: string;
  room: string;
};

function TwilioVideos({ token, room }: Props) {
  console.info("token:", token);
  console.info("room:", room);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.info("Trying to connect to Twilio the the token: ", token);
    TwilioVideo.connect(token, {
      video: true,
      audio: true,
      name: room,
    })
      .then((room) => {
        console.log("connect to Twilio");
        console.log(room);
        console.log(localVideoRef);
        // 接続に成功したらtrackを作成する
        TwilioVideo.createLocalVideoTrack().then((track) => {
          localVideoRef.current?.appendChild(track.attach());
          console.log("localVideoRef:", localVideoRef);
        });
        function addParticipant(participant: TwilioVideo.RemoteParticipant) {
          // 新しい参加者が入ってきたときにトラックを表示させる
          console.log("Adding a new Participant");
          participant.tracks.forEach((publication: any) => {
            if (publication.subscribed) {
              const track = publication.track;
              remoteVideoRef.current?.appendChild(track.attach());
              console.log("Attached a track");
            }
          });
        }
        // roomの既存の参加者に新規参加者のトラックを追加する
        room.participants.forEach(addParticipant);
        // 新規参加者が入ってきたときの処理を追加する
        room.on("participantConnected", addParticipant);
      })
      .catch((e) => {
        console.log("An error happened", e);
      });
  }, [token, room]);

  return (
    <div>
      <h1>Your are in room: {room}</h1>
      <div ref={localVideoRef}></div>
      <div ref={remoteVideoRef}></div>
    </div>
  );
}

export default TwilioVideos;
