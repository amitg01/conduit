import React from "react"


const token = JSON.parse(localStorage.getItem("user")).user.token

export default class Comments extends React.Component {
    constructor(props){
        // console.log(props,"constructor")
        super(props)
        this.state={
            comments:props.article,
            data:props

        }
    }


    deleteComment = (id) => {
        fetch(`https://conduit.productionready.io/api/articles/${this.props.slug}/comments/${id}`, {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            Authorization:`Token ${token}`
          }
        })
        .then(res => 
        fetch(`https://conduit.productionready.io/api/articles/${this.props.slug}/comments`)
        .then(res => res.json())
        .then(data => this.setState({
            comments:data.comments
        }))
        )
    }

    // componentDidMount(){
    //     fetch(`https://conduit.productionready.io/api/articles/${this.props.article.slug}/comments`)
    //     .then(res => res.json())
    //     .then(data => this.setState({
    //         data
    //     }))
    // }

   


    render() {

        // console.log(this.state.data,"comment render")
        
        const data = this.state.comments ? this.state.comments : this.props.comments

        
        return(
            <div>
               
               {(this.props.comments!==null && this.props.comments.length>0)? <p>Comments:</p>:""}

                

               {data ? data.map((comment,index)=>{
                   
                    return(
                <div key={index}>
                    <p>{comment.body}</p>

                    {comment.author.username === JSON.parse(localStorage.getItem("user")).user.username
                ?
                         <button onClick={()=>{
                        this.deleteComment(comment.id)
                        }}>delete</button>
                    :
                    ""
                }

                   
                </div>            
            )})
            : null
            }
            </div>
        )
    }
}