exports.handler = function (context, event, callback) {
  // アカウント情報にアクセスする
  const TWILIO_ACCOUNT_SID = context.TWILIO_ACCOUNT_SID;
  const TWILIO_API_KEY = context.TWILIO_API_KEY;
  const TWILIO_API_SECRET = context.TWILIO_API_SECRET;
  const AccessToken = Twilio.jwt.AccessToken;

  const accessToken = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET
  );

  // ユーザーのメールアドレス
  accessToken.identity = event.identity;
  const VideoGrant = AccessToken.VideoGrant;
  const videoGrant = new VideoGrant({
    room: event.room,
  });

  accessToken.addGrant(videoGrant);

  console.log("accessToken:", accessToken);
  console.log("identity:", event.identity);
  console.log("room:", event.room);
  console.log("event:", event);

  // レスポンス内容
  callback(null, { token: accessToken.toJwt() });
};
