import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import myStore from '../../store/store';
import './content.css';

function Cards(props){
 
    

    // console.log(props);

    useEffect(async function(){
      let resp = await axios.post('/cards');
      // console.log(resp.data);
      props.setCards(resp.data);
    },[]);
    // console.log(cards);
  
    
    let userId= localStorage.getItem('userId');
    
    return <div class="row" style={{alignItems:'center'}}>
    <div class="s12 m7 adjust">
      {
        props.cards.map((card)=>{
          // if(card.referenceId==props.refId){
          //   setShowHideBtn(true);
          // }
          // console.log(card);
          return<div class="card adjust-flex">
            <div class="card-image">
              <img src={`/images/${card.mPersonPic}`}/>
              <span class="card-title"><span>Name: </span>{card.mPersonName}</span>
            </div>
            <div class="card-content">
              <p><span>Description: </span>{card.mPersonDescription}</p>
            </div>
            <div class="card-action">
              <a><span>Age: </span>{card.mPersonAge}</a>
              <div
               style={props.SiteUserReducer.siteUser._id==card.referenceId? {display:'block'}:{display:'none'}}
                className="waves-effect waves-light btn-small btn modal-trigger btn-del" onClick={async()=>{
                  let data={
                    delId:card.referenceId,
                    delPersonId: card._id
                  }
                  let resp = await axios.post('/delete',data);
                  props.setCards(resp.data);
                  console.log(resp.data);
                }}>Delete</div>
            </div>
          </div>
        })
      }
      
    </div>
  </div>
}
export default connect((myStore)=>{
  return myStore;
})(Cards);