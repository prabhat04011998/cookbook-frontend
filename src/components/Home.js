import React, { useState, useEffect } from "react";
import { Card, Icon, Image, Search } from "semantic-ui-react";
import {GetCuisines} from "../api/basic_api";

function Home() {
  const [state, setState] = useState([]);
  const [word,setWord]=useState("")
  //get cuisine listing data from getCuisines schema.
  useEffect(() => {
    async function setRecipe() {
      await GetCuisines().then((res) => {
        if (res.status === "1") {
          setState(res.message);
        } else {
        }
      });
    }

    setRecipe();
  });
//redirection function to dishes listing
  function gotorecipe(id){
    var link="/dishListing"+id
    window.location.href=link
  }

  function onChange(e){
    setWord(e.target.value)
  }
//home search bar function redirection #get to the params
  function search(e){
    e.preventDefault()
    window.location.href="/find"+word
  }
//user interface for listing.
  return (
    <div class="container-fluid" style={{ margin: "0", padding: "0" }}>
      <div
        class="searchbar"
        style={{
          marginBottom: "2em",
          color: "#fff",
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2020/05/12/16/18/pizza-5163790__340.jpg')",
          backgroundSize: "100% 	100%",
          width: "100%",
          height: "40vh",
        }}
      >
        <div class="findcuisine" style={{ paddingTop: "2%" }}>
          <h2>COOKBOOK</h2>
          <h5>Discover the best food & drinks in Delhi NCR</h5>
          <form onSubmit={search}>
            <input type="text" placeholder="search recipe" name="word" value={word} onChange={onChange} style={{fontSize:"1.5rem", padding:"5px",margin:"20px",width:"300px"}} />
            <button className="btn btn-lg btn-primary" type="submit" >Go</button>
          </form>
        </div> 
      </div>
      <div class=" cuisines" style={{textAlign:"center" }}>
        {state.map((obj) => {
          return (
            
              <div class="ui card" style={{display:"inline-block",margin:"20px"}}>
                <div class="content">
                  <img
                    src={obj.image_url}
                    style={{ width: "250px", height: "200px" }}
                  />
                </div>
                <div class="extra content">
                  <h4>{obj.name}</h4>
                </div>
                <div class="extra content">
                  <div
                    class="ui right labeled button"
                    role="button"
                    tabindex="0"
                  >
                    <button class="ui red button">
                      <i aria-hidden="true" class="heart icon"></i>
                      Like
                    </button>
                    <a class="ui red left pointing basic label">2,048</a>
                  </div>
                  <div style={{marginTop:"20px"}}>
                  <button className="btn btn-lg btn-danger" onClick={() => gotorecipe(obj._id)}>View Dishes</button>
                  </div>
                </div>
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
