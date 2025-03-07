import { Image, List, Pagination } from "antd"



const OrderedTab = () => {

    return (
       <>
         <List
            itemLayout="horizontal"
            dataSource={[{},{}]}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Image width="50px" height="50px" />}
                        title='Sản phẩm A'
                        description={<><strong>Giá tiền: </strong> 1000</>}
                    />
                </List.Item>
            )} 
        />
        <Pagination 
            total={50} 
            align="end"
        />
       </>
    )
}

export default OrderedTab