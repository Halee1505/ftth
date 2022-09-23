import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Popup from "reactjs-popup";
import Style from "../../styles/product.module.css";
import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();

  return (
    <React.Fragment>
      <Header scroll />
      <div className={Style.product__overlay}>
        <Popup
          trigger={
            <div className={Style.product__item}>
              <div className={Style.product__item__image}></div>
              <div className={Style.product__item__title}>
                <h3>Internet</h3>
                <h3>Viettel phổ thông</h3>
              </div>
            </div>
          }
          position="right center"
          modal
        >
          {(close) => (
            <div
              className={Style.product__description__overlay}
              onClick={close}
            >
              <div className={Style.product__item}>
                <div className={Style.product__item__image}></div>
                <div className={Style.product__item__title}>
                  <h3>Internet</h3>
                  <h3>Viettel phổ thông</h3>
                </div>
              </div>
              <div className={Style.product__description}>
                <p className={Style.product__description__text}>
                  Tổng hợp các gói cước internet Viettel phổ thông,{" "}
                  <span
                    className={`${Style.product__description__text} ${Style.product__description__text__red}`}
                  >
                    sử dụng cáp quang để kết nối wifi
                  </span>{" "}
                  cho bạn và gia đình bạn
                </p>
                <br />
                <p className={Style.product__description__text}>
                  Bên cạnh đó bạn có thể dễ dàng ĐĂNG KÝ gói cước viettel
                  Internet phù hợp cho bạn.
                </p>
                <button
                  className={Style.product__description__button}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/product/basic");
                  }}
                >
                  Xem các sản phẩm
                </button>
              </div>
            </div>
          )}
        </Popup>
        <Popup
          trigger={
            <div className={Style.product__item}>
              <div className={Style.product__item__image}></div>
              <div className={Style.product__item__title}>
                <h3>Internet</h3>
                <h3>được trang bị HOMEWIFI</h3>
              </div>
            </div>
          }
          position="left center"
          modal
        >
          {(close) => (
            <div
              className={Style.product__description__overlay}
              onClick={close}
            >
              <div className={Style.product__item}>
                <div className={Style.product__item__image}></div>
                <div className={Style.product__item__title}>
                  <h3>Internet</h3>
                  <h3>được trang bị HOMEWIFI</h3>
                </div>
              </div>
              <div className={Style.product__description}>
                <p className={Style.product__description__text}>
                  Tổng hợp các gói cước internet Viettel được trang bị miễn phí{" "}
                  <span
                    className={`${Style.product__description__text} ${Style.product__description__text__red}`}
                  >
                    thiết bị homeWIFI.
                  </span>
                </p>
                <p className={Style.product__description__text}>
                  Với mức giá vô cùng ưu đãi và được
                  <span
                    className={`${Style.product__description__text} ${Style.product__description__text__red}`}
                  >
                    hỗ trợ thiết bị thông minh homeWIFI.
                  </span>
                </p>
                <p className={Style.product__description__text}>
                  Khi sử dụng gói cước Viettel internet homeWifi, bạn còn được
                  <span
                    className={`${Style.product__description__text} ${Style.product__description__text__red}`}
                  >
                    tặng 1 tháng khi đóng trước gói cước 6 tháng, tặng 2 tháng
                    khi đóng trước gói cước 12 tháng, tặng 3 tháng khi đóng
                    trước gói cước 18 tháng.
                  </span>
                </p>
                <br />
                <button
                  className={Style.product__description__button}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/product/homeWIFI");
                  }}
                >
                  Xem các sản phẩm
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
      <Footer />
    </React.Fragment>
  );
}
