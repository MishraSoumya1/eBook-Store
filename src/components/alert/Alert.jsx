import { useState } from "react";
import PropTypes from "prop-types";
import "./alert.scss";

const Alert = ({ message, isClose }) => {
  const [isvisible, setVisible] = useState(true);
  return (
    <>
      {(isvisible && (
        <div
          className="alert"
          onClick={() => {
            setVisible(false);
            isClose();
          }}
        >
          <span className="closebtn">&times;</span>
          {message}.
        </div>
      )) || <> </>}
    </>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isClose: PropTypes.func.isRequired,
};

export default Alert;
