import { LockOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import styles from "./Profile.module.scss";

const AuthTab = () => {


    return (
        <Form layout="vertical">
            <Form.Item 
                label="Mật khẩu hiện tại" 
                name="currentPassword" 
                required
            >
                <Input.Password  
                    placeholder="Nhập mật khẩu hiện tại..."
                    prefix={<LockOutlined />}
                />
            </Form.Item>
            <Form.Item 
                label="Mật khẩu mới" 
                name="newPassword" 
                required
            >
                <Input.Password 
                    placeholder="Nhập mật khẩu mới"
                    prefix={<LockOutlined />}
                />
            </Form.Item>
            <Form.Item 
                label="Xác nhận mật khẩu" 
                required 
                name="confirmPassword"
            >
                <Input 
                    prefix={<LockOutlined />} 
                    type="password" 
                    placeholder="Xác nhận mật khẩu"
                />
            </Form.Item>
            <Button 
                icon={<LockOutlined />}
                className={styles.btn__password}
            >
                Đổi mật khẩu
            </Button>
        </Form>
    )
}

export default AuthTab