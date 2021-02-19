import React, {Suspense} from 'react';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import Error from "../components/Error/Error";
import Footer from '../components/Footer/Footer';
import history from './history';
const Blog = React.lazy(() => import('../components/Blog/Blog'));
const Home = React.lazy(() => import('../components/Home/Home'));
// import Home from '../components/Home/Home';

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<div/>}>
              <Home/>
              <Footer/>
            </Suspense>
          </Route>
          <Route exact path="/posts/:postName">
            <Suspense fallback={<div/>}>
              <Blog/>
              <Footer/>
            </Suspense>
          </Route>
          <Route path="*">
            <Error/>
            <Footer/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
