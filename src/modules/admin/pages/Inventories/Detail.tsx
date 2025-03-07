import { Descriptions, DescriptionsProps, Modal } from "antd"
import { CruProps } from "../../../../common/interfaces/cru-props.interface"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../common/types/store.type";
import { fetchInventoryById } from "../../../../features/inventories/inventories.thunk";
import { formatDate } from "../../../../utils/format";



const Detail = (cruProps: CruProps) => {  
    const {open, setOpen, id} = cruProps;

    const {item} = useSelector((state: RootState) => state.inventories);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchInventoryById(id as string))
    },[dispatch, id])

    const items: DescriptionsProps['items'] = [
        {
            key: 'id',
            label: 'Id',
            children: id
        },
        {
            key: 'supplier',
            label: 'Nhà cung cấp',
            children: item?.supplier,
            span: 2
        },
        {
            key: 'address',
            label: 'Địa chỉ',
            children: item?.address
        },
        {
            key: 'productTitle',
            label: 'Sản phẩm',
            children: item?.product.title,
            span: 2
        },
        {
            key: 'quantity',
            label: 'Số lượng',
            children: item?.quantity
        },
        {
            key: 'createdAt',
            label: 'Ngày tạo',
            children: formatDate(item?.createdAt),
            span: 2
        },
        {
            key: 'updatedAt',
            label: 'Ngày cập nhật',
            children: formatDate(item?.updatedAt)
        }
    ]
    return (
        <Modal
            
            open={open}
            onCancel={() => setOpen(false)}
            onOk={() => setOpen(false)}
            width={800}
        >
            <Descriptions
                bordered
                title="Chi tiết đơn hàng" 
                items={items} 
            />
        </Modal>
    )
}

export default Detail