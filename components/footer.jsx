import Link from "next/link";
export default function Footer() {
  return (
    <footer
      className="text-center text-lg-start text-muted"
      style={{
        backgroundColor: "#ef0032",
      }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <div
                  style={{
                    height: "4rem",
                    width: "8rem",
                    backgroundSize: "cover",
                    backgroundImage:
                      "url(https://res.cloudinary.com/vitamim/image/upload/v1661274143/source/logo-white_mlqfnh.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    marginLeft: "10%",
                    cursor: "pointer",
                  }}
                ></div>
              </h6>
              <p className=" text-white">
                Viettel TP.Hồ Chí Minh - Chi nhánh Tập đoàn Công nghiệp - Viễn
                thông Quân đội.
                <br /> Địa chỉ: 285 Cách Mạng Tháng Tám, P.12, Q.10, TPHCM -
                Hotline: 0966293779 - Email: nguyennamtrung.viettel@gmail.com
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">
                Về chúng tôi
              </h6>
              <p>
                <Link href="#!" className=" text-white">
                  Thông tin chung
                </Link>
              </p>
              <p>
                <Link href="#!" className=" text-white">
                  Sứ mệnh và tầm nhìn
                </Link>
              </p>
              <p>
                <Link href="#!" className=" text-white">
                  Liên hệ
                </Link>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4  text-white">
                Hướng dẫn
              </h6>
              <p>
                <Link href="/guide/buy-product" className=" text-white">
                  Đăng ký mua sản phẩm
                </Link>
              </p>
              <p>
                <Link href="#!" className=" text-white">
                  Nạp tiền
                </Link>
              </p>
              <p>
                <Link href="#!" className=" text-white">
                  Sử dụng sản phẩm
                </Link>
              </p>
              <p>
                <Link href="#!" className=" text-white">
                  Tra cứu hóa đơn
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6
                id="contact"
                className="text-uppercase fw-bold mb-4  text-white"
              >
                Liên hệ
              </h6>
              <p className=" text-white">
                <i className="fas fa-envelope me-3 text-white"></i>
                nguyennamtrung.viettel@gmail.com
              </p>
              <p className=" text-white">
                <i className="fas fa-phone me-3 text-white"></i>0966293779
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
