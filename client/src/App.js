import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import theme from './components/ui/Theme';

import Home from './components/pages/Home';
import Gallery from './components/pages/Gallery';
import ContestInfo from './components/pages/ContestInfo';
import Committee from './components/pages/Committee';
import Footer from './components/ui/Footer';
import ContactUs from './components/pages/ContactUs';

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/gallery' component={Gallery} />
              <Route
                exact
                path='/registration'
                component={() => <div>Registration</div>}
              />
              <Route
                exact
                path='/registration/online'
                component={() => <div>Online Registration</div>}
              />
              <Route
                exact
                path='/registration/onsite'
                component={() => <div>Onsite Registration</div>}
              />
              <Route
                exact
                path='/contest-info/:subMenu'
                component={ContestInfo}
              />
              <Route exact path='/committee/:subMenu' component={Committee} />
              <Route exact path='/contact' component={ContactUs} />
              <Route exact path='/login' component={() => <div>Login</div>} />
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>

      <Footer />
    </div>
  );
}

export default App;
