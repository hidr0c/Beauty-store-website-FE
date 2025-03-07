import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom"
import { AppDispatch } from "../../../../common/types/store.type";
import { verify } from "../../../../features/auth/auth.thunk";
import { showNotification } from "../../../../features/notifications/notification.slice";
import { useEffect } from "react";


const VerifyEmail = () => {
    const param = useParams();
    const token = param.token as string;
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      const handleVerify = async () => {
        try {
          await dispatch(verify(token)).unwrap();
          dispatch(showNotification({ 
            type: "success", 
            message: "Xác thực thành công",
            description: 'Vui lòng đăng nhập' 
        }));
        } catch {
          dispatch(showNotification({ 
            type: "error", 
            message: "Xác thực thất bại" 
        }));
        }
      };
  
      if (token) {
        handleVerify();
      }
    }, [dispatch, token]);
  
    return <Navigate to={"/login"} />;
  };
  
  export default VerifyEmail;