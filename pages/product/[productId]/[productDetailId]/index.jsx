import { useRouter } from "next/router";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import Breadcrumb from "../../../../components/breadcrumb";
import Style from "../../../../styles/productItem.module.css";
import Popup from "reactjs-popup";
import Link from "next/link";
import Image from "next/image";
import io from "socket.io-client";

const formatter = new Intl.NumberFormat("vn-Vi", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 3,
});

export default function ProductItem() {
  const router = useRouter();
  const [breadcrumbRouter, setBreadcrumbRouter] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:1505");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:1505/action/product-type/${router.query.productId}`
      )
      .then((res) => {
        setBreadcrumbRouter(res.data);
      });
  }, [router.query.productId]);

  const breadcrumb = [
    {
      name: "Sản phẩm",
      link: "/product",
    },
    {
      name: breadcrumbRouter.find(
        (item) => item.type_key === router.query.productId
      )
        ? breadcrumbRouter.find(
            (item) => item.type_key === router.query.productId
          ).type
        : "",
      link: `/product/${router.query.productId}`,
    },
    {
      name: router.query.productDetailId.toUpperCase(),
      link: `/product/${router.query.productId}/${router.query.productDetailId}`,
    },
  ];

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [information, setInformation] = useState([]);

  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [xa, setXa] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    note: "",
  });
  const [option, setOption] = useState("detail");
  useEffect(() => {
    axios
      .get(`http://localhost:1505/detail/${router.query.productDetailId}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [router.query.productDetailId]);

  useEffect(() => {
    axios
      .get(`http://localhost:1505/${option}/${router.query.productDetailId}`)
      .then((res) => {
        setInformation(res.data);
      });
  }, [option, router.query.productDetailId]);

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/p").then((res) => {
      setTinh(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeCity = (e) => {
    console.log(e.target.value);
    setRegisterForm({
      ...registerForm,
      city: e.target.value,
    });
    axios
      .get(`https://provinces.open-api.vn/api/p/${e.target.value}/?depth=2`)
      .then((res) => {
        setHuyen(res.data.districts);
      });
  };
  const handleChangeDistrict = (e) => {
    setRegisterForm({
      ...registerForm,
      district: e.target.value,
    });
    axios
      .get(`https://provinces.open-api.vn/api/d/${e.target.value}/?depth=2`)
      .then((res) => {
        setXa(res.data.wards);
      });
  };
  const handleSubmit = () => {
    setLoading(true);
    const data = {
      product_name: product[0].product_name,
      customer_name: registerForm.name,
      customer_phone: registerForm.phone,
      customer_email: registerForm.email,
      customer_city: registerForm.city,
      customer_district: registerForm.district,
      customer_ward: registerForm.ward,
      customer_address: registerForm.address,
      customer_note: registerForm.note,
    };

    if (
      registerForm.name === "" ||
      registerForm.phone === "" ||
      registerForm.city === "" ||
      registerForm.district === "" ||
      registerForm.ward === "" ||
      registerForm.address === ""
    ) {
      alert("Bạn chưa nhập đầy đủ thông tin");
      setLoading(false);
    } else {
      axios.post("http://localhost:1505/order", data).then((res) => {
        setLoading(false);
        setSuccess(true);
        socket.emit("newRegister", { newRegister: true });
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      });
    }
  };

  console.log(router.query);
  console.log(product);
  return (
    <React.Fragment>
      <Header scroll />
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className={Style.ProductItem__overlay}>
        <div
          style={{
            display: loading ? "flex" : "none",
          }}
          className={Style.success_overlay}
        >
          <div className={Style.loading}></div>
        </div>
        <div
          style={{
            display: success ? "flex" : "none",
          }}
          className={Style.success_overlay}
        >
          <div className={Style.success_overlay__content}>
            <h3 className={Style.text_red}>Đặt hàng thành công</h3>
            <Image src="/success.gif" alt="success" width={150} height={150} />
            <p>Nhân viên tư vấn sẽ liên hệ bạn trong giây lát</p>
          </div>
        </div>
        <div className={Style.ProductItem__content}>
          {product.map((item, index) => {
            return (
              <div key={index} className={Style.ProductItem__title}>
                <h2>{item.product_name.toUpperCase()}</h2>
                <h3>{item.bandwidth} Mbps</h3>
                <h3>
                  {item.inner_price !== 0
                    ? formatter.format(item.inner_price) + "-"
                    : ""}
                  {formatter.format(item.outside_price)}/ tháng
                </h3>
              </div>
            );
          })}
          <div className={Style.ProductItem__information}>
            <div className={Style.ProductItem__information__title}>
              <div
                className={
                  option === "detail"
                    ? Style.ProductItem__information__title__item_active
                    : Style.ProductItem__information__title__item
                }
                onClick={() => {
                  setOption("detail");
                }}
              >
                THÔNG TIN CHI TIẾT
              </div>
              <div
                className={
                  option === "rates"
                    ? Style.ProductItem__information__title__item_active
                    : Style.ProductItem__information__title__item
                }
                onClick={() => {
                  setOption("rates");
                }}
              >
                GIÁ CƯỚC
              </div>
              <div
                className={
                  option === "endow"
                    ? Style.ProductItem__information__title__item_active
                    : Style.ProductItem__information__title__item
                }
                onClick={() => {
                  setOption("endow");
                }}
              >
                ƯU ĐÃI
              </div>
            </div>
            {option === "detail"
              ? information.map((info, index) => (
                  <div
                    key={index}
                    className={Style.ProductItem__information__content}
                  >
                    {info.description}
                    <div
                      className={Style.ProductItem__information__content__table}
                    >
                      <div
                        className={
                          Style.ProductItem__information__content__table__item
                        }
                      >
                        <Image
                          src={"/tocdo.png"}
                          alt="Picture of the author"
                          width={100}
                          height={100}
                        />
                        <p>{info.bandwidth} Mbps</p>
                        <p></p>
                      </div>
                      {info.inner_price !== 0 ? (
                        <div
                          className={
                            Style.ProductItem__information__content__table__item
                          }
                        >
                          <Image
                            src={"/giatien.png"}
                            alt="Picture of the author"
                            width={100}
                            height={100}
                          />
                          <p>{formatter.format(info.inner_price)}/tháng</p>
                          <p>Nội thành</p>
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className={
                          Style.ProductItem__information__content__table__item
                        }
                      >
                        <Image
                          src={"/giatien.png"}
                          alt="Picture of the author"
                          width={100}
                          height={100}
                        />
                        <p>{formatter.format(info.outside_price)}/tháng</p>
                        <p>Ngoại thành</p>
                      </div>
                    </div>
                  </div>
                ))
              : option === "rates"
              ? information.map((info, index) => (
                  <div
                    key={index}
                    className={Style.ProductItem__information__content}
                  >
                    <div
                      className={
                        Style.ProductItem__information__content__rates__title
                      }
                    >
                      <h3
                        className={
                          Style["ProductItem__information__content__text--red"]
                        }
                      >
                        Phí hòa mạng
                      </h3>
                      <Popup
                        trigger={
                          <button
                            className={Style.ProductItem__information__button1}
                          >
                            ĐĂNG KÝ NGAY
                          </button>
                        }
                        position="right center"
                        modal
                      >
                        {(close) => (
                          <div
                            className={
                              Style.ProductItem__information__popup__overlay
                            }
                          >
                            <div
                              className={Style.ProductItem__information__popup}
                            >
                              <div
                                className={
                                  Style.ProductItem__information__popup__close
                                }
                              >
                                <i className="fas fa-times" onClick={close}></i>
                              </div>
                              <div
                                className={
                                  Style.ProductItem__information__popup__title
                                }
                              >
                                <h2>
                                  Đặt hàng{" "}
                                  {product.length !== 0 ? product[0].name : ""}
                                </h2>
                                <h3>
                                  Bạn đã có tài khoản?{" "}
                                  <Link href="/login">Đăng nhập</Link>
                                </h3>
                              </div>
                              <div className={Style.ProductItem__form}>
                                <label
                                  className={Style.productItem__label}
                                  htmlFor="name"
                                >
                                  Họ tên{" "}
                                  <span className={Style.text_red}>*</span>
                                </label>
                                <input
                                  className={Style.ProductItem__input}
                                  type="text"
                                  name="name"
                                  id="name"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                                <label
                                  className={Style.productItem__label}
                                  htmlFor="phone"
                                >
                                  Số điện thoại{" "}
                                  <span className={Style.text_red}>*</span>
                                </label>
                                <input
                                  className={Style.ProductItem__input}
                                  type="number"
                                  name="phone"
                                  id="phone"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                                <label
                                  className={Style.productItem__label}
                                  htmlFor="email"
                                >
                                  Email
                                </label>
                                <input
                                  className={Style.ProductItem__input}
                                  type="text"
                                  name="email"
                                  id="email"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                                <h2 className={Style.ProductItem__form__title}>
                                  Địa chỉ lắp đặt
                                </h2>
                                <label
                                  className={Style.productItem__label}
                                  htmlFor="city"
                                >
                                  Tỉnh/Thành phố{" "}
                                  <span className={Style.text_red}>*</span>
                                </label>
                                <select
                                  className={Style.ProductItem__input}
                                  name="city"
                                  id="city"
                                  onChange={(e) => {
                                    handleChangeCity(e);
                                  }}
                                  defaultValue=""
                                >
                                  <option value="" disabled>
                                    Tỉnh/Thành phố
                                  </option>
                                  {tinh.map((item, index) => (
                                    <option key={index} value={item.code}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={Style.productItem__label}
                                  htmlFor="district"
                                >
                                  Quận/Huyện{" "}
                                  <span className={Style.text_red}>*</span>
                                </label>
                                <select
                                  className={Style.ProductItem__input}
                                  name="district"
                                  id="district"
                                  onChange={(e) => {
                                    handleChangeDistrict(e);
                                  }}
                                  defaultValue=""
                                >
                                  <option value="" disabled>
                                    Quận/huyện
                                  </option>
                                  {huyen.map((item, index) => (
                                    <option key={index} value={item.code}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={Style.productItem__label}
                                  htmlFor="ward"
                                >
                                  Xã/Phường{" "}
                                  <span className={Style.text_red}>*</span>
                                </label>
                                <select
                                  className={Style.ProductItem__input}
                                  name="ward"
                                  id="ward"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  defaultValue=""
                                >
                                  <option value="" disabled>
                                    Phường/Xã
                                  </option>
                                  {xa.map((item, index) => (
                                    <option key={index} value={item.code}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={Style.productItem__label}
                                  htmlFor="address"
                                >
                                  Số nhà/Đường{" "}
                                  <span className={Style.text_red}>*</span>
                                </label>
                                <input
                                  className={Style.ProductItem__input}
                                  type="text"
                                  name="address"
                                  id="address"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                                <label
                                  className={Style.productItem__label}
                                  htmlFor="note"
                                >
                                  Ghi chú
                                </label>
                                <textarea
                                  className={Style.ProductItem__input}
                                  cols="30"
                                  rows="1"
                                  name="note"
                                  id="note"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />{" "}
                                <button
                                  className={
                                    Style.ProductItem__information__button
                                  }
                                  onClick={() => {
                                    handleSubmit();
                                    close();
                                  }}
                                >
                                  Đặt hàng
                                </button>
                                <br />
                              </div>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
                    <table
                      className={
                        Style.ProductItem__information__content__table1
                      }
                    >
                      <thead>
                        <tr>
                          <th>Phương án đóng trước cước</th>
                          <th>Phí lắp đặt</th>
                          <th>Ghi chú</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Đóng cước hàng tháng</td>
                          <td>
                            {info["1_month"] !== 0
                              ? formatter.format(info["1_month"])
                              : " miễn phí"}
                          </td>{" "}
                          <td></td>
                        </tr>
                        <tr>
                          <td>Đóng trước 6 tháng</td>
                          <td>
                            {info["6_month"] !== 0
                              ? formatter.format(info["6_month"])
                              : " miễn phí"}
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Đóng trước 12 tháng</td>
                          <td>
                            {info["12_month"] !== 0
                              ? formatter.format(info["12_month"])
                              : " miễn phí"}
                          </td>{" "}
                          <td></td>
                        </tr>
                        <tr>
                          <td>Đóng trước 18 tháng</td>
                          <td>
                            {info["18_month"] !== 0
                              ? formatter.format(info["18_month"])
                              : " miễn phí"}
                          </td>{" "}
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      className={Style.ProductItem__information__content__note}
                    >
                      Bảng giá trên đã bao gồm 10% thuế VAT
                    </p>
                    <p>
                      Ghi chú: Cước tặng là cước thuê bao, không bao gồm cước DV
                      GTGT, Việc tặng cước miễn phí sẽ được thực hiện sau khi
                      hết trừ cước đóng trước
                    </p>
                    <h3
                      className={
                        Style["ProductItem__information__content__text--red"]
                      }
                    >
                      Giá cước hàng tháng
                    </h3>
                    <table
                      className={
                        Style.ProductItem__information__content__table1
                      }
                    >
                      <thead>
                        <tr>
                          <th>Khu vực</th>
                          {info.inner_price === 0 &&
                          info.outside_price === 0 ? (
                            ""
                          ) : (
                            <th>Giá cước</th>
                          )}
                          <th>Giá khuyến mại(VND)</th>
                          <th>Băng thông trong nước</th>
                          <th>Băng thông quốc tế tối thiểu</th>
                          <th>IP tĩnh</th>
                        </tr>
                      </thead>
                      <tbody>
                        {info.inner_price === 0 &&
                        info.inner_discount_price === 0 &&
                        info.inner_bandwidth === 0 &&
                        info.inner_mib === 0 &&
                        info.inner_static_ip === 0 ? (
                          ""
                        ) : (
                          <tr>
                            <td>Nội thành</td>
                            {info.inner_price === 0 ? (
                              ""
                            ) : (
                              <td>{formatter.format(info.inner_price)}</td>
                            )}
                            <td>
                              {formatter.format(info.inner_discount_price)}
                            </td>
                            <td>{info.inner_bandwidth} Mbps</td>
                            <td>
                              {info.inner_mib === 0
                                ? "Không cam kết"
                                : info.outside_mib + " Mbps"}
                            </td>
                            <td>
                              {info.inner_static_ip === 0
                                ? "Không có"
                                : info.outside_mib}
                            </td>
                          </tr>
                        )}
                        {info.outside_price === 0 &&
                        info.outside_discount_price === 0 &&
                        info.outside_bandwidth === 0 &&
                        info.outside_mib === 0 &&
                        info.outside_static_ip === 0 ? (
                          ""
                        ) : (
                          <tr>
                            <td>Ngoại thành</td>
                            {info.outside_price === 0 ? (
                              ""
                            ) : (
                              <td>{formatter.format(info.outside_price)}</td>
                            )}
                            <td>
                              {formatter.format(info.outside_discount_price)}
                            </td>
                            <td>{info.outside_bandwidth} Mbps</td>
                            <td>
                              {info.outside_mib === 0
                                ? "Không cam kết"
                                : info.outside_mib + " Mbps"}
                            </td>
                            <td>
                              {info.outside_static_ip === 0
                                ? "Không có"
                                : info.outside_mib}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <p
                      className={Style.ProductItem__information__content__note}
                    >
                      Bảng giá trên đã bao gồm 10% thuế VAT
                    </p>
                    <p>
                      <span
                        className={
                          Style["ProductItem__information__content__text--red"]
                        }
                      >
                        Thời gian áp dụng giá Khuyến mãi: áp dụng trong 24
                        tháng,
                      </span>
                      sau khi kết thúc khuyến mãi áp dụng theo giá cước quy định
                      tại thời điểm mới
                    </p>
                    <p>
                      <span
                        className={
                          Style["ProductItem__information__content__text--red"]
                        }
                      >
                        Hình thức thanh toán cước hàng tháng
                      </span>
                      Khi đăng ký dịch vụ FTTH với Viettel, Qúy khách sẽ lựa
                      chọn hình thức thanh toán phù hợp nhất. Viettel cung cấp
                      tới Qúy khách các hình thức thanh toán sau:
                    </p>
                    <ul>
                      <li>
                        <p
                          className={
                            Style[
                              "ProductItem__information__content__text--red"
                            ]
                          }
                        >
                          Thanh toán trực tiếp tại cửa hàng:
                        </p>
                        Thanh toán tại cửa hàng: Hàng tháng, Qúy khách chủ động
                        ra Cửa hàng giao dịch của Viettel để đóng cước.{" "}
                      </li>
                      <li>
                        <p
                          className={
                            Style[
                              "ProductItem__information__content__text--red"
                            ]
                          }
                        >
                          Thanh toán tại nhà:
                        </p>
                        Hàng tháng, nhân viên Viettel sẽ phát thông báo cước và
                        thu cước tại địa chỉ của Qúy khách. Phí nhận thông báo
                        cước và thanh toán tại nhà là 5.000 đ/tháng ( Phí này sẽ
                        được cộng vào hóa đơn cước hàng tháng)
                      </li>
                      <li>
                        <p
                          className={
                            Style[
                              "ProductItem__information__content__text--red"
                            ]
                          }
                        >
                          Thanh toán bằng dịch vụ ViettelPay của Viettel:
                        </p>
                        Qúy khách có thể thanh toán cước FTTH ngay trên ứng dụng
                        ViettelPay và được chiết khấu tới 3% giá trị thanh toán.
                        Số tiền sẽ được trừ trực tiếp vào tài khoản ngân hàng mà
                        Qúy khách đã đăng ký dịch vụ ViettelPay.
                      </li>
                      <li>
                        <p
                          className={
                            Style[
                              "ProductItem__information__content__text--red"
                            ]
                          }
                        >
                          Thanh toán bằng thẻ cào:
                        </p>
                        Nếu bị chặn/ cắt do nợ cước, khi truy cập internet, dịch
                        vụ sẽ tự động chuyển tới trang Login Fail. Từ trang này,
                        Qúy khách nhập thông tin tài khoản và mã thẻ cào để
                        thanh toán.{" "}
                      </li>
                      <li>
                        <p
                          className={
                            Style[
                              "ProductItem__information__content__text--red"
                            ]
                          }
                        >
                          Uỷ nhiệm chi:
                        </p>
                        Nếu có tài khoản ngân hàng, Qúy khách có thể đăng ký
                        hình thức Uỷ nhiệm chi tại ngân hàng. Số tiền thanh toán
                        cước FTTH hàng tháng sẽ được tự động trừ trực tiếp vào
                        tài khoản ngân hàng của Qúy khách.
                      </li>
                    </ul>
                  </div>
                ))
              : option === "endow"
              ? information.map((info, index) => (
                  <div
                    key={index}
                    className={Style.ProductItem__information__content}
                  >
                    <p>{info.discount}</p>
                    <table
                      className={Style.ProductItem__information__content_table2}
                    >
                      <thead>
                        <tr>
                          <th>Phương án đóng cước trước</th>
                          <th>Chính sách đăng ký trong thời gian khuyến mại</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Đóng trước 6 tháng</td>
                          <td>Tặng {info["6_month_bonus"]} tháng</td>
                        </tr>
                        <tr>
                          <td>Đóng trước 12 tháng</td>
                          <td>Tặng {info["12_month_bonus"]} tháng</td>
                        </tr>
                        {info["18_month_bonus"] !== 0 ? (
                          <tr>
                            <td>Đóng trước 18 tháng</td>
                            <td>Tặng {info["18_month_bonus"]} tháng</td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </table>
                  </div>
                ))
              : null}
            <Popup
              trigger={
                <button className={Style.ProductItem__information__button}>
                  ĐĂNG KÝ NGAY
                </button>
              }
              position="right center"
              modal
            >
              {(close) => (
                <div className={Style.ProductItem__information__popup__overlay}>
                  <div className={Style.ProductItem__information__popup}>
                    <div
                      className={Style.ProductItem__information__popup__close}
                    >
                      <i className="fas fa-times" onClick={close}></i>
                    </div>
                    <div
                      className={Style.ProductItem__information__popup__title}
                    >
                      <h2>
                        Đặt hàng {product.length !== 0 ? product[0].name : ""}
                      </h2>
                      <h3>
                        Bạn đã có tài khoản?{" "}
                        <Link href="/login">Đăng nhập</Link>
                      </h3>
                    </div>
                    <div className={Style.ProductItem__form}>
                      <label
                        className={Style.productItem__label}
                        htmlFor="name"
                      >
                        Họ tên <span className={Style.text_red}>*</span>
                      </label>
                      <input
                        className={Style.ProductItem__input}
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <label
                        className={Style.productItem__label}
                        htmlFor="phone"
                      >
                        Số điện thoại <span className={Style.text_red}>*</span>
                      </label>
                      <input
                        className={Style.ProductItem__input}
                        type="number"
                        name="phone"
                        id="phone"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <label
                        className={Style.productItem__label}
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className={Style.ProductItem__input}
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <h2 className={Style.ProductItem__form__title}>
                        Địa chỉ lắp đặt
                      </h2>
                      <label
                        className={Style.productItem__label}
                        htmlFor="city"
                      >
                        Tỉnh/Thành phố <span className={Style.text_red}>*</span>
                      </label>
                      <select
                        className={Style.ProductItem__input}
                        name="city"
                        id="city"
                        onChange={(e) => {
                          handleChangeCity(e);
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Tỉnh/Thành phố
                        </option>
                        {tinh.map((item, index) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <label
                        className={Style.productItem__label}
                        htmlFor="district"
                      >
                        Quận/Huyện <span className={Style.text_red}>*</span>
                      </label>
                      <select
                        className={Style.ProductItem__input}
                        name="district"
                        id="district"
                        onChange={(e) => {
                          handleChangeDistrict(e);
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Quận/huyện
                        </option>
                        {huyen.map((item, index) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <label
                        className={Style.productItem__label}
                        htmlFor="ward"
                      >
                        Xã/Phường <span className={Style.text_red}>*</span>
                      </label>
                      <select
                        className={Style.ProductItem__input}
                        name="ward"
                        id="ward"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Phường/Xã
                        </option>
                        {xa.map((item, index) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <label
                        className={Style.productItem__label}
                        htmlFor="address"
                      >
                        Số nhà/Đường <span className={Style.text_red}>*</span>
                      </label>
                      <input
                        className={Style.ProductItem__input}
                        type="text"
                        name="address"
                        id="address"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <label
                        className={Style.productItem__label}
                        htmlFor="note"
                      >
                        Ghi chú
                      </label>
                      <textarea
                        className={Style.ProductItem__input}
                        cols="30"
                        rows="1"
                        name="note"
                        id="note"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />{" "}
                      <button
                        className={Style.ProductItem__information__button}
                        onClick={() => {
                          handleSubmit();
                          close();
                        }}
                      >
                        Đặt hàng
                      </button>
                      <br />
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
