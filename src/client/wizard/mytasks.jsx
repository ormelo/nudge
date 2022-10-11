import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { detailView } from '../../data-source/mockData';
import { questions, conditionalQuestions } from '../../data-source/mockDataQnA';
import ModalView from './modalView.jsx';
import { useHistory } from "react-router-dom";

class MyTasks extends Component {

    constructor() {
        super();
        this.state = {showLoader: false};
        this.notifyMeClick = this.notifyMeClick.bind(this);
        this.cancelStint = this.cancelStint.bind(this);
    }
    componentDidMount() {
        setTimeout(function(){document.getElementById('logoHeading').style.opacity = '1';},50);
        setTimeout(function(){document.getElementById('iconArrow').style.opacity = '1';},500);
        this.hideNotifySection();
        this.setTimeElapsed();
        window.tasksInterval =  setInterval(function(){this.setTimeElapsed()}.bind(this), 10000);
        scrollTo(document.body, 0, 100);
    }
    cancelStint() {
        localStorage.removeItem('primary-task');
        localStorage.removeItem('secondary-task');
        localStorage.removeItem('subsrcibed');
        localStorage.removeItem('elapsed');
        setTimeout("location.href='/'", 800);
    }
    getShortlistsUrl() {
        var baseUrl = '/shortlists/';
        var primaryTaskName = localStorage.getItem('primary-task');
        var secondaryTaskName = localStorage.getItem('secondary-task');
        switch(primaryTaskName) {
            case 'Interior design': baseUrl = baseUrl + 'interior/'; break;
            case 'Event planning': baseUrl = baseUrl + 'events/'; break;
            default: baseUrl = baseUrl + 'interior/'; break;
        }
        var secondaryTaskNameArr = secondaryTaskName.split(',');
        var locName = secondaryTaskNameArr[secondaryTaskNameArr.length-1]
        switch(locName) {
            case 'East Bangalore (Whitefield & others)': baseUrl = baseUrl+'blr/east'; break;
            case 'South Bangalore (Jayanagar & others)': baseUrl = baseUrl+'blr/south'; break;
            case 'North Bangalore (Hebbal & others)': baseUrl = baseUrl+'blr/north'; break;
            case 'West Bangalore (Nagarbhavi & others)': baseUrl = baseUrl+'blr/west'; break;
            default: baseUrl = baseUrl+'blr/east'; break;
        }
        this.setState({shortlistsUrl: baseUrl});
        return baseUrl;
    }
    setTimeElapsed(){
        let elapsed = localStorage.getItem('elapsed');
        

        if(elapsed != null) {
            elapsed = parseInt(localStorage.getItem('elapsed'),10);
            let timeElapsed = new Date() - elapsed;
            timeElapsed = timeElapsed / 1000;
            timeElapsed = Math.round(timeElapsed/60);
            console.log('timeElapsed: ', timeElapsed);
            if(timeElapsed < 1) {//2
               //do nothing
            } else if(timeElapsed >= 1 && timeElapsed < 3) {//2
                document.getElementById('tasksTable').firstElementChild.classList.add('no-blink');
                document.getElementById('tasksTable').children[0].classList.add('no-blink');
                document.getElementById('tasksTable').children[1].classList.add('blink-text');
                document.getElementById('iconStatus1').src = '../img/images/ic_tick.png';
                document.getElementById('iconStatus1').style.width = '30px';
                document.getElementById('iconStatus2').src = '../img/images/ic_started.png';
            } else if(timeElapsed >= 3 && timeElapsed < 4) {//3
                document.getElementById('tasksTable').firstElementChild.classList.add('no-blink');
                document.getElementById('tasksTable').children[0].classList.add('no-blink');
                document.getElementById('tasksTable').children[1].classList.add('no-blink');
                document.getElementById('tasksTable').children[2].classList.add('blink-text');
                document.getElementById('iconStatus1').src = '../img/images/ic_tick.png';
                document.getElementById('iconStatus1').style.width = '30px';
                document.getElementById('iconStatus2').src = '../img/images/ic_tick.png';
                document.getElementById('iconStatus2').style.width = '30px';
                document.getElementById('iconStatus3').src = '../img/images/ic_started.png';
            } else {//4 expand 4th row
                console.log('in else');
                document.getElementById('tasksTable').firstElementChild.classList.add('no-blink');
                document.getElementById('tasksTable').children[0].classList.add('no-blink');
                document.getElementById('tasksTable').children[1].classList.add('no-blink');
                document.getElementById('tasksTable').children[2].classList.add('no-blink');
                document.getElementById('iconStatus1').src = '../img/images/ic_tick.png';
                document.getElementById('iconStatus1').style.width = '30px';
                document.getElementById('iconStatus2').src = '../img/images/ic_tick.png';
                document.getElementById('iconStatus2').style.width = '30px';
                document.getElementById('iconStatus3').src = '../img/images/ic_tick.png';
                document.getElementById('iconStatus3').style.width = '30px';
                document.getElementById('iconStatus4').src = '../img/images/ic_started.png';
                document.getElementById('tasksTable').children[2].classList.add('no-blink');

                //clear interval
                clearInterval(window.tasksInterval);
                //show shortlists button

                this.getShortlistsUrl();
                if(!this.state.showShortlistsBtn) {
                    this.setState({showShortlistsBtn: true});
                }
                /*if(document.getElementById('viewShortlists') == null) {
                    var anc = document.createElement('a');
                    anc.href=this.getShortlistsUrl();

                    var btn = document.createElement('div');
                    btn.id = 'viewShortlists';
                    btn.classList.add('green-btn');
                    btn.classList.add('left-task-btn');
                    btn.innerHTML = 'View shortlists';
                    anc.appendChild(btn);
                    document.getElementById('tasksTable').children[2].children[1].appendChild(anc);
                }*/
            }
        }
    }
    hideNotifySection() {
        if(localStorage.getItem('subsrcibed') != null) {
            document.getElementById('notifyMsg').style.display = 'none';
            document.getElementById('myTasksSuccess').style.display = 'none';
            document.getElementById('iconArrow').style.display = 'none';
            document.getElementById('greenBtn').style.display = 'none';
            document.getElementById('tasksTable').style.marginTop = '20px';
        }
    }
    loadNotifyScript(cb) {
        var script = '//cdn.pushalert.co/integrate_330e438e9b44f62593c1ae84de8aa777.js';
        var el = document.createElement('script');
        el.onload = function(script){
            console.log('pushalert script loaded');
            setTimeout(function(){cb();},14000);
        };
        el.src = script;
        var initialScriptElement = document.getElementsByTagName('script')[0];
        initialScriptElement.parentNode.insertBefore(el, initialScriptElement);
    }
    notifyEvent() {
        window.primaryTaskName = localStorage.getItem('primary-task');
        if(primaryTaskName == 'Interior design') {
            (pushalertbyiw = window.pushalertbyiw || []).push(['trackEvent', 'task', 'interiorDesign', 'trigger', 1]); //alert('notifiying for interior design');
        } else if(primaryTaskName == 'Event planning') {
            (pushalertbyiw = window.pushalertbyiw || []).push(['trackEvent', 'task', 'eventPlanning', 'trigger', 1]); //alert('notifiying for event planning');
        }
        document.getElementById('myTasksLoader').style.display = 'none';
        document.getElementById('myTasksSuccess').style.display = 'block';
        document.getElementById('tasksTitle').innerHTML = 'You will get a push notification!';
        document.getElementById('tasksTitle').style.color = '#0bba7f';
        document.getElementById('tasksTitle').classList.add('shake');
    }
    notifyMeClick() {
        document.getElementById('myTasksLoader').style.display = 'block';
        document.getElementById('greenBtn').style.visibility = 'hidden';
        document.getElementById('iconArrow').style.display = 'none';
        localStorage.setItem('subsrcibed', 'true');
        localStorage.setItem('elapsed', new Date().getTime());
        if(!window.pushScriptLoadTriggered) {
            this.loadNotifyScript(this.notifyEvent);
            window.pushScriptLoadTriggered = true;
        } else {
            this.notifyEvent();
        }
    }


