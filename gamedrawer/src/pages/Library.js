import { useEffect, useState } from "react";
import rawg from "../keys";

function GameList(props){
    const [data, setData] = useState(null);
    const [gameSearch, setGameSearch] = useState("GTA");

    //query new data when gameSearch state is updated
    useEffect(()=>{

        let query = new URLSearchParams({
            search: gameSearch,
            key: rawg
        })

        fetch(`https://api.rawg.io/api/games?` + query).then(res =>{
            res.json().then( data =>{
                console.log(data.results)
                setData(data.results)
            })
        })
        
    }, [gameSearch])

    function search() {
        let search = document.getElementById("search").value;
        console.log(search);
        setGameSearch(search);
    }

    if(data){

        let games = data.map( (game, i) => ({id: i, data: game}))

        return (
            <div>
                <button onClick={search}>Search</button>
                <GameBox games={games}></GameBox>
            </div>
        )
    }

    return (
        <div>
            <button onClick={search}>Search</button>
            Loading...
        </div>
    )
}

function GameBox(props){


    return(
        <div className="d-flex flex-wrap justify-content-center align-items-center">
            {props.games.map((game, i) =>
                <div key={game.id} className="rounded border gamebox m-3" >

                    <img src={game.data.background_image} className="w-100"  alt=""/>
                    <div className="d-flex flex-row p-2">
                        <h5 className="text-capitalize">
                            {game.data.name}
                        </h5>

                        <PlatformIcon platforms={game.data.platforms}/>            


                    </div>
                    
                </div>
            )}
        </div>
    );
}

function PlatformIcon({platforms}){
    return(

            <div className="col-12 d-flex flex-">
                {platforms.map( (platform, i) =>{
                    let obj = platform.platform
                        switch(obj.id){
                            
                            case 4: 
                            
                                return(
                                    <div>
                                        PC
                                    </div>
                                )
                            break;
                            default:
                                console.log(obj.id)
                                return(
                                    <div>
                                        A
                                    </div>
                                )
                            break;
                        }
                    }
                )}
            </div>

    )
}

function Library(){
    

    return(
        <div>
            <input id="search" type="text" placeholder="Search Game"></input>
            <GameList></GameList>
        </div>
    )
}

export default Library;
