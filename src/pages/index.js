import React from "react";
import {Link, graphql} from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import PostItem from "../templates/postItem";
import Masonry from "react-masonry-css";

const BlogIndex = ({data, location}) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const posts = data.allMarkdownRemark.nodes;
    let {categories, tagsGroup} = data;
    tagsGroup = (tagsGroup?.group || []).map(({fieldValue}) => fieldValue);

    if (posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle} categories={[]} thisCategory={""}>
                <Seo title="All posts"/>
                <Bio/>
                <p>
                    No blog posts found. Add markdown posts to "content/blog" (or the
                    directory you specified for the "gatsby-source-filesystem" plugin in
                    gatsby-config.js).
                </p>
            </Layout>
        )
    }

    const breakpointCols = {
        default: 4,
        1250: 3,
        1000: 2,
        670: 1
    }

    return (
        <Layout location={location} title={siteTitle} categories={categories.group} isAllPosts={true}>
            <Seo title="All posts"/>
            <Masonry
                breakpointCols={breakpointCols}
                className="all-posts"
                columnClassName="post-item"
            >
                {posts.map(post => <PostItem post={post}/>)}
            </Masonry>
        </Layout>
    )
}

export default BlogIndex

export const pageQuery = graphql`{
    site {
        siteMetadata {
            title
        }
    }
    categories: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
            fieldValue
            totalCount
        }
    }

    tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
            fieldValue
        }
    }
    
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
        nodes {
            excerpt
            fields {
                slug
            }
            frontmatter {
                date(formatString: "YYYY.MM.DD  ")
                title
                tags
                description
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(width: 800, layout: CONSTRAINED)
                    }
                }
            }
        }
    }
}
`
