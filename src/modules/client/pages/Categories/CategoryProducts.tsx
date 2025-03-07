import { useDispatch, useSelector } from "react-redux"
import ProductsList from "../../components/ui/ProductsList/ProductsList"
import { AppDispatch, RootState } from "../../../../common/types/store.type"
import { useEffect } from "react";
import { fetchProducts } from "../../../../features/products/products.thunk";
import { useParams } from "react-router-dom";



const CategoryProducts = () => {
    const param = useParams();
    const slug = param.slug;
    const {items} = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchProducts({
            categorySlug: slug
        }))
    },[dispatch, slug])

    return (
        <ProductsList 
            title="Sản phẩm theo danh mục"
            products={items} 
        />
    )
}


export default CategoryProducts