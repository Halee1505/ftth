import Header from "../../../components/Header";
import Style from "../../../styles/productDetail.module.css";
import { useRouter } from "next/router";
import Breadcrumb from "../../../components/breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";

const formatter = new Intl.NumberFormat("vn-Vi", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 3,
});

export default function ProductDetail() {
  const router = useRouter();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:1505/action/product-type/${router.query.productId}`
      )
      .then((res) => {
        setProduct(res.data);
      });
  }, [router.query.productId]);
  const breadcrumb = [
    {
      name: "Sản phẩm",
      link: "/product",
    },
    {
      name: product.find((item) => item.type_key === router.query.productId)
        ? product.find((item) => item.type_key === router.query.productId).type
        : "",
      link: `/product/${router.query.productId}`,
    },
  ];
  return (
    <div>
      <Header scroll />
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className={Style.productDetail__overlay}>
        <div className={Style.productDetail__content}>
          {product.map((item, index) => {
            return (
              <div
                key={index}
                className={Style.productDetail__content__item}
                onClick={() => {
                  router.push(
                    `/product/${router.query.productId}/${item.name}`
                  );
                }}
              >
                <h2>{item.name.toUpperCase()}</h2>
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
        </div>
      </div>
    </div>
  );
}
