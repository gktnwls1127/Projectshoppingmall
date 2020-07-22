import React ,{useState} from 'react'

function SearchBar() {

    // const [keyword, setkeyword] = useState("")

    // const searchkey = (e)=>{
    //     setkeyword({ [e.target.teat] : e.target.value})
    // }
    
    // const ccc = ()=>{
    //     console.log(keyword);
    // }

    // const appKeyPress = (e)=>{
    //     if(e.key === 'Enter'){
    //         ccc()
    //     }
    // }

    return (
        <div>
            {/* <input type="text" name="id" placeholder="search" value={keyword} onChange={searchkey}/> */}
            <input type="text" name="id" placeholder="search"/>
        </div>
    )
}

export default SearchBar
