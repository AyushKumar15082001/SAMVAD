import { React, useState } from "react";
import { BsTwitter } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import { IoMdArrowDropdown } from 'react-icons/io';
import Styles from './Navbar.module.css';
import {Link} from 'react-router-dom';
function Navbar({ name, profilePic, handleLogout }) {

  const [menu, setMenu] = useState(false);

  return (
    <nav className={Styles.navbar}>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <div className={Styles.nav_left}>
        <BsTwitter className={Styles.logo} />
        <input type="text" placeholder="# Explore" />
      </div>
      <div className={Styles.nav_right}>
        <div className={Styles.userName} onClick={()=> setMenu(t=> !t) }>
          <img src={profilePic} alt="user" className={Styles.userIcon} />
          <span>{name}</span>
          <IoMdArrowDropdown className={Styles.arrowIcon} />
        </div>
        {menu && (
          <div className={Styles.menu}>
           <Link to="/profile" className={Styles.menu_item}>
              <span>Profile </span>
            </Link>
            <div className={Styles.menu_item} onClick = {handleLogout}>
              <span>Logout </span>
            </div>
          </div>
        )}

        <div className={Styles.nav_menu}>
          <CgMenuGridO className={Styles.menuIcon} />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;