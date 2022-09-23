import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Style from "../../styles/admin.module.css";
import AdminOrder from "../../components/admin.order";
import AdminChat from "../../components/admin.chat";

export default function Admin() {
  const [option, setOption] = useState("orders");
  const [user, setUser] = useState("");
  const [hasUnread, setHasUnread] = useState(false);
  useEffect(() => {
    if (Cookies.get("admin")) {
      setUser(Cookies.get("admin"));
    }
  }, []);
  if (user === "admin") {
    return (
      <div>
        <div className={Style.admin__header}>
          <h2>Hệ thống quản lý Viettel FTTH</h2>
          <button
            className={Style.admin__logout}
            onClick={() => {
              Cookies.remove("admin");
              window.location.href = "/login";
            }}
          >
            Đăng xuất
          </button>
        </div>
        <div className={Style.admin__content}>
          <div className={Style.admin__leftBar}>
            <div
              onClick={() => setOption("orders")}
              className={
                hasUnread
                  ? option === "orders"
                    ? `${Style.admin__leftBar__item__active} ${Style.ms}`
                    : `${Style.admin__leftBar__item} ${Style.ms}`
                  : option === "orders"
                  ? `${Style.admin__leftBar__item__active}`
                  : `${Style.admin__leftBar__item}`
              }
            >
              Quản lý đơn hàng
            </div>
            <div
              onClick={() => {
                setOption("messages");
              }}
              className={
                option === "messages"
                  ? Style.admin__leftBar__item__active
                  : Style.admin__leftBar__item
              }
            >
              Tin nhắn
            </div>
          </div>
          <div className={Style.admin__rightBar}>
            {option === "orders" ? (
              <AdminOrder handleUnRead={setHasUnread} />
            ) : option === "messages" ? (
              <AdminChat />
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Bạn không có quyền truy cập trang này</h1>
      </div>
    );
  }
}
