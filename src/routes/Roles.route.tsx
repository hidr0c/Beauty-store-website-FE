import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../common/types/store.type"
import { RoleAdmin } from "../constants/role.constant";
import { Navigate } from "react-router-dom";
import { showNotification } from "../features/notifications/notification.slice";



const Roles = ({children}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {roleId} = useSelector((state: RootState) => state.auth);
    if(roleId !== RoleAdmin) {
        dispatch(showNotification({
            type: 'error', 
            message: 'Bạn không có quyền truy cập vào trang này'
        }))
        return <Navigate to={'/login'}/>
    }

    return children
}

export default Roles