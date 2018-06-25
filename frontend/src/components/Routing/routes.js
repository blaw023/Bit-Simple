import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import aboutMe from '../AboutMe/aboutMe';
import siteDetails from '../SiteDetails/siteDetails';
import {CryptoHome} from '../Home/home';



const routes = () => (
    <main>
     <Switch>
         <Route exact path="/" component={CryptoHome}/>
         <Route path="/aboutme" component={aboutMe}/>
         <Route path="/details" component={siteDetails}/>
         <Redirect from ='*' to='/'/>
     </Switch>
  </main>

);

export default routes;