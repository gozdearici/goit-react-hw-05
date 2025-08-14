import React from "react";
import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const isActiveNav = ({ isActive }) => ({
    color: isActive ? "orange" : "black",
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <nav className={styles.navList}>
      <NavLink style={isActiveNav} to="/">
        Home
      </NavLink>
      <NavLink style={isActiveNav} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
