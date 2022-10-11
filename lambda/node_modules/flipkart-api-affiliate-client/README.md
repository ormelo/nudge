[![NPM](https://nodei.co/npm/flipkart-api-affiliate-client.png)](https://nodei.co/npm/flipkart-api-affiliate-client/)

[![Build Status](https://travis-ci.org/Chandu4221/flipkart-affiliate-client.svg?branch=master)](https://travis-ci.org/Chandu4221/flipkart-affiliate-client)

# Flipkart Affiliate Client for API Version 1.0 

un-official Node.js client for [Flipkart Affiliates API](https://affiliate.flipkart.com/api-docs/)

### Prerequisites

Requires "request" npm package

## Installation

Install using npm
```
npm i flipkart-api-affiliate-client
```
## Usage
Require Library

```
var client = require('flipkart-api-affiliate-client');
```
Create Client
```
var fkClient = new client({
	trackingId:"<YOUR TRACKING ID>",
	token:"<YOUR TOKEN>",
},"<FORMAT>");
```

## Examples

Usage Examples

### Products Feed Listing
Get the Product Feed of The API
```
fkClient.getProductsFeedListing().then(function(value){
	console.log(value); //object with status, error and body
});
```


### Product Feed
Get the Product Feed Of The API.

Takes Url as the parameter obtained from the Products Feed Listing

```
fkClient.getProductsFeed(Url).then(function(value){
		console.log(value); //object with status, error and body
});
```

### Books Category Feed
Get the Books Category Feed Of The API.

```
fkClient.getBooksCategoryFeed().then(function(value){
		console.log(value); //object with status, error and body
});
```


### Top Selling Books
Get the Top Selling Books Of The API.

Takes Url as the parameter obtained from the Books Category Feed

```
fkClient.getTopSellingBooks(Url).then(function(value){
		console.log(value); //object with status, error and body
});
```


### Keyword Search

Search based on the Keywords.

doKeywordSearch("category",limit) takes two parameters.

category of the product you are searching for. and 
limit (by default the limt is set to 5)


```
fkClient.doKeywordSearch("mobiles",10).then(function(value){
		console.log(value); //object with status, error and body
});
```

### Id Search
Search based On the Product Id

doIdSearch(productId) takes "ProductId" as a parameter.

```
fkClient.doIdSearch(productId).then(function(value){
		console.log(value); //object with status, error and body
});
```

### Get All Offers
Get All Offers


```
fkClient.getAllOffers().then(function(value){
		console.log(value); //object with status, error and body
});
```


### Get Deals of the Day
Get Deals of the Day

```
fkClient.getDealsOfTheDay().then(function(value){
		console.log(value); //object with status, error and body
});
```

### Get Orders Report
Get orders report based on start_date , end_date, offset and status

getOrdersReport(obj) takes an object as a parameter

object Structure
```
{
	startDate:'2012-03-01',
	endDate:'2018-04-01',
	status:'approved',
	offset:'0'
}
```

```
fkClient.getOrdersReport(obj).then(function(value){
		console.log(value); //object with status, error and body
});
```

### Get App Install Report
Get App Install Report based on start_date, end_date and status

getAppInstallReport(obj) takes object as a parameter

Object Structure
```
{
	startDate:'2012-03-01',
	endDate:'2018-04-01',
	status:'disapproved',
}
```
```
fkClient.getAppInstallReport(obj).then(function(value){
		console.log(value); //object with status, error and body
});
```