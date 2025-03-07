import { EditOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Flex, Form, Input, InputNumber, Modal, Upload, Typography, Radio} from "antd"
import { CruProps } from "../../../../common/interfaces/cru-props.interface"
import { DiscountPercentage } from "../../../../constants/app.constant"
import styles from "./Products.module.scss"
import { useEffect, useState } from "react"
import CategoryModal from "../../components/ui/CategorySelectModal/CategorySelectModal"
import { useForm } from "antd/es/form/Form"
import { InputFormatPrice } from "../../../../components/Input/InputFormatPrice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../common/types/store.type"
import { fetchProductById, updateProduct } from "../../../../features/products/products.thunk"
import { showAlert } from "../../../../features/alert/alert.slice"
import { uploadMulti, uploadSingle } from "../../../../features/upload/upload.thunk"
import { UpdateProduct } from "../../../../features/products/types/update-product.type"
const {TextArea} = Input
const {Title} = Typography


const Edit = (props: CruProps) => {

    const {open, setOpen, id = ''} = props
    const [form] = useForm();
    const [openCategory, setOpenCategory] = useState<boolean>(false);

    const {item, error} = useSelector((state: RootState) => state.products);
    const [thumbnails, setThumbnails] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    const onFinish = async (values: UpdateProduct) => {
        try {
            //THUMBNAIL
            if(thumbnails.length > 0) {
                const formThumbnails = new FormData();
                formThumbnails.append('file',thumbnails[0].originFileObj);
                const {url} = await dispatch(uploadSingle(formThumbnails)).unwrap();
                values.thumbnail = url
            } 
            //IMAGES 
            if(images.length > 0) {
                const formImages = new FormData();
                images.forEach((item) => {
                    formImages.append('files', item.originFileObj)
                })
                const {urls} = await dispatch(uploadMulti(formImages)).unwrap();
                values.images = urls
            }
            await dispatch(updateProduct({id, data: values})).unwrap();
            dispatch(showAlert({type: 'success', message: 'Cập nhật sản phẩm thành công'}))
            setThumbnails([]);
            setImages([]);
            setOpen(false);
            
        } catch  {
            dispatch(showAlert({type: 'error',message: 'Lỗi không thể cập nhật sản phẩm'}))
        }
    }
    useEffect(() => {
        dispatch(fetchProductById(id))
    },[dispatch, id])
    
    

    useEffect(() => {
        if(item) {
            form.setFieldsValue({
                title: item?.title,
                description: item?.description,
                discountPercentage: item?.discountPercentage,
                status: item?.status,
                categoryId: item?.category,
                price: item?.price
            })
        }
    },[form, item])
    return (
        <Modal
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            centered
            width={900}
        >
            <Form 
                form={form} 
                layout="vertical"
                onFinish={onFinish}
            >
                <Title className={styles.title} level={2}>Sửa sản phẩm</Title>
                <Form.Item 
                    label="Tiêu đề" 
                    name="title"
                    rules={[{
                        required: true,
                        message: 'Tiêu đề không được bỏ trống'
                    }]}
                >
                    <Input placeholder="Tiêu đề..." />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                >
                    <TextArea rows={4}/>
                </Form.Item>
                <Flex justify="space-between">
                    {/* THUMBNAIL  */}
                    <Form.Item
                        label="Ảnh thu nhỏ"
                        name="thumbnail"
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={1}
                            onChange={(info) => setThumbnails(info.fileList)}
                        >
                            Upload
                            
                        </Upload>
                        
                        
                    </Form.Item>
                    {/* IMAGES */}
                    <Form.Item
                        label="Ảnh con"
                        name="images"
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={4}
                            onChange={(info) => setImages(info.fileList)}
                            
                        >
                            Upload 
                        </Upload>
                        
                    </Form.Item>
                </Flex>
                    
                <Flex justify="space-between" gap={50}>
                    
                    <Form.Item label="% giảm giá" name="discountPercentage" required>
                        <InputNumber

                            min={DiscountPercentage.MIN} 
                            defaultValue={0}
                        />
                    </Form.Item>
                    <Form.Item label="Trạng thái" name="status" required>
                        <Radio.Group>
                            <Radio value="active">Hoạt động</Radio>
                            <Radio value="inactive">Không hoạt động</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Danh mục"
                    >
                        <Button icon={<SearchOutlined />} onClick={() => setOpenCategory(true)}>
                            Danh mục
                        </Button>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item label="Giá tiền" name="price" required>
                        <InputFormatPrice customInput={Input as any}/>
                    </Form.Item>
                    
                    
                </Flex>
                    <Button 
                        icon={<EditOutlined />} 
                        iconPosition="end"
                        className={styles.btn__submit}
                        htmlType="submit"
                        size="large"
                    >
                        Sửa
                    </Button>
            </Form>
            <CategoryModal open={openCategory} setOpen={setOpenCategory}/>
        </Modal>
    )
}

export default Edit