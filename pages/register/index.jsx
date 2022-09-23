import Image from "next/image";
import Style from "../../styles/register.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState({
    phone: "",
    password: "",
    repassword: "",
  });

  function handleChange(e) {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit() {
    axios.post("http://localhost:1505/user", registerInfo).then((res) => {
      if (res.data === "Curr use") {
        alert("Tài khoản đã tồn tại");
      } else {
        alert("Đăng ký thành công");
        router.push("/login");
      }
    });
  }

  return (
    <div className={Style.register__overlay}>
      <div className={Style.register__navbar}>
        <div className={Style.register__logo}>
          <Image src="/logo-white.png" alt="logo" width={200} height={200} />
        </div>
      </div>
      <div className={Style.register__content}>
        <div className={Style.register__logo1}>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>
        <div className={Style.register__content__title}>Đăng ký</div>

        <div className={Style.register__form}>
          <input
            className={Style.register__input}
            type="text"
            placeholder="Số điện thoại"
            defaultValue={registerInfo.phone}
            name="phone"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            className={Style.register__input}
            type="password"
            placeholder="Mật khẩu"
            defaultValue={registerInfo.password}
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            className={Style.register__input}
            type="password"
            placeholder="Nhập lại mật khẩu"
            defaultValue={registerInfo.repassword}
            name="repassword"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <p
            className={Style.register__checkpass}
            style={{
              opacity:
                registerInfo.repassword === "" ||
                (registerInfo.password !== "" &&
                  registerInfo.password === registerInfo.repassword)
                  ? 0
                  : 1,
            }}
          >
            Mật khẩu không khớp
          </p>
          <button
            disabled={
              registerInfo.username === "" ||
              registerInfo.phone === "" ||
              registerInfo.password === "" ||
              registerInfo.repassword === ""
            }
            className={Style.register__button}
            type="button"
            onClick={handleSubmit}
          >
            Đăng ký
          </button>
          <p>
            Bạn đã có tài khoản?{" "}
            <Link href="/login">
              <a className={Style.register__link}>Đăng nhập</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
