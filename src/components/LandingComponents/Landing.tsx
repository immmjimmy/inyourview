import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Dictaphone from "../SpeechToTextComponents/Dictaphone";

import "./Landing.css";

const PROJECT_NAME = "In Your View";

const Landing = () => {
  return (
    <Container fluid style={{ height: "100%", maxHeight: "100%" }}>
      <Row style={{ height: "50%", backgroundColor: "#7189ff" }}>
        <Col>
          <Row style={{ height: "50%" }}>
            <Col style={{ height: "100%" }}>
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "25px",
                  fontFamily: "Expletus Sans",
                  color: "white",
                  fontSize: "69px"
                }}
              >
                <img
                  src="/ft logo.png"
                  style={{ width: "70px", height: "auto" }}
                />
                {PROJECT_NAME}
              </h1>
              <h3 style={{ textAlign: "center", fontFamily: "Raleway" }}>
                Interviewing. Made Easy.
              </h3>
            </Col>
          </Row>
          <Row style={{ height: "50%" }}>
            <Col />
            <Col style={{ height: "100%", textAlign: "center" }}>
              <LinkContainer to="/host" style={{ marginTop: "30px" }}>
                <Button
                  className="landing-button"
                  variant="warning"
                  style={{ fontFamily: "Ropa Sans" }}
                >
                  <h3 style={{ margin: "7px 23px", color: "white" }}>
                    Host a Room
                  </h3>
                </Button>
              </LinkContainer>
            </Col>
            <Col style={{ height: "100%", textAlign: "center" }}>
              <LinkContainer to="/join" style={{ marginTop: "30px" }}>
                <Button
                  className="landing-button"
                  variant="warning"
                  style={{ fontFamily: "Ropa Sans" }}
                >
                  <h3 style={{ margin: "7px 23px", color: "white" }}>
                    Join a Room
                  </h3>
                </Button>
              </LinkContainer>
            </Col>
            <Col />
          </Row>
        </Col>
      </Row>
      <Row style={{ height: "50%" }}>
        <Col>
          <Row style={{ height: "25%" }}>
            <Col>
              <h2
                style={{
                  fontFamily: "Raleway",
                  textAlign: "center",
                  marginTop: "15px"
                }}
              >
                One simple interview experience
              </h2>
            </Col>
          </Row>
          <Row style={{ height: "50%" }}>
            <Col />
            <Col xs={3} style={{ textAlign: "center" }}>
              <img
                src="/speech.png"
                style={{ width: "75px", height: "auto" }}
              />
              <p
                style={{
                  fontSize: "20px",
                  fontFamily: "Raleway",
                  marginTop: "5px"
                }}
              >
                Speech to Text Recognition
              </p>
            </Col>
            <Col xs={3} style={{ textAlign: "center" }}>
              <img src="/globe.png" style={{ width: "75px", height: "auto" }} />
              <p
                style={{
                  fontSize: "20px",
                  fontFamily: "Raleway",
                  marginTop: "5px"
                }}
              >
                An all-in-one virtually accessible interview platform
              </p>
            </Col>
            <Col xs={3} style={{ textAlign: "center" }}>
              <img
                src="/profile.png"
                style={{ width: "80px", height: "auto" }}
              />
              <p
                style={{
                  fontSize: "20px",
                  fontFamily: "Raleway",
                  marginTop: "5px"
                }}
              >
                Lower your interviewer's implicit bias
              </p>
            </Col>
            <Col />
          </Row>
          <Row style={{ height: "25%" }}>
            <hr style={{ width: "80%" }} />
            <h5 style={{ marginLeft: "10%", fontFamily: "Raleway", cursor: "pointer" }}>
              <LinkContainer to="/feedback">
                <div>Looking for a past interview? Click here!</div>
              </LinkContainer>
            </h5>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
