
import { Layout, Row, Col, Input, Button } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import styles from "./Footer.module.scss";
const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer className={styles.footer}>
      <div className="container">
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
            <h3>CÔNG TY TNHH PXT</h3>
            <p><strong>MST:</strong> 0312345678 do Sở KHĐT TP Hồ Chí Minh cấp</p>
            <p><strong>Địa chỉ:</strong> Số 15, Đường Nguyễn Văn Cừ, Phường 4, Quận 5, TP. Hồ Chí Minh</p>
            <p><strong>E-mail:</strong> contact.abc@gmail.com</p>
            <p><strong>Điện thoại:</strong> 028.62.345.678</p>
            <p><strong>Hotline:</strong> 0901.234.567 / 0987.654.321</p>

            </Col>

            <Col xs={24} sm={12} md={6}>
            <h3>THÔNG TIN HỖ TRỢ</h3>
            <p>Giới thiệu</p>
            <p>Liên hệ</p>
            <p>Chính sách thanh toán</p>
            <p>Chính sách khiếu nại</p>
            <p>Chính sách vận chuyển</p>
            </Col>

            <Col xs={24} sm={12} md={6}>
            <h3>DANH MỤC CHÍNH</h3>
            <p>Son Môi</p>
            <p>Nước Hoa</p>
            <p>Nước Hoa Nam</p>
            <p>Nước Hoa Nữ</p>
            <p>Trang Điểm Mặt</p>
            </Col>

            <Col xs={24} sm={12} md={6}>
            <h3>THEO DÕI CHÚNG TÔI</h3>
            <p>Đăng ký email để không bỏ lỡ các chương trình khuyến mãi</p>
            <Input placeholder="Email" style={{ width: "80%", marginRight: "10px" }} />
            <Button type="primary">Gửi</Button>
            <div style={{ marginTop: "10px" }}>
                <FacebookOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
                <InstagramOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
                <MailOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
                <LinkedinOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
                <YoutubeOutlined style={{ fontSize: "24px" }} />
            </div>
            </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default CustomFooter;
