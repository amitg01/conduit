import React from "react";
import { Link } from "react-router-dom"


export default class Tags extends React.Component{  
    constructor(){
        super()
        this.state = {
            tags: null,
        }
    }

    componentDidMount(){
        fetch("https://conduit.productionready.io/api/tags")
        .then(response => response.json())        
        .then(data => this.setState({tags: data.tags}))    
        
    }

    render(){
        const { tags } = this.state;
        return(
            this.state.isLoading ? <div className="lds-dual-ring"></div>
            :
            <div className="tags">
                {
                     tags && tags.map((tag,index) => {
                         return(
                             <Link key={ index } to = {{
                                 pathname:"/TagsArticle",
                                 state:{
                                     query:`tag=${tag}`
                                 }
                             }}>
                                 <span className="tag-Item" key={index}>{tag}</span>
                             </Link>
                             
                         )
                    })
                }
            </div>
        )
    }
}