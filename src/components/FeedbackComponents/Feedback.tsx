import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Navbar,
  Row,
  Form,
  Card
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import Popup from "./Popup";

interface InterviewType {
  name: string;
  code: string;
  notes: string;
}

const Feedback = () => {
  const [username, setUsername] = useState<string>("");
  const [popup, setPopup] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>("");
  const [interview, setInterview] = useState<[]>([]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`/get/interview/${username}`)
      .then(res => res.json())
      .then(data => setInterview(data));
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  const handleClick = (index: number) => {
    // @ts-ignore
    setPopupText(interview[index].code);
    togglePopup();
  };

  const createRows = () => {
    // @ts-ignore
    let result: [JSX.Element] = [];
    let i: number;

    for (i = 0; i < interview.length - 1; i += 2) {
      const j = i;
      result.push(
        <Row key={`card-pair-${i / 2}`} style={{ marginTop: "15px" }}>
          <Col>
            <Card
              style={{ boxShadow: "3px 3px 2px 2px #ccc", cursor: "pointer" }}
              onClick={() => handleClick(j)}
            >
              <Card.Body>
                <Card.Title>
                  {
                    // @ts-ignore
                    interview[i].name
                  }
                </Card.Title>
                <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                  {
                    // @ts-ignore
                    interview[i].notes
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{ boxShadow: "3px 3px 2px 2px #ccc", cursor: "pointer" }}
              onClick={() => handleClick(j + 1)}
            >
              <Card.Body>
                <Card.Title>
                  {
                    // @ts-ignore
                    interview[i + 1].name
                  }
                </Card.Title>
                <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                  {
                    // @ts-ignore
                    interview[i + 1].notes
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    }

    if (interview.length % 2 !== 0) {
      result.push(
        <Row style={{ marginTop: "15px" }}>
          <Col xs={6}>
            <Card
              style={{ boxShadow: "3px 3px 5px 6px #ccc", cursor: "pointer" }}
              onClick={() => handleClick(i)}
            >
              <Card.Body>
                <Card.Title>
                  {
                    // @ts-ignore
                    interview[i].name
                  }
                </Card.Title>
                <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                  {
                    // @ts-ignore
                    interview[i].notes
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    }

    return result;
  };

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
        <Form inline onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" style={{ paddingRight: "10px" }}>
            <Form.Control
              type="text"
              value={username}
              placeholder="Interviewer Username"
              onChange={handleUsernameChange}
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            View Interviews
          </Button>
        </Form>
      </Navbar>
      <Container fluid style={{ height: "92%", marginTop: "10px" }}>
        {createRows().map(element => element)}
      </Container>
      {popup && <Popup text={popupText} closePopup={togglePopup} />}
    </>
  );
};

export default Feedback;
