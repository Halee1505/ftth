import Style from "../styles/admin.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

export default function AdminChat() {
  const [curUser, setCurUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("http://localhost:1505");
    setSocket(newSocket);
  }, []);

  if (socket) {
    socket.on(curUser, (data) => {
      setMessages(data);
      setSendMessage("");
    });
  }
  useEffect(() => {
    if (curUser !== "") {
      socket.emit("new-message", curUser);
    }
  }, [curUser, socket]);

  const users = [
    {
      id: "0395114189",
      name: "Nguyễn Văn A",
      message: "Chào bạn, tôi muốn đặt hàng",
    },
    {
      id: "0333354674",
      name: "Nguyễn Văn B",
      message: "Chào bạn, tôi muốn đặt hàng",
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      message: "Chào bạn, tôi muốn đặt hàng",
    },
    {
      id: 4,
      name: "Nguyễn Văn D",
      message: "Chào bạn, tôi muốn đặt hàng",
    },
    {
      id: 5,
      name: "Nguyễn Văn E",
      message: "Chào bạn, tôi muốn đặt hàng",
    },
    {
      id: 6,
      name: "Nguyễn Văn F",
      message: "Chào bạn, tôi muốn đặt hàng",
    },
  ];

  console.log(curUser);

  function handleSendMessage() {
    console.log(curUser);
    if (sendMessage !== "") {
      axios
        .post("http://localhost:1505/chat", {
          user: curUser,
          type: "receive",
          message: sendMessage,
        })
        .then((res) => {
          socket.emit("new-message", curUser);
        });
    }
  }

  const bottomRef = useRef("scroll");
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={Style.adminChat__overlay}>
      <div className={Style.adminChat__sideBar}>
        {users.map((user, index) => (
          <div
            key={index}
            className={
              curUser === user.id
                ? Style.adminChat__sideBar__user__active
                : Style.adminChat__sideBar__user
            }
            onClick={() => setCurUser(user.id)}
          >
            <h5>{user.name}</h5>
            <p>{user.message}</p>
          </div>
        ))}
      </div>
      <div className={Style.adminChat__message}>
        <div className={Style.adminChat__message__receive}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.type !== "receive"
                  ? Style.adminChat__message__user
                  : Style.adminChat__message__admin
              }
            >
              {message.message}
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>
        <div className={Style.adminChat__message___send}>
          <input
            type="text"
            placeholder="Nhập tin nhắn"
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button onClick={handleSendMessage}>Gửi</button>
        </div>
      </div>
    </div>
  );
}
