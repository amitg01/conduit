import React from "react"
import TagsArticle from "./TagsArticle"

export default class Profile extends React.Component {
    state={
        user:"",
        following:this.props.location.state.following
    }

        followHandler = () => {

            !this.state.following?

                fetch(
                    `https://conduit.productionready.io/api${this.props.location.pathname}/follow`, {
                    method: 'POST',
                    mode: "cors",
                    headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Token ${JSON.parse(localStorage.getItem("user")).user.token}`
                    }
                })
                .then(res => res.json())
                .then(data => this.setState({
                    following:data.profile.following
                }))
                :
                fetch(
                    `https://conduit.productionready.io/api${this.props.location.pathname}/follow`, {
                    method: 'DELETE',
                    mode: "cors",
                    headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Token ${JSON.parse(localStorage.getItem("user")).user.token}`
                    }
                })
                .then(res => res.json())
                .then(data => this.setState({
                    following:data.profile.following
                }))
        }

        componentDidMount(){
            fetch(`https://conduit.productionready.io/api${this.props.location.pathname}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Token ${JSON.parse(localStorage.getItem("user")).user.token}`},
              })
            .then(res => res.json())
            // .then(data => console.log(data))
            .then(data => this.setState({
                user:data.profile
            }))
            .catch(error => console.log(error))
    }


    render(){
        console.log(this.props,"props")
       
        return(
        <div>
            <p>{this.state.user.username}</p>
            <button onClick={()=>{
                this.followHandler()
            }}>{this.state.following?"unfollow":"follow"}</button>
            <TagsArticle query={`author=${this.state.user.username}`}/>
        </div>
        )
    }
}