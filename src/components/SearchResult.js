import React, { useState, useEffect } from 'react'
import { SearchRecipe } from "../api/basic_api";
import { useParams } from 'react-router-dom';


function SearchResult() {

    const [result,setResult]=useState([])
    const word=useParams()
    const [message,setMessage]=useState(false)

    useEffect(() =>{
        const myword = word.word
        const data={
            word:myword
        }
        async function getresult(){
            await SearchRecipe(data).then((res) =>{
                if(res.status === "1"){
                    setResult(res.message)
                }else{
                    setMessage(true)
                }
            })
        }

        getresult()
        
    },[])

    return (


        <div
        
            class="container-fluid"
            style={{
              color: "#fff",
              height: "100%",
              backgroundImage:
                "url(" +
                "https://b.zmtcdn.com/data/images/order/home_page_bg.jpg?output-format=webp" +
                ")",
              backgroundSize: "100% 100%",
            }}
          >
            <h4>Search result</h4>
            <div class="cuisines" style={{ textAlign:"center" }}>
            {message ? (<h1 style={{color:"red"}}>No Results Found </h1>):(null)}
          {result.map((obj) => {
            return (
                <div class="ui card" style={{display:"inline-block"}}>
                  <div class="content">
                    <img
                      src={obj.image_url}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div class="extra content">
                    <h4>{obj.name}</h4>
                  </div>
                </div>
            );
          })}
        </div>
          </div>
        
    )
}

export default SearchResult
