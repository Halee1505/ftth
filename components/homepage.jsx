import Style from "../styles/homepage.module.css";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";

export default function HomePage() {
  return (
    <div className={Style.homepage__overlay}>
      <div className={Style.homepage__view1}>
        <div className={Style.homepage__title}>
          <h1>Dịch vụ cáp quang FTTH</h1>
          <h1 className={Style.homepage__view}>
            <Link href="/product"> Xem sản phẩm </Link>
            <i className="fa-solid fa-angle-right"></i>
          </h1>
        </div>
      </div>
      <p className={Style.homepage__content1}>
        FTTH là công nghệ kết nối viễn thông hiện đại trên thế giới với đường
        truyền dẫn hoàn toàn bằng cáp quang từ nhà cung cấp dịch vụ tới tận địa
        điểm của khách hàng. Tính ưu việt của công nghệ cho phép thực hiện tốc
        độ truyền tải dữ liệu Internet xuống/lên (download/upload) ngang bằng
        với nhau. Tốc độ có thể gấp 200 lần so với công nghệ ADSL.
      </p>
      <div className={Style.homepage__capquang}>
        <Image
          src="/Cap_quang_ftth.png"
          alt="Picture of the author"
          width={1219}
          height={511}
        />
      </div>
      <p className={Style.homepage__content1}>
        Với băng thông cao, dịch vụ FTTH do Viettel cung cấp giúp các doanh
        nghiệp và tổ chức kết nối siêu tốc đến các ứng dụng như mail server,
        hosting,v.v.. Đối với các gia đình, FTTH giúp khách hàng truy cập
        internet nhanh siêu tốc và đặc biệt là dễ dàng lắp đặt thêm dịch vụ
        truyền hình số HD, camera quan sát,v.v…
      </p>
      <h2>Ưu điểm của dịch vụ FTTH do Viettel cung cấp</h2>
      <div className={Style.homepage__ud__overlay}>
        <div className={Style.homepage__ud}>
          <Image
            src="/ud1.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
        <div className={Style.homepage__ud}>
          <Image
            src="/ud2.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
        <div className={Style.homepage__ud}>
          <Image
            src="/ud3.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
        <div className={Style.homepage__ud}>
          <Image
            src="/ud4.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
        <div className={Style.homepage__ud}>
          <Image
            src="/ud5.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
        <div className={Style.homepage__ud}>
          <Image
            src="/ud6.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
      </div>
      <h2>Đối tượng sử dụng dịch vụ</h2>
      <div className={Style.homepage__use}>
        <div className={Style.homepage__use__item}>
          <Image
            src="/teamwork 1.png"
            alt="Picture of the author"
            width={300}
            height={300}
          />
          <h4>
            Cá nhân, hộ gia đình, cửa hàng kinh doanh, đại lý internet công
            cộng.
          </h4>
        </div>
        <div className={Style.homepage__use__item}>
          <Image
            src="/buildings 1.png"
            alt="Picture of the author"
            width={300}
            height={300}
          />
          <h4>Các cơ quan, doanh nghiệp, tổ chức.</h4>
        </div>
      </div>
    </div>
  );
}
