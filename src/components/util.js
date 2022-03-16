export function kebabCase(str) {
    return str.split(" ").join("-").toLowerCase();
}

export function getImageUrl(frontmatter) {
    return frontmatter?.featuredImage?.childImageSharp.gatsbyImageData.images.fallback.src || "";
}
