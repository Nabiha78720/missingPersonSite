import React,{ useState} from 'react';
import './navbar.css';
import M from 'materialize-css';
import Login from './login';
import SignUp from './signup';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import myStore from '../../store/store';
import axios from 'axios';


function NavBar(props){
  const [searchName,setSearchName]=useState({});
    return<div>
      <Login/>
      <SignUp/>
      <nav class="nav-extended  pushpin z-depth-3">
        <div className="nav-wrapper">
          <input id="search-input" placeholder="Search" type="text" class="browser-default search-field" name="q" autocomplete="off" aria-label="Search box"
         on
          onInput={async(evt)=>{
            setSearchName({
              ...searchName,
              name: evt.target.value
            })
            let data={
              mPersonName:searchName.name,
            }
            console.log(data.mPersonName);
            let resp = await axios.post('/search',data);
            props.setCards(resp.data);
            console.log(resp.data);
          }}
          />
          <label for="search-input">
            </label> 
          <i class="material-icons search-close-icon">cancel</i>

          <a onClick={()=>{
          var drawer = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
          }}  data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>

          <ul className="right hide-on-med-and-down">
            <li style={props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><Link to='/postad'><a className="waves-effect waves-light btn-small btn modal-trigger">Post Ad</a></Link></li>

            <li style={props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a className="waves-effect waves-light btn-small btn modal-trigger" onClick={()=>{
                myStore.dispatch({
                type: 'LOGOUT'
              })
              localStorage.removeItem('token');
              localStorage.removeItem('userId')
            }}>Logout</a></li>

            <li style={!props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a onClick={() => {
              var loginModal = M.Modal.init(document.getElementById('modal1'), {});
              loginModal.open();}}>Login</a></li>
            <li style={!props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a onClick={() => {
              var signupModal=M.Modal.init(document.getElementById('modal2'),{});
              signupModal.open();}}>SignUp</a></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li style={props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><Link to='/postad'><a className='post-ad' onClick={()=>{
          var drawer = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
          }}>Post Ad</a></Link></li>

        <li style={props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a className='post-ad' onClick={()=>{
            myStore.dispatch({
            type: 'LOGOUT'
            })
          localStorage.removeItem('token');
          localStorage.removeItem('userId')
          }}>Logout</a></li>

        <li style={!props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a onClick={() => {
          var loginModal = M.Modal.init(document.getElementById('modal1'), {});
          loginModal.open();}}>Login</a></li>

        <li style={!props.SiteUserReducer.siteUser._id? {display:'block'}:{display:'none'}}><a onClick={() => {
          var signupModal=M.Modal.init(document.getElementById('modal2'),{});
          signupModal.open();}} >SignUp</a></li>
      </ul>
    </div>
}
export default connect((myStore)=>{
  return myStore;
})(NavBar);