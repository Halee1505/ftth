import Style from "../styles/userchat.module.css";
import { useState, useEffect, useRef } from "react";

import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import Cookies from "js-cookie";
export default function UserChat() {
  const [user, setUser] = useState("");
  useEffect(() => {
    if (Cookies.get("user")) {
      setUser(Cookies.get("user"));
    }
  }, []);

  const tawkMessengerRef = useRef();
  const onLoad = () => {
    tawkMessengerRef.current.visitor({
      name: user,
    });
  };
  return (
    <div className={Style.userChat}>
      <TawkMessengerReact
        propertyId="632aa68854f06e12d895f07c"
        widgetId="1gdf9l1s3"
        onLoad={onLoad}
        ref={tawkMessengerRef}
      />
    </div>
  );
}
