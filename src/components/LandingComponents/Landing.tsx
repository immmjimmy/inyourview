import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PROJECT_NAME = "In Your View";

const Landing = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>{PROJECT_NAME}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <LinkContainer to="/join">
            <Button variant="outline-primary">Join</Button>
          </LinkContainer>
        </Col>
        <Col>
          <LinkContainer to="/host">
            <Button variant="outline-primary">Host</Button>
          </LinkContainer>
        </Col>
      </Row>
      {/* add more rows/columns as necessary */}
    </Container>
  );
};

export default Landing;
