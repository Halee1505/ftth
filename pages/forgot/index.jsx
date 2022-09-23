/* eslint-disable @next/next/no-sync-scripts */
import Image from "next/image";
import Style from "../../styles/forgot.module.css";
import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [forgotInfo, setForgotInfo] = useState({
    username: "",
    phone: "",
    remember: false,
  });

  function handleChange(e) {
    setForgotInfo({
      ...forgotInfo,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit() {
    if (forgotInfo.username !== "" && forgotInfo.password !== "") {
      // router.push("/");
      window.location.href = "/";
    }
  }

  return (
    <div className={Style.forgot__overlay}>
      <div className={Style.forgot__logo}>
        <Image src="/logo-white.png" alt="logo" width={200} height={200} />
      </div>
      <div className={Style.forgot__content}>
        <div className={Style.forgot__logo1}>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>
        <h2 className={Style.forgot__forgot__title}>Quên mật khẩu</h2>
        <div className={Style.forgot__form}>
          <input
            className={Style.forgot__input}
            type="text"
            placeholder="Tên đăng nhập"
            name="username"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            className={Style.forgot__input}
            type="text"
            placeholder="Số điện thoại"
            name="phone"
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <div
            className="g-recaptcha"
            data-sitekey="6LfJo5shAAAAAERMfdJp9IVnGNfZqmO9QjDVUM-d"
          ></div>
          <div className={Style.forgot__button__overlay}>
            <button
              className={Style.forgot__button1}
              type="button"
              onClick={() => {
                router.push("/login");
              }}
            >
              Hủy bỏ
            </button>
            <button
              disabled={forgotInfo.username === "" || forgotInfo.phone === ""}
              className={Style.forgot__button2}
              type="button"
              onClick={handleSubmit}
            >
              Lấy mã OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
