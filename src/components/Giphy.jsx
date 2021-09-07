import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import "./Giphy.css";

const Giphy = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [search, setSearch]=useState("")





    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)
             

            try {

                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "wl1uEfB3Oi75chiAhPRbrXCzv4sCP3Fw"
                  }
               
                
                });
                
                 console.log(results)
                setData(results.data.data);


                
            } catch (err) {
                setIsError(true);
                setTimeout(()=>setIsError(false),4000)
            }




            
            setIsLoading(false)
        };
        fetchData();
    }, []);
    
    const renderGifs = () => {
        if (isLoading) {
            return <Loader/>
        }
        return data.map(el => {
            return (
                <div key= { el.id } className="gif">
                    <img src={el.images.fixed_height.url} />
                </div>
            )
        })
    }

    const renderError = () => {
        if (isError) {
            return (
                <div className="alert alert-danger alert-dissmissible fade show" role="alert">Unable to fetch gifs try after sometime
                 
                </div>
               
            )
        }
    }
    const handleSearchChange = event => {
        setSearch(event.target.value)
    }
    const handleSubmit =async event => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);
    
        try {
          const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "wl1uEfB3Oi75chiAhPRbrXCzv4sCP3Fw",
              q: search,
              limit: 100
            }
          });
          setData(results.data.data);
        } catch (err) {
          setIsError(true);
          setTimeout(() => setIsError(false), 4000);
        }
    
        setIsLoading(false);
    }


    return (
        <div className="m-2">
            {renderError()}
          <form className="form-inline justify-content-center m-2 form-my">
              <input
                value={search}
                onChange={handleSearchChange}
                type="text"
                placeholder="search"
                className="form-control"
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary mx-2"
              >
                Go
              </button>
          </form>
             <div className="container gifs">
                {renderGifs()}
              </div>


        </div>
       
    )
}

export default Giphy
