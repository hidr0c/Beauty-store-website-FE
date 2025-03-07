import { Modal, Form, Input, Button, Space, Flex } from "antd"
import { CruProps } from "../../../../common/interfaces/cru-props.interface"
import Title from "antd/es/typography/Title"
import styles from "./Inventories.module.scss"
import { ProductOutlined } from "@ant-design/icons"
import { useForm } from "antd/es/form/Form"
import ProductSelectModal from "../../components/ui/ProductSelectModal/ProductSelectModal"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../common/types/store.type"
import { createInventory } from "../../../../features/inventories/inventories.thunk"
import { CreateInventory } from "../../../../features/inventories/interfaces/create-inventory.interface"
import { showAlert } from "../../../../features/alert/alert.slice"

const Create = (props: CruProps) => {
    const [openProductModal, setOpenProductModal] = useState<boolean>(false);
    const [productId, setProductId] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();
    const [productTitle, setProductTitle] = useState<string>();
    const {open, setOpen} =props
    const [form] = useForm();
    
    const onFinish = async (val: CreateInventory) => {
        val.productId = productId as string;
        try {
                await dispatch(createInventory(val)).unwrap()
                dispatch(showAlert({type: 'success', message: 'Thêm thành công'}))
        } catch {
                dispatch(showAlert({type: 'error',message: 'Thêm thất bại'}))
        }
    }
    return (
        <>
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
                    <Title level={2} className={styles.create__title}>Thêm</Title>
                    <Form.Item 
                        label="Nhà cung cấp" 
                        name='supplier' 
                        required
                    >
                        <Input placeholder="Nhà cung cấp..."/>
                    </Form.Item>
                    <Form.Item 
                        label="Địa chỉ"
                        name="address"
                        required
                    >
                        <Input placeholder="Địa chỉ..."/>
                    </Form.Item>
                    <Flex justify="space-between">
                        <Form.Item 
                            label="Số lượng tồn"
                            name="quantity"
                            required
                        >
                            <Input type="number" placeholder="Số lượng tồn..."/>
                        </Form.Item>
                        <Form.Item 
                            label="Sản phẩm" 
                            required 
                            name='productId'
                        >
                            <Button 
                                icon={<ProductOutlined />}
                                onClick={() => setOpenProductModal(true)}
                            >
                                {productTitle ? productTitle : 'Chọn sản phẩm'}
                            </Button>
                        </Form.Item>
                    </Flex>
                    <Button 
                        htmlType="submit" 
                        className={styles.create__submit}
                    >
                        Thêm
                    </Button>
                </Form>
            </Modal>
            <ProductSelectModal 
                open={openProductModal} 
                setOpen={setOpenProductModal} 
                productId={productId as string}
                productTitle={productTitle as string}
                setProductTitle={setProductTitle}
                setProductId={setProductId}
            />
        </>
    )
}

export default Create