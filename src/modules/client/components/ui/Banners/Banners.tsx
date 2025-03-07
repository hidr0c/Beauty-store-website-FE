import { Carousel } from "antd"
import styles from "./Banners.module.scss";


const Banners = () => {

    return (
        <Carousel autoplay arrows>
            <div>
                <img 
                    className={styles.banner__img} 
                    src="https://img.freepik.com/free-vector/pomegranate-cosmetic-bottle-banner_33099-1963.jpg?t=st=1740629251~exp=1740632851~hmac=9af9de347f9c0c0dfeae3229bee6809e8b19334940dfce129d5386875d68f592&w=1380" 
                />
            </div>
            <div>
                <img
                    className={styles.banner__img}
                    src="https://img.freepik.com/free-vector/winter-cosmetic-chapstick-lip-balm-cream-jar_33099-1941.jpg?t=st=1740629241~exp=1740632841~hmac=a367757d65496d145efca65537c6de0101350c42ed27efecc2d9766a614d1f77&w=1380" 
                />
            </div>
            <div>
                <img
                    className={styles.banner__img}
                    src="https://img.freepik.com/free-vector/face-oil-skin-care-cosmetics-bottle-banner_107791-948.jpg?t=st=1740629555~exp=1740633155~hmac=f60c881f99d484215f813d5f6b319f72878e36c727039bbf66c42600a934b860&w=1800" 
                />
            </div>
        </Carousel>
    )
}

export default Banners