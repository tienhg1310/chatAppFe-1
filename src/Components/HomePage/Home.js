import React, { useEffect } from "react";

import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import useChat from "../../common/useChat";

export default function Home() {
  const { socket, init, destroy } = useChat();

  useEffect(() => {
    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return destroy;
  }, []);

  return (
    <div>
      <div className="container">
        <div className="conversation-container">
          <LeftSide></LeftSide>
          {socket.selectedId && <RightSide></RightSide>}
        </div>
      </div>
    </div>
  );
}
