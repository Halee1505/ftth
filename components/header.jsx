// @refresh reset
import Style from "../styles/header.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import UserChat from "./user.chat";

// const user = Cookies.get("user");
export default function Header({ scroll }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    if (Cookies.get("user")) {
      setUser(Cookies.get("user"));
    }
  }, []);

  const router = useRouter();
  if (scroll) {
    return (
      <div className={Style.header__title__scroll}>
        <UserChat />
        <div
          onClick={() => router.push("/")}
          className={Style.header__title__scroll__title}
        ></div>
        <div className={Style.header__about}>
          <div
            className={Style.header__items}
            onClick={() => {
              router.push("/product");
            }}
          >
            <p>Sản phẩm</p>
          </div>
          <div className={Style.header__items}>
            <p>
              Hướng dẫn <i className="fa-solid fa-angle-down"></i>
            </p>
            <div className={Style.header__show__item}>
              <p
                onClick={() => {
                  router.push("/guide/buy-product");
                }}
              >
                Đăng ký mua sản phẩm
              </p>
              {/* <p>Nạp tiền</p>
              <p>Hướng dẫn sử dụng sản phẩm</p>
              <p>Tra cứu hóa đơn</p> */}
            </div>
          </div>
          {/* <div className={Style.header__items}>
            <p>
              Câu hỏi thường gặp <i className="fa-solid fa-angle-down"></i>{" "}
            </p>
            <div className={Style.header__show__item}>
              <p>Đăng ký</p>
              <p>Gia hạn gói cước</p>
              <p>Thông tin tài khoản</p>
              <p>Thông tin dịch vụ</p>
            </div>
          </div> */}
          {/* <div className={Style.header__items}>
            <p>
              Tin tức <i className="fa-solid fa-angle-down"></i>
            </p>
          </div> */}
          <div className={Style.header__items}>
            <a href="#contact">Liên hệ</a>
          </div>
          <div>
            <input
              className={Style.top__search}
              type="text"
              placeholder="Tìm kiếm"
            />
            <i
              className={`fa-solid fa-magnifying-glass ${Style.top__search__icon}`}
            ></i>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={Style.top}>
        <UserChat />
        <div className={Style.top__content}>
          <div>
            <i className={`fa-solid fa-phone ${Style.top__icon}`}></i>
            <a className={Style.top__text} href="tel:0966293779">
              0966293779
            </a>
          </div>
          <div>
            <i className={`fa-solid fa-envelope ${Style.top__icon}`}></i>
            <a
              className={Style.top__text}
              href="mailto:nguyennamtrung.viettel@gmail.com"
            >
              nguyennamtrung.viettel@gmail.com
            </a>
          </div>
        </div>
        <div className={Style.top__content}>
          {user ? (
            <span>Xin chào {user}</span>
          ) : (
            <>
              <button
                className={Style.top__button}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Đăng nhập
              </button>
              <button
                className={Style.top__button}
                onClick={() => {
                  router.push("/register");
                }}
              >
                Đăng kí
              </button>
            </>
          )}

          {user ? (
            <button
              className={Style.top__button}
              onClick={() => {
                Cookies.remove("user");
                router.push("/login");
              }}
            >
              Đăng xuất
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={Style.header__title}>
        <div
          style={{
            height: "4rem",
            width: "8rem",
            backgroundSize: "cover",
            backgroundImage:
              "url(https://i.pinimg.com/originals/d8/64/da/d864dae9f4a980a58011d76a0e0d0212.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            marginLeft: "10%",
            cursor: "pointer",
          }}
        ></div>
        <div className={Style.header__about}>
          <div
            className={Style.header__items}
            onClick={() => {
              router.push("/product");
            }}
          >
            <p>Sản phẩm</p>
          </div>
          <div className={Style.header__items}>
            <p>
              Hướng dẫn <i className="fa-solid fa-angle-down"></i>
            </p>
            <div className={Style.header__show__item}>
              <p
                onClick={() => {
                  router.push("/guide/buy-product");
                }}
              >
                Đăng ký mua sản phẩm
              </p>
              {/* <p>Nạp tiền</p>
              <p>Hướng dẫn sử dụng sản phẩm</p>
              <p>Tra cứu hóa đơn</p> */}
            </div>
          </div>
          {/* <div className={Style.header__items}>
            <p>
              Câu hỏi thường gặp <i className="fa-solid fa-angle-down"></i>{" "}
            </p>
            <div className={Style.header__show__item}>
              <p>Đăng ký</p>
              <p>Gia hạn gói cước</p>
              <p>Thông tin tài khoản</p>
              <p>Thông tin dịch vụ</p>
            </div>
          </div> */}
          {/* <div className={Style.header__items}>
            <p>
              Tin tức <i className="fa-solid fa-angle-down"></i>
            </p>
          </div> */}
          <div className={Style.header__items}>
            <a href="#contact">Liên hệ</a>
          </div>
          <div>
            <input
              className={Style.top__search}
              type="text"
              placeholder="Tìm kiếm"
            />
            <i
              className={`fa-solid fa-magnifying-glass ${Style.top__search__icon}`}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
