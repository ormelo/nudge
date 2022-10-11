import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter, useHistory } from 'react-router-dom';
import { detailView } from '../../data-source/mockData';
import { questions, conditionalQuestions } from '../../data-source/mockDataQnA';
import ModalView from './modalView.jsx';

class QuestionAnswer extends Component {

    isSelected(selectedAns, answer) {
        if (selectedAns && selectedAns.length === 0) {
            return false;
        }
        const found = (selectedAns || []).find((selectedAnswer) => selectedAnswer.responseId === answer.id);

        return found ? true : false;
    }

    render() {
        return (
            <div className={`question-answers-container ${this.props.className}`}>
                <ul className="wstep">
                    <li className={this.props.activeIndex >= 1 ? "wstep1 active" : "wstep1"}></li>
                    <li className={this.props.activeIndex >= 2 ? "wstep2 active" : "wstep2"}></li>
                    <li className={this.props.activeIndex >= 3 ? "wstep3 active" : "wstep3"}></li>
                    <li className={this.props.activeIndex >= 4 ? "wstep4 active" : "wstep4"}></li>
                </ul>
                <div className="row pr-2">
                    <div className="col-md-12 ">
                        <div className="question">{this.props.question}</div>
                    </div>
                </div>
                <div className="row pr-2">
                    <div className="col-md-12 pb-2" >
                        <div className="answers-container">
                            {this.props.answers.map((answer) => {
                                return (<div key={Math.random()} className={true ? "answer" : "answer active-ans"}
                                    onClick={() => this.props.onSelect(answer)}>
                                    {this.props.activeIndex == 4 ? <Link to="/mytasks" style={{color: '#17bc85'}}><span className="ans-text" >{answer.title}</span></Link>
                                        : <span className="ans-text" >{answer.title}</span>}
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

class Book extends Component {

    constructor() {
        super();
        this.state = {
            activeQuestionIndex: 0,
            conditionalActiveQuestionIndex: 0,
            showLoader: false,
            questionList: questions.results,
            conditionalQuestions: {results:[]},
            searchRequestPayLoad: {
                "query": this.getSearchQuery(),
                "questions": []
            },
            displayQuestions: true
        }
        this.onQuestionSelect = this.onQuestionSelect.bind(this);
        this.onConditionalQuestionSelect = this.onConditionalQuestionSelect.bind(this);
    }
    componentWillUnmount() {
    }
    componentDidMount() {
        const { params } = this.props.match;
        setTimeout(function(){document.getElementById('logoHeading').style.opacity = '1';},0);
        localStorage.removeItem('primary-task');
        localStorage.removeItem('secondary-task');
        this.setState({
            searchQuery: params.searchQuery,
            details: detailView,
            selectedSentiment: detailView.sentiments && Object.keys(detailView.sentiments)[0] || {}
        })
        setTimeout(function(){this.setState({showLoader: false})}.bind(this),400);
        scrollTo(document.body, 0, 100);
    }
    getSearchQuery() {
        let searchQuery = window.location.search;
        if (typeof searchQuery === 'string') {
            return searchQuery.replace('?q=', '').split('+').join(' ');
        }
        return ''
    }
    titleCase(str) {
       var splitStr = str.toLowerCase().split(' ');
       for (var i = 0; i < splitStr.length; i++) {
           // You do not need to check if i is larger than splitStr length, as your for does that for you
           // Assign it back to the array
           splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
       }
       // Directly return the joined string
       return splitStr.join(' ');
    }
    onConditionalQuestionSelect(answer) {
         let { conditionalActiveQuestionIndex, conditionalQuestions, searchRequestPayLoad } = this.state;
                searchRequestPayLoad.questions.push({
                    id: conditionalQuestions.results[conditionalActiveQuestionIndex].id,
                    responseId: answer.id
                })
                let nextIndex = conditionalActiveQuestionIndex + 1;
                if (conditionalQuestions.results.length > nextIndex) {
                    this.setState({
                        conditionalActiveQuestionIndex: nextIndex,
                        searchRequestPayLoad: searchRequestPayLoad
                    })
                }

                let ans = answer.title;
                let curVal = localStorage.getItem('secondary-task');
                if(curVal == null) {
                    localStorage.setItem('secondary-task', answer.title);
                } else {
                    localStorage.setItem('secondary-task', curVal + ',' + answer.title);
                }

                console.log('conditional answer: ', ans);
    }
    onQuestionSelect(answer) {
        let { activeQuestionIndex, questionList, searchRequestPayLoad } = this.state;
        searchRequestPayLoad.questions.push({
            id: questionList[activeQuestionIndex].id,
            responseId: answer.id
        })
        let nextIndex = activeQuestionIndex + 1;
        if (questionList.length > nextIndex) {
            this.setState({
                activeQuestionIndex: nextIndex,
                searchRequestPayLoad: searchRequestPayLoad
            })
        }
        debugger;
        localStorage.setItem('primary-task', answer.title);

        let ans = this.titleCase(answer.title).replace(/ /g,'');
        console.log('answer: ', conditionalQuestions[ans]);
        this.setState({conditionalQuestions: conditionalQuestions[ans]});
        //if(answer.title == 'Interior'

        if(activeQuestionIndex == 3) {
            window.location.href = "/recommended-picks";
        }
    }

    render() {
         const { questionList, activeQuestionIndex, conditionalActiveQuestionIndex, searchRequestPayLoad = [], displayQuestions, showLoader, conditionalQuestions } = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px'}}>
                        <Link to="/?navigatingBack=true"><img id="logo" className="logo-img" style={{width: '40px'}} src="../img/images/logo_ic.png" /></Link>
                        <div id="logoHeading" className="logo-heading">Plan your home</div>
                    </div>
                    <div><i className="loading" style={{display: showLoader ? 'block' : 'none'}}></i></div>
                    <div className="main fadeInBottom">

                        {conditionalQuestions && conditionalQuestions.results && conditionalQuestions.results.length <= 0 && questionList && questionList.length > 0 &&
                         <QuestionAnswer selectedAns={searchRequestPayLoad.questions || []} question={questionList[activeQuestionIndex].question} answers={questionList[activeQuestionIndex].responses} onSelect={this.onQuestionSelect} activeIndex={activeQuestionIndex+1} />}

                        {conditionalQuestions && conditionalQuestions.results && conditionalQuestions.results.length > 0 &&
                                                 <QuestionAnswer selectedAns={searchRequestPayLoad.questions || []} question={conditionalQuestions.results[conditionalActiveQuestionIndex].question} answers={conditionalQuestions.results[conditionalActiveQuestionIndex].responses} onSelect={this.onConditionalQuestionSelect} activeIndex={conditionalActiveQuestionIndex+1} />}

                    </div>
                <div className="desc copyright" style={{textAlign: 'center',fontSize: '14px'}}>Copyright © 2019 Stint.do</div><br/>
                </div>)
    }
}

export default withRouter(Book);