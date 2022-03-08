import {graphql, Link, PageProps} from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {CategoryQuery, Frontmatter} from "../../graphql-types"
import PostItem from "./postItem";
import Masonry from "react-masonry-css";

// SitePageContext로부터 context를 이용해 전달한 값들의 type을 얻을 수 있다.
const Category: React.FC<PageProps<CategoryQuery, Frontmatter>> = ({
    data,
    location,
    pageContext,
}) => {
    console.log(data.allMarkdownRemark.edges);
    const {title} = data.site.siteMetadata;
    const {category} = pageContext // gatsby-node.js의 createPage에서 넣어준 카테고리 이름.
    const {edges, totalCount} = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
    } categorized with "${category}"`

    const breakpointCols = {
        default: 4,
        1250: 3,
        1000: 2,
        650: 1
    }

    return (
        <Layout location={location} title={title} categories={[]} thisCategory={""} isAllPosts={true}>
            <SEO title={title}/>
            <h1>{tagHeader}</h1>
            <Masonry
                breakpointCols={breakpointCols}
                className="all-posts"
                columnClassName="post-item"
            >
                {edges.map(({node}, idx) => {
                    return (<PostItem key={idx} post={node} />);
                })}
            </Masonry>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    )
}

export default Category;

// 쿼리의 argument인 $category는 page context로 전달 받는다.
export const pageQuery = graphql`
    query Category($category: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { category: { in: [$category] } } }
        ) {
            totalCount
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY년 MM월 DD일")
                        title
                        description
                        featuredImage {
                            childImageSharp {
                                fluid(maxWidth: 800) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
