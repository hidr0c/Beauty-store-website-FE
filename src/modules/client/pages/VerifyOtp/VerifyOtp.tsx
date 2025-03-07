import { Button, Form, Input, Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import styles from "./VerifyOtp.module.scss";
import Title from "antd/es/typography/Title";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../common/types/store.type";
import { verifyOtp } from "../../../../features/auth/auth.thunk";
import { showAlert } from "../../../../features/alert/alert.slice";

const VerifyOtp = () => {
    const [param] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const onFinish = async (values: {otp: string}) => {
        
        try {
            
            await dispatch(verifyOtp({
                email: param.get('email') as string,
                otp: values.otp
            })).unwrap()
            dispatch(showAlert({
                type: 'success',
                message: 'Xác thực OTP thành công'
            }))
            navigate("/reset-password")
        } catch {
            dispatch(showAlert({
                type: 'error',
                message: 'Xác thực OTP thất bại'
            }))
        }
    }
    return (
        <Layout className={styles.verify}>
            <Content className={styles.verify__content}>
                <div className={styles.verify__inner}>
                    <Form 
                        layout="vertical" 
                        onFinish={onFinish}
                    >
                        <Title style={{textAlign: 'center'}} level={2}>Xác thực OTP</Title>
                        <Form.Item label="Email">
                            <Input disabled value={param.get('email') as string}/>
                        </Form.Item>
                        <Form.Item label="Mã OTP: " name="otp">
                            <Input.OTP 
                                length={6} 
                                color="pink"
                                variant="filled"
                            />
                        </Form.Item>
                        <Button 
                            className={styles.verify__btn}
                            htmlType="submit"
                        >
                            Xác thực
                        </Button>
                    </Form>
                </div>
            </Content>
        </Layout>
        
    )
}

export default VerifyOtp