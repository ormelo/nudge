import React, { Component } from 'react';
import { render } from 'react-dom';

import Dashboard from './dashboard.jsx';
import Onboarding from './onboarding.jsx';
import QuestStart from './questStart.jsx';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

var DashboardWithRouter = withRouter(Dashboard);
var OnboardingWithRouter = withRouter(Onboarding);
var QuestStartWithRouter = withRouter(QuestStart);

render(<Router>
    <div>

        <Route path="/dashboard" exact render={() => (
                    <div className="results">
                            <Route exact path="/" component={DashboardWithRouter} />
                        <Route  path="/dashboard" component={DashboardWithRouter} />
                    </div>)} />
        <Route path="/questionnaire" exact render={() => (
                    <div className="results">
                            <Route exact path="/" component={OnboardingWithRouter} />
                        <Route  path="/questionnaire" component={OnboardingWithRouter} />
                    </div>)} />
        <Route path="/questionnaire-start" exact render={() => (
                    <div className="results">
                            <Route exact path="/" component={QuestStartWithRouter} />
                        <Route  path="/questionnaire-start" component={QuestStartWithRouter} />
                    </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));