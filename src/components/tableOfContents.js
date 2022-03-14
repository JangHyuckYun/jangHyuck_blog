import React from "react"
import "./../scss/tableOfContents.scss"

const TableOfContents = ({ content }) => {
    return (
        <div
            className={"table-of-content"}
            dangerouslySetInnerHTML={{ __html: content}}
        />
    );
}

export default TableOfContents;
