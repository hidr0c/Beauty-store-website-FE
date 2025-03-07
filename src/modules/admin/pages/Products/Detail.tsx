import { Descriptions, DescriptionsProps, Empty, Image, Modal, Space, Tag } from "antd";
import { CruProps } from "../../../../common/interfaces/cru-props.interface"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../common/types/store.type";
import { useEffect } from "react";
import { fetchProductById } from "../../../../features/products/products.thunk";
import { formatDate, formatPriceToVnd } from "../../../../utils/format";
import { getColorByStatus, transfromStatus } from "../../../../utils/transform";
import styles from "./Products.module.scss"

const Detail = (props: CruProps) => {
    const {open, setOpen, id} = props;
    const {item} = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if(id && open) {
            dispatch(fetchProductById(id))
        }
    },[dispatch,id, open]);
    if(!item) return <Empty />;
    const items: DescriptionsProps['items'] = [
        {
            key: 'id',
            label: 'Id',
            children: id
        },
        {
            key: 'title',
            label: 'Tiêu đề',
            children: item.title,
            span: 2
        },
        {
            key: 'category',
            label: 'danh mục',
            children: item.category?.title
        },
        {
            key: 'categoryId',
            label: 'Id danh mục',
            children: item.category?.id,
            span: 2
        },
        {
            key: 'price',
            label: 'Giá tiền',
            children: formatPriceToVnd(item.price)
        },
        {
            key: 'discountPercentage',
            label: '% giảm giá',
            children: item.discountPercentage,
            span: 2
        },
        {
            key: 'status',
            label: 'Trạng thái',
            children: <Tag color={getColorByStatus(item.status)}>
                        {transfromStatus(item.status)}
                    </Tag>
        },
        {
            key: 'slug',
            label: 'slug',
            children: item.slug,
            span: 2
        },
        {
            key: 'thumbnail',
            label: 'Hình thu nhỏ',
            children: <Image width={100} height={100} src={item.thumbnail}/>
        },
        {
            key: 'images',
            label: 'Hình ảnh',
            children: (
                <Space>
                    {
                        item.images && item.images.map((item) => (
                            <Image 
                                className={styles.img__images}
                                src={item} 
                                alt="" 
                                width={80}
                                height={80}
                            />
                        ))
                    }
                </Space>
            ),
            span: 2
        },
        {
            key: 'quantity',
            label: 'Số lượng',
            children: item.inventories?.quantity,
        },
        {
            key: 'totalOrders',
            label: 'Tổng số đơn hàng',
            children: item.inventories?.total,
            span: 2
        },
        {
            key: 'updatedAt',
            label: 'Ngày cập nhật',
            children: formatDate(item.updatedAt),
        },
        
        {
            key: 'createdAt',
            label: 'Ngày tạo',
            children: formatDate(item.createdAt)
        }
    ]
    return (
        <Modal 
            width={1000}
            open={open} 
            onCancel={() => setOpen(false)} 
            onOk={() => setOpen(false)}
        >
            <Descriptions 
                title="THÔNG TIN SẢN PHẨM" 
                items={items}
                bordered
            />
        </Modal>
    )
}

export default Detail