import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../common/types/store.type"
import { useEffect, useState } from "react";
import { fetchProducts } from "../../../../features/products/products.thunk";
import ProductsList from "../../components/ui/ProductsList/ProductsList";
import { Button, Col, Input, Pagination, Row, Select, Space } from "antd";
import { InputFormatPrice } from "../../../../components/Input/InputFormatPrice";
import styles from "./Products.module.scss";
import { useSearchParams } from "react-router-dom";
import { formatVndToNumber } from "../../../../utils/format";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { SortOrder } from "../../../../constants/app.constant";

const Products = () => {

    const {items, pagination} = useSelector((state: RootState) => state.products);
    const [searchParam, setSearchParam] = useSearchParams();
    const [minPrice, setMinPrice] = useState<number>();
    const [maxPrice, setMaxPrice] = useState<number>();
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
    const limit = parseInt(searchParam.get('limit') as string ) || 16 
    const keyword = searchParam.get('keyword') as string
    const page = parseInt(searchParam.get('page') as string) || 1
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchProducts({
            keyword,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder,
            limit,
            page
        }))
    },[
        dispatch, 
        keyword, 
        minPrice, 
        maxPrice,
        sortBy,
        sortOrder,
        limit,
        page
    ])
    
    //Handle sort 
    const handleSort = (value: string) => {
        const [sortBy, sortOrder] = value.split("-");
        setSortBy(sortBy);
        setSortOrder(sortOrder as SortOrder);
    }
    return (
        
        <div className="container">
            <Row className={styles.actions}>
                <Col span={6} className={styles.actions__item}>
                    <span>Khoảng giá: </span>
                    <Space className={styles.actions__inner}>
                        <InputFormatPrice  
                            customInput={Input} 
                            className={styles.input__range__price}
                            placeholder="Từ..."
                            onChange={(e) => setMinPrice(formatVndToNumber(e.target.value))}
                        />
                        <InputFormatPrice 
                            customInput={Input}
                            className={styles.input__range__price}
                            placeholder="Tới..."
                            onChange={(e) => setMaxPrice(formatVndToNumber(e.target.value))}
                        />
                    </Space>
                </Col>
                <Col span={6} className={styles.actions__item}>
                    <span>Sắp xếp</span>
                    <Select 
                        value={`${sortBy}-${sortOrder}`} 
                        className={styles.select__sort} 
                        onChange={handleSort}
                    >
                        <Select.Option value="price-desc"> Giá tiền <ArrowDownOutlined /> </Select.Option>
                        <Select.Option value="price-asc">Giá tiền <ArrowUpOutlined /></Select.Option>
                        <Select.Option value="discountPercentage-desc">Giảm giá <ArrowDownOutlined /> </Select.Option>
                        <Select.Option value="discountPercentage-asc">Giảm giá <ArrowUpOutlined /> </Select.Option>
                        <Select.Option value="createdAt-desc">Mới nhất <ArrowDownOutlined /> </Select.Option>
                        <Select.Option value="createdAt-asc">Cũ nhất <ArrowUpOutlined /> </Select.Option>
                    </Select>
                </Col>
                <Col span={6} className={styles.actions__item}>
                    <span>Khác</span>
                    <Space>
                        <Select 
                            onChange={(val) => {
                                searchParam.set('limit',limit.toString())
                                setSearchParam({
                                    limit: val.toString()
                                })
                            }} 
                            className={styles.select__limit}
                            value={limit}
                            style={{width: '120px'}}
                        >
                            <Select.Option value={8}>
                                Giới hạn 8
                            </Select.Option>
                            <Select.Option value={16}>
                                Giới hạn 16
                            </Select.Option>
                            <Select.Option value={32}>
                                Giới hạn 32
                            </Select.Option>
                        </Select>
                        <Button>
                            Nổi bậc
                        </Button>
                    </Space>
                </Col>
            </Row>
            <ProductsList products={items} />
            <Pagination 
                total={pagination?.total}
                align="center"
                pageSize={pagination?.limit}
                current={page}
                onChange={(page: number) => {
                    searchParam.set('page', page.toString())
                    setSearchParam(searchParam)
                }}
            />
        </div>
    )
}

export default Products