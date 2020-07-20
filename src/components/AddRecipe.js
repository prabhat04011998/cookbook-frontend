import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import {AddRecipe,GetCuisines} from '../api/basic_api'
import jwt_decode from "jwt-decode";

function Profile() {
  
  const [cuisines,setCuisines]=useState([])

  const [state,setState] = useState({
    name:"",
    recipe:"",
    expected_time:"",
    image_url:"",
    cuisine_id:"",
    user_id:""
  })

  useEffect(() => {
    if(localStorage.usertoken){
        var decoded = jwt_decode(localStorage.usertoken)
    setState({
      ...state,
      user_id:decoded._id
    })
    }
    async function setData(){
      await GetCuisines().then((res) =>{
        setCuisines(res.message)
      })
    }
    setData()
  },[])

  const [error, setError] = useState(false);

  function setCuisine(e){
    setState({
      ...state,
      cuisine_id:e.target.value
    })
  }

  function onChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    AddRecipe(state).then((res) => {
      if (res.status == "1") {
        window.location.href="/"
        setState({
          name:"",
          recipe:"",
          expected_time:"",
          image_url:"",
          cuisine_id:"",
          user_id:""
        });
      } else {
        setError(true);
        setState({
          name:"",
          recipe:"",
          expected_time:"",
          image_url:"",
          cuisine_id:"",
          user_id:""
        });
      }
    });
  }

  return (
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
          <h4>Add Recipe</h4>
          {error ? (<h2 style={{color:"red"}}>An error occured</h2>):(null)}
          <form
            class="ui form"
            onSubmit={onSubmit}
            style={{
              position: "relative",
              zIndex: "1",
              background: "#FFFFFF",
              maxWidth: "360px",
              margin: "0 auto 0px",
              padding: "45px",
              textAlign: "center",
              boxShadow:
                "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
            }}
          >
            <div class="field">
              <input
                placeholder="Dish Name"
                style={{
                  fontFamily: '"Roboto", sans-serif',
                  outline: "0",
                  background: "#f2f2f2",
                  width: "100%",
                  border: "0",
                  margin: "0 0 15px",
                  padding: "15px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                }}
                name="name"
            value={state.name}
            onChange={onChange}
              />
            </div>
            <div class="field">
              <input
                placeholder="Dish Image Url"
                type="text"
                style={{
                  fontFamily: '"Roboto", sans-serif',
                  outline: "0",
                  background: "#f2f2f2",
                  width: "100%",
                  border: "0",
                  margin: "0 0 15px",
                  padding: "15px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                }}
                name="image_url"
            value={state.image_url}
            onChange={onChange}
              />
            </div>
            <div class="field">
              <input
                placeholder="Dish Expected Time"
                type="text"
                style={{
                  fontFamily: '"Roboto", sans-serif',
                  outline: "0",
                  background: "#f2f2f2",
                  width: "100%",
                  border: "0",
                  margin: "0 0 15px",
                  padding: "15px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                }}
                name="expected_time"
            value={state.expected_time}
            onChange={onChange}
              />
            </div>
            <div class="field">
              <textarea
                placeholder="Dish Recipe"
                type="text"
                style={{
                  fontFamily: '"Roboto", sans-serif',
                  outline: "0",
                  background: "#f2f2f2",
                  width: "100%",
                  border: "0",
                  margin: "0 0 15px",
                  padding: "15px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                }}
                name="recipe"
            value={state.recipe}
            onChange={onChange}
              ></textarea>
            </div>
            <div class="field">
              <select
                onChange={setCuisine}
              >
                <option>select cuisine type below</option>
                {cuisines.map((c) => {
                  return(
                    <option value={c._id}>{c.name}</option>
                  )
                })}
              </select>
            </div>

            <button type="submit" class="ui button">
              Submit
            </button>
          </form>
         
        </div>
  );
}

export default Profile;
