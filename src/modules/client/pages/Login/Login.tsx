import { Layout, Typography, Form, Input, Checkbox, Space, Flex, Button } from "antd";
import styles from "./Login.module.scss";
import { Content } from "antd/es/layout/layout";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { Login } from "../../../../features/auth/interfaces/login.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../common/types/store.type";
import { loginUser } from "../../../../features/auth/auth.thunk";
import { showAlert } from "../../../../features/alert/alert.slice";
import { RoleUser } from "../../../../constants/role.constant";
import { ErrorData } from "../../../../common/interfaces/error-data.interface";

const {Title} = Typography

const Login = () => {
    
    const [form] = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const onFinish = async (values: Login) => {
        try {
            const {roleId} = await dispatch(loginUser(values)).unwrap();
            dispatch(showAlert({type: 'success',message: 'Đăng nhập thành công'}));

            if(roleId === RoleUser) {
                navigate("/"); 
            } else {
                navigate("/admin/dashboard");
            }

        } catch (error: ErrorData) {
            console.log(error)
            dispatch(showAlert({type: 'error', message: error.message}))
        }

    }
    return (
        <Layout className={styles.login}>
            <Content className={styles.login__content}>
                <div className={styles.login__inner}>
                    <Form 
                        layout="vertical" 
                        form={form}
                        onFinish={onFinish}
                    >
                        <Title className={styles.login__title} level={2}>Đăng nhập</Title>
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
                        <Form.Item 
                            label="Password: "
                            name="password"
                            rules={[{
                                required: true, 
                                message: 'Mật khẩu không được bỏ trống'
                            }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Nhập password của bạn..."/>
                        </Form.Item>
                        <Flex justify="space-between">
                            <Form.Item>
                                <Checkbox>Ghi nhớ tôi</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Link to={"/forgot-password"}> Quên mật khẩu ?</Link>
                            </Form.Item>
                        </Flex>
                        <Button className={styles.login__btn} htmlType="submit"  >Đăng nhập</Button>
                        <div className={styles.login__other}>
                            Bạn chưa có tài khoản ? <NavLink to={"/register"}>Đăng ký</NavLink>
                        </div>
                    </Form>
                </div>
            </Content>
        </Layout>
    )
}

export default Login