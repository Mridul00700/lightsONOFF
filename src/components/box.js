import * as React from "react";
import classes from "./box.module.css";

const Boxes = ({ id, isChecked, onClick }) => {
  return (
    <div
      className={isChecked ? classes["yellow-box"] : classes["white-box"]}
      onClick={() => onClick(id)}
    ></div>
  );
};

export default Boxes;
