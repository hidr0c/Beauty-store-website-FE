import { Image, Input, Modal, Radio, Space, Table, TableColumnProps, Tag } from "antd";
import { camulatorDiscountPrice } from "../../../../../utils/camulator";
import { getColorByStatus, transfromStatus } from "../../../../../utils/transform";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../common/types/store.type";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../../../../features/products/products.thunk";
import { formatPriceToVnd, formatVndToNumber } from "../../../../../utils/format";
import { showNotification } from "../../../../../features/notifications/notification.slice";
import Search from "antd/es/input/Search";
import { InputFormatPrice } from "../../../../../components/Input/InputFormatPrice";
import styles from "./ProductSelectModal.module.scss"
import { SortOrder} from "../../../../../constants/app.constant";
import Title from "antd/es/typography/Title";

interface ProductSelectModalProps {
    open: boolean;
    setOpen: (val: boolean) => void;
    setProductId: (id: string) => void;
    productId: string;
    productTitle: string;
    setProductTitle: (val: string) => void;
}
const ProductSelectModal = (props: ProductSelectModalProps) => {
    const {open, setOpen, setProductId, productId, productTitle, setProductTitle} = props
    const {items} = useSelector((state: RootState) => state.products);
    const [keyword, setKeyword] = useState<string>();
    const [minPrice, setMinPrice] =useState<number>();
    const [maxPrice, setMaxPrice] = useState<number>();
    const [sortBy, setSortBy] = useState<string>();
    const [sortOrder, setsortOrder] = useState<SortOrder>();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchProducts({
            keyword,
            minPrice,   
            maxPrice,
            sortBy,
            sortOrder
        }))
    },[
        dispatch, 
        keyword, 
        minPrice, 
        maxPrice,
        sortBy,
        sortOrder
    ]);

    const onOk = () => {
        if(!productId) {
            dispatch(showNotification({type: 'error',message: 'Vui lòng chọn 1 sản phẩm'}))
        }else {
            setOpen(false)
        }
    }
    const columns: TableColumnProps[] = [
        {
            key: 'checkbox',
            title: 'Chọn',
            dataIndex: 'id',
            render: (val, record) => 
                <Radio
                    onClick={() => {
                        
                        setProductId(val)
                        setProductTitle(record.title)
                        
                    }} 
                    checked={val === productId } 
                    
                />
        },
        {
            key: '#',
            title: '#',
            render: (_, record, index) => index + 1 
        },
        {
            key: 'title',
            dataIndex: 'title',
            title: 'Tiêu đề',
            filterDropdown: () => <Search onChange={(e) => setKeyword(e.target.value)} placeholder="Tìm kiếm..."/>
        },
        {
            key: 'category',
            dataIndex: ['category','title'],
            title: 'Danh mục'
        },
        {
            key: 'thumbnail',
            dataIndex: 'thumbnail',
            title: 'Ảnh',
            render: (val) => (
                <Image 
                    width={50} 
                    height={50} 
                    src={val} 
                />
            )
        },
        {
            key: 'price',
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (val, record) => formatPriceToVnd(camulatorDiscountPrice(val, record.discountPercentage)),
            filterDropdown: () => (
                <Space className={styles.products__range__price}>
                    <InputFormatPrice 
                        onChange={(e) => 
                            setMinPrice(formatVndToNumber(e.target.value))
                        } 
                        customInput={Input}
                        placeholder="Từ..."
                    />
                    <InputFormatPrice 
                        customInput={Input}
                        onChange={(e) => 
                            setMaxPrice(formatVndToNumber(e.target.value))
                        }
                        placeholder="Tới..."
                    />
                </Space>
            ),
            sorter: true
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Trạng thái',
            render: (val) => <Tag color={getColorByStatus(val)}>{transfromStatus(val)}</Tag>
        }
    ]

    const handleTableChange = (_, filters, sorter) => {
        setSortBy(sorter.field)
        setsortOrder(sorter.order === "ascend" ? SortOrder.ASC : SortOrder.DESC)
    }
    return (
        <Modal
            open={open}
            onOk={onOk}
            onClose={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
        >
            <Title className={styles.title} level={2}>Chọn một sản phẩm</Title>
            <Table 
                onChange={handleTableChange}
                columns={columns}
                dataSource={items}
            />
        </Modal>
    )
}

export default ProductSelectModal;
