import {Link} from 'react-router-dom';
import Styles from './ProfileMenu.module.css';
import { useContext, useState } from 'react';

import {AiFillHome, AiOutlineHome} from 'react-icons/ai';
import {IoNotificationsSharp, IoNotificationsOutline} from 'react-icons/io5';
import {BsBookmarkStarFill, BsBookmarkStar} from 'react-icons/bs';
import {MdVerified, MdOutlineVerified} from 'react-icons/md';
import {IoSettingsSharp, IoSettingsOutline} from 'react-icons/io5';
import {FaUser, FaRegUser} from 'react-icons/fa';
import {HiOutlineLogout} from 'react-icons/hi';
import { UserContext } from '../../Contexts/userContext';

const ProfileMenu = ()=>{
    const [active, setActive] = useState(window.location.pathname.split('/')[1]);
    const {username} = useContext(UserContext);
    const icons = { 
        home:active === "home" ? AiFillHome : AiOutlineHome,
        profile:active === "profile" ? FaUser : FaRegUser,
        notification:active === "notification" ? IoNotificationsSharp : IoNotificationsOutline,
        bookmark:active === "bookmarks" ? BsBookmarkStarFill : BsBookmarkStar,
        verified:active === "verified" ? MdVerified : MdOutlineVerified,
        settings:active === "settings" ? IoSettingsSharp : IoSettingsOutline
    }
    return (
        <ul className={Styles.cont}>
            <li><Link to="/home" onClick={()=>setActive("home")}><span><icons.home/>Home</span> </Link></li>
            <li><Link to={`/profile/${username}`} onClick={()=>setActive("profile")}><span><icons.profile/>Profile</span> </Link></li>
            <li><Link to="/home" onClick={()=>setActive("notification")}><span><icons.notification/>Notification</span> </Link></li>
            <li><Link to="/home" onClick={()=>setActive("bookmarks")}><span><icons.bookmark/>Bookmarks</span> </Link></li>
            <li><Link to="/home" onClick={()=>setActive("verified")}><span><icons.verified/>Get Verified</span> </Link></li>
            <li><Link to="/home" onClick={()=>setActive("settings")}><span><icons.settings/>Settings</span> </Link></li>
            <li><Link to="/" onClick={()=>localStorage.removeItem('token')}><span><HiOutlineLogout/>Logout</span> </Link></li>
        </ul>
    )
}
export default ProfileMenu;