import { Table, TableColumnProps } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../common/types/store.type"
import { useEffect } from "react";
import { fetchPermissions } from "../../../../features/permissions/permissions.thunk";
import { fetchRoles } from "../../../../features/roles/roles.thunk";

const Permissions = () => {

    const roles = useSelector((state: RootState) => state.roles);
    const permissions = useSelector((state: RootState) => state.permissions);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchPermissions({}))
    },[dispatch]) 

    useEffect(() => {
        dispatch(fetchRoles({}))
    },[dispatch])

    const colums: TableColumnProps[] = roles.items.map((item) => ({
        key: item.id,
        title: item.title,
        dataIndex: item.id
    }))
    return (

        <Table columns={colums} />
    )
}

export default Permissions