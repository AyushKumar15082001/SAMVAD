import React from "react";
import { BsTwitter } from 'react-icons/bs';
import {BiUserCircle} from 'react-icons/bi';
import {CgMenuGridO} from 'react-icons/cg';
import {IoMdArrowDropdown} from 'react-icons/io';
import Styles from './Navbar.module.css';
function Navbar({name, handleLogout}) {
  return (
    <nav className={Styles.navbar}>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <div className={Styles.nav_left}>
        <BsTwitter className={Styles.logo} />
        <input type="text" placeholder="# Explore" />
      </div>
      <div className={Styles.nav_right}>
        <div className = {Styles.userName} onClick={handleLogout}>
          <BiUserCircle className={Styles.userIcon} />
          <span>{name}</span>
          <IoMdArrowDropdown className={Styles.arrowIcon} />
        </div>
        <div className={Styles.nav_menu}>
          <CgMenuGridO className={Styles.menuIcon} />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;