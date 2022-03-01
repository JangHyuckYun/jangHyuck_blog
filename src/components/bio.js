/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = {
      author: {
          name: "JangHyuck Yun",
          summary: "South Korean"
      },
      social: {
          instagram: "longlarge_yoon"
      }
  }

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.author
  const social = data.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <a href={`https://www.instagram.com/${social?.instagram || ``}`}>
            You should follow them on Instagram
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio
