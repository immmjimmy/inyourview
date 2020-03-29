import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Join = () => {
  return (
    <Container fluid style = {{height: "100%", maxHeight: "100%"}}>
      <Row style = {{height: "5%", backgroundColor: "#7189ff"}}>
        <Col style = {{height: "100%"}}>
          <h1
            style={{
              textAlign: "left",
              marginTop: "15px",
              fontFamily: "Expletus Sans",
              color: "white",
              fontSize: "17px",
            }}>
            <img
              src="/ft logo.png"
              style={{ width: "17px", height: "auto" }}
            />
            In Your View
          </h1>
        </Col>
      </Row>

      <Row style = {{height: "92.5%", backgroundColor: "white"}}>
        <Col style = {{height: "100%"}}>
          <Row style = {{height:"7.5%"}}>
            <Col style = {{height: "100%"}}>
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
                  }}>
                  Join Room
                </h1>
              </Col>
          </Row>
          <Row style = {{height:"50%"}}>
            <Col>
            </Col>
            <Col>
              <Form style = {{marginTop: "30px", marginLeft: "45px", fontFamily:" Raleway" }}>
                <Form.Label>Interviewee Name</Form.Label>
                <Form.Group controlId="formIntervieweeName">
                  <Form.Control
                    type="text" placeholder="Enter your name" style={{borderRadius: "10px"}}
                    />
                </Form.Group>
                <Form.Label>Room Name</Form.Label>
                <Form.Group controlId="formRoomName">
                  <Form.Control
                    type="text" placeholder = "Enter room name" style={{borderRadius: "10px"}}
                    />
                </Form.Group>
                <Form.Label>Room Passcode</Form.Label>
                <Form.Group controlId="formRoomPasscode">
                  <Form.Control
                    type="text" placeholder = "Enter room passcode" style={{borderRadius: "10px"}}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" style = {{marginTop: "25px", width:"100px", borderRadius: "10px"}}>
                  Join
                </Button>
              </Form>
            </Col>
            <Col>
            </Col>
          </Row>
      </Col>
    </Row>
    </Container>
  );
};

export default Join;
