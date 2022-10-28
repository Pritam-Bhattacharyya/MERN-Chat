import React, { useEffect, useState } from "react";
import Axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const { data } = await Axios.get("/chats");
    setChats(data);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return <div>ChatPage</div>;
};

export default ChatPage;
