import { Col, Row, Table, Input, Space, Button } from "antd"
import { categoriesColumns } from "../../../../features/categories/categories_columns"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../common/types/store.type"
import { useEffect, useState } from "react"
import { fetchCategories } from "../../../../features/categories/categories.thunk"
import { FileExcelOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import SelectLimit from "../../components/ui/SelectLimit/SelectLimit"
import styles from "./Categories.module.scss";
import Create from "./Create"
const {Search} = Input

const Categories = () => {

    const [keyword, setKeyword] = useState<string>();
    const {items} = useSelector((state: RootState) => state.categories);
    const dispatch = useDispatch<AppDispatch>();
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    useEffect(() => {
        dispatch(fetchCategories({
            keyword
        }))
    },[dispatch, keyword])
    return (
        <>  
            <Row 
                gutter={16}
                className={styles.actions}
            >
                <Col span={6}>
                    <Search 
                        placeholder="Tìm kiếm..." 
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </Col>
                <Col span={6}>
                    <Space>
                        <Button 
                            icon={<PlusOutlined />}
                            onClick={() => setOpenCreate(true)}
                        >
                            Thêm
                        </Button>
                        <Button icon={<PlusCircleOutlined />}>Thêm SLL</Button>
                        <Button icon={<FileExcelOutlined />}>Xuất</Button>
                        <SelectLimit limit={10} />
                    </Space>
                </Col>
            </Row>
            <Table 
                columns={categoriesColumns()} 
                dataSource={items}
            />
            <Create open={openCreate} setOpen={setOpenCreate} />
        </>
    )
}

export default Categories