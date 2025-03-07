import styles from "./ForgotPassword.module.scss"
import { Layout, Form, Input, Checkbox, Flex, Button, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../common/types/store.type";
import { forgotPassword } from "../../../../features/auth/auth.thunk";
import { showNotification } from "../../../../features/notifications/notification.slice";

const {Title} = Typography
const ForgotPassword = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const onFinish = async (values: {email: string}) => {
        const {email} = values
        try {
            await dispatch(forgotPassword(email)).unwrap();
            dispatch(showNotification({
                type: 'success',
                message: 'Chúng tôi đã gữi mã OTP',
                description: 'Vui lòng truy cập vào gmail để lấy Otp và xác thực'
            }))
            navigate(`/verify-otp?email=${email}`)
        } catch{
            dispatch(showNotification({
                type: 'error',
                message: 'Có lỗi xảy ra'
            }))
        }
    }
    return (
        <Layout className={styles.forgot}>
            <Content className={styles.forgot__content}>
                <div className={styles.forgot__inner}>
                    <Form 
                        layout="vertical"
                        onFinish={onFinish} 
                    >
                        <Title className={styles.forgot__title} level={2}>Quên mật khẩu <LockOutlined /> </Title>
                        <Form.Item 
                            label="Email: " 
                            rules={[{
                                required: true,
                                message: 'Email ko được bỏ trống'
                            }]}
                            name="email"
                        >
                            <Input type="email" prefix={<MailOutlined />} placeholder="Nhập email của bạn..."/>
                        </Form.Item>
                        <Button className={styles.forgot__btn} htmlType="submit"  >Xác nhận</Button>
                        <div className={styles.forgot__other}>
                            Bạn đã có tài khoản ? <NavLink to={"/register"}>Đăng nhập</NavLink>
                        </div>
                    </Form>
                </div>
            </Content>
        </Layout>
    )
}

export default ForgotPassword