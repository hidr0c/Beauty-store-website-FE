import { CloseOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, Image, Popconfirm, Space, TableColumnProps, Tag } from "antd"
import { DESC_CONFIRM_REMOVE, TITLE_CONFIRM_REMOVE } from "../../constants/title.constant"
import { getColorByStatus, transfromGender, transfromStatus } from "../../utils/transform"
import { formatDate } from "../../utils/format"
import { RoleAdmin } from "../../constants/role.constant"


export const usersColums = (): TableColumnProps[] => {

    return [
        {
            key: '#',
            title: '#',
            render: (_, record, index) => index + 1 
        },
        {
            key: 'fullName',
            title: 'Họ và tên',
            dataIndex: 'fullName'
        },
        {
            key: 'avatar',
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (val) => <Image
                                style={{borderRadius: '50%', border: 'solid 1px'}}
                                width={70}
                                height={70}  
                                src={val}
                              />
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: 'gender',
            title: 'Giới tính',
            dataIndex: 'gender',
            render: (val) => transfromGender(val)
        },
        {
            key: 'status',
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (val) => <Tag color={getColorByStatus(val)}>{transfromStatus(val)}</Tag>
        },
        {
            key: 'roles',
            title: 'Vai trò',
            dataIndex: 'roleId',
            render: (val) => {
                return val === RoleAdmin ? 'Quản trị viên' : 'Người dùng' 
            }
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
}