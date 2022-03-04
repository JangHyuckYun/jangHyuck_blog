import React from "react";
import {Link} from "gatsby";
import Logo from "../images/logo_blue.png";
import "../scss/layout.scss";
import Utterances from "./utterances";

const kebabCase = (str: string) => str.split(" ").join("-").toLowerCase();

const Category = ({categories, thisCategory}: any) => {
    if (categories === undefined) {
        return (
            <ul className="categories">
            </ul>
        );
    }
    return (
        <ul className="categories">
            {categories.map(({fieldValue, totalCount}: any) => {
                console.log(fieldValue, totalCount);
                return (
                    <li key={fieldValue} className={fieldValue === thisCategory ? "active" : ""}>
                        <Link to={`/categories/${kebabCase(fieldValue)}`}>{fieldValue}({totalCount})</Link>
                    </li>
                );
            })}
        </ul>
    );
};


const Layout = ({location, title, categories, thisCategory, children}: any) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    const isRootPath = location.pathname === rootPath;
    const isNotIncludePathComment = isRootPath || location.pathname.includes("categories");

    return (
        <div className="global-wrapper" data-is-root-path={isRootPath}>
            <input type="checkbox" name="menu-check" id="menu-check" className="none" />
            <header className="global-header">
                <div className="menu-icon">
                    <label htmlFor="menu-check">
                        <span />
                        <span />
                        <span />
                    </label>
                </div>
                <div className="logo-cover">
                    <Link to="/" className="logo">
                        <img src={Logo} alt="logo"/>
                    </Link>
                </div>
                <div className="empty" />
            </header>
            <aside className="menu-main">
                <Category categories={categories} thisCategory={thisCategory}/>
                <label htmlFor="menu-check" className="background-cover" />
            </aside>
            <main>{children}</main>
            <footer>
                {isNotIncludePathComment ? "" : <div className="comments">
                    <Utterances repo='JangHyuckYun/jangHyuck_blog' theme='github-light' />
                </div> }
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.com">Gatsby</a>
            </footer>
        </div>
    )
}

export default Layout;
