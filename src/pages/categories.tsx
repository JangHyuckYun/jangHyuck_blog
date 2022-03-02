// import {Link, PageProps} from "gatsby";
import Layout from "./../components/Layout";

import { graphql, Link } from "gatsby"
import {PageProps} from "gatsby";
import * as React from "react";

type DataProps = {
    site: {
        siteMetadata: {
            title: string
            description: string
            coverAlt: string
        }
    }
    allMarkdownRemark: {
        group: [
            {
                fieldValue: string
                totalCount: number
            }
        ]
    }
}

const kebabCase = (str: string):string => {
    return str.split(" ").join('-').toLowerCase();
};

// @ts-ignore
const Categories: React.FC<PageProps<DataProps>> = ({ data, location }) => {
    console.log("data.allMarkdownRemark.group", data.allMarkdownRemark.group);
    return (
        <Layout location={location} title={""} categories={[]} thisCategory={""}>
            <div>
                <h1>Categories</h1>
                <ul>
                    {/* group 배열에 그룹화된 카테고리 정보가 들어 있으므로 */}
                    {/* Array.map()을 이용해서 리스트 아이템인 <li> 태그를 생성한다. */}
                    {data.allMarkdownRemark.group.map(category => {
                        console.log("category.fieldValue", category.fieldValue);
                        return (
                            <li key={category.fieldValue}>
                                {/* 카테고리 명은 공백을 포함한 일반 문자열이기 때문에 underscore의 kebabCase함수로 변환해 준다.*/}
                                <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
                                    {category.fieldValue} ({category.totalCount})
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Layout>
    );
}

export default Categories

// graphql 태그를 이용해 페이지를 렌더링에 필요한 데이터를 쿼리한다.
export const pageQuery = graphql`
    query Categories {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___category) {
                fieldValue
                totalCount
            }
        }
    }
`;
