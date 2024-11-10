import React from "react";
import './App.css';
class EpisodeItemRow extends React.Component{
    render(){
        return(
            <li className="episode-item">
                <a href={this.props.url}>episode {this.props.episodeNumber}</a>
            </li>
        )
    }
}
class RickAndMorty extends React.Component{
    constructor(){
        super();
        this.state={
            name: null,
            status: null,
            species: null,
            origin: null,
            episodes:[],
            image: null,
            loadedCharacter:false
        }
    }
    getNewCharacter(){
        const randomNumber=Math.round(Math.random()*826);
        const url= `https://rickandmortyapi.com/api/character/${randomNumber}/`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    name: data.name,
                    status: data.status,
                    species: data.species,
                    origin: data.origin.name,
                    episodes: data.episode,
                    image: data.image,
                    loadedCharacter: true
                })
            })
        
    }
    render(){
        const episodesItems= this.state.episodes.map((episodeUrl,i)=>{
            const episodeNumber = episodeUrl.split("/").pop();
            return <EpisodeItemRow url={episodeUrl} key={i} episodeNumber={episodeNumber}/>
        })
        return( 
            <div>
                { this.state.loadedCharacter &&
                <div className="box">
                    <div className="box-text">
                        <p>Name: {this.state.name}</p>
                        <p>Status: {this.state.status}</p>
                        <p>Species: {this.state.species}</p>
                        <p>Origin: {this.state.origin}</p>
                        <p>Episodes:</p>
                        <ul className="episode-box">
                            {episodesItems}
                        </ul>
                    </div>
                    <img src={this.state.image} className="box-image" alt="Character image"/>
                </div>
                }
                <button 
                type="button" 
                className="btn"
                onClick={()=>{this.getNewCharacter()}}
                >Randomize Character</button>
            </div>
        )
    }
}

export default RickAndMorty;