import { useDispatch, useSelector } from "react-redux"
import Banners from "../../components/ui/Banners/Banners"
import ProductsList from "../../components/ui/ProductsList/ProductsList"
import { AppDispatch, RootState } from "../../../../common/types/store.type"
import { useEffect } from "react"
import { fetchProducts } from "../../../../features/products/products.thunk"
import { StatusActiveEnum } from "../../../../constants/app.constant"


const Home = () => {


    const {items} = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    const LIMIT_PRODUCTS_FEATURE = 8
    useEffect(() => {
        dispatch(fetchProducts({
            status: StatusActiveEnum.ACTIVE,
            limit: LIMIT_PRODUCTS_FEATURE
        }))
    },[dispatch])
    return (
        <>
            <Banners />
            <ProductsList products={items} title="Sản phẩm nổi bậc" />
        </>
    )
}

export default Home