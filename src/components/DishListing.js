import React, { useState, useEffect } from "react";
import { Card, Button, Icon, Image, Modal } from "semantic-ui-react";
import {GetRecipefromCuisine ,findCuisine} from '../api/basic_api'
import { useParams } from "react-router-dom";

function DishListing() {

const [recipe,setRecipe]=useState([])
const recipeid = useParams()

useEffect(() =>{
  async function setData(id) {
    const data ={
      cuisine_id:id
    }
    await GetRecipefromCuisine(data).then(async (res) =>{
      if(res.status ==="1"){
        setRecipe(res.message)
      }
    })
  }
  setData(recipeid.id)
  
},[])

const [state,setState]=useState({
  like:0
})

function increaselike(){
  setState({
    ...state,
    like:state.like+1

  })
}

function openRecipe(id){
  var link = "/readRecipe"+id
  window.location.href=link
}

  return (
    <div>
      {recipe.map((r) => {
        return(
          <div class="container" style={{textAlign:"center"}}>
<div class="ui card" style={{ width: "75%", display:"inline-block"}}>
  <div class="content">
  <img src={r.image_url} alt="image" style={{width:'100%'}} />
    <div class="header" style={{ color: "#cb202d" }}>
      <h1>{r.name}</h1>
    </div>
    <div class="description">
      <strong><h2>Expected Cooking time-{r.expected_time}</h2></strong>
    </div>
  </div>
  <div class="extra content">
    <div class="ui two buttons">
      <div class="ui left labeled button">
        <a class="ui right pointing basic label">{r.favCount}</a>
        <button
          class="ui icon red basic button"
          tabindex="0"
        >
          <i aria-hidden="true" class="heart icon"></i>Likes
        </button>
      </div>
      <button class="ui green basic button" onClick={() => {openRecipe(r._id)}}>
        <i class="book icon"></i>Open Recipe
      </button>
    </div>
  </div>
</div>
</div> 
        )
      })}
    </div>
  );

}

export default DishListing;




