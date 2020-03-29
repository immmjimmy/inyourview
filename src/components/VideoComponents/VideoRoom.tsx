import React, { ChangeEvent, useState } from "react";
import ParticipantStrip from "../ParticipantComponents/ParticipantStrip";
import Editor from "../EditorComponents/FirepadEditor";

import { useParams, Redirect } from "react-router-dom";
import { Col, Container, Row, Spinner, Button, Form } from "react-bootstrap";

import useRoomState from "../../hooks/useRoomContext";

interface RoomProps {
  interviewerUsername?: boolean;
  transcription: string;
  updateUser: React.Dispatch<React.SetStateAction<string>>;
  updateTranscription: React.Dispatch<React.SetStateAction<string>>;
}

const Room = ({ interviewerUsername, transcription, updateUser, updateTranscription }: RoomProps) => {
  const params = useParams();
  const roomState = useRoomState();

  updateTranscription("");

  const [apiKey, setApiKey] = useState<string>("");
  const [firebaseUrl, setFirebaseUrl] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [ended, setEnded] = useState<boolean>(false);

  fetch("/apiKey")
    .then(res => res.text())
    .then(data => setApiKey(data));

  fetch("/firebase-url")
    .then(res => res.text())
    .then(data => setFirebaseUrl(data));

  if (interviewerUsername) {
    updateUser("host");
  } else {
    updateUser("user");
  }

  if (roomState !== "connected" || apiKey === "" || firebaseUrl === "") {
    return <Spinner animation="border" />;
  }

  if (ended) {
    if (interviewerUsername) {
      return <Redirect to="/feedback" />;
    }
    return <Redirect to="/" />;
  }

  // @ts-ignore
  const { name, room } = params;
  let username: string | undefined;
  let interviewee: string | undefined;

  if (interviewerUsername) {
    // @ts-ignore
    username = params.username;
    // @ts-ignore
    interviewee = params.interviewee;
  }

  const handleNotesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  const handleEndCall = async () => {
    if (interviewerUsername) {
      await fetch(`/post/interview/${username}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: interviewee,
          code: code,
          notes: notes
        })
      });
    }

    setEnded(true);
  };

  const renderNotes = () => {
    if (interviewerUsername) {
      return (
        <Col xs={10} style={{ height: "100%" }}>
          <Row style={{ height: "75%" }}>
            <Col style={{ height: "100%" }}>
              <Editor
                apiKey={apiKey}
                databaseUrl={firebaseUrl}
                userId={interviewerUsername ? username : name}
                roomId={room}
                codeMode={true}
                defaultText=""
                textCallback={setCode}
              />
            </Col>
          </Row>
          <Row style={{ height: "25%" }}>
            <Col style={{ height: "100%" }}>
              <Form style={{ height: "100%", width: "100%" }}>
                <Form.Group
                  controlId="interviewerTextArea"
                  style={{ height: "100%", width: "100%", margin: "0px" }}
                >
                  <Form.Label>Interviewer Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    style={{ height: "85%", width: "100%" }}
                    onChange={handleNotesChange}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Col>
      );
    }
    return (
      <Col xs={10} style={{ height: "100%" }}>
        <Editor
          apiKey={apiKey}
          databaseUrl={firebaseUrl}
          userId={interviewerUsername ? username : name}
          roomId={room}
          codeMode={true}
          defaultText=""
          textCallback={setCode}
        />
      </Col>
    );
  };

  return (
    <Container fluid style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col xs={2} style={{ height: "100%" }}>
          <Row>
            <Col>
              <ParticipantStrip />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <Button onClick={handleEndCall}>End call</Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <textarea
                readOnly
                style={{ overflowY: "scroll", height: "100px", width: "100%" }}
              >
                {transcription}
              </textarea>
            </Col>
          </Row>
        </Col>
        {renderNotes()}
      </Row>
    </Container>
  );
};

export default Room;
