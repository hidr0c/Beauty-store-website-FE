import { Col, Row, Table, Input, Button, Space, Select, Badge } from "antd"
import { inventoriesColums } from "../../../../features/inventories/inventories-columns"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../common/types/store.type"
import { useEffect, useState } from "react"
import { fetchInventories } from "../../../../features/inventories/inventories.thunk"
import { FileExcelOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import Create from "./Create"
import styles from "./Inventories.module.scss"
import SelectLimit from "../../components/ui/SelectLimit/SelectLimit"
import Detail from "./Detail"

const {Search} = Input

const Inventories = () => {
    
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const {items} = useSelector((state: RootState) => state.inventories);
    const [keyword, setKeyword] = useState<string>('');
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [id, setId] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchInventories({
            keyword
        }))
    },[dispatch, keyword])
    return (
        <>  
            <Row gutter={16} className={styles.actions}>
                <Col span={5}>
                    <Search 
                        placeholder="Nhập tìm kiếm..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </Col>
                <Col span={9}>
                    <Space>
                        <Button 
                            iconPosition="end" 
                            icon={<PlusOutlined />}
                            onClick={() => setOpenCreate(true)}
                        > 
                        Thêm
                        </Button>
                        <Button icon={<PlusCircleOutlined />}>Thêm SLL</Button>
                        <Button icon={<FileExcelOutlined />}>Xuất</Button>
                        <SelectLimit limit={10}/>            
                    </Space>
                </Col>
                <Col span={10}>
                    <Space size="large">
                        <Badge status="default" text={`Tổng ${100}`}/>
                        <Badge status="error" text={`Hết hàng ${10}`} />
                        <Badge status="success" text={`Còn hàng ${10}`}/>
                    </Space>
                </Col>
            </Row>
            <Table columns={inventoriesColums({setOpenDetail, setId})} dataSource={items}/>
            <Create open={openCreate} setOpen={setOpenCreate}/>
            <Detail 
                open={openDetail} 
                setOpen={setOpenDetail}
                id={id} 
            />
        </>
    )
}

export default Inventories