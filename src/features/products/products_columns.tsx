import { Button, Image, Input, Popconfirm, Select, Slider, Space, TableColumnType, Tag } from "antd";
import { StatusActiveEnum } from "../../constants/app.constant";
import { getColorByStatus, transfromStatus } from "../../utils/transform";
import { formatDate, formatPriceToVnd, formatVndToNumber } from "../../utils/format";
import { CloseOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { DESC_CONFIRM_REMOVE, TITLE_CONFIRM_REMOVE } from "../../constants/title.constant";
import { InputFormatPrice } from "../../components/Input/InputFormatPrice";



interface ProductsColumns {
    setOpenDetail: (value: boolean) => void;
    setOpenEdit: (value: boolean) => void;
    currentPage?: number;
    setFilterStatus: (status: StatusActiveEnum) => void;
    setId: (id: string) => void;
    handleChangeStatus:(id: string, status: StatusActiveEnum) => void;
    handleRemove: (id: string) => void;
    setMinPrice: (price: number) => void;
    setMaxPrice: (price: number) => void;
    setMinPercentage: (range: number) => void;
    setMaxPercentage: (range: number) => void;
}

export const productsColumns = (productColumns: ProductsColumns): TableColumnType[] => {

    const {
        setOpenDetail, 
        setOpenEdit, 
        currentPage = 0, 
        setFilterStatus,
        setId,
        handleChangeStatus,
        handleRemove,
        setMinPrice,
        setMaxPrice,
        setMinPercentage,
        setMaxPercentage
    } = productColumns


    return [
        {
            key: '#',
            title: '#',
            render: (_,record, i) => (i + currentPage + 1),
            rowScope: 'row'
        },
        {
            key: 'title',
            title: 'Tiêu đề',
            dataIndex: 'title'
        },
        {
            key: 'thumbnail',
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            render: (thumbnailUrl: string) => 
            <Image 
                width={70} 
                height={70} 
                style={{borderRadius: '7px'}}
                src={thumbnailUrl}
            />
        },
        {
            key: 'category',
            title: 'Danh mục',
            dataIndex: ['category','title']
        },
        {
            key: 'price',
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (price: number) => formatPriceToVnd(price),
            sorter: true,
            filterDropdown: () => (
                <Space style={{padding: '10px'}}>
                    <InputFormatPrice 
                        placeholder="Từ..." 
                        onChange={(e) => setMinPrice(formatVndToNumber(e.target.value))}
                        customInput={Input as any}
                    />
                    <InputFormatPrice 
                        placeholder="Tới..." 
                        onChange={(e) => setMaxPrice(formatVndToNumber(e.target.value))}
                        customInput={Input as any}
                    />
                </Space>
            )
        },
        {
            key: 'discountPercentage',
            title: '% giảm giá',
            dataIndex: 'discountPercentage',
            render: (value: number) => `${value}%`,
            sorter: true,
            filterDropdown: () => (
                <Slider 
                    style={{margin: '10px'}}
                    range
                    step={5}
                    min={0}
                    max={100}
                    onChange={(value) => {
                        const [minPrice, maxPrice] = value;
                        setMinPercentage(minPrice)
                        setMaxPercentage(maxPrice)
                    }} 
                    defaultValue={[0, 100]}/>
            )
        },
        {
            key: 'quantity',
            dataIndex: ['inventories','quantity'],
            title: 'Số lượng'
        },
        {
            key: 'status',
            title: 'Trạng thái',
            dataIndex: 'status',
            filterDropdown: () => (
                <div className="">
                    <Select
                        style={{ width: 150 }}
                        placeholder="Lọc theo trạng thái"
                        allowClear
                        onChange={(val) => setFilterStatus(val)}
                    >
                        <Select.Option value={StatusActiveEnum.ACTIVE}>Hoạt động</Select.Option>
                        <Select.Option value={StatusActiveEnum.INACTIVE}>Không hoạt động</Select.Option>
                    </Select>    
                </div>
            ),
            render: (status: StatusActiveEnum, record) => (
                <Tag 
                    color={getColorByStatus(status)}
                    onClick={() => handleChangeStatus(record.id,status) }
                >
                    {transfromStatus(status)}
                </Tag>
            )
        },
        {
            key: 'createdAt',
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (date: Date) => formatDate(date),
            sorter: true
        },
        {
            key: 'updatedAt',
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            render: (date: Date) => formatDate(date),
            sorter: true
        },
        {
            key: 'actions',
            title: 'Thao tác',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EyeOutlined/>}
                        variant="filled"
                        color="blue"
                        size="large"
                        onClick={() => {
                            setOpenDetail(true) 
                            setId(record.id)
                        }}
                    />
                    <Button
                        icon={<EditOutlined/>} 
                        variant="filled"
                        color="yellow"
                        size="large"
                        onClick={() => {
                            setOpenEdit(true)
                            setId(record.id)
                        }}
                    />
                    <Popconfirm 
                        title={TITLE_CONFIRM_REMOVE}
                        description={DESC_CONFIRM_REMOVE}
                        okText='Có'
                        cancelText='Không'
                        onConfirm={() => handleRemove(record.id)}
                    >
                        <Button
                            icon={<CloseOutlined color="red" />} 
                            variant="filled"
                            color="red"
                            size="large"
                        />
                    </Popconfirm>
                </Space>
            )
        }
    ]
}