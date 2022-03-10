import {Link} from "gatsby";
import React from "react";

const PostItem = ({ post }) => {

    const title = post.frontmatter.title || post.fields.slug
    const titleSrc = post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData.images.fallback.src;

    return (
        <div key={title}>
            <Link
                to={post.fields.slug}
                className={"post-list-item " + (titleSrc ? "" : "no-image")}
                itemScope
                itemType="http://schema.org/Article" >

                <header>
                    {titleSrc ? <img src={titleSrc} alt="img"/> : ""}
                </header>
                <section>
                    <h5>{title}</h5>
                    <p
                        className={"description"}
                        dangerouslySetInnerHTML={{
                            __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                    />
                    <small className={"date"}>{post.frontmatter.date}</small>
                </section>
            </Link>
        </div>
    );
}

export default PostItem;
