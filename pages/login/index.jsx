import Image from "next/image";
import Style from "../../styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    phone: "",
    password: "",
    remember: false,
  });
  console.log(Cookies.get("user"));
  function handleChange(e) {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit() {
    axios
      .post("http://localhost:1505/user/login", loginInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.length !== 0) {
          if (res.data[0].type !== "admin") {
            if (loginInfo.remember) {
              Cookies.set("user", loginInfo.phone, { expires: 7 });
            } else {
              Cookies.set("user", loginInfo.phone);
            }
            router.push("/");
          } else {
            Cookies.set("admin", "admin");
            router.push("/admin");
          }
        } else {
          alert("Sai tài khoản hoặc mật khẩu");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={Style.login__overlay}>
      <div className={Style.login__navbar}>
        <div className={Style.login__logo}>
          <Image src="/logo-white.png" alt="logo" width={200} height={200} />
        </div>
      </div>
      <div className={Style.login__content}>
        <div className={Style.login__logo1}>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>
        <div className={Style.login__content__title}>Đăng nhập</div>
        <div className={Style.login__form}>
          <input
            className={Style.login__input}
            type="text"
            placeholder="Tên đăng nhập"
            defaultValue={loginInfo.phone}
            name="phone"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            className={Style.login__input}
            type="password"
            placeholder="Mật khẩu"
            defaultValue={loginInfo.password}
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className={Style.login__remember}>
            <input
              type="checkbox"
              defaultChecked={loginInfo.remember}
              name="remember"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span>Ghi nhớ</span>
          </div>
          <button
            disabled={loginInfo.phone === "" || loginInfo.password === ""}
            className={Style.login__button}
            type="button"
            onClick={handleSubmit}
          >
            Đăng nhập
          </button>
          <Link href="/forgot">
            <a className={Style.login__link}>Quên mật khẩu</a>
          </Link>
          <p>
            Bạn chưa có tài khoản?{" "}
            <Link href="/register">
              <a className={Style.login__link}>Đăng ký</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
