import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from '../components/Home/Home';
import Error from "../components/Error/Error";


function App() {
  return (
   <Router>
     <Switch>
       <Route exact path="/">
         <Home/>
       </Route>
       <Route path="*">
         <Error/>
       </Route>
     </Switch>
   </Router>
  );
}

export default App;
