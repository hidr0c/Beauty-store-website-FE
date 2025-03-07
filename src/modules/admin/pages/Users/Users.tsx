import { Table } from "antd"
import { usersColums } from "../../../../features/users/users_columns"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../common/types/store.type"
import { useEffect } from "react"
import { fetchUsers } from "../../../../features/users/users.thunk"



const Users = () => {

    const {items} = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchUsers({}))
    },[dispatch])
    return (
        <Table  
            columns={usersColums()} 
            dataSource={items}
        />
    )
}

export default Users