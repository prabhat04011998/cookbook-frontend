import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import {AddRecipe} from '../api/user_api'
import {GetCuisines} from '../api/basic_api'
import jwt_decode from "jwt-decode";
//functional component for the profile page with option of fav,notes and logout.
function Profile() {
  
  const [cuisines,setCuisines]=useState([])
//setting up the states.
  const [state,setState] = useState({
    name:"",
    recipe:"",
    expected_time:"",
    image_url:"",
    cuisine_id:"",
    user_id:""
  })

  useEffect(() => {
    var decoded = jwt_decode(localStorage.usertoken)//getting the usertoken from the localstorage.
    setState({
      ...state,
      user_id:decoded._id
    })
    async function setData(){
      await GetCuisines().then((res) =>{
        setCuisines(res.message)
      })
    }
    setData()
  },[])
//function for the loging out.Removing the usertoken from local storage.
  function logout(){
    localStorage.removeItem('usertoken')
    window.location.href="/"
  }

  const [error, setError] = useState(false);

  function setCuisine(e){
    setState({
      ...state,
      cuisine_id:e.target.value
    })
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
          <h4>My Profile</h4>
          <div>
            <span><img src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" style={{height:"100px",width:"100px"}} /></span>
          </div>
          <div>
          <button className="btn btn-lg btn-primary" style={{margin:"20px"}} onClick={() => {window.location.href="/mynotes"}}>
            My notes
          </button>
          <button className="btn btn-lg btn-danger" style={{margin:"20px"}} onClick={logout}>
            logout
          </button>
</div>
          <div>
          <button class="btn btn-lg mb-2 btn-primary" style={{margin:"20px"}} onClick={() => {window.location.href="/myfavs"}}>
      <i aria-hidden="true" class="heart icon"></i>
            My Favourites
          </button>
          </div>
          </div>
         
      ) : (
        (window.location.href = "/login")
      )}
    </div>
  );
}

export default Profile;
