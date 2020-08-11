import React, {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import SearchFeature from './SearchFeature'

function SNSList(props) {

    const [Comments, setComments] = useState([]);
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {

        }

        getSNS()

    }, [])

    const getSNS = () => {
        axios.get('/api/sns/getcomments')
        .then((response) => {
            if (response.data.success) {
                setComments(response.data.comments)
            }
        })
        .catch((e) => {
            alert(e);
        });
    }

    const updateSearchTerm = (newsnsSearchTerm) => {
        
        let body = {
            SNSsearchTerm : newsnsSearchTerm
        }

        setSearchTerm(newsnsSearchTerm)
        getSNS()
    }

    const removeItem = (snsId) => {
        
        const data = {
            id : snsId,
        };

        swal({
            title: '정말 삭제하시겠습니까?',
            text: '확인을 누르면 해당 포스트정보가 사라지며, 복구 할 수 없습니다.',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.post('/api/sns/removeSNS', data).then((response) => {
                    if (response.data.success) {
                        swal('게시물 삭제에 성공했습니다.');
                    } else {
                        swal('게시물 삭제에 실패했습니다.');
                    }
                });
            } else {
                swal('취소하셨습니다.');
            }
        });
    
}

    const renderComments = () => (
        Comments && Comments.map((comment, index) => (
            <tr key={index}>
                <td>{comment._id}</td>
                <td>{comment.writer}</td>
                <td>
                    <div className="CartGoodsDesktop__goods-info-inner">
                        <p className="CartGoodsDesktop__goods-info-name">
                            {comment.post}
                        </p>
                    </div> 
                </td> 
                <td>{comment.comment}</td>
                <td>
                    <button onClick={() => removeItem(comment._id)}>
                        삭제
                    </button> 
                </td> 
            </tr>
        ))
    )


    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>작성한 글</th>
                        <th>댓글</th>
                        <th>삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {renderComments()}
                </tbody>
                
            </table>
        </div>
    )
}

export default SNSList

