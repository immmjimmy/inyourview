// Initialize Firebase if not already
export function initializeFirebase(apiKey: String, databaseUrl: String){
  // @ts-ignore
  if (!window.firebase.apps.length) {
    var config = {
      apiKey: apiKey,
      databaseURL: databaseUrl
    };
    console.log("apikey", apiKey);
    // @ts-ignore
    window.firebase.initializeApp(config);
  }
}

// generates a roomId to give to Editor as prop
// use this function when creating the login page for the interviewer
export function makeRoomId(apiKey: String, databaseUrl: String): String {
  initializeFirebase(apiKey, databaseUrl);
  // @ts-ignore
  var ref = window.firebase.database().ref();
  ref = ref.push()
  return ref.key
}

// Get Firepad room reference from Firebase
export function getFirebaseRoomRef(roomId: String){
    // @ts-ignore
    var ref = window.firebase.database().ref();
    ref = ref.child(roomId);
    return ref;
}