import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Error from '../components/Error/Error';
import Footer from '../components/Footer/Footer';
import history from './history';
const Blog = React.lazy(() => import('../pages/Blog/Blog'));
const Project = React.lazy(() => import('../pages/Project/Project'));

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path='/'>
            <Home />
            <Footer />
          </Route>
          <Route exact path='/posts/:postName'>
            <Suspense fallback={<div />}>
              <Blog />
              <Footer />
            </Suspense>
          </Route>
          <Route exact path='/projects/:projectName'>
            <Suspense fallback={<div />}>
              <Project />
              <Footer />
            </Suspense>
          </Route>
          <Route path='*'>
            <Error />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
