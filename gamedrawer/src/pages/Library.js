import React from "react";
import idgb from "../keys";



class GameBoxGenerator extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch(`https://id.twitch.tv/oauth2/token?client_id=${idgb.igdbClientID}&client_secret=${idgb.igdbSecret}&grant_type=client_credentials`, {method: 'POST'})
        .then(res =>{ res.json().then( data =>{
            localStorage.setItem("auth", "Bearer " + data.access_token)
        })})
    }

    componentDidUpdate() {


        
    }

    search(){
        let search = document.getElementById("search").value;

        let fields =  "fields name,artworks,cover,release_dates,genres.name,rating;";

        let options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': localStorage.getItem("auth"), 
                'Content-Type': '*/*',
                'Client-ID': idgb.igdbClientID
            }), 
            
            body: 'search "' + search + '"; ' + fields
        }


        fetch(`${idgb.url}/games/`, options)
        .then(res =>{ res.json().then( data =>{

            let fields =  "fields image_id;";

            data.forEach( (game, i) =>{

                //grabs the cover art for each game checking if it exists
                if(game.cover){
                    let obj = {
                        method: 'POST',
                        headers: new Headers({
                            'Authorization': localStorage.getItem("auth"), 
                            'Content-Type': '*/*',
                            'Client-ID': idgb.igdbClientID
                        }), 
                        body: "where id = " + game.cover + "; " + fields
                    }
    
                    fetch(`${idgb.url}/covers/`, obj).then(res =>{
                       res.json().then( coverArt =>{
                           //and adds it to data
                            let stateData = this.state.data;
                            stateData[i].cover = "https://images.igdb.com/igdb/image/upload/t_cover_big/" + coverArt[0].image_id + ".jpg";
                            this.setState({data: stateData})
                       })
                    })
                }else{
                    let stateData = this.state.data;
                    //set placeholder
                    game.cover = "#"
                    this.setState({data: stateData})
                }
               

            })

            
    
            this.setState({data : data})
        })})
    }
    

    render() {

        return (
            <div>
                <div className="col-6 d-flex">
                    <input className="form-control m-2" type="text" id="search" placeholder="Search Game"/>
                    <button className="btn btn-primary m-2" onClick={() => this.search()}>
                        Search
                    </button>
                </div>
                
                <div className="d-flex flex-wrap justify-content-center">
                    {this.state.data.map( (game) =>
                        <div key={game.id} className="gamebox m-2 border rounded">

                            <img className="w-100" src={game.cover} alt="" />

                            <h2>
                                {game.name}
                            </h2>

                        </div>
                    )}
                </div>
                
            </div>

        )
    }
}


class Library extends React.Component {
 

    render() {
      return (
        <div>
            test
            <GameBoxGenerator></GameBoxGenerator>
        </div>
        );
    }
}

export default Library;
