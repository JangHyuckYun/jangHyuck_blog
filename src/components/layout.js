import React from "react";
import {Link} from "gatsby";
import Logo from "../images/logo_blue.png";
import "../scss/layout.scss";
import Utterances from "./utterances";
import TableOfContents from "./tableOfContents";

const kebabCase = (str) => str.split(" ").join("-").toLowerCase();

const Category = ({categories, thisCategory}) => {
    if (categories === undefined) {
        return (
            <ul className="categories">
            </ul>
        );
    }

    console.log("original categories: ", categories);

    // .md파일의 category = "category/subCategory" 형태의 데이터들을 배열 형태로 가져와 정제
    // ex) const refineCategories = [{ fieldValue: "category/subCategory, totalCount: 2 }]
    // => [ { fieldValue: "category", totalCount:2, subCategory: [ { fieldValue: "subCategory", totalCount: 2, subCategory:[] } ]  } ]
    // 으로 변환되게 만들었음.
    // 아직 변수명을 잘 못지어서 고심 끝에 짓긴 하였지만 이상할 수 있음.
    const refineCategoies = categories.reduce((acc, { fieldValue, totalCount }, idx) => {
        const fFirstObjIdx = (value) => acc.findIndex((data, dIdx) => data.fieldValue !== undefined && data.fieldValue === value);
        const categoryArr = fieldValue.split("/");

        if(fFirstObjIdx(categoryArr[0]) === -1) {
            acc.push({ fieldValue:categoryArr[0], totalCount, subCategory: [], categoryPath:fieldValue });
        }

        let mainTarget = acc[fFirstObjIdx(categoryArr[0])];
        let subTarget = mainTarget;
        categoryArr.forEach((category, dIdx) => {
            // 0번째는 이미 mainTarget에 있으므로 0번째는 넘김.
            if(dIdx === 0) return true;

            const subTargetIdx = subTarget.subCategory.findIndex((d) => d.fieldValue !== undefined && d.fieldValue === category);

            // subTarget에 해당 카테고리가 없으면 새로 생성
            // 해당 카테고리가 있으면 totalCount 1씩 증가
            if(subTargetIdx === -1) {
                const categoryPath = [...categoryArr].slice(0, dIdx + 1).join("/");
                subTarget.subCategory.push({ fieldValue:category, totalCount, subCategory:[], categoryPath });
            } else {
                if(dIdx !== 0) {
                    mainTarget.totalCount += 1;
                }
                subTarget.totalCount += 1;
            }

            // subTarget을 해당 카테고리의 서브 카테고리 값으로 변경
            subTarget = subTarget.subCategory[subTargetIdx];
        });

        return acc;
    }, []);

    const subCategoryTag = (subCategoryArr = [], depth = 1) => {
        if(subCategoryArr.length === 0) return "";

        return (
            <ul className="subCategory" data-depth={depth}>
                {subCategoryArr.map(({fieldValue, totalCount, subCategory, categoryPath}, cIdx) =>
                    (<li key={fieldValue}>
                        <Link to={"/categories/"+kebabCase(categoryPath)}>{fieldValue} ({totalCount})</Link>
                        {subCategoryTag(subCategory, depth + 1)}
                    </li>))}
            </ul>);
    };

    return (
        <ul className="categories">
            {refineCategoies.map(({fieldValue, totalCount, subCategory}) => {
                return (
                    <li key={fieldValue} className={fieldValue === thisCategory ? "active" : ""}>
                        <Link to={`/categories/${kebabCase(fieldValue)}`}>{fieldValue}({totalCount})</Link>
                        {subCategoryTag(subCategory)}
                    </li>
                );
            })}
        </ul>
    );
};


const Layout = ({location, title, categories, thisCategory, children, tableOfContents, isAllPosts}) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    const isRootPath = location.pathname === rootPath;
    const isNotIncludePathComment = isRootPath || location.pathname.includes("categories");
    console.log("tableOfContents", tableOfContents)
    return (
        <div className={(isAllPosts ? "global-posts global-container" : "global-container") }>
            <aside className="global-left">
                <Category categories={categories} thisCategory={thisCategory}/>
            </aside>
            <div className="global-center">
                <div className="global-wrapper" data-is-root-path={isRootPath}>
                    <input type="checkbox" name="menu-check" id="menu-check" className="none" />
                    <header className="global-header">
                        <div className="menu-icon mobile">
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
                        <div className="empty mobile" />
                    </header>
                    <aside className="menu-main mobile">
                        <Category categories={categories} thisCategory={thisCategory}/>
                        <label htmlFor="menu-check" className="background-cover" />
                    </aside>
                    <aside className="main-category pc">

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
            </div>
            <aside className="global-right">
                <TableOfContents content={tableOfContents} />
            </aside>
        </div>
    )
}

export default Layout
