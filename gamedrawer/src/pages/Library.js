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

    search(e){

        //check if you pressed enter or clicked
        if(e.keyCode != undefined){
            if(e.keyCode !== 13){
                return
            }
        }

        let search = document.getElementById("search").value;

        let fields =  "fields name,artworks,cover,release_dates,genres.name,rating,platforms,summary;";

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

                if(game.summary){
                    game.summary = game.summary.substring(0, 70) + "..."

                }
                
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

            
            console.log(data)
            this.setState({data : data})

           
            
        })})
    }
    

    render() {

        return (
            <div className="col-12">
                <div className="col-6 d-flex m-auto">
                    <input className="form-control m-2" type="text" id="search" placeholder="Search Game" onKeyUp={(e) => this.search(e)}/>
                    <button className="btn btn-primary m-2" onClick={(e) => this.search(e)}>
                        Search
                    </button>
                </div>
                
                <div className="d-flex flex-wrap justify-content-center w-100">
                    {this.state.data.map( (game) =>
                        <div key={game.id} className="gamebox m-2">

                            <img className="w-100" src={game.cover} alt="" />

                            <div className="border mt-2 rounded">

                                <h5 className="p-2">
                                    {game.name}
                                </h5>
                                <p className="px-2">
                                    {game.summary}
                                </p>


                            </div>   

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
            <div className="d-flex w-100 justify-content-center">

                <GameBoxGenerator></GameBoxGenerator>

            </div>
            
        </div>
        );
    }
}

export default Library;
