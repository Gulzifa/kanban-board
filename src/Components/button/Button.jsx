import React from "react";
import "./button.css";
function Button({ onClick, btnName, btnStyle, disabled }) {
  return (
    <div className="btn-wrapper">
      <button
        className={disabled ? "btn btn-disabled" : btnStyle}
        onClick={disabled ? null : onClick}
        disabled={disabled}
      >
        {btnName}
      </button>
    </div>
  );
}

export default Button;
