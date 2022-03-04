import React from "react";
import {Link, graphql} from "gatsby";

import {useMemo} from "react";
import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { StaticImage } from "gatsby-plugin-image"

const BlogIndex = ({data, location}) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const posts = data.allMarkdownRemark.nodes;
    const {categories} = data;
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

    return (
        <Layout location={location} title={siteTitle} categories={categories.group}>
            <Seo title="All posts"/>
            <Bio/>
            <ol style={{listStyle: `none`}}>
                {posts.map(post => {
                    const title = post.frontmatter.title || post.fields.slug
                    // const image = post.frontmatter.featuredImage;
                    // console.log(post.frontmatter);
                    // console.log("image", image, image.length);

                    return (
                        <li key={post.fields.slug}>
                            <article
                                className="post-list-item"
                                itemScope
                                itemType="http://schema.org/Article" >

                                <header>
                                    {/*{image.length === 0 ? "" : (*/}
                                    {/*    <StaticImage*/}
                                    {/*        src={post.frontmatter.featuredImage}*/}
                                    {/*        formats={["auto", "webp", "avif"]}*/}
                                    {/*        width={50}*/}
                                    {/*        height={50}*/}
                                    {/*        quality={100}*/}
                                    {/*        alt="Profile picture"*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                    <h2>
                                        <Link to={post.fields.slug} itemProp="url">
                                            <span itemProp="headline">{title}</span>
                                        </Link>
                                    </h2>
                                    <small>{post.frontmatter.date}</small>
                                </header>
                                <section>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: post.frontmatter.description || post.excerpt,
                                        }}
                                        itemProp="description"
                                    />
                                </section>
                            </article>
                        </li>
                    )
                })}
            </ol>
        </Layout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
    query {
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

        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "YYYY년 MM월 DD일")
                    title
                    description
                }
            }
        }
    }
`
