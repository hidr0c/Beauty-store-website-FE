import { Col, Row, Table, Input, Space, Button } from "antd"
import rolesColumns from "../../../../features/roles/roles_columns"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../common/types/store.type"
import { useEffect, useState } from "react"
import { fetchRoles } from "../../../../features/roles/roles.thunk"
import { FileExcelOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import SelectLimit from "../../components/ui/SelectLimit/SelectLimit"
import styles from "./Roles.module.scss";
import Create from "./Create"
import Edit from "./Edit"
import { UUID } from "../../../../common/types/uuid.type"
import Detail from "./Detail"

const {Search} = Input

const Roles = () => {

    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>();
    const [id, setId] = useState<UUID>();
    const {items} = useSelector((state: RootState) => state.roles);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchRoles({
            keyword
        }))
    },[dispatch, keyword])
    return (
        <>
            <Row className={styles.actions} gutter={16}>
                <Col span={6}>
                    <Search 
                        placeholder="Nhập thông tin tìm kiếm..."
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
                        <Button icon={<FileExcelOutlined />} >Xuất</Button>
                        <SelectLimit limit={10}/>
                    </Space>
                </Col>
            </Row>
            <Table 
                columns={rolesColumns({
                    setId,
                    setOpenEdit,
                    setOpenDetail
                })}
                dataSource={items}
            />
            {/* CREATE */}
            <Create
                open={openCreate}
                setOpen={setOpenCreate} 
            />
            {/* UPDATE */}
            <Edit 
                open={openEdit}
                setOpen={setOpenEdit}
                id={id}
            />
            {/* DETAIL  */}
            <Detail
                open={openDetail}
                setOpen={setOpenDetail}
                id={id} 
            />
        </>
    )
}

export default Roles