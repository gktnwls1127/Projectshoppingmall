import React from 'react'
const Pageination = ( {postsPerPage , totalPosts , pageinate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className="pageination">
                {pageNumbers.map(number => (
                    <li key = {number} className="page=item">
                        <a onClick={()=>pageinate(number)}  className="page-link">
                        {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pageination