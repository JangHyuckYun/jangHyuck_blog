import * as React from "react"
import {Link, graphql} from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import TableOfContents from "../components/tableOfContents";
import "../scss/tableOfContents.scss";

const BlogPostTemplate = ({data, location}) => {
    const post = data.markdownRemark;
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const {previous, next, categories} = data;
    const thisCategory = data.markdownRemark.frontmatter.category;

    console.log("post",post);

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
                        <section
                            dangerouslySetInnerHTML={{__html: post.html}}
                            itemProp="articleBody"
                        />
                        <hr/>
                        <footer>
                            <Bio/>
                        </footer>
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
                                        ← {previous.frontmatter.title}
                                    </Link>
                                )}
                            </li>
                            <li>
                                {next && (
                                    <Link to={next.fields.slug} rel="next">
                                        {next.frontmatter.title} →
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
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
    }
  }
  next: markdownRemark(id: {eq: $nextPostId}) {
    fields {
      slug
    }
    frontmatter {
      title
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
