import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NaoMapeada from './pages/NaoMapeada';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            component={ Login }
          />
          <Route
            path="/Search"
            component={ Search }
          />
          <Route
            path="/Album/:id "
            component={ Album }
          />
          <Route
            path="/Favorites"
            component={ Favorites }
          />
          <Route
            path="/Profile"
            component={ Profile }
          />
          <Route
            path="/ProfileEdit"
            component={ ProfileEdit }
          />
          <Route
            path="/NaoMapeada"
            component={ NaoMapeada }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
