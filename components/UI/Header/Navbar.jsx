"use client";

import { useEffect, useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "../Icons/MenuIcon";
import { headerLinks } from "@/utlis/headerLinks";
import styles from "./Navbar.module.scss";

const FIXED_SCROLL_POSITION = 600;
export default function Navbar({ showBackgroundColor }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { quoteLink, navigationLinks } = useMemo(() => {
    const quote = headerLinks.find((link) => link.url === "/get-a-quote");
    const links = headerLinks.filter((link) => link.url !== "/get-a-quote");

    return { quoteLink: quote, navigationLinks: links };
  }, []);

  const isSolid =
    showBackgroundColor || scrollPosition >= FIXED_SCROLL_POSITION || drawerOpen;
  const appBarStyle = {
    "--navbar-surface-shadow": isSolid
      ? "0 18px 48px rgba(0, 0, 0, 0.22)"
      : "0 10px 34px rgba(0, 0, 0, 0.12)",
    borderBottom: "none",
    transform: "translateY(0)",
  };

  const isActive = (url) => {
    if (url === "/") {
      return pathname === "/";
    }

    if (url.includes("#")) {
      return false;
    }

    return pathname === url;
  };

  const closeMobileNavigation = () => {
    setDrawerOpen(false);
    setOpenMenu(null);
  };

  const openMobileNavigation = () => {
    setOpenMenu(null);
    setDrawerOpen(true);
  };

  const toggleSubmenu = (event, index) => {
    event.preventDefault();
    setOpenMenu((current) => (current === index ? null : index));
  };

  const renderDesktopLink = (item, index) => {
    const hasSubLinks = Boolean(item.subLinks?.length);

    return (
      <div
        key={`${item.label}-${item.url}`}
        className={styles.navItem}
        onMouseEnter={() => hasSubLinks && setOpenMenu(index)}
        onMouseLeave={() => hasSubLinks && setOpenMenu(null)}
      >
        <Link
          href={item.url}
          className={`${styles.navLink} ${isActive(item.url) ? styles.active : ""}`}
          onClick={hasSubLinks ? (event) => toggleSubmenu(event, index) : null}
        >
          <span>{item.label}</span>
          {hasSubLinks && (
            <KeyboardArrowDownRoundedIcon
              className={`${styles.chevron} ${
                openMenu === index ? styles.chevronOpen : ""
              }`}
            />
          )}
        </Link>

        {hasSubLinks && (
          <div
            className={`${styles.submenu} ${
              openMenu === index ? styles.submenuOpen : ""
            }`}
          >
            {item.subLinks.map((subLink) => (
              <Link
                key={`${subLink.label}-${subLink.url}`}
                href={subLink.url}
                className={`${styles.submenuLink} ${
                  isActive(subLink.url) ? styles.active : ""
                }`}
              >
                {subLink.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMobileLink = (item, index) => {
    const hasSubLinks = Boolean(item.subLinks?.length);

    return (
      <li key={`${item.label}-${item.url}`} className={styles.mobileItem}>
        <Link
          href={item.url}
          className={`${styles.mobileLink} ${
            isActive(item.url) ? styles.active : ""
          }`}
          onClick={
            hasSubLinks ? (event) => toggleSubmenu(event, index) : closeMobileNavigation
          }
        >
          <span>{item.label}</span>
          {hasSubLinks && (
            <KeyboardArrowDownRoundedIcon
              className={`${styles.chevron} ${
                openMenu === index ? styles.chevronOpen : ""
              }`}
            />
          )}
        </Link>

        {hasSubLinks && (
          <ul
            className={`${styles.mobileSubmenu} ${
              openMenu === index ? styles.mobileSubmenuOpen : ""
            }`}
          >
            {item.subLinks.map((subLink) => (
              <li key={`${subLink.label}-${subLink.url}`}>
                <Link
                  href={subLink.url}
                  className={`${styles.mobileSubmenuLink} ${
                    isActive(subLink.url) ? styles.active : ""
                  }`}
                  onClick={closeMobileNavigation}
                >
                  {subLink.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Divider className={styles.mobileDivider} />
      </li>
    );
  };

  return (
    <>
      <AppBar className={styles.appBar} style={appBarStyle} elevation={0}>
        <Container maxWidth="xl" >
          <div className={styles.container}>
          <Toolbar disableGutters className={styles.toolbar}>
            <Link href="/" className={styles.brand} aria-label="Luxury Cleaning home">
              <Image
                src="/logo.png"
                width={64/1.5}
                height={72/1.5}
                quality={100}
                alt="Luxury Cleaning logo"
                priority
              />
            </Link>

            <nav className={styles.desktopNav} aria-label="Primary navigation">
              {navigationLinks.map(renderDesktopLink)}
            </nav>

            {quoteLink && (
              <Link href={quoteLink.url} className={styles.cta}>
                {quoteLink.label}
              </Link>
            )}

            <IconButton
              className={styles.menuButton}
              aria-label="Open navigation menu"
              aria-controls="site-navigation"
              aria-expanded={drawerOpen}
              onClick={openMobileNavigation}
              disableRipple
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Toolbar>
          </div>
        </Container>
      </AppBar>

      <div
        aria-hidden={!drawerOpen}
        className={`${styles.drawerOverlay} ${
          drawerOpen ? styles.drawerOverlayOpen : ""
        }`}
        role="presentation"
        onClick={closeMobileNavigation}
      >
        <aside
          id="site-navigation"
          className={`${styles.mobilePanel} ${
            drawerOpen ? styles.mobilePanelOpen : ""
          }`}
          aria-label="Site navigation"
          inert={!drawerOpen}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>Menu</span>

            <IconButton
              className={styles.closeButton}
              aria-label="Close navigation menu"
              onClick={closeMobileNavigation}
              disableRipple
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>

          <ul className={styles.mobileLinks}>
            {navigationLinks.map(renderMobileLink)}
          </ul>

          {quoteLink && (
            <Link
              href={quoteLink.url}
              className={styles.drawerCta}
              onClick={closeMobileNavigation}
            >
              {quoteLink.label}
            </Link>
          )}
        </aside>
      </div>
    </>
  );
}
