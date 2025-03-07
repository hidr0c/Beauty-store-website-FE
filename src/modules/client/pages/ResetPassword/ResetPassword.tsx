import styles from "./ResetPassword.module.scss"
import { Layout, Form, Input, Button, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../common/types/store.type";
import { resetPassword } from "../../../../features/auth/auth.thunk";
import { showAlert } from "../../../../features/alert/alert.slice";
import { showNotification } from "../../../../features/notifications/notification.slice";

const {Title} = Typography;
const ResetPassword = () => {

    const {resetToken} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const onFinish = async (values: {password: string, confirmPassword: string}) => {
        if(values.password !== values.confirmPassword) {
            dispatch(showAlert({
                type: 'error',
                message: 'Mật khẩu xác nhận không đúng'
            }))
            return;
        }
        try {
            await dispatch(resetPassword({
                token: resetToken as string,
                password: values.password
            })).unwrap();
            dispatch(showNotification({
                type: 'success',
                message: 'Đổi mật khẩu thành công'
            }))
        } catch {   
            dispatch(showNotification({
                type: 'error',
                message: 'Đổi mật khẩu không thành công'
            }))
        }
    }
    return (
        <Layout className={styles.reset}>
            <Content className={styles.reset__content}>
                <div className={styles.reset__inner}>
                    <Form 
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Title className={styles.reset__title} level={2}>Khôi phục mật khẩu<LockOutlined /> </Title>
                        <Form.Item 
                            label="Mật khẩu: " 
                            rules={[{
                                required: true,
                                message: 'Password ko được bỏ trống'
                            }]}
                            name="password"
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu của bạn..."/>
                        </Form.Item>
                        <Form.Item 
                            label="Xác nhận mật khẩu: " 
                            rules={[{
                                required: true,
                                message: 'Mật khẩu xác nhận ko được bỏ trống'
                            }]}
                            name="confirmPassword"
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu xác nhận của bạn..."/>
                        </Form.Item>
                        <Button className={styles.reset__btn} htmlType="submit">Khôi phục</Button>
                        <div className={styles.reset__other}>
                            Bạn đã có tài khoản ? <NavLink to={"/register"}>Đăng nhập</NavLink>
                        </div>
                    </Form>
                </div>
            </Content>
        </Layout>
    )
}

export default ResetPassword;