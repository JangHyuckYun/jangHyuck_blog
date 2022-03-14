import {Link} from "gatsby";
import React from "react";

const PostItem = ({ post }) => {

    const title = post.frontmatter.title || post.fields.slug
    const titleSrc = post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData.images.fallback.src;
    const tags = post.frontmatter?.tags || [];

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
                    <small className={"date"}>{post.frontmatter.date}</small>
                    <p
                        className={"description"}
                        dangerouslySetInnerHTML={{
                            __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                    />
                    { tags.length > 0 ? (<ul className="tags">
                        {tags.map(tag => <li className="tag"><span>#{tag}</span></li>)}
                    </ul>) : "" }
                </section>
            </Link>
        </div>
    );
}

export default PostItem;
