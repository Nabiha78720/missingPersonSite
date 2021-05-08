import React,{useEffect,useState} from 'react';
import axios from "axios";
import {connect} from 'react-redux';
import NavBar from '../header/navbar';
function Card() {

    let [card, setCard] = useState({});
    let id=window.location.href.split('/')[4]
    useEffect(() => {
        async function test() {
            let resp = await axios.post('/detail/'+id)
            setCard(resp.data);
        }
        test();
    },[])
    return<div>
        <NavBar/>
        <div class="card adjust-flex">
            <div class="card-image">
                <img  src={`/${card.mPersonPic}`}/>
                <span class="card-title"><span>Name: </span>{card.mPersonName}</span>
            </div>
            <div class="card-content">
              <p><span>Description: </span>{card.mPersonDescription}</p>
            </div>
            <div class="card-action">
              <a><span>Age: </span>{card.mPersonAge}</a>
            </div>
          </div>
    </div>    
}
export default connect((myStore)=>{
    return myStore;
  })(Card);