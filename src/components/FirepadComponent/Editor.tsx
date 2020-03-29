import React from "react";
import "./Editor.css";

export interface EditorProps {
  apiKey: String;
  databaseUrl: String;
  userId: String;
  roomId: String;
  codeMode: Boolean;
  defaultText: String;
}

class Editor extends React.Component<EditorProps> {
  componentDidMount() {
    const { apiKey, databaseUrl, userId, roomId, codeMode, defaultText} = this.props;

    // Get Firepad room reference from Firebase
    const getRoomRef = (roomId: String) => {
      // @ts-ignore
      var ref = window.firebase.database().ref();
      ref = ref.child(roomId);

      if (typeof console !== "undefined") {
        console.log("Firebase data: ", ref.toString());
      }
      return ref;
    };

    var htmlElement = document.getElementById("firepad-container");
    if (htmlElement) {
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

      // Create codemirror instance
      // @ts-ignore
      var codeMirror = window.CodeMirror(htmlElement, {
        lineWrapping: true,
        lineNumbers: codeMode
      });

      // Get Firebase Database reference.
      var firepadRef = getRoomRef(roomId);

      // Create Firepad (with rich text toolbar and shortcuts enabled).
      // @ts-ignore
      var firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
        richTextToolbar: !codeMode,
        richTextShortcuts: !codeMode,
        defaultText: defaultText
      });

      firepad.setUserId(userId);
    }
  }

  render() {
    return <div id="firepad-container"></div>;
  }
}

export default Editor;
