
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
// import { Button, Container, Row, Col, Form } from "react-bootstrap";

// import LocalVideoPreview from "./components/VideoComponents/LocalVideoPreview";
// import VideoRoom from "./components/VideoComponents/VideoRoom";

// import useRoomState from "./hooks/useRoomContext";
// import useVideoContext from "./hooks/useVideoContext";

// import { useAppState } from "./state";

// const App = () => {
//   const { user, getToken, isFetching } = useAppState();
//   const { isConnecting, connect } = useVideoContext();
//   const roomState = useRoomState();

//   const [name, setName] = useState<string>(user?.displayName || "");
//   const [roomName, setRoomName] = useState<string>("");

//   const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };

//   const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setRoomName(event.target.value);
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     getToken(name, roomName).then(token => {
//       console.log(token);
//       connect(token);
//     });
//   };

//   return (
//     <Container fluid>
//       <Row>
//         <Col>
//           {roomState === "disconnected" ? (
//             <div>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={name}
//                     onChange={handleNameChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formRoomName">
//                   <Form.Label>Room Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={roomName}
//                     onChange={handleRoomNameChange}
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                   Join Room
//                 </Button>
//               </Form>
//               <LocalVideoPreview />
//             </div>
//           ) : (
//             <div>
//               <h3>{`Room: ${roomName} | Name: ${name}`}</h3>
//               <VideoRoom />
//             </div>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default App;
