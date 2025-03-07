import { Descriptions, DescriptionsProps, Modal, Tag } from "antd"
import { CruProps } from "../../../../common/interfaces/cru-props.interface"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../common/types/store.type";
import { useEffect } from "react";
import { fetchRoleById } from "../../../../features/roles/roles.thunk";
import { getColorCrud } from "../../../../utils/color";
import { transformNamePermission, transformResourcePermission } from "../../../../utils/transform";


const Detail = (cruProps: CruProps) => {
    const {open, setOpen, id} = cruProps;
    const {item} = useSelector((state: RootState) => state.roles);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if(id && open) {
            dispatch(fetchRoleById(id as string))
        }
    },[dispatch, id, open])
    const items: DescriptionsProps['items'] = [
        {
            key: 'id',
            label: 'Id',
            children: id,
        },
        {
            key: 'count',
            label: 'Số lượng quyền',
            children: item?.permissions && item.permissions.length,
            span: 2
        },
        {
            key: 'title',
            label: 'Tiêu đề',
            children: item?.title,
            span: 'filled',
        },
        {
            key: 'descriptions',
            label: 'Mô tả',
            children: item?.description,
            span: 'filled',
        },
        {
            key: 'permissions',
            label: 'Danh sách quyền',
            children: (
                item?.permissions && item?.permissions.map((item) => (
                    <Tag color={getColorCrud(item.name)}>
                        {`${transformNamePermission(item.name)} ${transformResourcePermission(item.resource)}`}
                    </Tag>
                ))
            )
        }
    ]
    return (
        <Modal
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={700}
        >
            <Descriptions 
                title="Chi tiết vai trò"
                bordered
                items={items}
            />
        </Modal>
    )
}

export default Detail