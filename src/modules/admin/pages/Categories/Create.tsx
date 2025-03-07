import { Button, Form, Input, Modal, Radio, Upload } from "antd"
import { CruProps } from "../../../../common/interfaces/cru-props.interface"
import Title from "antd/es/typography/Title";
import { StatusActiveEnum } from "../../../../constants/app.constant";
import { useForm } from "antd/es/form/Form";
import styles from "./Categories.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { CreateCategory } from "../../../../features/categories/types/create-category.interface";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../common/types/store.type";
import { createCategory } from "../../../../features/categories/categories.thunk";
import { showAlert } from "../../../../features/alert/alert.slice";
import { uploadSingle } from "../../../../features/upload/upload.thunk";
const {TextArea} = Input

const Create = (cruProps: CruProps) => {
    const {open, setOpen} = cruProps;
    const [form] = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const [fileList, setFileList] = useState<any[]>([]);

    const onFinish = async (values: CreateCategory) => {

        const {title, description, status} = values
        try {
            const formData = new FormData();
            formData.append("file", fileList[0].originFileObj); 
            const data = await dispatch(uploadSingle(formData)).unwrap();
            await  dispatch(createCategory({
                title,
                description,
                status,
                thumbnail: data.url 
            })).unwrap()
            setOpen(false)
            dispatch(showAlert({type: 'success', message: 'Thêm danh mục thành công'}))
            form.resetFields();
            setFileList([]);
        } catch (error) {
            console.log(error)
            dispatch(showAlert({type: 'error', message: 'Thêm danh mục thất bại'}))
        }
    }

    const handleUploadChange = ({fileList}: any) => {
        setFileList(fileList);
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
                <Title level={2} className={styles.create__title}>Thêm danh mục</Title>
                <Form.Item label="Tiêu đề" name="title" required>
                    <Input placeholder="Tiêu đề..." />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={(file) => {
                            const isImage = file.type.startsWith("image/");
                            if(!isImage) {
                                dispatch(showAlert({type: 'error', message: 'Chỉ chấp nhận tệp hình ảnh'}))
                            }
                            return isImage
                        }}
                        onChange={handleUploadChange}
                    >   
                        <PlusOutlined />
                         Upload
                    </Upload>
                </Form.Item>
                <Form.Item label="Mô tả">
                    <TextArea placeholder="Mô tả..." rows={4}/>
                </Form.Item>
                <Form.Item label="Trạng thái">
                    <Radio.Group>
                        <Radio value={StatusActiveEnum.ACTIVE}>Hoạt động</Radio>
                        <Radio value={StatusActiveEnum.INACTIVE}>Không hoạt động</Radio>
                    </Radio.Group>
                </Form.Item>
                <Button 
                    className={styles.btn__create__submit}
                    htmlType="submit"
                >
                    Thêm
                </Button>
            </Form>

        </Modal>
    )
}

export default Create