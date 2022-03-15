import * as React from "react"
import {Link, graphql} from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../scss/blog-post.scss"

import TableOfContents from "../components/tableOfContents";
import "../scss/tableOfContents.scss";
import { getImageUrl } from "./../components/util";

const BlogPostTemplate = ({data, location}) => {
    const post = data.markdownRemark;
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const {previous, next, categories} = data;
    const thisCategory = data.markdownRemark.frontmatter.category;
    const titleSrc = post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData.images.fallback.src;

    return (
        <Layout location={location} title={siteTitle} categories={categories?.group} thisCategory={thisCategory || ""}
                tableOfContents={data.markdownRemark.tableOfContents}>
            <div className="blog-post-container">
                <div className="content">
                    <Seo
                        title={post.frontmatter.title}
                        description={post.frontmatter.description || post.excerpt}
                    />
                    <article
                        className="blog-post"
                        itemScope
                        itemType="http://schema.org/Article"
                    >
                        <header>
                            <h1 itemProp="headline">{post.frontmatter.title}</h1>
                            <p>{post.frontmatter.date}</p>
                        </header>
                        {titleSrc ? (
                            <div className={"titleImage"}>
                                <img src={titleSrc} alt=""/>
                            </div>
                        ) : ""}
                        <section
                            dangerouslySetInnerHTML={{__html: post.html}}
                            itemProp="articleBody"
                        />
                        <hr/>
                    </article>
                    <nav className="blog-post-nav">
                        <ul
                            style={{
                                display: `flex`,
                                flexWrap: `wrap`,
                                justifyContent: `space-between`,
                                listStyle: `none`,
                                padding: 0,
                            }}
                        >
                            <li>
                                {previous && (
                                    <Link to={previous.fields.slug} rel="prev">
                                        <img src={getImageUrl(previous.frontmatter)} alt=""/>
                                        <p>← {previous.frontmatter.title}</p>
                                    </Link>
                                )}
                            </li>
                            <li>
                                {next && (
                                    <Link to={next.fields.slug} rel="next">
                                        <img src={getImageUrl(next.frontmatter)} alt=""/>
                                        <p>{next.frontmatter.title} →</p>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                    <hr/>
                </div>
            </div>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
        siteMetadata {
            title
        }
    }
    markdownRemark(id: {eq: $id}) {
        id
        excerpt(pruneLength: 160)
        html
        tableOfContents
        frontmatter {
            title
            date(formatString: "YYYY년 MM월 DD일")
            description
            category
            featuredImage {
                childImageSharp {
                    gatsbyImageData(width: 800, layout: CONSTRAINED)
                }
            }
        }
    }
    previous: markdownRemark(id: {eq: $previousPostId}) {
        fields {
            slug
        }
        frontmatter {
            title
            featuredImage {
                childImageSharp {
                    gatsbyImageData(width: 800, layout: CONSTRAINED)
                }
            }
        }
    }
    next: markdownRemark(id: {eq: $nextPostId}) {
        fields {
            slug
        }
        frontmatter {
            title
            featuredImage {
                childImageSharp {
                    gatsbyImageData(width: 800, layout: CONSTRAINED)
                }
            }
        }
    }
    categories: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
            fieldValue
            totalCount
        }
    }
}
`;
/*
*
* query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          category
        }
      }
    }
  }
}
* */
