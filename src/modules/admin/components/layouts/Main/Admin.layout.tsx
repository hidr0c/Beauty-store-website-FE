import { Flex, Layout, Menu, Typography, Input, Row, Col, Space, Button, Badge, Avatar, Dropdown } from "antd"
import { Content } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import styles from "./AdminLayout.module.scss";
import logo from "../../../../../assets/images/ecomerce_logo.png"
import { 
    AppstoreOutlined, 
    BellOutlined, 
    CodeOutlined, 
    DashboardOutlined,  
    DropboxOutlined,  
    InboxOutlined, 
    LockOutlined, 
    LogoutOutlined, 
    MenuOutlined, 
    PlusSquareOutlined, 
    ProductOutlined, 
    SettingOutlined,
    TeamOutlined,
    ToolOutlined,
    UserOutlined, 
    UserSwitchOutlined,
    WarningOutlined,
    WechatWorkOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { ADMIN } from "../../../../../constants/app.constant";

const {Title} = Typography
const {Search} = Input

const AdminLayout = () => {

    const navigate = useNavigate();
    const location = useLocation();


    const getActiveKeys = () => {
        const path = location.pathname;
        if(path.startsWith(`/${ADMIN}/users`)) return 'users';
        if (path.startsWith(`/${ADMIN}/products`)) return 'products';
        if(path.startsWith(`/${ADMIN}/categories`)) return 'categories'
        if (path.startsWith(`/${ADMIN}/inventories`)) return 'inventories';
        if (path.startsWith(`/${ADMIN}/orders`)) return 'orders';
        if (path.startsWith(`/${ADMIN}/permissions`)) return 'permissions';
        if (path.startsWith(`/${ADMIN}/roles`)) return 'roles';
        if (path.startsWith(`/${ADMIN}/chat`)) return 'chat';
        if (path.startsWith(`/${ADMIN}/report`)) return 'report';
        return 'dashboard'
    }
    const itemsMenu: ItemType<MenuItemType>[] = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Quảng trị',
            onClick: () => navigate(`/${ADMIN}/dashboard`)
        },
        {
            key: 'users',
            icon: <TeamOutlined />,
            label: 'Người dùng',
            onClick: () => navigate(`/${ADMIN}/users`)
        },
        {
            key: 'categories',
            icon: <AppstoreOutlined />,
            label: 'Danh mục',
            onClick: () => navigate(`/${ADMIN}/categories`)
        },
        {
            key: 'products',
            icon: <ProductOutlined />,
            label: 'Sản phẩm',
            onClick: () => navigate(`/${ADMIN}/products`)
        },
        {
            key: 'inventories',
            icon: <DropboxOutlined />,
            label: 'Kho hàng',
            onClick: () => navigate(`/${ADMIN}/inventories`)
        },
        {
            key: 'orders',
            icon: <InboxOutlined />,
            label: 'Đơn hàng',
            onClick: () => navigate(`/${ADMIN}/orders`)
        },
        {
            key: 'roles_permissions',
            icon: <LockOutlined />,
            label: 'Quyền',
            children: [
                {
                    key: 'roles',
                    label: 'Nhóm quyền',
                    icon: <UserSwitchOutlined />,
                    onClick: () => navigate(`/${ADMIN}/roles`)
                },
                {
                    key: 'permissions',
                    label: 'Phân quyền',
                    icon: <LockOutlined />,
                    onClick: () => navigate(`/${ADMIN}/permissions`)
                }
            ]
        },
        {
            key: 'support',
            label: 'Hỗ trợ',
            icon: <PlusSquareOutlined />,
            children: [
                {
                    key: 'chat',
                    label: 'Nhắn tin',
                    icon: <WechatWorkOutlined />
                },
                {
                    key: 'report',
                    label: 'Khiếu nại',
                    icon: <WarningOutlined />
                }
            ]
        }
    ]
    
    const itemsOther: ItemType<MenuItemType>[] = [
        {
            key: 'settings',
            label: 'Cài đặt',
            icon: <SettingOutlined />,
            children: [
                {
                    key: 'settings-general',
                    label: 'Cài đặt chung',
                    icon: <CodeOutlined />
                },
                {
                    key: 'settings-other',
                    label: 'Cài đặt hệ thống',
                    icon: <ToolOutlined />
                }
            ]
        },
        {
            key: 'accounts',
            label: 'Tài khoản của bạn',
            icon: <UserOutlined />
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LockOutlined />
        }
    ]
    
    
    const accountItems: ItemType<MenuItemType>[] = [
        {
            key: '1',
            label: 'Tài khoản',
            icon: <UserOutlined />
        },
        {
            key: '2',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />
        }
    ]
    const [collapsed, setCollapsed] =  useState(false);

    return (
        <Layout className={styles.layout}>
            <Sider  collapsed={collapsed} collapsible onCollapse={(value) => setCollapsed(value)} className={styles.sider} width="19%">
                <div className={styles.sider__inner}>
                    <Flex justify="center" align="center" className={styles.sider__logo}>
                        <img src={logo} alt="" className={styles["sider__logo-img"]}/>
                        <Title className={collapsed ? 'd-none' : ''} level={2}>Dashboard</Title>
                    </Flex>
                    <div className={styles.sider__content}>
                        <Menu 
                            mode="inline" 
                            items={itemsMenu} 
                            className={styles.sider__menu}
                            selectedKeys={[getActiveKeys()]}
                        />
                        <div className={styles.sider__space}></div>
                        <Menu mode="inline" items={itemsOther}/>

                    </div>
                </div>
            </Sider>
            <Layout>
                <header className={styles.header}>
                    <Row justify="space-between">
                        <Col span={6}>
                            <Search placeholder="Nhập tìm kiếm ở đây..."/>
                        </Col>
                        <Col span={15}/>
                        <Col span={3}>
                            <Space>
                                <Badge count={4}>
                                    <Button size="large" color="default" variant="text" icon={<BellOutlined />} />
                                </Badge>
                                <Dropdown menu={{items: accountItems}} placement="bottomLeft">
                                    <Avatar />
                                </Dropdown>
                                <Button variant="text" color="default" icon={<MenuOutlined />} />
                            </Space>
                        </Col>
                    </Row>
                </header>
                <Content className={styles.content}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout