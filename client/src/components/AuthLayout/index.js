import Styles from "./AuthLayout.module.css";
import { Outlet } from "react-router-dom";
import blob from '../../images/home_blob.svg'
import blob1 from '../../images/home_blob_1.svg'

const AuthLayout = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.subcontainer}>
                <div className={Styles.imgcontainer}>
                    <img src={blob} alt="blob" className={Styles.blob} />
                    <img src={blob1} alt="blob" className={Styles.blob1} />
                </div>
            </div>
            <Outlet />
        </div>
    );
}
export default AuthLayout;
