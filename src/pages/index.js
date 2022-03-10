import React from "react";
import {Link, graphql} from "gatsby";

import {useMemo} from "react";
import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { StaticImage } from "gatsby-plugin-image"
import PostItem from "../templates/postItem";
import Masonry from "react-masonry-css";

const BlogIndex = ({data, location}) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const posts = data.allMarkdownRemark.nodes;
    const {categories} = data;

    posts.forEach(({frontmatter}) => {
        console.log(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData.src);
        if(frontmatter.featuredImage !== null) {
            // console.log(frontmatter.featuredImage?.childImageSharp.fluid.src);
        }
    })

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
        650: 1
    }

    return (
        <Layout location={location} title={siteTitle} categories={categories.group} isAllPosts={true}>
            <Seo title="All posts"/>
            <Bio/>
            <Masonry
                breakpointCols={breakpointCols}
                className="all-posts"
                columnClassName="post-item"
            >
                {posts.map(post => <PostItem post={post} />  )}
            </Masonry>
            {/*<ol style={{listStyle: `none`}} className={"all-posts "}>*/}

            {/*</ol>*/}
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
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    nodes {
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
            gatsbyImageData(width: 800, layout: CONSTRAINED)
          }
        }
      }
    }
  }
}
`
