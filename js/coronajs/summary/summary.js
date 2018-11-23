/*var feedApp= angular.module("myapp",['ngMessages']);
*/
angular.module('coronaGui').controller('HeaderCtrl', function($scope, $http ) {

	$scope.contextPath = location.pathname.substring(0, window.location.pathname.indexOf("/",2)) ;
//	$scope.serverRestartDate;
	$scope.loadHeaderData = function() {
	/*	$scope.serverRestartDate = webStorage.session
				.get('SERVER_RESTART_DATE');*/
	
		$http({
		  	  url : $scope.contextPath + "/" + "getUserInfo.htm",
		  	  method : "GET",
		  	  headers : {
	            "Accept" : "application/json; charset=utf-8",
	            "Accept-Charset" : "charset=utf-8",
	            "Cache-Control" : "no-cache",
	            "Pragma" : "no-cache",
	            "If-Modified-Since" : "0"
	                  }
		  	   }
		        ) // http					
		  
		  .success(function(data, status, headers, config) 
		  {
		   $scope.username=data;
		   console.log(data);
		  })// success
		  
		  .error(function(data, status, headers, config) {	
			  console.log(data);
			  console.log(status);
			})
	
	
	};
	
	  
	
});


coronaApp.filter('columns', function() {
   return function(items, colCount) {
      var returnItems = [];

      var rows = Math.ceil(items.length / colCount);
      var cols = [];
      var currentCol = [];
      for(var i = 0; i < items.length; i++) {
         currentCol.push(items[i]);
        
         if((i+1)%rows === 0) {
            cols.push(currentCol);
            currentCol = [];
         }
      }

      for(var i = 0; i < rows; i++) {
         for(var k = 0; k < colCount; k++) {
            returnItems.push(cols[k][i]);
         }
      } 

      return returnItems;
   };
});

coronaApp.filter('indexed', function() {
	   
	return function(items, colCount) {
		  var val = items[colCount];
	      return val;
	   
	};
	   
});

coronaApp.filter('serverIndexed', function() {
	   
	return function(items, colCount) {
		  
		  var val = items[colCount];
		  /*if ( colCount == 3 && val.includes(" || ")){
			  val = val.split(" || ")[1];
		  }*/
		  
	      return val;
	};
});


