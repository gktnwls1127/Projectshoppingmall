import React,{useState , useEffect} from 'react'
import { withRouter } from 'react-router-dom'

function SearchPage(props) {


    const [state, setstate] = useState("")


    let keyword = props.match.params.keyword

    useEffect(() => {
      console.log(123);
      console.log(keyword);
    }, [])

    return (
        <div>
            검색 결과
        </div>
    )
}

export default withRouter(SearchPage)
