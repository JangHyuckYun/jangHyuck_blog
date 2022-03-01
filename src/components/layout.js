import * as React from "react";
import {Link} from "gatsby";
import Logo from "../images/logo_blue.png";
import "../scss/layout.scss";

const Category = ({categories, thisCategory}) => {
    if (categories === undefined) {
        return (
            <ul className="categories">
            </ul>
        );
    }
    return (
        <ul className="categories">
            {categories.map(({fieldValue, totalCount}) => {
                console.log(fieldValue, totalCount);
                return (
                    <li key={fieldValue}
                        className={fieldValue === thisCategory ? "active" : ""}>{fieldValue}({totalCount})</li>
                );
            })}
        </ul>
    );
};


const Layout = ({location, title, categories, thisCategory, children}) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    const isRootPath = location.pathname === rootPath;
    let header;
    if (isRootPath) {
        header = (
            <h1 className="main-heading">
                <Link to="/">{title}</Link>
            </h1>
        )
    } else {
        header = (
            <div>

            </div>
        )
    }

    return (
        <div className="global-wrapper" data-is-root-path={isRootPath}>
            <input type="checkbox" name="menu-check" id="menu-check" className="none" />
            <header className="global-header">
                <div className="menu-icon">
                    <label htmlFor="menu-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <div className="logo-cover">
                    <Link to="/" className="logo">
                        <img src={Logo} alt="logo"/>
                    </Link>
                </div>
                <div className="empty"></div>
            </header>
            <aside className="menu-main">
                <Category categories={categories} thisCategory={thisCategory}/>
            </aside>
            <main>{children}</main>
            <footer>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.com">Gatsby</a>
            </footer>
        </div>
    )
}

export default Layout
