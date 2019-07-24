import React from "react"



// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjIwMTksInVzZXJuYW1lIjoic29jcmF0ZXMiLCJleHAiOjE1NjkwNTQ3MDl9.2tCRzP7AjdVdXsLl_2pdnAW0cqHvPJsM9-nH0HuTAQw"
// // const token = (localStorage.getItem("user"))

const token = JSON.parse(localStorage.getItem("user")).user.token


export default class Like extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      liked:false,
      likesCount:this.props.favoritesCount
    }
    // console.log(props);
    
  }
  
  likeHandler = (slug) => {
      
    this.state.liked==false
    ?
    fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization:`Token ${token}`
      }
    })
    .then(response => response.json())
    // .then(data => console.log(data.article.favoritesCount))
    .then(data => this.setState({
       likesCount:data.article.favoritesCount,
       liked:true

     }))
    .catch(error => console.log(error)) 

    :

    fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        Authorization:`Token ${token}`
      }
    })
    .then(response => response.json())
    .then(data => this.setState({
      likesCount:data.article.favoritesCount,
      liked:false
     }))
    .catch(error => console.log(error))   
 }  




    render(){
        // console.log(this.props,"likes")
        return(
            <div>
              <button onClick={()=>{
                  this.likeHandler(this.props.slug)
              }}>
                
                  <p>{this.state.likesCount}</p>
              </button>
            </div>
        )
    }
        
} 