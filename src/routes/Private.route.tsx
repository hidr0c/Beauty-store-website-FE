import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../common/types/store.type";
import { Navigate } from "react-router-dom";
import { showNotification } from "../features/notifications/notification.slice";

const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {isAuth, roleId} = useSelector((state: RootState) => state.auth);

    if(!isAuth) {
        dispatch( showNotification({
            type: 'error', 
            message: 'Bạn chưa đăng nhập !',
            description: 'Vui lòng đăng nhập để truy cập trang này'
        }))
        return <Navigate to="/login"/>
    }
    return children
};

export default PrivateRouter;
