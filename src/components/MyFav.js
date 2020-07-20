import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import {AllFav} from '../api/user_api'
//functional componenet for favourite listings.
function MyFav() {

    const [favs,setFavs]=useState([])

    useEffect(() => {
      var decoded = jwt_decode(localStorage.usertoken)
      async function getdata(){//getting data of favs from user's schema
        const data={
          user_id:decoded._id
        }
        await AllFav(data,localStorage.usertoken).then((res) =>{
          if(res.status === "1"){
            setFavs(res.message)
          }
        })
      }
      getdata()
    },[])
//redirection to recipe page.
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
          <h4>My Favourites</h4>
          <div class="cuisines" style={{ textAlign:"center" }}>
          
        {favs.map((obj) => {
          return (
            
              <div class="ui card" style={{display:"inline-block",margin:"20px"}}>
                <div class="content">
                  <img
                    src={obj.recipe.image_url}
                    style={{ width: "250px", height: "200px" }}
                  />
                </div>
                <div class="extra content">
                  <h4>{obj.recipe.name}</h4>
                </div>
                <div class="extra content">
                  <button className="btn btn-lg btn-danger" onClick={() => gotorecipe(obj.recipe._id)}>View Recipe</button>
                </div>
                
              </div>
            
          );
        })}
      </div>
        </div>
      ) : (
        (window.location.href = "/login")
      )}
    </div>
    )
}

export default MyFav
