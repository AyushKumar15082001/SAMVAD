import React from "react";
import { BsTwitter } from 'react-icons/bs';
import {BiUserCircle} from 'react-icons/bi';
import {CgMenuGridO} from 'react-icons/cg';
import {IoMdArrowDropdown} from 'react-icons/io';
import Styles from './Navbar.module.css';
function Navbar(props) {
  const {firstName,lastName} = props.userName;
  // console.log("Navbar returns ",firstName,lastName);
  return (
    // <div className="navbar">
    //   {/* <Link href="/">
    //     <a className="navbar__logo">
    //       <img src="/images/logo.svg" alt="logo" />
    //     </a>
    //   </Link>
    //   <div className="navbar__menu">
    //     <Link href="/about">
    //       <a className="navbar__menu__item">About</a>
    //     </Link>
    //     <Link href="/contact">
    //       <a className="navbar__menu__item">Contact</a>
    //     </Link> */}
    //     Hi
    //   {/* </div> */}
    // </div>
    <nav className={Styles.navbar}>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <div className={Styles.nav_left}>
        <BsTwitter className={Styles.logo} />
        <input type="text" placeholder="# Explore" />
      </div>
      <div className={Styles.nav_right}>
        <div className = {Styles.userName}>
          <BiUserCircle className={Styles.userIcon} />
          <span>{firstName + " " + lastName}</span>
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