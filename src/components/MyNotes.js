import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import {GetNotes} from '../api/user_api'
import {GetSpecificRecipe} from '../api/basic_api'

//functional component for My notes listing.
//calling getSpecific recipe api and get notes api.
function MyNotes() {

    const [notes,setNotes]=useState([])

    useEffect(() => {
      var decoded = jwt_decode(localStorage.usertoken)
      async function getdata(){
        const data={
          user_id:decoded._id
        }
        await GetNotes(data,localStorage.usertoken).then((res) =>{
          if(res.status === "1"){
            setNotes(res.message)
          }
        })
      }
      getdata()
    },[])
//redirection to the recipe viewing page.
    async function gotorecipe(id){
      var link="/readRecipe"+id
      window.location.href=link
    }

    return (
        <div>
      {localStorage.usertoken ? (
        <div
          class="container-fluid"
          style={{
            color: "#fff",
            height: "100vh",
            backgroundImage:
              "url(" +
              "https://b.zmtcdn.com/data/images/order/home_page_bg.jpg?output-format=webp" +
              ")",
            backgroundSize: "100% 100%",
          }}
        >
          <h4>My Notes</h4>
         {notes.length > 0 ? (
          <div class=" cuisines" style={{ textAlign:"center"}}>
        {notes.map((obj) => {
          return (
            
              <div class="ui card" style={{display:"inline-block",margin:"40px"}}>
                <div class="extra content">
                  <h4>{obj.note}</h4>
                </div>
                <div class="extra content">
                  <button className="btn btn-lg btn-danger" onClick={() => gotorecipe(obj.recipe_id)}>View Recipe</button>
                </div>
              </div>

          );
        })}
      </div>) : (<h2>No notes currently</h2>)}
        </div>
      ) : (
        (window.location.href = "/login")
      )}
    </div>
    )
}

export default MyNotes
