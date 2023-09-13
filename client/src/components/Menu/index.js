import {Link} from 'react-router-dom';
import Styles from './ProfileMenu.module.css';
import { useState } from 'react';

import {AiFillHome, AiOutlineHome} from 'react-icons/ai';
import {IoNotificationsSharp, IoNotificationsOutline} from 'react-icons/io5';
import {BsBookmarkStarFill, BsBookmarkStar} from 'react-icons/bs';
import {MdVerified, MdOutlineVerified} from 'react-icons/md';
import {IoSettingsSharp, IoSettingsOutline} from 'react-icons/io5';
import {FaUser, FaRegUser} from 'react-icons/fa';

const ProfileMenu = ()=>{
    const [active, setActive] = useState(window.location.pathname.split('/')[1]);
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
            <li><Link to="/profile" onClick={()=>setActive("profile")}><span><icons.profile/>Profile</span> </Link></li>
            <li><Link to="/profile" onClick={()=>setActive("notification")}><span><icons.notification/>Notification </span> </Link></li>
            <li><Link to="/profile" onClick={()=>setActive("bookmarks")}><span><icons.bookmark/>Bookmarks</span> </Link></li>
            <li><Link to="/profile" onClick={()=>setActive("verified")}><span><icons.verified/>Get Verified</span> </Link></li>
            <li><Link to="/profile" onClick={()=>setActive("settings")}><span><icons.settings/>Settings</span> </Link></li>
        </ul>
    )
}
export default ProfileMenu;