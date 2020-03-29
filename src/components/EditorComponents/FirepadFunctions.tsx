
// generates a roomId to give to Editor as prop
// use this function when creating the login page for the interviewer
export function makeRoomId(apiKey: String, databaseUrl: String): String {
  // @ts-ignore
  if (!window.firebase.apps.length) {
    // check if firebase has already been initialized
    var config = {
      apiKey: apiKey,
      databaseURL: databaseUrl
    };
    // @ts-ignore
    window.firebase.initializeApp(config);
  }

  // @ts-ignore
  var ref = window.firebase.database().ref();
  ref = ref.push()
  return ref.key
}