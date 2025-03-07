import { Col, Row, Space, Typography, Button, Rate } from "antd";
import { Product } from "../../../../../features/products/interfaces/product.interface";
import styles from "./ProductList.module.scss";
import { formatPriceToVnd } from "../../../../../utils/format";
import { ShoppingCartOutlined, ShoppingOutlined, StarOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { camulatorDiscountPrice } from "../../../../../utils/camulator";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../common/types/store.type";
import { createCart } from "../../../../../features/carts/carts.thunk";
import { showAlert } from "../../../../../features/alert/alert.slice";

const { Title } = Typography;

interface ProductsListProps {
    products: Product[];
    title?: string;
}

const ProductsList = (props: ProductsListProps) => {
    const { products = [], title } = props;
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleAddCart = async (productId: string) => {
        try {
            await  dispatch(createCart({
                productId,
                quantity: 1
            })).unwrap()
            dispatch(showAlert({
                type: 'success',
                message: 'Thêm vào giỏ hàng thành công'
            }))
        } catch  {
            dispatch(showAlert({
                type: 'error',
                message: 'Thêm vào sản phẩm thất bại'
            }))
        }
    }
    return (
        <div className={"container " + styles.products  }>
            <Title className={styles.title}>{title}</Title>
            <Row gutter={[16, 16]}>
                
                {products.map((item) => (
                    <Col span={6} key={item.id}>
                        <div className={styles.products__card}>
                            <img 
                                src={item.thumbnail} 
                                className={styles.products__thumbnail} 
                                width={255}
                                height={250}
                                alt={item.title}
                                onClick={() => navigate(`/products/${item.slug}`)}
                            />
                            <div className={styles.products__title}>{item.title}</div>
                            <div className={styles.products__content}>
                                <p className={styles.products__reviews}>({4.3}) <StarOutlined /></p>
                                <Space className={styles.products__price}>
                                    <span className={styles.products__discountedPrice}>{formatPriceToVnd(camulatorDiscountPrice(item.price, item.discountPercentage))}</span>
                                    <span className={styles.products__originalPrice}>{formatPriceToVnd(item.price)}</span>
                                </Space>
                                <p>Đã bán: {10}</p>
                                <p>Còn: {item.inventories.quantity}</p>
                            </div>
                            <div className={styles.products__buttons}>
                                <Button 
                                    icon={<ShoppingOutlined />} 
                                    iconPosition="end"
                                    className={styles.buyNow}
                                >
                                    Mua
                                </Button>
                                <Button 
                                    icon={<ShoppingCartOutlined />} 
                                    iconPosition="end"
                                    variant="solid"
                                    className={styles.addToCart}
                                    onClick={() => {
                                        if(item.inventories.quantity === 0) {
                                            dispatch(showAlert({
                                                type: 'error',
                                                message: 'Sản phẩm đã hết hàng'
                                            }))
                                            
                                        }else {
                                            
                                            handleAddCart(item.id)
                                        }
                                    }}
                                >
                                    Thêm
                                </Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductsList;