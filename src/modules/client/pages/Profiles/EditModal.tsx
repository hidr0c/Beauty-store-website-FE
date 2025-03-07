import { Modal, Form, Input, Radio, Button, Typography } from "antd";
import { Gender } from "../../../../constants/app.constant";
import styles from "./Profile.module.scss"
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../common/types/store.type";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { formatForInput } from "../../../../utils/format";
import { updateUser } from "../../../../features/users/users.thunk";
import { UpdateUser } from "../../../../features/users/types/update-user.type";
import { showAlert } from "../../../../features/alert/alert.slice";
import { UUID } from "../../../../common/types/uuid.type";

const {Title} = Typography;

interface EditTabProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const EditModal = (props: EditTabProps) => {
    const {open, setOpen} = props;
    const [form] = useForm();
    const {currentUser} = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if(currentUser) {
            form.setFieldsValue({
                fullName: currentUser?.fullName,
                gender: currentUser?.gender,
                birthDate: formatForInput(currentUser?.birthDate as Date)
            })
        }
    },[form, currentUser])

    const onFinish =async (values: UpdateUser) => {
        try {
            await dispatch(updateUser({id: currentUser?.id as UUID, data: values})).unwrap();
            dispatch(showAlert({type: 'success', message: 'Cập nhật thành công'}))
            setOpen(false)
        } catch {
            dispatch(showAlert({type: 'error',message: 'Cập nhật thất bại'}))
        }
    }
    return (
        <Modal
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
        >
            <Form 
                form={form} 
                layout="vertical"
                onFinish={onFinish}
            >
                <Title className={styles.update__title} level={3}>Cập nhật</Title>
                <Form.Item label="Họ và tên" name="fullName">
                    <Input placeholder="Họ và tên..."/>
                </Form.Item>
                <Form.Item label="Giới tính" name="gender">
                    <Radio.Group>
                        <Radio value={Gender.MALE}>Nam</Radio>
                        <Radio value={Gender.FEMALE}>Nữ</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="birthDate">
                    <Input type="date"  />
                </Form.Item>
                <Button 
                    icon={<EditOutlined />} 
                    iconPosition="end" 
                    className={styles.btn__submit__update}
                    htmlType="submit"
                >
                    Cập nhật
                </Button>
            </Form>
        </Modal>
    )
}

export default EditModal