import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../../../../common/types/store.type";
import { useEffect, useState } from "react";
import { fetchProductBySlug } from "../../../../../features/products/products.thunk";
import styles from "./ProductDetail.module.scss";
import { Alert, Button, Image, InputNumber, Space, Tabs, TabsProps, Tag, Typography } from "antd";
import { formatPriceToVnd } from "../../../../../utils/format";
import { camulatorDiscountPrice } from "../../../../../utils/camulator";
import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getColorByStatus, transfromStatus } from "../../../../../utils/transform";
import { StatusActiveEnum } from "../../../../../constants/app.constant";

const {Title} = Typography;
const ProductDetail = () => {

    const param = useParams();
    const slug = param.slug;
    
    const {item} = useSelector((state: RootState) => state.products);
    const [mainImg, setImg] = useState(item?.images[0]);
    const dispatch = useDispatch<AppDispatch>();
    const itemsTab: TabsProps['items'] = [
        {
            key: 'info',
            label: 'Thông tin sản phẩm'
        },
        {
            key: 'component',
            label: 'Thành phần'
        },
        {
            key: 'instruction',
            label: 'Hướng dẫn'
        }
    ]

    useEffect(() => {
        if(item?.images?.length as number > 0) {
            setImg(item?.images[0])
        }
    },[item])

    useEffect(() => {
        dispatch(fetchProductBySlug(slug as string)).unwrap()
    },[dispatch, slug])
    return (
        <div className="container">
            <div className={styles.product__detail}>
                .
                <div className={styles.product__image}>
                    <Alert  
                        type="error" 
                        message='Sản phẩm đã hết hàng !' 
                        className={styles.alert__error}
                        showIcon
                    />
                    <Image 
                        width={500} 
                        height={500} 
                        src={mainImg}
                        className={styles.product__thumbnail}
                    />
                    <Space>
                        {
                            item?.images.map((item) => (
                                <img 
                                    width={100} 
                                    height={100} 
                                    src={item}
                                    onClick={() => setImg(item)}
                                />
                            ))
                        }
                    </Space>
                </div>
                <div className={styles.product__content}>
                    <Title>{item?.title}</Title>
                    <Space className={styles.price} size="large">
                        <span>{formatPriceToVnd(camulatorDiscountPrice(item?.price as number, item?.discountPercentage as number))}</span>
                        <span className={styles.old__price}>{formatPriceToVnd(item?.price)}</span>
                    </Space>
                    <p>
                        <strong>Trạng thái: </strong>
                        <Tag color={getColorByStatus(item?.status as StatusActiveEnum)}>
                            {transfromStatus(item?.status as StatusActiveEnum)}
                        </Tag>
                    </p>
                    <p><strong>Danh mục: </strong>{item?.category.title}</p>
                    <p><strong>Số lượng: </strong>{item?.inventories.quantity}</p>
                    <p><strong>Đã bán: </strong>{10}</p>
                    <p>{item?.description}</p>
                    <div className={styles.quantity}>
                        <InputNumber 
                            defaultValue={1}
                            min={1}
                            max={item?.inventories.quantity}
                        />
                    </div>
                    <Space>
                        <Button 
                            size="large"
                            icon={<ShopOutlined />}
                            iconPosition="end"
                            disabled={item?.inventories.quantity === 0 || item?.status === StatusActiveEnum.INACTIVE}
                        >
                            Mua
                        </Button>
                        <Button
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            iconPosition="end"
                            disabled={item?.inventories.quantity === 0 || item?.status === StatusActiveEnum.INACTIVE}
                        >
                            Thêm
                        </Button>
                    </Space>
                </div>
                
            </div>
            <Tabs items={itemsTab}/>
        </div>
    )
}

export default ProductDetail