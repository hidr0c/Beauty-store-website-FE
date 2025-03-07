import { Button, Descriptions, DescriptionsProps, Tag } from "antd";
import styles from "./Profile.module.scss"
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../common/types/store.type";
import { formatDate } from "../../../../utils/format";
import { Gender, StatusActiveEnum } from "../../../../constants/app.constant";
import { getColorByStatus, transfromGender, transfromStatus } from "../../../../utils/transform";
import { useState } from "react";
import EditModal from "./EditModal";
const InfoTab = () => {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const {currentUser} = useSelector((state: RootState) => state.users)
    const items: DescriptionsProps['items'] = [
        { key: "1", label: "Id", children: currentUser?.id, span: 'filled'},
        { key: "2", label: "Họ và tên", children: currentUser?.fullName, span: 'filled' },
        { key: "3", label: "Email", children: currentUser?.email, span: 'filled' },
        { key: "4", label: "Trạng thái", children: <Tag color={getColorByStatus(currentUser?.status as StatusActiveEnum)}>{transfromStatus(currentUser?.status as StatusActiveEnum)}</Tag>, span: 'filled' },
        { key: "5", label: "Giới tính", children: transfromGender(currentUser?.gender as Gender), span: 'filled' },
        { key: "6", label: "Sinh nhật", children: formatDate(currentUser?.birthDate as Date), span: 'filled' },
    ];

    return  <>
        <Descriptions bordered items={items} />
        <Button 
            className={styles.btn__edit}
            icon={<EditOutlined />} 
            iconPosition="end"
            onClick={() => setOpenEdit(true)}
        > 
        Chỉnh sửa
        </Button>
        <EditModal open={openEdit} setOpen={setOpenEdit} />
    </>
};

export default InfoTab;