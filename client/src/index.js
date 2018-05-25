import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import Portal from './Portal';
import PortalAdmin from './PortalAdmin';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Portal}/>
            <Route path='/admin' component={PortalAdmin}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