(function() {
   'use strict';
   coronaApp.controller('feedCtrl', ['$scope', '$http', 
       /*     function ($scope, $http){*/
	   
    	function feedCtrl($scope, $http) {

	   		$scope.contextPath = location.pathname.substring(0, window.location.pathname.indexOf("/",2)) ;
	   		console.log($scope.contextPath);
			var jsondata;
			var destinationSelected;
			var loadTypeSelected;
			var columnNames1 = {};
			var successResponse;
			var loadID = "";
			$scope.labelColumns = {};
			$scope.fromValidationMessage="";
			$scope.loader = { 
		         loading : false ,
		    };
			$scope.feed = {
				 form: false,
			};
			 
			$scope.summaryData = "";
			
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

			$scope.showFeedEvent = function() {

				if (destinationSelected != (null || undefined)
						&& loadTypeSelected != (null || undefined)) {
					   return true;
				}
			}
			
			//http://localhost:7001/CoronaUI/summary/table-data.json
			var requestTime = new Date().toString();
			
			$scope.pageRequestTime = requestTime;
			$scope.isCaching = false;
			$scope.nextCachingTime = false;
			$scope.totalServerCount = 0;
			$scope.activeServerCount = 0;
			$scope.failedServerCount = 0;
			$scope.warningServerCount = 0;
			$scope.urlCount = 0;
			$scope.instanceCount = 0;
			$scope.healthCheckURLCount = 0;
			$scope.databaseInstanceCount = 0;
			//$scope.feed.loading = true;
		
			//$scope.feed.summary = true;
			//$scope.loader.loading = true;  // false
			//$scope.feed.form = false;

		//	$scope.feed.form = false;
			
			
			$scope.pageRequestTime = requestTime;
			/*$scope.toggleGuideLinesExpand1 = false;
			$scope.toggleGuideLinesExpand2 = false;
			$scope.toggleGuideLinesExpand = false;*/
            $scope.toggleGuideLines = function(index) {
            	$scope[index] = !$scope[index];
		    };
		    
		    
		    
			$scope.toggleServers = function(className, otherClassName, showAll) {
            	if ( showAll ) {
            		$("." + className).show();
            		$("." + otherClassName).show();
            	} else {
            		$("." + className).show();
            		$("." + otherClassName).hide();
            	}
		    };
		    
		   $scope.showInstanceServers = function (){
			 if ( $scope.servertype == 'instance') {
				 $scope.toggleServers('instance','url', false);
			 } else if ( $scope.servertype == 'url') {
				 $scope.toggleServers('url', 'instance', false);
			 } else {
				 $scope.toggleServers('instance','url', true);
			 } 
		   };
		    
		   $scope.showAlertsFilter = function () {
			   if ( $scope.showalert == 'health-info') {
				   $scope.toggleServers('health-info','system-alerts', false);
				 } else if ( $scope.showalert == 'system-alerts') {
					$scope.toggleServers('system-alerts','health-info', false);
				 } else {
					 $scope.toggleServers('system-alerts','health-info', true);
				 } 
		   };
		   
		   $scope.coronaSplitter = function(string, nb) {
			    var array = string.split(',');
			    return array[nb];
			}
		   
		    $scope.decrActiveServerCount = function() {
		    	$scope.failedServerCount ++;
		    };
		    
		    $scope.incrActiveServerCount = function() {
		    	$scope.activeServerCount ++;	
		    };

		    $scope.incrWarningServerCount = function() {
		    	$scope.warningServerCount ++;	
		    };


		    $scope.incrURLCount = function() {
		    	$scope.urlCount ++;
		    };
		    
		    $scope.incrINSTANCECount = function() {
		    	$scope.instanceCount ++;	
		    };
		    
		    $("#page-start-loader").show();
			
			$http({
				url : $scope.contextPath + "/" + "summary/table-data.json",
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
				console.log (data);
				$scope.summaryData = data;
			//	$scope.feed.summaryList = true;
				if ( data != "") {
					if (data.cache[0] == true) {
						$scope.isCaching = 'CACHED'
					}
					
					$scope.nextCachingTime = data.cache[1];
					$scope.totalServerCount = data.data.length;
					$scope.feed.loading = true;
					$scope.feed.form = true;
					
					var dataLength = data.data.length;
					var servers = data.data;
					var activeServers = [] ;
					var failedServers = [] ;
					var warningServers = [] ;
					
					var healthCheckURL   = [] ;
					var instance   = [] ;
					var urls      = [];
					var databaseInstance = [] ;
					
					//numbers.forEach(loadServers);
					for(var i = 0; i < dataLength; i++) {
						
						if ( servers [i][1] == 'Application URL' ) {
							$scope.urlCount ++;
							urls.push(servers [i]);
						} else if ( servers [i][1] == 'Weblogic_Instance' ) {
							$scope.instanceCount ++;
							instance.push(servers [i]);
						} else if ( servers [i][1] == 'Healthcheck URL') {
							$scope.healthCheckURLCount ++;
							healthCheckURL.push(servers [i]);
						} else {
							$scope.databaseInstanceCount ++;
							databaseInstance.push(servers [i]);
							
						}
							
					}
						
						/*
						
						if ( servers [i][2] == 'ACTIVE' ){
							activeServers.push(servers [i]);
							
						} else if ( servers [i][2] == 'WARNING' ){
							warningServers.push(servers [i]);
						} else {
							failedServers.push(servers [i]);
						}*/
						
						//console.log (failedServers);
					}
				/*});*/
				$scope.urls  = urls;
				$scope.instance  = instance;
				$scope.healthCheckURL  = healthCheckURL;
				$scope.databaseInstance = databaseInstance;
				/*
				$scope.activeServers  = activeServers;
				$scope.warningServers = warningServers;
				$scope.failedServers  = failedServers;
				$scope.healthCheckReportCount = 0;*/
				//$scopr.feed.servercnt = true;
				
				$("#page-start-loader").hide();

			})// success
			.error( function(jqXHR, textStatus, errorThrown) {
				  
				  $("#page-start-loader-container").html("Error occured while laoding.");
			})// error

		
			$scope.master = {};
			$scope.feedFwkForm = {};
			$scope.successMessage = '';
			$scope.errorMessage = '';
			
			$scope.healthCheckInfo = '';
			$scope.healthCheckInfoCols = '';
			$http({
				url : $scope.contextPath + "/" + "app_alerts/table-data.json",
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
				
				if( data != "") {
					$scope.healthCheckInfo = data.data;
					$scope.healthCheckInfoCols = data.columns;
					
					$scope.healthCheckReportCount = data.data.length;
				}

				console.log(data);

			})// success
			.error( function(jqXHR, textStatus, errorThrown) {
				  
				  $("#page-start-loader-container").html("Error occured while laoding.");
			})// error

			$scope.systemCheckInfo = "";
			$scope.systemCheckInfoCols = "";
			$scope.systemCheckReportCount =0;
			
			$http({
				url : $scope.contextPath + "/" + "system_alerts/table-data.json",
				method : "GET",
				headers : {
					"Accept" : "application/json; charset=utf-8",
					"Accept-Charset" : "charset=utf-8",
					"Cache-Control" : "no-cache",
					"Pragma" : "no-cache",
					"If-Modified-Since" : "0"
				}
			})// http8
			.success(function(data, status, headers, config) {
				
				if( data != "") {
					$scope.systemCheckInfo = data.data;
					$scope.systemCheckInfoCols = data.columns;
					
					$scope.systemCheckReportCount = data.data.length;
				}

				console.log(data);

			})// success
			.error( function(jqXHR, textStatus, errorThrown) {
				  
				  $("#page-start-loader-container").html("Error occured while laoding.");
			})// error

}
    	
   ]);

})();
function flipOptions (className, otherClassName, showAll) {
	console.log  ("flipOptions")
	if ( showAll ) {
		$("." + className).show();
		$("." + otherClassName).show();
	} else {
		$("." + className).show();
		$("." + otherClassName).hide();
	}
}