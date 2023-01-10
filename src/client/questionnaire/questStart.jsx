import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import QuestionRuleEngine from "./questionRuleEngine";

import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import RestaurantIcon from '@material-ui/icons/Business';
import RequestQuoteIcon from '@material-ui/icons/NotesSharp';
import OrdersIcon from '@material-ui/icons/ViewListSharp';
import InventoryIcon from '@material-ui/icons/ShoppingBasket';

import { questions, conditionalQuestions } from '../../data-source/mockDataQnA';
import CONSTANTS from "../constants";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

class ReviewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {activeIndex: 0, activeOptions: [], activeCrustIndex: 0, qty: 0};
        this.setActiveTopic = this.setActiveTopic.bind(this);
    }
    componentDidMount() {
    }
    setOpinionArray(topicName) {
        let reviewTopics = this.props.reviewTopics;
        let activeOpinions = [];
        reviewTopics.forEach((reviewTopic)=> {
            if(reviewTopic.topic == topicName) {
                activeOpinions = reviewTopic.opinions;
            }
        });
        this.setState({activeOpinions: activeOpinions});

    }
    setCrustPrice(crustIndex) {
        let itemId = this.props.itemId.replace('p','').replace('g','');
        let crust = this.props.crustOptions[crustIndex].topic;
        let item = this.props.item;
        console.log('::Size::', this.props.reviewTopics[this.state.activeIndex].topic);
        console.log('::Crust::', crust);
        console.log('::Price::', this.props.reviewTopics[this.state.activeIndex]["pricing"][crust]);
        document.getElementById('price'+itemId).innerHTML = this.props.reviewTopics[this.state.activeIndex]["pricing"][crust] * (this.state.qty > 0 ? this.state.qty : 1);
        let N = Math.round(this.props.reviewTopics[this.state.activeIndex]["pricing"][crust] * (this.state.qty > 0 ? this.state.qty : 1) * 0.85);
        document.getElementById('priceNew'+itemId).innerHTML = isValidCoupon() ? Math.ceil(N / 10) * 10 : Math.round(this.props.reviewTopics[this.state.activeIndex]["pricing"][crust] * (this.state.qty > 0 ? this.state.qty : 1));
        if(this.state.qty > 0){
            var event = new CustomEvent('basket-updated', { detail: {type: item.type, name: item.title, crust: this.props.crustOptions[crustIndex].topic, size: this.props.reviewTopics[this.state.activeIndex].topic, qty: this.state.qty, price: this.props.reviewTopics[this.state.activeIndex]["pricing"][crust] * this.state.qty, itemId: this.props.itemId}});
            document.dispatchEvent(event);
        }
    }
    setSizePrice(activeIndex) {
        let size = this.props.reviewTopics[activeIndex].topic;
        let item = this.props.item;
        let itemId = this.props.itemId.replace('p','').replace('g','');
        console.log('::Size::', size);
        console.log('::Crust::', this.props.crustOptions[this.state.activeCrustIndex].topic);
        console.log('::Price::', this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size]);
        document.getElementById('price'+itemId).innerHTML = this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * (this.state.qty > 0 ? this.state.qty : 1);
        let N = Math.round(this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * (this.state.qty > 0 ? this.state.qty : 1) * 0.85);
        document.getElementById('priceNew'+itemId).innerHTML = isValidCoupon() ? Math.ceil(N / 10) * 10 : Math.round(this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * (this.state.qty > 0 ? this.state.qty : 1));
        if(this.state.qty > 0){
            var event = new CustomEvent('basket-updated', { detail: {type: item.type, name: item.title, crust: this.props.crustOptions[this.state.activeCrustIndex].topic, size: this.props.reviewTopics[activeIndex].topic, qty: this.state.qty, price: this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * this.state.qty, itemId: this.props.itemId}});
            document.dispatchEvent(event);
        }
    }
    setActiveCrust(item, indexCrust) {
        console.log('index: ', indexCrust);
        this.setState({activeCrustIndex: indexCrust});
        this.setOpinionArray(item.topic);
    }
    setActiveTopic(item, index) {
            console.log('index: ', index);
            this.setState({activeIndex: index});
            this.setOpinionArray(item.topic);
            let itemId = this.props.itemId.replace('p','').replace('g','');

            if(document.querySelector('#primaryImg'+itemId).className.indexOf('rotate') != -1) {
                document.querySelector('#primaryImg'+itemId).classList.remove('rotate');
            } else {
                document.querySelector('#primaryImg'+itemId).classList.add('rotate');
            }
            if (index == 1) {
                 document.querySelector('#primaryImg'+itemId).style.padding = '12px';
            } else if (index == 2) {
                 document.querySelector('#primaryImg'+itemId).style.padding = '21px';
            } else if (index == 0) {
                 document.querySelector('#primaryImg'+itemId).style.padding = '0px';
            }
        }
    showMore(e) {
        e.target.parentNode.classList.add('scrollable');
        e.target.style.display = 'none';
        e.target.parentNode.children[e.target.parentNode.children.length - 1].style.marginTop = '7px';
    }
    updatePrice(qty) {
        if(qty >= 1) {
            let size = this.props.reviewTopics[this.state.activeIndex].topic;
            let itemId = this.props.itemId.replace('p','').replace('g','');
            document.getElementById('price'+itemId).innerHTML = this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * qty;
            let N = Math.round(this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * qty * 0.85);
            document.getElementById('priceNew'+itemId).innerHTML = isValidCoupon() ? Math.ceil(N / 10) * 10 : Math.round(this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * qty);
        }
    }
    getPrice(qty) {
        let size = this.props.reviewTopics[this.state.activeIndex].topic;
        return this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * qty;
    }

    render() {
        let {reviewTopics, crustOptions, item, itemId, type} = this.props;
        let {activeIndex, activeCrustIndex, activeOpinions, qty} = this.state;
        let activeDefaultOpinions = [];
        console.log('reviewTopics[0]:', reviewTopics[0]);
        activeDefaultOpinions = reviewTopics[0].opinions;

        let extraClasses = '', incrementerClass = '';
        if(type == 'starters') {
            extraClasses = 'starter-height';
            incrementerClass = 'starter-bottom-inc';
        }

        return (
          <div className={`reviews-container ${extraClasses}`}>
              <div className="topic-container">
                {type != 'starters' && reviewTopics && reviewTopics.map((review, index) => {
                    return (
                        <React.Fragment>
                            <div className={activeIndex===index ? 'review-topic active': 'review-topic'} onClick={()=>{this.setActiveTopic(review, index);  this.setSizePrice(index); }}>
                                {review.topic}
                            </div>
                        </React.Fragment>
                    );
                })}
                </div>


                {type != 'starters' && <div className="topic-container" style={{height: '76px'}}>
                    <div className="card-mini-title">Select your crust:</div>
                    {crustOptions && crustOptions.map((crust, indexCrust) => {
                        return (
                            <React.Fragment>
                                <div className={activeCrustIndex===indexCrust ? 'review-topic active-crust': 'review-topic'} onClick={()=>{this.setActiveCrust(crust, indexCrust); this.setCrustPrice(indexCrust); }}>
                                    {crust.topic}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>}

                {type == 'starters' && <div>
                    <div class="title starter-title">Freshly baked on arrival of your order</div>
                </div>}

                <div className={`incrementer sf-inc ${incrementerClass}`}>
                    <div class="card-mini-title" >Quantity:</div>
                    <div class="quantity">
                        <a className="quantity__minus"><span onClick={()=>{if(this.state.qty>0){this.setState({qty: this.state.qty - 1});}this.updatePrice(this.state.qty - 1);var event = new CustomEvent('basket-updated', { detail: {type: item.type, name: item.title, crust: crustOptions[this.state.activeCrustIndex].topic, size: reviewTopics[this.state.activeIndex].topic, qty: this.state.qty - 1, price: this.getPrice(this.state.qty - 1), itemId: itemId}});document.dispatchEvent(event);}} style={{fontSize: '25px', lineHeight: '0px', marginLeft: '2px'}}>-</span></a>
                        <input name="quantity" type="text" className="quantity__input" value={this.state.qty} />
                        <a className="quantity__plus"><span onClick={()=>{this.setState({qty: this.state.qty + 1});console.log('item:',item);var event = new CustomEvent('basket-updated', { detail: {type: item.type, name: item.title, crust: crustOptions[this.state.activeCrustIndex].topic, size: reviewTopics[this.state.activeIndex].topic, qty: this.state.qty + 1, price: this.getPrice(this.state.qty + 1), itemId: itemId}});document.dispatchEvent(event);this.updatePrice(this.state.qty + 1)}}>+</span></a>
                      </div>
                </div>
          </div>
        );
    }
}

class QuoteCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    appendZero(number) {
        if (number > 0 && number < 10) {
            return '0' + number;
        }
        return number;
    }

    render() {
        let {index, data} = this.props;
        let prefix = 'p';
        let extraClasses = '';
        if(this.props.type && this.props.type == 'starters') {
         prefix = 'g';
         extraClasses = 'starter';
        }
        let defaultPrice = 235;
        return (
        <div className="card-container">
            <div className="section-one" style={{display: 'block'}}>
                <br/>
                <div className="usp-desc">Toppings of guest's choice</div>
                <div className="top">
                    <div className="top-left" style={{position:'absolute',margin:'0 auto',left:'0',right:'0'}}>
                        <img id={`primaryImg${index}`} className={`primary-img rotatable sf-img ${extraClasses}`} src={`../../../img/images/${prefix}${index+1}.png`} />
                    </div>
                    <div className="top-right">
                        <div className="usp-title"></div>

                    </div>
                </div>
            </div>
            <div className="section-two">
                <div className="pricing" style={{top: '-86px'}}><label className="price"><span className="slashed" id={`price${index}`}>{defaultPrice * parseInt(sessionStorage.getItem('qty'),10)}</span><span className="rupee" style={{marginLeft: '6px'}}>₹</span><span className="orig" id={`priceNew${index}`}>{Math.ceil(defaultPrice * parseInt(sessionStorage.getItem('qty'),10) * 0.85)}</span></label></div>
                <div className="top">
                </div>
            </div>
        </div>)
    }
}

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    appendZero(number) {
        if (number > 0 && number < 10) {
            return '0' + number;
        }
        return number;
    }

    render() {
        let {index, data} = this.props;
        let prefix = 'p';
        let extraClasses = '';
        if(this.props.type && this.props.type == 'starters') {
         prefix = 'g';
         extraClasses = 'starter';
        }
        return (
        <div className="card-container">
            <div className="section-one">
                <br/>
                <div className="top">
                    <div className="top-left">
                        <img id={`primaryImg${index}`} className={`primary-img rotatable sf-img ${extraClasses}`} src={`../../../img/images/${prefix}${index+1}.png`} />
                    </div>
                    <div className="top-right">
                        <div className="usp-title"></div>
                        <div className="usp-desc">{data.usp[0]}</div>
                    </div>
                </div>
            </div>
            <div className="title">{data.title}</div>
            <hr className="line"/>
            <div className="section-two">
                <div className="pricing"><label className="price"><span className="slashed" id={`price${index}`}>{data.qna[0].defaultPrice}</span><span className="rupee" style={{marginLeft: '6px'}}>₹</span><span className="orig" id={`priceNew${index}`}>{isValidCoupon() ? Math.ceil(Math.round(data.qna[0].defaultPrice*0.85) / 10) * 10 : data.qna[0].defaultPrice}</span></label></div>
                <div className="top">
                    <ReviewContainer reviewTopics={data.qna[0].responses} crustOptions={data.qna[0].crust} itemId={`${prefix}${index}`} item={data} type={this.props.type} />
                </div>
            </div>
        </div>)
    }
}

class SummaryCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    appendZero(number) {
        if (number > 0 && number < 10) {
            return '0' + number;
        }
        return number;
    }

    render() {
        let {index, data, summaryId} = this.props;
        let prefix = 'p';
        if(data.type && data.type == 'starter') {
            prefix = 'g';
        }
        return (
        <div className="card-container small" style={{padding: '0px 12px 0px 12px'}}>
            <div className="section-one">
                <div className="top">
                    <div className="top-left">
                            <img id={`primaryImg${index}`} className="primary-img rotatable" src={`../../../img/images/${prefix}${summaryId}.png`} style={{width: '72px',paddingTop: '0px'}} />
                    </div>
                    <div className="top-right">
                        <div className="usp-title"><div className="title" style={{marginTop: '10px'}}>{data.name}</div></div>
                        {data.type == 'starter' ? <div className="usp-desc">{data.qty} single starter(s)</div> : <div className="usp-desc">{data.qty} {data.size} pizza(s)</div>}
                    </div>
                </div>
            </div>

            <div className="section-two small">
                <div className="pricing"><label className="price"><span className="slashed" id={`price${index}`}>{data.price}</span><span className="rupee" style={{marginLeft: '6px'}}>₹</span><span className="orig" id={`priceNew${index}`}>{isValidCoupon() ? Math.ceil(Math.round(data.price*0.85) / 10) * 10 : Math.ceil(Math.round(data.price) / 10) * 10}</span></label></div>
                <div className="top">
                </div>
            </div>
        </div>)
    }
}


