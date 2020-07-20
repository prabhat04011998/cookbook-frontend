import React, { useState, useEffect } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { GetSpecificRecipe, findCuisine, GetComment ,GetUserById} from "../api/basic_api";
import { AddComment,AddNote ,AddFav} from "../api/user_api";
import jwt_decode from "jwt-decode";

function ReadRecipe() {
  const [comments, setComments] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [cuisine, setcuisine] = useState("");
  const recipeid = useParams();
  const [newComment, setNewComment] = useState({
    user_id: "",
    user_name:"",
    recipe_id: "",
    message: "",
  });
  const [err, setErr] = useState(false);
  const [note ,setNote]=useState({
    user_id: "",
    recipe_id: "",
    note: "",
  })

  useEffect(() => {
    
    async function setData(id) {
      const data = {
        recipe_id: id,
      };
      await GetSpecificRecipe(data).then(async (res) => {
        if (res.status === "1") {
          setRecipe(res.message);
          const cuisinedata = {
            recipe_id: res.message._id,
          };
          await findCuisine(cuisinedata).then((res) => {
            if (res.status === "1") {
              setcuisine({
                ...cuisine,
                cuisine: res.message.name,
              });
            }
          });
          await GetComment(cuisinedata).then((res) => {
            if (res.status === "1") {
              setComments(res.message);
            }
          });
        }
      });
    }
    setData(recipeid.id);
    if(localStorage.usertoken){
      var decoded = jwt_decode(localStorage.usertoken);
      setNewComment({
        ...newComment,
        recipe_id: recipeid.id,
        user_id: decoded._id,
        user_name:decoded.name
      });
      setNote({
        ...note,
        recipe_id: recipeid.id,
        user_id: decoded._id,
      })
    }
    
  }, []);

  function onChange(e) {
    setNewComment({
      ...newComment,
      message: e.target.value,
    });
  }
//on posting the comment checking the user is logged in or not.#hadling the submit functionlaity.
  function onSubmit(e) {
    e.preventDefault();
    if(!localStorage.usertoken){
      alert("you need to login to add comment")
      window.location.href="/"
    }else{
      AddComment(newComment, localStorage.usertoken).then((res) => {
        if (res.status === "1") {
          window.location.reload();
        } else {
          setErr(true);
        }
      });
    }
    
  }

  
  function NoteChange(e){
    setNote({
      ...note,
      note: e.target.value,
    });
  }

  function NoteSubmit(e){
    e.preventDefault();
    if(!localStorage.usertoken){
      alert("you need to login to add note")//if user is not loged in then it will show warning message
      window.location.href="/"
    }else{
      AddNote(note, localStorage.usertoken).then((res) => {
        if (res.status === "1") {
          window.location.reload();
        } else {
          setErr(true);
        }
      });
    }
    
  }
//Adding Recipe to favourite.
  function addToFav(){
    const data = {
      user_id:note.user_id,
      recipe:recipe
    }
    if(!localStorage.usertoken){
      alert("you need to login to add favourites")
      window.location.href="/login"
    }else{
      AddFav(data,localStorage.usertoken).then((res) => {
        if(res.status === "1"){
          window.location.href="/"
        }
      })
    }
  
  }

  return (
    <div
      class="container-fluid"
      style={{
        height: "100vh",
        backgroundImage:
          "url(" +
          "https://b.zmtcdn.com/data/images/order/home_page_bg.jpg?output-format=webp" +
          ")",
        backgroundSize: "100% 100%",
      }}
    >
      <div
        className="content"
        style={{
          background: "#fff",
          maxWidth: "720px",
          margin: "auto",
          padding: "2em",
          position: "relative",
          textAlign: "left",
        }}
      >
        <h4 style={{ textAlign: "center" }}>{recipe.name}</h4>
        <div class="ui horizontal divider">****</div>
        <p class="recipeDescription">{recipe.recipe}</p>
        <div class="ui horizontal divider">****</div>

        <div class="ui comments" >
          <h4>comments</h4>
          {comments.map((c) => {
            return (
              <div class="comment">
                <a class="avatar">
                  <img src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
                </a>
                <div class="content">
                  <div class="author">{c.user_name}</div>
                  <div class="metadata">
                    <div>1 day ago</div>
                  </div>
                  <div class="text">
                    <p>{c.message}</p>
                  </div>
                  <div class="actions">
                    <a class="">Reply</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <form class="ui reply form" onSubmit={onSubmit}>
          <div class="field">
          <label>Add Comment</label>
            <textarea
              rows="3"
              name="message"
              value={newComment.message}
              onChange={onChange}
            ></textarea>
          </div>
          <button class="ui icon primary left labeled button">
            <i aria-hidden="true" class="edit icon"></i>
            Add Comment
          </button>
        </form>
        {err ? <h2 style={{ color: "red" }}>An error occured</h2> : null}
      </div>
      <div>
        <form class="ui reply form" onSubmit={NoteSubmit}>
          <div class="field">
          <h2 style={{color:"white",fontWeight:"700"}}>Add a Note</h2>
            <textarea
              rows="3"
              placeholder="add note here"
              style={{ width: "50%", margin: "30px" }}
              name="note"
              value={note.note}
              onChange={NoteChange}
            ></textarea>
          </div>
          <button class="btn btn-lg mb-2 btn-danger" type="submit">
            <i aria-hidden="true" class="edit icon"></i>
            Add Note
          </button>
        </form>
      </div>
      <button class="btn btn-lg mb-2 btn-primary" onClick={() => {addToFav()}}>
      <i aria-hidden="true" class="heart icon"></i>
            Add to Favourite
          </button>
    </div>
  );
}

export default ReadRecipe;
