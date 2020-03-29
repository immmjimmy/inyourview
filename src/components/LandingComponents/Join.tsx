import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";

import useVideoContext from "../../hooks/useVideoContext";
import { useAppState } from "../../state";

const Join = () => {
  const [name, setName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);

  const { getToken } = useAppState();
  const { connect } = useVideoContext();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRoomNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);

    // TODO make request to backend to store username

    getToken(name, roomName).then(token => {
      console.log(token);
      connect(token);
    });
  };

  if (submit) {
    return <Redirect to={`/room/${roomName}/${name}`} />;
  }

  return (
    <>
      <Navbar style={{ backgroundColor: "#7189ff" }}>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img alt="" src="/ft logo.png" width="30px" height="auto" />
            <h4
              style={{
                color: "white",
                display: "inline",
                fontFamily: "Expletus Sans"
              }}
            >
              {`    In Your View`}
            </h4>
          </Navbar.Brand>
        </LinkContainer>
      </Navbar>
      <Container fluid style={{ height: "100%", maxHeight: "100%" }}>
        <Row style={{ height: "92.5%", backgroundColor: "white" }}>
          <Col style={{ height: "100%" }}>
            <Row style={{ height: "7.5%" }}>
              <Col style={{ height: "100%" }}>
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: "30px",
                    marginBottom: "30px",
                    marginLeft: "30px",
                    fontFamily: "Raleway",
                    color: "black",
                    fontSize: "30px",
                    fontWeight: "bold"
                  }}
                >
                  Join Room
                </h1>
              </Col>
            </Row>
            <Row style={{ height: "50%" }}>
              <Col />
              <Col>
                <Form
                  onSubmit={handleSubmit}
                  style={{
                    marginTop: "30px",
                    marginLeft: "45px",
                    fontFamily: " Raleway"
                  }}
                >
                  <Form.Label>Interviewee Name</Form.Label>
                  <Form.Group controlId="formIntervieweeName">
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      onChange={handleNameChange}
                      style={{ borderRadius: "10px" }}
                    />
                  </Form.Group>
                  <Form.Label>Room Name</Form.Label>
                  <Form.Group controlId="formRoomName">
                    <Form.Control
                      type="text"
                      placeholder="Enter room name"
                      onChange={handleRoomNameChange}
                      style={{ borderRadius: "10px" }}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      marginTop: "25px",
                      width: "100px",
                      borderRadius: "10px"
                    }}
                  >
                    Join
                  </Button>
                </Form>
              </Col>
              <Col />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Join;
