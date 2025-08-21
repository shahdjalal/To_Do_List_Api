import React, { useContext, useState } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import style from './Footer.module.css'
import { ThemeContext } from '../context/ThemeContext';
export default function Footer() {

   const { darkMode } = useContext(ThemeContext);


  return (
  <>
     <footer className={`${darkMode ? style.dark: "" }`}>
  <div className="container">
    <p>© 2025 Shahd Jalal. All rights reserved.</p>
    <div className={style.socialIcons}>
      <a href="https://github.com/shahdjalal/To_Do_List_App/tree/main" target="_blank" aria-label="GitHub profile"><FaGithub /></a>
      <a href="https://www.linkedin.com/in/shahd-marouf/" target="_blank" aria-label="linkedin profile"><FaLinkedin /></a>
      <a href="#"  aria-label="twitter profile"><FaTwitter /></a>
    </div>
  </div>
</footer>

</>
  )
}
