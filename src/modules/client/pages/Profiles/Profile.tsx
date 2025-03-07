import { Avatar, Descriptions, Flex, Layout, Tabs, TabsProps, Typography, Upload } from "antd"
import { Content } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import styles from "./Profile.module.scss";
import InfoTab from "./InfoTab";
import OrderedTab from "./OrderedTab";
import AuthTab from "./AuthTab";
import FavoriteTab from "./FavoriteTab";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../common/types/store.type";
import { formatDate } from "../../../../utils/format";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { fetchCurrentUser } from "../../../../features/users/users.thunk";

const {Title} = Typography;



const Profile = () => {

    const {currentUser} = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchCurrentUser())
    },[dispatch])
    const items: TabsProps['items'] = [
        {
            key: 'info',
            label: 'Thông tin',
            children: <InfoTab />
        },
        {
            key: 'ordered',
            label: 'Đơn hàng đã mua',
            children: <OrderedTab />
        },
        {
            key: 'auth',
            label: 'Bảo mật',
            children: <AuthTab />
        },
        {
            key: 'favoriteList',
            label: 'Sản phẩm yêu thích',
            children: <FavoriteTab />
        }
    ]
    return (
        <div className="container">
            <Layout className={styles.profiles}>
                <Sider width="35%" className={styles.sider}>
                    <div  className={styles.sider__inner}>
                        <Avatar className={styles.sider__avatar} />
                        <Upload className={styles.upload__avatar}>
                            <PlusCircleOutlined />
                        </Upload>
                        <Title level={3}>{currentUser?.fullName}</Title>
                        <Descriptions className={styles.profiles__desc}>
                            <Descriptions.Item span={3} label="Đơn hàng đã mua">10</Descriptions.Item>
                            <Descriptions.Item span={3} label="Tổng số tiền" >10000</Descriptions.Item>
                            <Descriptions.Item span={3} label="Ngày tạo">{formatDate(currentUser?.createdAt as Date)}</Descriptions.Item>
                            <Descriptions.Item span={3} label="Ngày cập nhật">{formatDate(currentUser?.updatedAt as Date)}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Sider>
                <Content className={styles.content}>
                    <Tabs items={items} />
                </Content>
                
            </Layout>
        </div>
    )
}

export default Profile