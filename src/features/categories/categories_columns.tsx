import { Button, Image, Popconfirm, Space, TableColumnProps, Tag } from "antd";
import { getColorByStatus, transfromStatus } from "../../utils/transform";
import { formatDate } from "../../utils/format";
import { CloseOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { DESC_CONFIRM_REMOVE, TITLE_CONFIRM_REMOVE } from "../../constants/title.constant";


export const categoriesColumns = (): TableColumnProps[] => [
    {
        key: '#',
        title: '#',
        render: (_,record, index) => index  + 1
    },
    {
        key: 'title',
        title: 'Tiêu đề',
        dataIndex: 'title'
    },
    {
        key: 'thumbnail',
        title: 'Hình ảnh',
        dataIndex: 'thumbnail',
        render: (val) => <Image 
                            width={70} 
                            height={70}
                            src={val}
                            style={{borderRadius: '10px'}}
                          />
    },
    {
        key:'status',
        title: 'Trạng thái',
        dataIndex: 'status',
        render: (val) => <Tag color={getColorByStatus(val)}>{transfromStatus(val)}</Tag>
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
        dataIndex: 'actions',
        render: () => (
            <Space>
                <Button
                    icon={<EyeOutlined/>}
                    variant="filled"
                    color="blue"
                    size="large"
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

function setOpenDetail(arg0: boolean) {
    throw new Error("Function not implemented.");
}
