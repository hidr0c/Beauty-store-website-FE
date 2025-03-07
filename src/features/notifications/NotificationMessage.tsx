import { useSelector } from "react-redux"
import { RootState } from "../../common/types/store.type";
import { notification } from "antd";
import { useEffect } from "react";




const NotificationMessage = () => {

    const {type, message, description} = useSelector((state: RootState) => state.notification);
    const [api, contextHolder] = notification.useNotification();
    console.log(type, message, description)
    useEffect(() => {
        if (type && message && api[type as 'success' | 'error']) {
            api[type as 'success' | 'error']({
                message,
                description,
            });
        }
    }, [type, message, description, api]);
    

    return contextHolder
}

export default NotificationMessage