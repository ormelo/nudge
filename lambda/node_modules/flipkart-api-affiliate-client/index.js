var request = require('request');
var client = function (details, format) {
	var headers = {
		"Fk-Affiliate-Id": details.trackingId,
		"Fk-Affiliate-Token": details.token
	};
	this.getProductsFeedListing = function () {
		return new Promise(function (resolve, reject) {
			var url = (format == 'json') ? "https://affiliate-api.flipkart.net/affiliate/api/" + details.trackingId + ".json" : "https://affiliate-api.flipkart.net/affiliate/api/" + details.trackingId + ".xml";
			request({
				url: url,
				headers: headers,
			}, function (error, response, body) {
				if (error)
					reject(error);
				else {
					resolve({
						status: response.statusCode,
						error: getStatusError(response.statusCode),
						body: body
					});
				}
			});
		});
	};

	this.getProductsFeed = function (categoryUrl) {
		return new Promise(function (resolve, reject) {
			request({
				url: categoryUrl,
				headers: headers,
			}, function (error, response, body) {
				if (error)
					reject(error);
				else {
					resolve({
						status: response.statusCode,
						error: getStatusError(response.statusCode),
						body: body
					});
				}
			});
		});
	};


	this.getBooksCategoryFeed = function () {
		return new Promise(function (resolve, reject) {
			var url =
				format == "json"
					? "https://affiliate-api.flipkart.net/affiliate/1.0/booksApi/" +
					details.trackingId +
					".json"
					: "https://affiliate-api.flipkart.net/affiliate/1.0/booksApi/" +
					details.trackingId +
					".xml";

			request(
				{
					url: url,
					headers: headers
				},
				function (error, response, body) {
					if (error) reject(error);
					else {
						resolve({
							status: response.statusCode,
							error: getStatusError(response.statusCode),
							body: body
						});
					}
				}
			);
		});
	};

	this.getTopSellingBooks = function (booksCategoryUrl) {
		return new Promise(function (resolve, reject) {
			request(
				{
					url: booksCategoryUrl,
					headers: headers
				},
				function (error, response, body) {
					if (error) reject(error);
					else {
						resolve({
							status: response.statusCode,
							error: getStatusError(response.statusCode),
							body: body
						});
					}
				}
			);
		});
	};


	this.doKeywordSearch = function (keyword, limit) {
		var count = limit || 5;
		return new Promise(function (resolve, reject) {
			var url = (format == 'json') ? "https://affiliate-api.flipkart.net/affiliate/1.0/search.json?query=" + keyword + "&resultCount=" + count : "https://affiliate-api.flipkart.net/affiliate/1.0/search.xml?query=" + keyword + "&resultCount=" + count;

			request({
				url: url,
				headers: headers,
			}, function (error, response, body) {
				if (error)
					reject(error);
				else {
					resolve({
						status: response.statusCode,
						error: getStatusError(response.statusCode),
						body: body
					});
				}
			});

		});
	};

	this.doIdSearch = function (id) {
		return new Promise(function (resolve, reject) {
			var url = (format == 'json') ? "https://affiliate-api.flipkart.net/affiliate/1.0/product.json?id=" + id : "https://affiliate-api.flipkart.net/affiliate/1.0/product.xml?id=" + id;

			request({
				url: url,
				headers: headers,
			}, function (error, response, body) {
				if (error)
					reject(error);
				else {
					resolve({
						status: response.statusCode,
						error: getStatusError(response.statusCode),
						body: body
					});
				}
			});
		});
	};

	this.getAllOffers = function () {
		return new Promise(function (resolve, reject) {
			var url = (format == 'json') ? "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json" : "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/xml"
			request({
				url: url,
				headers: headers,
			}, function (error, response, body) {
				if (error)
					reject(error);
				else {
					resolve({
						status: response.statusCode,
						error: getStatusError(response.statusCode),
						body: body
					});
				}
			});
		});
	};


	this.getDealsOfTheDay = function () {
		return new Promise(function (resolve, reject) {
			var url = (format == 'json') ? "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json" : "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/xml";
			request({
				url: url,
				headers: headers,
			}, function (error, response, body) {
				if (error)
					reject(error);
				else {
					resolve({
						status: response.statusCode,
						error: getStatusError(response.statusCode),
						body: body
					});
				}
			});
		});
	};


	this.getOrdersReport = function (info) {
		return new Promise(function (resolve, reject) {
			var url = (format == 'json') ? "https://affiliate-api.flipkart.net/affiliate/report/orders/detail/json?startDate=" + info.startDate + "&endDate=" + info.endDate + "&status=" + info.status + "&offset=" + info.offset : "https://affiliate-api.flipkart.net/affiliate/report/orders/detail/xml?startDate=" + info.startDate + "&endDate=" + info.endDate + "&status=" + info.status + "&offset=" + info.offset;

			request({
				url: url,
				headers: headers,
			}, function (error, response, body) {
				if (error)
					reject(error);
				else {
					resolve({
						status: response.statusCode,
						error: getStatusError(response.statusCode),
						body: body
					});
				}
			});
		});
	};


	this.getAppInstallReport = function (info) {
		return new Promise(function (resolve, reject) {
			var url = (format == 'json') ? "https://affiliate-api.flipkart.net/affiliate/v1/appInstall/json?startDate=" + info.startDate + "&endDate=" + info.endDate + "&status=" + info.status : "https://affiliate-api.flipkart.net/affiliate/v1/appInstall/xml?startDate=" + info.startDate + "&endDate=" + info.endDate + "&status=" + info.status;

			request({
				url: url,
				headers: headers,
			}, function (error, response, body) {
				if (error)
					reject(error);
				else {
					resolve({
						status: response.statusCode,
						error: getStatusError(response.statusCode),
						body: body
					});
				}
			});
		});
	};

	return this;
}

var getStatusError = function (statusCode) {
	if (statusCode == 400)
		return "Bad request";
	else if (statusCode == 401)
		return "Unauthorized. Affiliate Id or Token InCorrect";
	else if (statusCode == 403)
		return "Forbidden";
	else if (statusCode == 404)
		return "Error: Not Found"
	else if (statusCode == 500)
		return "Internal Server Error";
	else if (statusCode == 503)
		return "Service unavailable";
	else if (statusCode == 599)
		return "Connection timed out";
	else if (statusCode == 410)
		return "Resource requested is no longer available";
	else if (statusCode == 200)
		return null;
	else
		return "Unknown Error Occured";
}

module.exports = client;
