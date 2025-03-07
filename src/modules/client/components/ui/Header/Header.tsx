
import styles from "./Header.module.scss";
import { Flex, Image, Input, Button, Badge, Avatar, Space, Dropdown, Popconfirm, List } from "antd";
import ecomerce_logo from "../../../../../assets/images/ecomerce_logo.png";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
;
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../common/types/store.type";
import { logoutUser } from "../../../../../features/auth/auth.thunk";
import { showAlert } from "../../../../../features/alert/alert.slice";
import { useEffect, useState } from "react";
import { Product } from "../../../../../features/products/interfaces/product.interface";
import { getProductsAPI } from "../../../../../features/products/products.api";
import { fetchCategories } from "../../../../../features/categories/categories.thunk";
import { fetchCart } from "../../../../../features/carts/carts.thunk";
import { formatPriceToVnd } from "../../../../../utils/format";
import { camulatorDiscountPrice } from "../../../../../utils/camulator";
import { getCartNoAuth } from "../../../../../features/carts/carts.slice";


const {Search} = Input;

function AppHeader() {

    const [searchParam, setSearchParam] = useSearchParams();
    const keyword = searchParam.get('keyword')
    const {isAuth} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {items} = useSelector((state: RootState) => state.categories);
    const {cart} = useSelector((state: RootState) => state.carts);
    
    useEffect(() => {
        if(!isAuth) {
            dispatch(getCartNoAuth())
        }else {
            dispatch(fetchCart({}))
        }
    },[dispatch, isAuth])
    useEffect(() => {
        dispatch(fetchCategories({
            limit: 12
        }))
    },[dispatch])
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            dispatch(showAlert({type: 'success', message: 'Đăng xuất thành công'}));
            navigate('/login')
        } catch {
            dispatch(showAlert({type: 'error', message: 'Đăng xuất thất bại'}))

        }

    }
    const authItems: MenuProps['items'] = [
        {
            label: <Link to={'register'}>Đăng ký</Link>,
            key: '1'
        },
        {
            label: <Link to={'login'}>Đăng nhập</Link>,
            key: '2'
        }
    ]
    const userItems: MenuProps['items'] = [
        {
            key: '1',
            label: <Link to='/profiles'>Trang cá nhân</Link>
        },
        {
            key: '2',
            label: <Popconfirm
                title='Bạn có chắc muốn đăng xuất'
                onConfirm={handleLogout}
                >
                Đăng xuất
            </Popconfirm>
        }
    ]
    const [products, setProducts] = useState<Product[]>([]);
    const handleSuggestions = async (keyword: string) => {
        if(keyword) {
            const {items} = await getProductsAPI({
                keyword,
                limit: 5
            });
            setProducts(items)
        }else {
            setProducts([])
        }
    }

    const cartItems: MenuProps['items'] = cart?.cart_items.items.map((item) => (
        {
            key: '1',   
            label: (
                <Link to={`/products/${item.product.slug}`}>
                    <Space >
                        <Image 
                            width={40} 
                            height={40} 
                            style={{borderRadius: '10px', border: 'solid 1px'}}
                            src={item.product.thumbnail}
                        />
                        <p>{item.product.title}</p>
                        <p style={{marginLeft: '10px', color: 'pink'}}>
                            {formatPriceToVnd(camulatorDiscountPrice(item.product.price, item.product.discountPercentage))}
                        </p>
                    </Space>
                </Link>
            )
        }
    ))

    return (
        <header className={styles.header}>
            <div className={styles.header__top}>
                <div className="container">
                    <Flex justify="space-between" align="center" className={styles["header__top-inner"]}>
                        <div className={styles.header__desc}>
                            KYO Authentic - Shop Mỹ Phẩm, Son Môi, Nước Hoa Chính Hãng
                        </div>
                        <div className={styles.header__contact}>
                            <ul>
                                <li>
                                    <i className="fa-solid fa-envelope"></i> <span>hosonhao23052004@gmail.com</span>
                                </li>
                                <li>
                                    <i className="fa-solid fa-phone"></i> <span>0862048402</span>
                                </li>
                                <li><i className="fa-brands fa-facebook"></i></li>
                                <li><i className="fa-brands fa-square-instagram"></i></li>
                                <li><i className="fa-brands fa-youtube"></i></li>
                            </ul>
                        </div>
                    </Flex>
                </div>
            </div>
            
                
                <div className={styles.header__main}>
                    <Flex className="container" justify="space-between" align="center">
                        <div className={styles.header__logo}>
                            <Image src={ecomerce_logo} alt="" className={styles["header__logo-img"]} />
                            <span className={styles["header__logo-title"]}>KYO.VN</span>
                        </div>
                        <div className={styles.header__search}>
                            <Search 
                                style={{width: '340px'}} 
                                placeholder="Vui lòng nhập từ khóa tìm kiếm" size="large"
                                onChange={(e) => handleSuggestions(e.target.value)}
                                onSearch={(val) => {
                                    navigate(`/products`)
                                    setSearchParam({
                                        keyword: val
                                    })
                                    setProducts([])
                                }}
                                defaultValue={keyword as string}
                                
                            />
                            <div className="suggestions">
                                {
                                    products.length !== 0 ? 
                                    <List 
                                        className={styles.suggestions__list}
                                        dataSource={products}
                                        itemLayout="horizontal"
                                        renderItem={(item) => (
                                            <List.Item 
                                                style={{width: '340px'}}
                                                onClick={() => {
                                                    navigate(`products/${item.slug}`)
                                                    setProducts([])
                                                }}
                                            >
                                                <List.Item.Meta
                                                    avatar={<Image width={50} height={50} src={item.thumbnail} />}
                                                    title={item.title}
                                                    description={
                                                        <><strong>Giá tiền</strong>{item.price}</>
                                                    } 
                                                />
                                            </List.Item>
                                        )}
                                    /> : 
                                    <></>
                                }
                            </div>
                        </div>
                        <div className={styles.header__menu}>
                            <ul>
                                <li>
                                    <NavLink to="/">Trang chủ <i className="fa-solid fa-house"></i></NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about">Về chúng tôi <i className="fa-solid fa-hand"></i></NavLink>
                                </li>
                                <li>
                                    <NavLink to="/products">Sản phẩm <i className="fa-solid fa-box-open"></i></NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contacts">Liên hệ <i className="fa-solid fa-phone"></i></NavLink>
                                </li>
                                <li>
                                    <NavLink to=""></NavLink>
                                </li>
                            </ul>
                        </div>
                        <Space className={styles.header__other}>
                            <Badge count={cart?.cart_items.items.length}>
                                <Dropdown 
                                    menu={{items: cartItems}}
                                    placement="bottomLeft"
                                >
                                    <Button 
                                        shape="circle" 
                                        size="large" 
                                        color="pink" 
                                        icon={<ShoppingCartOutlined  /> }
                                        onClick={() => navigate("/cart")}
                                        
                                    />
                                </Dropdown>
                            </Badge>
                            <Dropdown menu={{items: isAuth ? userItems : authItems}} placement="bottom">
                               <Avatar icon={<UserOutlined />}/>
                            </Dropdown>
                        </Space>
                    </Flex>
                </div>
                <div className={styles.header__categories}>
                    <Flex justify="space-between"  className="container">
                        {
                            items.map((item) => (
                                <Button 
                                    color="default" 
                                    type="text" 
                                    onClick={() => navigate(`/categories/${item.slug}`)}
                                >
                                    {item.title}
                                </Button>
                            ))
                        }
                    </Flex>
                </div>
        </header>
    )
}

export default AppHeader