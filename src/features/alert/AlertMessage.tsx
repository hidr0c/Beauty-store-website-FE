import React, { useEffect } from "react";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "./alert.slice";
import { RootState } from "../../common/types/store.type";

const AlertMessage: React.FC = () => {
  const dispatch = useDispatch();
  const { type, message: msg } = useSelector((state: RootState) => state.alert);

  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    if (type && msg) {
      messageApi[type](msg, 3);
      dispatch(clearAlert());
    }
  }, [type, msg, dispatch, messageApi]);

  return <>{contextHolder}</>; 
};

export default AlertMessage;
