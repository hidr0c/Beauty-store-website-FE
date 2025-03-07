import { Button, Popconfirm, Space, TableColumnProps, Tag } from "antd";
import { formatDate } from "../../utils/format";
import { CloseOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { DESC_CONFIRM_REMOVE, TITLE_CONFIRM_REMOVE } from "../../constants/title.constant";
import { StatusActiveEnum } from "../../constants/app.constant";
import { getColorByStatus, transfromStatus } from "../../utils/transform";


interface RolesCoumnsProps {
    setId: (id: string) => void;
    setOpenEdit: (val: boolean) => void;
    setOpenDetail: (val: boolean) => void;
}

const rolesColumns = (props: RolesCoumnsProps): TableColumnProps[] => {
    const {setId, setOpenEdit, setOpenDetail} = props

    return [
        {
            key: '#',
            title: '#',
            render: (_, record, index) => index  + 1 
        },
        {
            key: 'title',
            title: 'Tiêu đề',
            dataIndex: 'title'
        },
        {
            key: 'permissions',
            title: 'Số lượng quyền',
            dataIndex: 'permissions',
            render: (val: Permissions[]) => val.length
        },
        {
            key: 'status',
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (val: StatusActiveEnum) => 
                <Tag 
                    color={getColorByStatus(val)} 
                >
                    {transfromStatus(val)}
                </Tag>
        },
        {
            key: 'createdAt',
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (val) => formatDate(val)
        },
        {
            key: 'updatedAt',
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            render: (val) => formatDate(val)
        },
        {
            key: 'actions',
            title: 'Thao tác',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EyeOutlined/>}
                        variant="filled"
                        color="blue"
                        size="large"
                        onClick={() => {
                            setId(record.id)
                            setOpenDetail(true)
                        }}
                    />
                    <Button
                        icon={<EditOutlined/>} 
                        variant="filled"
                        color="yellow"
                        size="large"
                        onClick={() =>{
                            setId(record.id)
                            setOpenEdit(true)
                        }}
                    />
                    <Popconfirm 
                        title={TITLE_CONFIRM_REMOVE}
                        description={DESC_CONFIRM_REMOVE}
                        okText='Có'
                        cancelText='Không'
                    >
                        <Button
                            icon={<CloseOutlined color="red" />} 
                            variant="filled"
                            color="red"
                            size="large"
                        />
                    </Popconfirm>
                </Space>
            )
        }
    ]

}
export default rolesColumns;