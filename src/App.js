// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from "react";

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains")
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "68441565205ba17257cc79f4edcd8ad0",
      text: searchText,
      sort: "",
      per_page: 40,
      licence: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp)=>{
      console.log(resp.data);
      const arr = resp.data.photos.photo.map((imgData)=>{
        return fetchFlickrImageURL(imgData, 'q');
        
      })
      setImageData(arr);
    }).catch(()=>{

    }).finally(()=>{

    })

   
  }, [searchText])
  const fetchFlickrImageURL = (photo,size) =>{
    let url = `https://farm${photo.farm}.staticflicker.com/${photo.server}/${photo.id} ${photo.secret}`
    if(size){
      url += '_${size}'
    }
     url += '.jpg'
     return url
  }
  return (
    <>
      <input onChange = {(e)=>{searchData.current = e.target.value}} />
      <button onClick={()=>{setSearchText(searchData.current)}}>Search</button>
      <section>
        <button onClick={()=>{setSearchText("mountains")}}>Mountains</button>
        <button onClick={()=>{setSearchText("beaches")}}>Beaches</button>
        <button onClick={()=>{setSearchText("birds")}}>Birds</button>
        <button onClick={()=>{setSearchText("food")}}>Food</button>

      </section>
      <section>
        
         {imageData.map((imageurl, key)=>{
          return (
            <article>
              <img src={imageurl} key={key} />
          </article>
          )
          
        })}
        
      </section>
    </>
  );
}

export default App;
