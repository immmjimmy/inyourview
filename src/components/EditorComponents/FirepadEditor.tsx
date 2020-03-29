import React from "react";
import { initializeFirebase, getFirebaseRoomRef } from "./FirepadFunctions";
import "./Editor.css";

export interface FirepadEditorProps {
  apiKey: string;
  databaseUrl: string;
  userId: string;
  roomId: string;
  codeMode: boolean;
  defaultText: string;
  textCallback: React.Dispatch<React.SetStateAction<string>>;
}

// React component for the firepad + codemirror editor
class Editor extends React.Component<FirepadEditorProps> {
  componentDidMount() {
    const {
      apiKey,
      databaseUrl,
      userId,
      roomId,
      codeMode,
      defaultText,
      textCallback
    } = this.props;

    // Initialize firepad, state management done internally, callback to e
    var htmlElement = document.getElementById("firepad-container");
    if (htmlElement) {
      initializeFirebase(apiKey, databaseUrl);

      // Create codemirror instance
      // @ts-ignore
      var codeMirror = window.CodeMirror(htmlElement, {
        lineWrapping: true,
        lineNumbers: codeMode
      });

      // Get Firebase Database reference.
      var firepadRef = getFirebaseRoomRef(roomId);

      // Create Firepad with CodeMirror
      // @ts-ignore
      var firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
        richTextToolbar: !codeMode,
        richTextShortcuts: !codeMode,
        defaultText: defaultText
      });

      // To track firebase users
      firepad.setUserId(userId);

      // triggered by firebase onchange
      firepad.on("synced", function() {
        console.log(firepad.getText());
        textCallback(firepad.getText()); // also available in HTML with .getHTML()
      });
    }
  }

  render() {
    return <div id="firepad-container"></div>;
  }
}

export default Editor;
