import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Style from "../styles/admin.module.css";
import axios from "axios";
import io from "socket.io-client";

function changeDate(date) {
  var d = new Date(date);
  var dateString =
    d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  return dateString;
}

export default function AdminOrder({ handleUnRead }) {
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [socket, setSocket] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:1505");
    setSocket(socket);
  }, []);
  if (socket) {
    socket.on("receiveRegister", (data) => {
      setIsUpdate(!isUpdate);
    });
  }
  useEffect(() => {
    if (Cookies.get("admin")) {
      setUser(Cookies.get("admin"));
    }
  }, []);
  useEffect(() => {
    axios.get("http://localhost:1505/order").then((res) => {
      setOrders(res.data.reverse());
    });
  }, [currentOrder, isUpdate]);

  orders.filter((order) => order.status === "Chưa liên hệ").length > 0
    ? handleUnRead(true)
    : handleUnRead(false);

  function handleSetCurrentOrder(id) {
    axios.get("http://localhost:1505/order/" + id).then((res) => {
      setCurrentOrder(res.data[0]);
    });
  }

  function handleSearch() {
    setSearchValue(search);
  }
  function deleteOrder(id) {
    const confirm = window.confirm("Bạn có chắc muốn xóa đơn hàng này?");
    confirm &&
      axios.delete("http://localhost:1505/order/" + id).then((res) => {
        setIsUpdate(!isUpdate);
        setCurrentOrder({});
      });
  }

  if (user === "admin") {
    return (
      <div>
        <div className={Style.admin__content}>
          <div className={Style.admin__overlay}>
            <div className={Style.filter}>
              <input
                type="text"
                className={Style.filter__input}
                placeholder="Nhập tên khách hàng, số điện thoại, mã đơn hàng"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button className={Style.admin__logout} onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
            <div className={Style.admin__table__overlay}>
              <table className={Style.admin__table}>
                <thead>
                  <tr>
                    <th className={Style.admin__th}>Mã đơn hàng</th>
                    <th className={Style.admin__th}>Tên khách hàng</th>
                    <th className={Style.admin__th}>Số điện thoại</th>
                    <th className={Style.admin__th}>Địa chỉ</th>
                    <th className={Style.admin__th}>Loại gói cước</th>
                    <th className={Style.admin__th}>Trạng thái</th>
                    <th className={Style.admin__th}>Ngày đặt hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .filter(
                      (order) =>
                        searchValue === "" ||
                        order.customer_name
                          .toString()
                          .toUpperCase()
                          .includes(searchValue.toUpperCase()) ||
                        order.id
                          .toString()
                          .toUpperCase()
                          .includes(searchValue.toUpperCase()) ||
                        order.customer_phone
                          .toString()
                          .toUpperCase()
                          .includes(searchValue.toUpperCase())
                    )
                    .map((order, index) => {
                      return (
                        <tr
                          key={index}
                          className={`${
                            order.status === "Chưa liên hệ"
                              ? Style.admin__tr__attach
                              : Style.admin__tr
                          } ${
                            order.id === currentOrder.id
                              ? Style.admin__tr__current
                              : ""
                          }`}
                          onClick={() => {
                            handleSetCurrentOrder(order.id);
                          }}
                        >
                          <td className={Style.admin__td}>{order.id}</td>
                          <td className={Style.admin__td}>
                            {order.customer_name}
                          </td>
                          <td className={Style.admin__td}>
                            <a href={`tel:${order.customer_phone}`}>
                              {order.customer_phone}
                            </a>
                          </td>
                          <td className={Style.admin__td}>
                            {order.customer_address}-{order.customer_ward}-
                            {order.customer_district}-{order.customer_city}
                          </td>
                          <td className={Style.admin__td}>
                            {order.product_name}
                          </td>
                          <td className={Style.admin__td}>{order.status}</td>
                          <td className={Style.admin__td}>
                            {changeDate(order.cur_date)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className={Style.admin__sidebar}>
            {currentOrder.id ? (
              <div className={Style.admin__sidebar__content}>
                <div className={Style.admin__sidebar__header}>
                  <h3>Thông tin đơn hàng {currentOrder.id}</h3>
                  <h5>Sản phẩm: {currentOrder.product_name}</h5>
                  <h6>Ngày đặt hàng: {changeDate(currentOrder.cur_date)}</h6>
                </div>
                <p>
                  Tên khách hàng: <strong>{currentOrder.customer_name}</strong>
                </p>
                <p>
                  Số điện thoại: {currentOrder.customer_phone}
                  <a
                    href={`tel:${currentOrder.customer_phone}`}
                    className={Style.admin__sidebar__phone}
                  >
                    Gọi <i className="fa-solid fa-phone"></i>
                  </a>
                </p>
                {currentOrder.customer_email ? (
                  <p>Email: {currentOrder.customer_email}</p>
                ) : (
                  ""
                )}
                <p>
                  Địa chỉ:
                  {currentOrder.customer_address}-{currentOrder.customer_ward}-
                  {currentOrder.customer_district}-{currentOrder.customer_city}
                </p>
                <p>
                  Ghi chú: <strong>{currentOrder.customer_note}</strong>
                </p>
                <p>Trạng thái:</p>
                <div className={Style.admin__sidebar__btn__group}>
                  <button
                    className={
                      currentOrder.status === "Chưa liên hệ"
                        ? Style.admin__sidebar__btn__active
                        : Style.admin__sidebar__btn
                    }
                    onClick={() => {
                      axios
                        .put("http://localhost:1505/order/changeStatus", {
                          id: currentOrder.id,
                          status: "Chưa liên hệ",
                        })
                        .then((res) => {
                          handleSetCurrentOrder(currentOrder.id);
                        });
                    }}
                  >
                    Chưa liên hệ
                  </button>{" "}
                  <button
                    className={
                      currentOrder.status === "Đang lắp đặt"
                        ? Style.admin__sidebar__btn__active
                        : Style.admin__sidebar__btn
                    }
                    onClick={() => {
                      axios
                        .put("http://localhost:1505/order/changeStatus", {
                          id: currentOrder.id,
                          status: "Đang lắp đặt",
                        })
                        .then((res) => {
                          handleSetCurrentOrder(currentOrder.id);
                        });
                    }}
                  >
                    {" "}
                    Đang lắp đặt
                  </button>{" "}
                  <button
                    className={
                      currentOrder.status === "Hoàn thành"
                        ? Style.admin__sidebar__btn__active
                        : Style.admin__sidebar__btn
                    }
                    onClick={() => {
                      axios
                        .put("http://localhost:1505/order/changeStatus", {
                          id: currentOrder.id,
                          status: "Hoàn thành",
                        })
                        .then((res) => {
                          handleSetCurrentOrder(currentOrder.id);
                        });
                    }}
                  >
                    {" "}
                    Hoàn thành
                  </button>
                  <button
                    className={
                      currentOrder.status === "Hủy"
                        ? Style.admin__sidebar__btn__active
                        : Style.admin__sidebar__btn
                    }
                    onClick={() => {
                      axios
                        .put("http://localhost:1505/order/changeStatus", {
                          id: currentOrder.id,
                          status: "Hủy",
                        })
                        .then((res) => {
                          handleSetCurrentOrder(currentOrder.id);
                        });
                    }}
                  >
                    {" "}
                    Hủy
                  </button>
                </div>
                <button
                  className={Style.admin__sidebar__delete__btn}
                  onClick={() => {
                    deleteOrder(currentOrder.id);
                  }}
                >
                  Xóa đơn hàng
                </button>
              </div>
            ) : (
              "Chưa chọn đơn hàng"
            )}
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
