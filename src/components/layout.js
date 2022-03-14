import React from "react";
import {Link} from "gatsby";
import Logo from "../images/logo5.png";
import "../scss/layout.scss";
import Utterances from "./utterances";
import TableOfContents from "./tableOfContents";
import {GoMarkGithub} from "react-icons/go";
import {FaInstagramSquare} from "react-icons/fa";
import MenuCategory from "./menuCategory";


const Layout = ({location, title, categories, thisCategory, children, tableOfContents, isAllPosts}) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    const isRootPath = location.pathname === rootPath;
    const isNotIncludePathComment = isRootPath || location.pathname.includes("category");

    return (
        <>
            {isAllPosts ? (
                <div className={"blob"}>

                </div>
            ) : ""}
            <div className={(isAllPosts ? "global-posts global-container" : "global-container")}>
                <aside className="global-left">
                </aside>
                <div className="global-center">
                    <div className="global-wrapper" data-is-root-path={isRootPath}>
                        <input type="checkbox" name="menu-check" id="menu-check" className="none"/>
                        <header className="global-header">
                            <div className="logo-cover">
                                <Link to="/" className="logo">
                                    <img src={Logo} alt="logo"/>
                                </Link>
                            </div>
                            <div className="menu-icon mobile">
                                <label htmlFor="menu-check">
                                    <span/>
                                    <span/>
                                    <span/>
                                </label>
                            </div>
                        </header>
                        <aside className="menu-main mobile">
                            <MenuCategory categories={categories} thisCategory={thisCategory}/>
                            <label htmlFor="menu-check" className="background-cover"/>
                        </aside>
                        <aside className="main-category pc">

                        </aside>
                        <main>{children}</main>
                        <footer>
                            {isNotIncludePathComment ? "" : <div className="comments">
                                <Utterances repo='JangHyuckYun/jangHyuck_blog' theme='github-light'/>
                            </div>}
                        </footer>
                    </div>
                </div>
                <aside className="global-right">
                    <TableOfContents content={tableOfContents}/>
                </aside>
            </div>
            <footer className="main-footer">
                <div className="footer-container">
                    <p>JangHyuck`s Blog</p>
                    <p>
                        © {new Date().getFullYear()}, Built with
                        {` `}
                        <a href="https://www.gatsbyjs.com">Gatsby</a>
                    </p>
                    <div className="icons">
                        <Link to="https://github.com/JangHyuckYun" target="_blank">
                            <GoMarkGithub/>
                        </Link>
                        <Link to="https://www.instagram.com/longlarge_yoon/" target="_blank">
                            <FaInstagramSquare/>
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Layout
