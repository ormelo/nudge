import React, { Component } from 'react';
import { render } from 'react-dom';

import Stage1 from './stage1.jsx';
import Stage2 from './stage2.jsx';
import Stage3 from './stage3.jsx';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';


var Stage1WithRouter = withRouter(Stage1);
var Stage2WithRouter = withRouter(Stage2);
var Stage3WithRouter = withRouter(Stage3);

render(<Router>
    <div>
        <Route path="/" render={() => (
            <div className="results">
                    <Route exact path="/" component={Stage1WithRouter} />
                <Route path="/process/" component={Stage1WithRouter} />
            </div>)} />
        <Route path="/stage2" exact render={() => (
                    <div className="results">
                            <Route exact path="/" component={Stage1WithRouter} />
                        <Route  path="/stage2" component={Stage2WithRouter} />
                    </div>)} />
        <Route path="/stage3" exact render={() => (
                    <div className="results">
                            <Route exact path="/" component={Stage1WithRouter} />
                        <Route  path="/stage3" component={Stage3WithRouter} />
                    </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));