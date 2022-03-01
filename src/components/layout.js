import * as React from "react";
import {Link} from "gatsby";
import "../scss/category.scss";

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
            <Link className="header-link-home" to="/">
                {title}
            </Link>
        )
    }

    return (
        <div className="global-wrapper" data-is-root-path={isRootPath}>
            <header className="global-header">{header}</header>
            <Category categories={categories} thisCategory={thisCategory}/>
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
