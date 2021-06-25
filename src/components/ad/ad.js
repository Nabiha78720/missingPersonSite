import React, { useEffect, useState } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import NavBar from '../header/navbar';

import { Facebook } from 'react-sharingbuttons';
import 'react-sharingbuttons/dist/main.css'
import './ad.css';
function Card(props) {
  // console.log(props)
  let [card, setCard] = useState({});
  let [contact, setContact] = useState();
  let id = window.location.href.split('/')[4];

  useEffect(() => {
    async function test() {
      let resp = await axios.post('/detail/' + id)
      console.log(resp)
      setCard(resp.data);
      setContact(
        resp.data.referenceId.contact
      )
    }
    test();
  }, []);
  const sharingButtons = () => {
    const url=window.location.protocol+"//"+window.location.host+"/detail/"+id
    // const url = 'https://github.com/caspg/react-sharingbuttons'
    const shareText = 'Check this site!'

    return (
      <div>
        <Facebook className='btncolor' url={url} shareText={shareText} />
      </div>
    )
  }
  return <div>
    <NavBar />
    <div class="card adjust-flex-single">
      <div class="card-image">
        <img src={`/${card.mPersonPic}`} />
        <span class="card-title"><span>Name: </span>{card.mPersonName}</span>
      </div>
      <div class="card-content">
        <p><span>Description: </span>{card.mPersonDescription}</p>
        
      </div>
      <div class="card-action">
        <a><span>Age: </span>{card.mPersonAge}</a>

        {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && <a href={"tel:" + contact} ><div className="waves-effect waves-light btn-small btn modal-trigger btn-del">Contact</div></a>}
      </div>
      <div class="card-content btncolor" >
      <div >{sharingButtons()}</div>
      </div>
     

    </div>

  </div>
}
export default connect((myStore) => {
  return myStore;
})(Card);