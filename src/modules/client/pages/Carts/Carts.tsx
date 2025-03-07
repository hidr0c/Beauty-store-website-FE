import { Button, Flex, Image, InputNumber, Popconfirm, Space, Table, TableColumnProps,Input, Col, TableProps } from "antd";
import styles from "./Carts.module.scss";
import { camulatorDiscountPrice } from "../../../../utils/camulator";
import { Product } from "../../../../features/products/interfaces/product.interface";
import { CheckOutlined, CloseCircleFilled, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { formatPriceToVnd } from "../../../../utils/format";
import { InputFormatPrice } from "../../../../components/Input/InputFormatPrice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../common/types/store.type";
import React, { useEffect, useState } from "react";
import { clearCart, fetchCart, removeCart, updateCart } from "../../../../features/carts/carts.thunk";
import { showAlert } from "../../../../features/alert/alert.slice";
import { showNotification } from "../../../../features/notifications/notification.slice";
import { CartItems } from "../../../../features/carts/interfaces/cart-items.interface";

const {Search} = Input;
const Carts = () => {

    const [keyword, setKeyword] = useState<string>();
    const {cart} = useSelector((state: RootState) => state.carts);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchCart({
            keyword
        }))
    },[dispatch, keyword])   

    const handleUpdateCart = async (productId: string, quantity: number) => {
        try {
            await dispatch(updateCart({
                productId,
                quantity
            })).unwrap()
            dispatch(showAlert({
                type: 'success',
                message: 'Cập nhật số lượng thành công'
            }))
        } catch (error) {
            console.log(error)
            dispatch(showAlert({
                type: 'error',
                message: 'Cập nhật số lượng thất bại'
            }))
        }
    }

    const handleconfirmRemove = async (productId: string) => {
        try {
            await dispatch(removeCart(productId)).unwrap()
            dispatch(showAlert({
                type: 'success',
                message: 'Loại bỏ sản phẩm khỏi giỏ hàng thành công'
            }))
        } catch {
            dispatch(showAlert({
                type: 'error',
                message: 'Loại bỏ sản phẩm khỏi giỏ hàng thất bại'
            }))
        }
    }

    const handleConfirmClear = async () => {
        try {
            await dispatch(clearCart()).unwrap()
            dispatch(showNotification({
                type: 'success',
                message: 'Loại bỏ toàn bộ thành công'
            }))
        } catch{
            dispatch(showNotification({
                type: 'error',
                message: 'Loại bỏ toàn bộ thất bại'
            }))
        }
    }
    const columns: TableColumnProps<CartItems>[] = [
        {
            key: '#',
            title: '#',
            render: (_, record, index) => index + 1 
        },
        {
            key: 'title',
            title: 'Tên sản phẩm',
            dataIndex: ['product','title']
        },
        {
            key: 'thumbnail',
            title: 'Hình ảnh',
            dataIndex: ['product','thumbnail'],
            render: (val) => <Image 
                                src={val}
                                width={50}
                                height={50}
                                className={styles.carts__img}
                              />
        },
        {
            key: 'price',
            title: 'Đơn giá',
            dataIndex: ['product','price'],
            render: (val, record) => formatPriceToVnd(camulatorDiscountPrice(val, record.product.discountPercentage)),
            filterDropdown: () => (
                <Space style={{padding: '5px'}}>
                    <InputFormatPrice customInput={Input as any}/>
                    <InputFormatPrice customInput={Input as any} />
                </Space>
            ),
            sorter: true
        },
        {
            key: 'totalPrice',
            title: 'Tổng tiền',
            render: (_, record) => formatPriceToVnd(record.quantity * camulatorDiscountPrice(record.product.price, record.product.discountPercentage))
        },
        {
            key: 'quantity',
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (val, record) => <InputNumber 
                                defaultValue={val}
                                min={1}
                                max={100}
                                onChange={(val) => handleUpdateCart(record.product.id, parseInt(val))}
                              />,
            sorter: true
        },
        {
            key: 'actions',
            title: 'Thao tác',
            render: (_, record) =>   <Popconfirm
                                title="Bạn có chắc muốn xóa sản phẩm này ko ?"
                                onConfirm={() => handleconfirmRemove(record.product.id)}
                            >
                                <Button  
                                    icon={<CloseOutlined />} 
                                    color="primary"
                                    variant="text"
                                />
                            </Popconfirm>
        }
    ]
 
    const rowSelection: TableProps<CartItems>['rowSelection'] = {

        onChange: (selectedRowKeys: React.Key[], selectedRows: CartItems[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    }
    return (
        <div className="container">
            <div className={styles.carts}>
                <Space 
                    className={styles.carts__actions}
                    size="large"
                >
                    <Search 
                        placeholder="Nhập thông tin tìm kiếm..." 
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Popconfirm
                        title="Xóa toàn bộ"
                        description="Bạn có chắc muốn xóa toàn bộ sản phẩm trong giỏ hàng"
                        onConfirm={() => handleConfirmClear()}
                    >
                        <Button
                            icon={<CloseCircleOutlined />}
                            iconPosition="end"
                        >
                            Xóa toàn bộ
                        </Button>
                    </Popconfirm>
                </Space>
                <div className={styles.carts__items}>
                    <Table 
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection
                        }}
                        columns={columns}
                        dataSource={cart?.cart_items.items}
                    />
                </div>
                <Flex justify="space-between">
                    <p 
                        className={styles.title__total}
                    >
                        Tổng tiền: {formatPriceToVnd(100000)}
                    </p>
                    <Button 
                        icon={<CheckOutlined />} 
                        iconPosition="end"
                        color="pink"
                        className={styles.btn__checkout}
                    >
                        Thanh toán
                    </Button>
                </Flex>
            </div>
            
        </div>
    )
}

export default Carts 