import React, { useEffect, useState } from 'react';
import Cards from './components/content/content';
import NavBar from './components/header/navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import PostAd from './components/header/postAd';
import { Provider } from 'react-redux';
import myStore from './store/store';
import axios from 'axios';
import './App.css';


function App() {
  let [refId, setRefId] = useState();
  let [cards, setCards] = useState([]);

  useEffect(async () => {
    let token= localStorage.getItem('token');
    if (token!=null) {
      try {

        let resp = await axios.post('/checksession', { token });
        console.log(resp.data);
        myStore.dispatch({
          type:"LOGIN_OK",
          payload:resp.data
        })
      } catch (e) {
        console.log(e);
      }

    }

  }, [])

  return (
    <BrowserRouter>
      <Provider store={myStore}>
        <Route exact path='/' render={() => {
          return <div>
            <NavBar setRefId={setRefId} setCards={setCards} />
            <Cards refId={refId} setCards={setCards} cards={cards} />
          </div>
        }} />
        <Route path='/postad' component={PostAd} />
        <Route path='/cards' component={Cards} />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
