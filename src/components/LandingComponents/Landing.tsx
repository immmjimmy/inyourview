import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PROJECT_NAME = "In Your View";

const Landing = () => {
  return (
    <Container>
      <Row>
        <Col>
        <img src="/ft logo.png" alt=""/>
          <h1>In Your View</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <LinkContainer to="/Join">
            <Button variant="primary">Join</Button>
          </LinkContainer>
        </Col>
        <Col>
          <LinkContainer to="/Host">
            <Button variant="primary">Host</Button>
          </LinkContainer>
        </Col>
      </Row>
      {/* add more rows/columns as necessary */}
    </Container>
  );
};

export default Landing;
