import { HeartFilled } from "@ant-design/icons"
import { Image, List, Popconfirm } from "antd"
import styles from "./Profile.module.scss";


const FavoriteTab = () => {


    return (
        <List
            itemLayout="horizontal"
            dataSource={[{},{}]}
            renderItem={(item, index) => (
                <List.Item>
                    <Popconfirm
                        title="Bạn có chắc muốn loại bỏ khỏi sp yêu thích ko"
                    >
                        <HeartFilled  className={styles.favorite__icon}/>
                    </Popconfirm>
                    <List.Item.Meta
                    
                        avatar={<Image width="50px" height="50px" />}
                        title="Sản Phẩm B"
                        description={
                            <><strong>Giá tiền</strong> 10.000 VND</>
                        }
                    />
                </List.Item>
            )} 
        />
    )
}

export default FavoriteTab