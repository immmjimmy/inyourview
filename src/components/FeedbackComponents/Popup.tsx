import React from "react";
import { Button } from "react-bootstrap";

import "./Popup.css";

interface PopupProps {
  text: string;
  closePopup: () => void;
}

const Popup = ({ text, closePopup }: PopupProps) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <Button
          onClick={closePopup}
          variant="danger"
          style={{ marginTop: "5px", marginLeft: "5px", borderRadius: "10px" }}
        >
          X
        </Button>
        <div style={{ marginTop: "10px", marginLeft: "5px", height: "90%" }}>
          <textarea readOnly style={{ width: "99%", height: "90%", whiteSpace: "pre-wrap", fontFamily: "Courier New" }}>
            {text}
          </textarea>
        </div>
      </div>
    </div>
  );
};

export default Popup;
