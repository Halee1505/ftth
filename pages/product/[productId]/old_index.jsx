import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import Style from "../../../styles/productDetail.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
export default function ProductDetail() {
  const router = useRouter();
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
    console.log(registerForm);
  };
  return (
    <div>
      <Header scroll />
      <div className={Style.productDetail__overlay}>
        <div className={Style.productDetail__content}>
          <h1>Thông tin sản phẩm</h1>
          <h2>{router.query.productId}</h2>
          <Image
            src={`/product/${router.query.productId}.jpg`}
            alt={router.query.productId}
            height={300}
            width={300}
          />
        </div>
        <div className={Style.productDetail__form}>
          <h2 className={Style.productDetail__form__title1}>Đăng kí lắp đặt</h2>
          <input
            className={Style.productDetail__input}
            type="text"
            placeholder="Họ tên*"
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            className={Style.productDetail__input}
            type="number"
            placeholder="Số điện thoại*"
            name="phone"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            className={Style.productDetail__input}
            type="text"
            placeholder="Email(không bắt buộc)"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <h2 className={Style.productDetail__form__title2}>Địa chỉ lắp đặt</h2>
          <select
            className={Style.productDetail__input}
            name="city"
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
          <select
            className={Style.productDetail__input}
            name="district"
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
          <select
            className={Style.productDetail__input}
            name="ward"
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
          <input
            className={Style.productDetail__input}
            type="text"
            placeholder="Số nhà/Đường*"
            name="address"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <textarea
            className={Style.productDetail__input}
            cols="30"
            rows="1"
            placeholder="Ghi chú"
            name="note"
            onChange={(e) => {
              handleChange(e);
            }}
          />{" "}
          <button
            className={Style.productDetail__button}
            onClick={handleSubmit}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}
