import { Image, Modal, Radio, Table, TableColumnProps, Tag, Typography, Input } from "antd";
import { getColorByStatus, transfromStatus } from "../../../../../utils/transform";
import { formatDate } from "../../../../../utils/format";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../common/types/store.type";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../../../../features/categories/categories.thunk";
import styles from "./CategorySelectModal.module.scss"
import { UUID } from "../../../../../common/types/uuid.type";

const {Title} = Typography;
const {Search} = Input 
interface CategoryProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    categoryId: UUID;
    setCategoryId: (id: UUID) => void;
    setCategoryTitle: (title: string) => void;
}
const CategoryModal = (props: CategoryProps) => {
    const {
        open, 
        setOpen, 
        categoryId, 
        setCategoryId,
        setCategoryTitle
    } = props;
    const {items} = useSelector((state: RootState) => state.categories);
    const [keyword, setKeyword] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchCategories({
            keyword
        }))
    },[dispatch, keyword])
    const columns: TableColumnProps[] = [
        {
            key: 'categoryId',
            dataIndex: 'id',
            title: 'Chọn',
            render: (val, record) => <Radio 
                                checked={val === categoryId} 
                                value={val}
                                onClick={() => {
                                    setCategoryId(val);
                                    setCategoryTitle(record.title)
                                }}
                              />
        },
        {
            key: '#',
            title: '#',
            render: (_,record, index) => index  + 1
        },
        {
            key: 'title',
            title: 'Tiêu đề',
            dataIndex: 'title',
            filterDropdown: () => (
                <Search placeholder="Tìm kiếm..." onChange={(e) => setKeyword(e.target.value)}/>
            ) 
        },
        {
            key: 'thumbnail',
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            render: (val) => <Image 
                                width={70} 
                                height={70}
                                src={val}
                                style={{borderRadius: '10px'}}
                              />
        },
        {
            key:'status',
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (val) => <Tag   
                                color={getColorByStatus(val)}
                              >
                                    {transfromStatus(val)}
                             </Tag>
        },
        {
            key: 'createdAt',
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (val) => formatDate(val)
        }
    ]
    return (
        <Modal
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={800}
        >
            <Title level={2} className={styles.title}>Chọn 1 sản phẩm</Title>
            <Table 
                columns={columns}
                dataSource={items}
            />
        </Modal>
    )
}

export default CategoryModal