class QuoteRes extends Component {

//quotePizzaQty, quotePizzaSize, quoteGarlicQty, quoteWrapsQty, quoteDistance
    getFoodImg() {
        //'../img/images/qpizzawrapsgarlic.jpg'
        //'../img/images/qpizzagarlic.jpg'
        //'../img/images/qpizzawraps.jpg'
        //'../img/images/qpizza.jpg'
        if (sessionStorage.getItem('quoteGarlicQty')!='0' && sessionStorage.getItem('quoteWrapsQty')!='0') {
            return '../img/images/qpizzawrapsgarlic.jpg';
        } else if (sessionStorage.getItem('quoteGarlicQty')!='0' && sessionStorage.getItem('quoteWrapsQty')=='0') {
            return '../img/images/qpizzagarlic.jpg';
        } else if (sessionStorage.getItem('quoteGarlicQty')=='0' && sessionStorage.getItem('quoteWrapsQty')!='0') {
            return '../img/images/qpizzawraps.jpg';
        } else {
            return '../img/images/qpizza.jpg';
        }
    }

    runRuleEngine(formState) {
        this.questionRuleEngine.run(formState, nextQuestionId => {
          console.log('--nextQuestionId--', nextQuestionId);
          if (nextQuestionId) {
            /*if (groupedQuestionsById[nextQuestionId][0].mandatory === "No") {

              checkForLastQuestion();
            }*/
            //setQuestion(questions[nextQuestionId][0]);
            //setDisableNextButton(false);
          } else {
            //setDisableNextButton(true);
          }
        });
      };

