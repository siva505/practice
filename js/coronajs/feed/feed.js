/*var feedApp= angular.module("myapp",['ngMessages']);
*/

(function() {
   'use strict';
   coronaApp.controller('feedCtrl', ['$scope', '$http', '$interval', '$location',
       /*     function ($scope, $http){*/
    	
    	function feedCtrl($scope, $http, $interval) {

			var jsondata;
			var destinationSelected;
			var loadTypeSelected;
			var columnNames1 = {};
			var successResponse;
			var loadID = "";
			var dataReq;
			$scope.labelColumns = {};
			$scope.fromValidationMessage="";
			$scope.loader = { 
		         loading : false ,
		    };
			$scope.feed = {
				 form: false,
			};
			 
			$scope.regex = /^[0-9a-zA-Z#-]{2,20}(?:,[0-9a-zA-Z#-]{2,20})*$/;
			$scope.loader.loading = false;  // false
			$scope.feed.form = true;
			
			$scope.destinationChange = function(destSelected) {
				$scope.labelColumns = {};
				$scope.labelColumns['destination'] = destSelected.busname;
				destinationSelected = destSelected;
				console.log(destSelected);
				// if
			} // destinationChange

			$scope.loadTypeChange = function(loadSelected) {
				$scope.labelColumns['loadType'] = loadSelected;
				loadTypeSelected = loadSelected;
				console.log(loadTypeSelected);
			};

			$scope.columnChanges = function(columnChange) {
				$scope.columnChanges=columnChange;
                console.log(columnChanges);
			};
			
			$interval( function(){ 
				$scope.hideSubmit = $( ":input" ).hasClass("diabled-class");
				
			},1000);

			$scope.showFeedEvent = function() {

				if (destinationSelected != (null || undefined)
						&& loadTypeSelected != (null || undefined)) {
					   return true;
				}
			}
			
			$scope.toggleGuideLinesExpand = false;
            $scope.toggleGuideLines = function() {
				if ($scope.toggleGuideLinesExpand == true) {
					$scope.toggleGuideLinesExpand = false;
				} else {
					$scope.toggleGuideLinesExpand = true;
				}
			  };

			$http({
				url :  "../getFeedData.htm",
				method : "GET",
				headers : {
					"Accept" : "application/json; charset=utf-8",
					"Accept-Charset" : "charset=utf-8",
					"Cache-Control" : "no-cache",
					"Pragma" : "no-cache",
					"If-Modified-Since" : "0"
				}
			})// http
			.success(function(data, status, headers, config) {
				jsondata = data;
				$scope.destinations = jsondata;

			})// success

		
			$scope.master = {};
			$scope.feedFwkForm = {};
			$scope.successMessage = '';
			$scope.errorMessage = '';
			
			$scope.addFeedEvent = function(columnNames) {

				if ($scope.feedFwkForm.$invalid) {
					$scope.successMessage ="";
					$scope.errorMessage ="";
					$scope.fromValidationMessage="Form contains error please resolve the errors before submiting the form. Please refer the guidelines for further reference.";
					
					return;
				}
				else {
					$scope.fromValidationMessage="";
					$scope.master = angular.copy(columnNames);
					console.log(columnNames);
					var jsonReqObj = angular.toJson(columnNames);
					console.log(jsonReqObj);
					dataReq = jsonReqObj;
					console.log(dataReq);
				}
			
				$scope.loader.loading = true;  // false
				$scope.feed.form = false;
				
				$http({
					url :  "../adhoc/feed.htm",
					method : "POST",
					data : jsonReqObj,
					headers : {
						'Content-Type' : 'application/json',
						"Accept" : "application/json; charset=utf-8",
						"Cache-Control" : "no-cache",
						"Pragma" : "no-cache",
						"If-Modified-Since" : "0"
					},
				})
					
				.success(
					function(data, status, headers, config) {
						console.log(data);
						successResponse = data;
                         
						$scope.loader.loading = false;
						$scope.feed.form = true;
						var responseCode = successResponse.code;
						var loadId = successResponse.data.loadId;
						console.log(responseCode);
						if (responseCode == 200) 
						{
							
						$scope.errorMessage="";
						console.log(successResponse.data.offer_Sub_Msg);
						
						if(successResponse.data.offer_Sub_Msg!=null || undefined)
							{
							$scope.successMessage="";
							$scope.errorMessage=successResponse.data.offer_Sub_Msg;
							}
						else if (successResponse.data.loadId!=null || undefined)
						{
						$scope.errorMessage="";
						$scope.successMessage = "Adhoc Feed successfully Posted, LoadId: "+ successResponse.data.loadId;
						
						}
						else if (successResponse.data.TRN_ID!=null || undefined)
						{
						$scope.errorMessage="";
						$scope.successMessage = "Data Inserted in FEED_INFO with TRN_ID: "+ successResponse.data.TRN_ID;
						
						}
								
						} 
						else {
							
							$scope.errorMessage = successResponse.description;
							$scope.successMessage ="";
						}

					})
					
				.error(function(data, status, headers, config) 
						{
					
					$scope.loader.loading = false;
					$scope.feed.form = true;
					console.log(data);
					if(data.description!=null)
						{
					$scope.errorMessage = data.description;
						}
					else 
						{
						$scope.errorMessage = data.message;
						
						}
					$scope.successMessage ="";
					
				})

			};



}
    	
   ]);

})();
