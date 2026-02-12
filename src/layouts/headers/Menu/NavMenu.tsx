"use client";
import menu_data from "@/data/home-data/MenuData";
import menu_data_en from "@/data/home-data/MenuDataEn";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import logo from "@/assets/images/logo/logo_01.svg";

type Locale = "es" | "en";

const NavMenu = ({ locale = "es" }: { locale?: Locale }) => {
    const pathname = usePathname();
    const [navTitle, setNavTitle] = useState("");
    const menuSource = locale === "en" ? menu_data_en : menu_data;
    const homeHref = locale === "en" ? "/en" : "/";

    const openMobileMenu = (menu: any) => {
        if (navTitle === menu) {
            setNavTitle("");
        } else {
            setNavTitle(menu);
        }
    };

    return (
        <ul className="navbar-nav align-items-lg-center">
            <li className="d-block d-lg-none"><div className="logo"><Link href={homeHref} className="d-block"><Image src={logo} alt="" /></Link></div></li>
            {menuSource.map((menu: any) => (
                <li key={menu.id} className={`nav-item dropdown ${menu.class_name}`}>
                    <Link href={menu.link} className={`nav-link dropdown-toggle ${pathname === menu.link ? 'active' : ''}
                     ${navTitle === menu.title ? "show" : ""}`} onClick={() => openMobileMenu(menu.title)}>
                        {menu.title}
                    </Link>
                    {menu.has_dropdown && (
                        <>
                            <ul className={`dropdown-menu ${navTitle === menu.title ? "show" : ""}`}>
                                {menu.sub_menus && menu.sub_menus.map((sub_m: any, i: any) => (
                                    <li key={i}>
                                        <Link href={sub_m.link} className={`dropdown-item ${pathname === sub_m.link ? 'active' : ''}`}>
                                            <span>{sub_m.title}</span>
                                        </Link>
                                    </li>
                                ))}
                                {menu.menu_column && (
                                    <li className="row gx-1">
                                        {menu.menu_column.map((item: any) => (
                                            <div key={item.id} className="col-lg-4">
                                                <div className="menu-column">
                                                    <h6 className="mega-menu-title">{item.mega_title}</h6>
                                                    <ul className="style-none mega-dropdown-list">
                                                        {item.mega_menus.map((mega_m: any, i: any) => (
                                                            <li key={i}><Link href={mega_m.link} className={`dropdown-item ${pathname === mega_m.link ? 'active' : ''}`}><span>{mega_m.title}</span></Link></li>))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </li>
                                )}
                            </ul>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;