    getQuestionsByToken(accessToken) {
       var curr = this;
       const rawResponse = fetch(CONSTANTS.ENDPOINT.GETQUESTIONS + accessToken).then((res)=>{
               var res = res.json();
                 res.then(function(r) {
                   console.log('--Questions--', r.data);
                   let response = r.data;
                   curr.questionRuleEngine.parseRules(response);
                   // questionResponses: {1: "1" , 2: "any", 3:"9"}};
                   let formState = { currentQuestionIndex: 1,
                                    currentQuestionId: 3,
                                    questionResponses: {1: "2"}};
                   curr.runRuleEngine(formState);
                 });
               });
    }

    getQuestions() {
           var curr = this;
           const rawResponse = fetch(CONSTANTS.ENDPOINT.DIRECTUSAUTH, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                   "email": CONSTANTS.ENDPOINT.DIRECTUSEMAIL,
                   "password": CONSTANTS.ENDPOINT.DIRECTUSPASSWORD
                 })}).then((res)=>{
                   var res = res.json();
                   res.then(function(r) {
                     console.log('Data: ', r.data);
                     console.log('--AccessToken--', r.data.access_token);
                         var accessToken = r.data.access_token;
                         curr.getQuestionsByToken(accessToken);
                   });
                 });
        }

    constructor() {
        super();
        var foodImgUrl = this.getFoodImg();

        this.state = {
                    value: 0,
                    quoteTitle: sessionStorage.getItem('quotePizzaQty') + ' ' + (sessionStorage.getItem('quotePizzaSize') == '11' ? 'Large Pizzas' : 'Mini Pizzas'),
                    lineItem1: sessionStorage.getItem('quotePizzaQty') + ' Pizzas (' + sessionStorage.getItem('quotePizzaSize') +' inch) - '+ (sessionStorage.getItem('quotePizzaSize')=='11' ? parseInt(sessionStorage.getItem('quotePizzaQty'),10)*199 : parseInt(sessionStorage.getItem('quotePizzaQty'),10)*159),
                    lineItem2: sessionStorage.getItem('quoteGarlicQty')!=null && sessionStorage.getItem('quoteGarlicQty')!='0' ? (sessionStorage.getItem('quoteGarlicQty') + ' Garlic Breads - '+parseInt(sessionStorage.getItem('quoteGarlicQty'),10)*149) : '',
                    lineItem3: sessionStorage.getItem('quoteWrapsQty')!=null && sessionStorage.getItem('quoteWrapsQty')!='0' ? (sessionStorage.getItem('quoteWrapsQty') + ' Veg Wraps - '+parseInt(sessionStorage.getItem('quoteWrapsQty'),10)*159) : '',
                    foodCharges: (sessionStorage.getItem('quotePizzaSize')=='11' ? parseInt(sessionStorage.getItem('quotePizzaQty'),10)*199 : parseInt(sessionStorage.getItem('quotePizzaQty'),10)*159) + parseInt(sessionStorage.getItem('quoteGarlicQty'),10)*149 + parseInt(sessionStorage.getItem('quoteWrapsQty'),10)*159,
                    conveyanceCharges: sessionStorage.getItem('quoteDistance')!=null && sessionStorage.getItem('quoteDistance')=='10' ? 1400 : 1800,
                    total: (sessionStorage.getItem('quotePizzaSize')=='11' ? parseInt(sessionStorage.getItem('quotePizzaQty'),10)*199 : parseInt(sessionStorage.getItem('quotePizzaQty'),10)*159) + parseInt(sessionStorage.getItem('quoteGarlicQty'),10)*149 + parseInt(sessionStorage.getItem('quoteWrapsQty'),10)*159 + (sessionStorage.getItem('quoteDistance')!=null && sessionStorage.getItem('quoteDistance')=='10' ? 1400 : 1800),
                    foodImgSrc: foodImgUrl,
                    currentQuestionIndex: 0,
                    currentQuestionId: 0,
                    questionResponses: {}
                };
        window.currSlotSelected = '';

        this.handleTabChange = this.handleTabChange.bind(this);
        this.questionRuleEngine = new QuestionRuleEngine();
    }
    componentDidMount() {
        var winHeight = window.innerHeight;
        this.getQuestions();
    }
    handleTabChange(event, newValue) {
        console.log('neValue: ', newValue);
        this.setState({value: newValue});
    }

    render() {
        const {value,quoteTitle, lineItem1, lineItem2, lineItem3, foodCharges, conveyanceCharges, total, foodImgSrc} = this.state;

        return (<div style={{marginTop: '84px'}}>
                                    <img id="logo" className="logo-img" src="../images/logo-ng.png" style={{width: '86px'}} onClick={()=>{window.location.href='/';}} />
                                    <Paper>
                                          <TabPanel value={this.state.value} index={0}>
                                               <span className="stage-heading" style={{top: '12px',background: '#f6f6f6'}}>H<RequestQuoteIcon />&nbsp;&nbsp;Generate Quote</span>
                                               <hr className="line-light" style={{visibility: 'hidden'}}/>
                                               <br/>
                                               <span className="stage-desc size-l" >Pizzas: <input id="quotePizzaQty" type="number" className="txt-field" />&nbsp;&nbsp;&nbsp;&nbsp;Size: <input id="quotePizzaSize" type="number" className="txt-field" />&nbsp;inch</span>
                                               <hr className="line-light" style={{marginTop: '18px'}}/>
                                               <span className="stage-desc size-l" >Wraps: <input id="quoteWrapsQty" type="number" className="txt-field" /></span>
                                               <hr className="line-light" style={{marginTop: '18px'}}/>
                                               <span className="stage-desc size-l">Garlic bread: <input id="quoteGarlicQty" type="number" className="txt-field" /></span>
                                               <hr className="line-light" style={{marginTop: '18px'}}/>
                                               <span className="stage-desc size-l">Distance: <input id="quoteDistance" type="number" className="txt-field" />&nbsp;km</span>
                                               <hr className="line-light" style={{marginTop: '18px'}}/>
                                               <br/>
                                               <div className="bottom-bar" ></div>
                                               <a className="button" onClick={()=>{this.getStarted();}}>Get Started →</a>
                                               <br/><br/><br/><br/>

                                          </TabPanel>
                                          <TabPanel value={this.state.value} index={1}>



                                          </TabPanel>
                                        </Paper>
                                </div>)
    }
}

export default withRouter(QuoteRes);