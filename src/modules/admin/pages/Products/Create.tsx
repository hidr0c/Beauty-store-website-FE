import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Flex, Form, Input, InputNumber, Modal, Upload, Typography, Radio } from "antd"
import { CruProps } from "../../../../common/interfaces/cru-props.interface"
import { DiscountPercentage } from "../../../../constants/app.constant"
import styles from "./Products.module.scss"
import { useState } from "react"
import CategoryModal from "../../components/ui/CategorySelectModal/CategorySelectModal"
import { useForm } from "antd/es/form/Form"
import { InputFormatPrice } from "../../../../components/Input/InputFormatPrice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../common/types/store.type"
import { createProduct } from "../../../../features/products/products.thunk"
import { CreateProduct } from "../../../../features/products/interfaces/create-product.interface"
import { formatVndToNumber } from "../../../../utils/format"
import { showAlert } from "../../../../features/alert/alert.slice"
import { uploadMulti, uploadSingle } from "../../../../features/upload/upload.thunk"
const {TextArea} = Input
const {Title} = Typography


const Create = (props: CruProps) => {

    const {open, setOpen} = props
    const [form] = useForm();
    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<string>();
    const [categoryTitle, setCategoryTitle] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();

    const [images, setImages] = useState<any[]>([]);
    const [thumbnails, setThumbnails] = useState<any[]>([]);
    const onFinish = async (values: CreateProduct) => {
        
        values.price = formatVndToNumber(values.price as string);
        values.categoryId = categoryId as string;
        
        try {
            if(images.length > 0) {
                const formThumbnail = new FormData();
                formThumbnail.append("file",thumbnails[0].originFileObj)
                const {url} = await dispatch(uploadSingle(formThumbnail)).unwrap();
                values.thumbnail = url 
            }

            if(thumbnails.length > 0) {
                const formImages = new FormData();
                images.forEach((item) => {
                    formImages.append("files",item.originFileObj)
                })
                const data = await dispatch(uploadMulti(formImages)).unwrap();
                console.log(data)
                values.images = data.urls
            }   
            console.log(values.images)
            await dispatch(createProduct(values)).unwrap()
            dispatch(showAlert({type: 'success', message: 'Thêm sản phẩm thành công'}))
            setOpen(false)
            form.resetFields()
        } catch{
            dispatch(showAlert({type: 'error',message: 'Thêm sản phẩm thất bại' }))
        }
    }
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
                <Title className={styles.title} level={3}>Thêm sản phẩm</Title>
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
                    
                    <Form.Item label="% giảm giá"  name="discountPercentage" required>
                        <InputNumber
                            max={DiscountPercentage.MAX}
                            min={DiscountPercentage.MIN} 
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
                        name="categoryId"
                    >
                        <Button 
                            icon={<SearchOutlined />} 
                            onClick={() => setOpenCategory(true)}
                            iconPosition="end"
                        >
                          {categoryTitle ?  categoryTitle : ' Thêm Danh mục' }
                        </Button>
                    </Form.Item>
                    <Form.Item label="Giá tiền" name="price" required>
                            <InputFormatPrice customInput={Input as any}/>
                    </Form.Item>
                    
                    
                </Flex>
                <Button 
                    icon={<PlusOutlined />} 
                    iconPosition="end"
                    className={styles.btn__submit}
                    htmlType="submit"
                    size="large"
                >
                    Thêm
                </Button>
            </Form>
            <CategoryModal 
                open={openCategory} 
                setOpen={setOpenCategory}
                categoryId={categoryId as string}
                setCategoryId={setCategoryId}
                setCategoryTitle={setCategoryTitle}
            />
        </Modal>
    )
}

export default Create