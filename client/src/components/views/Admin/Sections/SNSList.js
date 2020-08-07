import React, {useState, useEffect} from 'react'
import axios from 'axios'

function SNSList(props) {

    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`/api/sns/getposts`)
			.then((response) => {
				if (response.data.success) {
					setPosts(response.data.posts)
				}
			})
			.catch((e) => {
				alert(e);
			});

    }, [])

    const renderPostImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        } 
    }   

    const renderPosts = () => (
        Posts && Posts.map((post, index) => (
            <tr key={index}>
                <td>{post._id}</td>
                <td>{post.writer}</td>
                <td>
                    <div className="CartGoodsDesktop__goods-info">
                    <img style={{ width: '50px', height: '50px' }} alt="sns" 
                    src={renderPostImage(post.snapshots)} />
                        <div className="CartGoodsDesktop__goods-info-inner">
                            <p className="CartGoodsDesktop__goods-info-name">
                                {post.text}
                            </p>
                        </div> 

                    </div>
                </td> 
                <td>{post.likes}</td> 
                <td>{post.views}</td>
                <td>
                    <button onClick={() => props.removeItem(post._id)}>
                        삭제
                    </button> 
                </td> 
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                    <th>게시물ID</th>
                        <th>작성자</th>
                        <th>글</th>
                        <th>좋아요</th>
                        <th>조회수</th>
                        <th>삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {renderPosts()}
                </tbody>
                
            </table>
        </div>
    )
}

export default SNSList

