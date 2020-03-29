import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  Button,
  Col,
  Container,
  Navbar,
  Row,
  Form,
  InputGroup
} from "react-bootstrap";

const Feedback = () => {
  const [username, setUsername] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar bg="light">
        <Form inline onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" style={{ paddingRight: "10px" }}>
            <Form.Label style={{ paddingRight: "10px" }}>
              Interviewer Username
            </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            View Interviews
          </Button>
        </Form>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>Display data here</Col>
        </Row>
      </Container>
    </>
  );
};

export default Feedback;
