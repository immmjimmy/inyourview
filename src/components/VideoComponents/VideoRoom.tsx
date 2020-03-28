import React from 'react';
import ParticipantStrip from '../ParticipantComponents/ParticipantStrip';

import { Col, Container, Row } from 'react-bootstrap';

const Room = () => {
  return (
    <Container>
      <Row>
        <Col xs={4}>
          <ParticipantStrip />
        </Col>
        <Col xs={8} />
      </Row>
    </Container>
  )
};

export default Room;