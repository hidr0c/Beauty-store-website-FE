import { CloseOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { TableColumnProps, Space, Button, Popconfirm } from "antd";
import { DESC_CONFIRM_REMOVE, TITLE_CONFIRM_REMOVE } from "../../constants/title.constant";


interface InventoriesColumnsProps {
    setOpenDetail: (val: boolean) => void;
    setId: (id: string) => void;
}

export const inventoriesColums = (props: InventoriesColumnsProps): TableColumnProps[] => {

    const {setOpenDetail, setId} = props
    return [
        {
            key: 'index',
            title: '#',
            render: (_, record, index) => index + 1 
        },
        {
            key: 'supplier',
            title: 'Nhà cung cấp',
            dataIndex: 'supplier'
        },
        {
            key: 'address',
            title: 'Địa chỉ',
            dataIndex: 'address'
        },
        {
            key: 'products',
            title: 'Sản phẩm',
            dataIndex: ['product','title']
        },
        {
            key: 'quantity',
            title: 'Số lượng tồn',
            dataIndex: 'quantity'
        },
        {
            key: 'createdAt',
            title: 'Ngày tạo',
            dataIndex: 'createdAt' ,
            sorter: true
        },
        {
            key: 'updatedAt',
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true
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
                            setOpenDetail(true)
                            setId(record.id)
                        }}
                    />
                    <Button
                        icon={<EditOutlined/>} 
                        variant="filled"
                        color="yellow"
                        size="large"
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

