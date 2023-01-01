import React, { useEffect } from "react";

import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import useChat from "../../common/useChat";
import { useRecoilValue } from "recoil";
import { userLogin } from "../../recoil/socket.atom";

export default function Home() {
  const { init } = useChat();
  const userInfo = useRecoilValue(userLogin);

  // console.log(userInfo);
  useEffect(() => {
    init(userInfo.id);

 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="container">
        <div className="conversation-container">
          <LeftSide></LeftSide>
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  );
}
