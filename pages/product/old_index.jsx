import Style from "../../styles/product.module.css";
import Header from "../../components/header";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
const netPlus = [
  {
    id: "net1plus",
    image: "/product/net1plus.jpg",
    name: "Gói Net1Plus (tốc độ 30Mbps)",
    information: {
      "Băng thông": "30Mbps",
      "Giá cước nội thành tpHCM": "Không áp dụng",
      "Giá cước ngoại thành tpHCM": "185.000 VNĐ",
    },
  },
  {
    id: "net2plus",
    image: "/product/net2plus.jpg",
    name: "Gói Net2Plus (tốc độ 80Mbps)",
    information: {
      "Băng thông": "80Mbps",
      "Giá cước nội thành tpHCM": "200.000 VNĐ",
      "Giá cước ngoại thành tpHCM": "220.000 VNĐ",
    },
  },
  {
    id: "net3plus",
    image: "/product/net3plus.jpg",
    name: "Gói Net3Plus (tốc độ 110Mbps)",
    information: {
      "Băng thông": "110Mbps",
      "Giá cước nội thành tpHCM": "250.000 VNĐ",
      "Giá cước ngoại thành tpHCM": "230.000 VNĐ",
    },
  },
  {
    id: "net4plus",
    image: "/product/net4plus.jpg",
    name: "Gói Net4Plus (tốc độ 140Mbps)",
    information: {
      "Băng thông": "140Mbps",
      "Giá cước nội thành tpHCM": "300.000 VNĐ",
      "Giá cước ngoại thành tpHCM": "280.000 VNĐ",
    },
  },
];
const superNet = [
  {
    id: "supernet1",
    image: "/product/supernet1.jpg",
    name: "Supernet 1",
    information: {
      "Băng thông": "100Mbps",
      "Số lượng homewifi": "01 AP",
      "Số lượng thiết bị sử dụng": "7-20 thiết bị",
      "Giá cước nội thành tpHCM": "260.000 VNĐ",
      "Giá cước ngoại thành tpHCM": "245.000 VNĐ",
    },
  },
  {
    id: "supernet2",
    image: "/product/supernet2.jpg",
    name: "Supernet 2",
    information: {
      "Băng thông": "120Mbps",
      "Số lượng homewifi": "02 AP",
      "Số lượng thiết bị sử dụng": "10-35 thiết bị",
      "Giá cước nội thành tpHCM": "280.000 VNĐ",
      "Giá cước ngoại thành tpHCM": "260.000 VNĐ",
    },
  },
  {
    id: "supernet4",
    image: "/product/supernet4.jpg",
    name: "Supernet 4",
    information: {
      "Băng thông": "200Mbps",
      "Số lượng homewifi": "02 AP",
      "Số lượng thiết bị sử dụng": "14-40 thiết bị",
      "Giá cước nội thành tpHCM": "390.000 VNĐ",
      "Giá cước ngoại thành tpHCM": "370.000 VNĐ",
    },
  },
  {
    id: "supernet5",
    image: "/product/supernet5.jpg",
    name: "Supernet 5",
    information: {
      "Băng thông": "250Mbps",
      "Số lượng homewifi": "03 AP",
      "Số lượng thiết bị sử dụng": "20-50 thiết bị",
      "Giá cước nội thành tpHCM": "525.000 VNĐ",
      "Giá cước ngoại thành tpHCM": "480.000 VNĐ",
    },
  },
];

export default function Product() {
  const [productType, setProductType] = useState(1);
  const [product, setProduct] = useState(1);
  const [productLs, setProductLs] = useState(netPlus);
  const router = useRouter();
  function handleChangeType(type) {
    setProductType(type);
    setProduct(1);
    if (type === 1) {
      setProductLs(netPlus);
    } else {
      setProductLs(superNet);
    }
  }

  return (
    <div className={Style.product__overlay}>
      <Header scroll />
      <div className={Style.product__type}>
        <div
          className={`${Style.product__type__item} ${
            productType === 1 ? Style.product__type__item__active : ""
          }`}
          onClick={() => handleChangeType(1)}
        >
          Gói cước cơ bản
        </div>
        <div
          className={`${Style.product__type__item} ${
            productType === 2 ? Style.product__type__item__active : ""
          }`}
          onClick={() => handleChangeType(2)}
        >
          Gói cước nâng cao
        </div>
        <div
          className={`${Style.product__type__item} ${
            productType === 3 ? Style.product__type__item__active : ""
          }`}
          onClick={() => handleChangeType(3)}
        >
          Gói cước doanh nghiệp
        </div>
      </div>
      <div className={Style.product__content}>
        <i
          className={`fa-solid fa-angle-up ${Style.product__move}`}
          onClick={() =>
            setProduct((product) => (product <= 1 ? 1 : product - 1))
          }
          style={{
            visibility: product <= 1 ? "hidden" : "visible",
            animationDirection: "reverse",
          }}
        ></i>
        {productLs.map((productInformation, index) => (
          <div
            key={index}
            className={Style.product__content__item}
            style={{
              transform:
                product === index + 1 ? "rotateX(0)" : "rotateX(90deg)",
              height: product === index + 1 ? "200px" : "0",
            }}
          >
            <Image
              src={productInformation.image}
              alt="product1"
              width={250}
              height={250}
              className={Style.product__content__item__image}
            />
            <table className={Style.product__table}>
              <thead>
                <tr>
                  <th colSpan={2}>{productInformation.name}</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(productInformation.information).map(
                  (item, index) => (
                    <tr key={index}>
                      <td>{item}</td>
                      <td>{productInformation.information[item]}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ))}
        <i
          className={`fa-solid fa-angle-down ${Style.product__move}`}
          onClick={() =>
            setProduct((product) =>
              product >= productLs.length ? productLs.length : product + 1
            )
          }
          style={{
            visibility: product >= productLs.length ? "hidden" : "visible",
            animationDirection: "normal",
          }}
        ></i>
      </div>
      <button
        className={Style.product__button}
        onClick={() => {
          router.push(`/product/${productLs[product - 1].id}`);
        }}
      >
        Xem chi tiết
      </button>
    </div>
  );
}
