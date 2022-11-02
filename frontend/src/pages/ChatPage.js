import React from "react";
// import Axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import Mychats from "../components/miscellaneous/Mychats";
import ChatBox from "../components/miscellaneous/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display={"flex"} justifyContent="space-between" w="100%" h="9vh" p="10px">
        {user && <Mychats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
