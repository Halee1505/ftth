import Header from "../../components/header";
import Footer from "../../components/footer";
import Style from "../../styles/guide.module.css";
import Image from "next/image";
import Link from "next/link";
export default function BuyGuide() {
  return (
    <div className={Style.buy__guide__overlay}>
      <Header scroll />
      <div className={Style.buy__guide}>
        <div className={Style.buy__guide__title}>
          <h2>cách đăng ký lắp đặt gói internet viettel</h2>
          <hr width="60%" align="left" />
          <Image src="/buyguide.png" alt="buyguide" width={600} height={600} />
          <p>
            Viettel đang có những gói cước khác nhau phù hợp với nhu cầu của
            khách hàng. Dưới đây là các bước đăng ký lắp đặt:
          </p>
        </div>
        <div className={Style.buy__guide__content}>
          <h3>1. Tùy chọn gói cước</h3>

          <p>
            Để đăng ký lắp đặt gói cước, khách hàng cần chọn gói cước phù hợp
            với nhu cầu của mình. Xem thông tin gói cước{" "}
            <Link href="/product">tại đây</Link>
          </p>
          <Image
            src="/buyguide1.jpg"
            alt="buyguide1"
            width={1000}
            height={600}
          />
          <h3>2. Xem thông tin chi tiết</h3>
          <p>
            Sau khi chọn gói cước, khách hàng cần xem thông tin chi tiết về gói
            cước. Để biết thêm thông tin gói cước, vui lòng bấm xem chi tiết.
          </p>
          <Image
            src="/buyguide2.jpg"
            alt="buyguide2"
            width={1000}
            height={600}
          />
          <h3>3. Điền thông tin đăng ký</h3>
          <p>
            Chi tiết gói cước được hiển thị như hình dưới. Sau khi xem thông tin
            chi tiết gói cước, vui lòng điền thông tin cá nhân ở cột bên phải.
          </p>
          <Image
            src="/buyguide3.jpg"
            alt="buyguide3"
            width={1000}
            height={600}
          />
          <p>Cuối cùng bấm đăng ký để hoàn tất quá trình đăng ký lắp đặt.</p>
          <h6>Sau khi đăng ký, nhân viên tư vấn sẽ liên lạc cho bạn</h6>
          <p>
            <Link href="/product">Đăng ký</Link> ngay để hưởng ưu đãi!!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