    render() {
        const {showLoader} = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px'}}>
                        <Link to="/?navigatingBack=true"><img id="logo" className="logo-img" style={{width: '40px'}} src="../img/images/logo_ic.png" /></Link>
                        <div id="logoHeading" className="logo-heading" style={{marginLeft: '76px', textAlign: 'left', fontSize: '18px'}}>{`My Services  >  ${localStorage.getItem('primary-task')}`}</div>
                    </div>
                    <div><i className="loading" id="myTasksLoader" style={{top: '28px'}}></i></div>
                    <div className="main fadeInBottom">
                        <hr className="line-tasks"/>
                        <div id="notifyMsg" className="alert-msg">
                            <div className="alert-icon"><img src="../img/images/ic_bell.png" className="shake"/></div>
                            <div className="alert-message">
                                <div id="tasksTitle" className="a-title">
                                    Thank you for offloading your task!
                                </div>
                                <div className="a-desc">
                                    {`Stint will now get quotes from best ${localStorage.getItem('primary-task')}`} providers & notify you.
                                </div>
                            </div>
                        </div>
                        <div id="greenBtn" className="green-btn" onClick={this.notifyMeClick}>Notify Me</div>
                        <img className="icon-tick" id="myTasksSuccess" src="../img/images/ic_tick.png"/>
                        <img className="icon-arrow cssanimation" id="iconArrow" src="../img/images/ic_arrow.png"/>
                        <div className="tasks-table">
                            <table id="tasksTable">
                              <tr>
                                <td><img id="iconStatus1" className="icon-status" src="../img/images/ic_started.png"/></td>
                                <td className="status-started">Shortlist interior designers near me<br/><div className="status-title">Estimated to complete in few mins</div></td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus2" className="icon-status" src="../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Check reviews & customer references</td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus3" className="icon-status" src="../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Filter out fake agencies & companies with complaints
                                {this.state.showShortlistsBtn && <Link to={this.state.shortlistsUrl}><div className="green-btn left-task-btn">View shortlists</div></Link>}
                                </td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus4" className="icon-status" src="../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Get quotes & review with me</td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus5" className="icon-status last" src="../img/images/ic_finish.png"/></td>
                                <td className="status-notstarted">Finalize & start project</td>
                              </tr>
                            </table>
                            <div className="green-btn cancel-stint-btn" onClick={this.cancelStint}>Cancel Stint</div>
                        </div>
                    </div>
                <div className="desc copyright" style={{textAlign: 'center',fontSize: '14px'}}>Copyright © 2019 Stint.do</div><br/>
                </div>)
    }
}

export default withRouter(MyTasks);