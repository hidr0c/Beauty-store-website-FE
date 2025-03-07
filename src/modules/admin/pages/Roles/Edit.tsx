import { Button, Form, Input, Modal } from "antd"
import { CruProps } from "../../../../common/interfaces/cru-props.interface"
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import styles from "./Roles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../common/types/store.type";
import { useEffect } from "react";
import { fetchRoleById, updateRole } from "../../../../features/roles/roles.thunk";
import { useForm } from "antd/es/form/Form";
import { EditOutlined } from "@ant-design/icons";
import { UpdateRole } from "../../../../features/roles/types/update-role.type";
import { showAlert } from "../../../../features/alert/alert.slice";
const Edit = (cruProps: CruProps) => {
    const {open, setOpen, id = ''} = cruProps;
    const roles = useSelector((state: RootState) => state.roles);
    const dispatch = useDispatch<AppDispatch>();
    const [form] = useForm();

    useEffect(() => {
        dispatch(fetchRoleById(id as string))
    },[dispatch, id])

    useEffect(() => {
        if(roles.item) {
            form.setFieldsValue({
                title: roles.item.title,
                description: roles.item.description
            });
        }
    },[form, roles.item])

    const onFinish = async (values: UpdateRole) => {
        try {
            await dispatch(updateRole({id, role: values})).unwrap()
            dispatch(showAlert({type: 'success', message: 'Cập nhật role thành công'}))
            setOpen(false)
        } catch {
            dispatch(showAlert({type: 'success', message: 'Cập nhật role thất bại'}))
        }
    }
    return (
        <Modal
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >   
                <Title  className={styles.create__title} level={2}>Sửa Vai trò</Title>
                <Form.Item label="Tiêu đề" required name="title">
                    <Input placeholder="Tiêu đề..." />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                * Cập nhật phân quyền ở side phân quyền
                <Button 
                    className={styles.btn__create__submit}
                    htmlType="submit"
                    icon={<EditOutlined />}
                    iconPosition="end"
                >
                    Sửa
                </Button>
            </Form>
        </Modal>
    )
}

export default Edit