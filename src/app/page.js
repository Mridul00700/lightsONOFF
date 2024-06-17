
'use client'
import styles from "./page.module.css";
import * as React from "react";
import Box from "../components/box.js";

const maxSquareGrid = new Array(8).fill().map((_, i) => {
  return {
    id: ++i,
    isChecked: false,
  };
});

export default function App() {
  const [queue, setQueue] = React.useState([]);
  const [maxSquare, setMaxSquare] = React.useState(maxSquareGrid);
  const countRef = React.useRef(0);
  const [disableBtns, setDisableBtns] = React.useState(false);
  const [resultQueue, setResultQueue] = React.useState([]);

  // 8 square boxes

  React.useEffect(() => {
    if (countRef.current === maxSquareGrid.length) {
      setDisableBtns(true);
      for (let i = 1; i <= maxSquareGrid.length; i++) {
        console.log("checking", i);

        let copy = resultQueue.shift();
        console.log("timeout", i, copy, resultQueue);

        setTimeout(() => {
          // const copy = matchEle(resultQueue[i], false);
          console.log("test", copy, resultQueue);
          setMaxSquare((prev) => {
            return prev.map((ele) => {
              return ele.id === copy.id ? { ...ele, isChecked: false } : ele;
            });
          });
        }, i * 2000);
      }
    }
  }, [resultQueue]);

  const matchEle = (id, status) => {
    console.log("id", id);
    const copyQueue = [...maxSquare];
    return copyQueue.map((ele) => {
      if (ele.id === id) {
        if (ele.isChecked === false) {
          countRef.current = ++countRef.current;
          let res = [...resultQueue, { id: ele.id }];
          setResultQueue(res);
        }
        return { ...ele, isChecked: status };
      }
      return ele;
    });
  };
  console.log("rest", resultQueue);
  const onClickBox = (id) => {
    console.log("clicked", id);
    if (disableBtns === true) {
      return;
    }
    const copy = matchEle(id, true);
    setMaxSquare(copy);
  };

  return (
    <div className={styles.App}>
      {maxSquare.map((e, i) => (
        <Box id={e.id} isChecked={e.isChecked} onClick={onClickBox} />
      ))}
    </div>
  );
}
