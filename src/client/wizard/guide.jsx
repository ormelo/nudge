import React, { Component } from 'react';
import { render } from 'react-dom';

import Shortlists from './shortlists.jsx';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';


var ShortlistsWithRouter = withRouter(Shortlists);

render(<Router>
    <div>
        <Route path="/" render={() => (
            <div className="results">
                    <Route exact path="/" component={ShortlistsWithRouter} />
                <Route path="/order/" component={ShortlistsWithRouter} />
                <Route path="/redirect/" component={ShortlistsWithRouter} />
            </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));