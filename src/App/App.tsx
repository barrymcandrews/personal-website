import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from '../components/Home/Home';
import Error from "../components/Error/Error";
import Blog from '../components/Blog/Blog';
import Footer from '../components/Footer/Footer';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/posts/:postName">
            <Blog/>
          </Route>
          <Route path="*">
            <Error/>
          </Route>
        </Switch>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
