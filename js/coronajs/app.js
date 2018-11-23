//Define an angular module for our app
var coronaApp = angular.module('coronaGui', ['ngRoute','angular.filter','webStorageModule','ui.bootstrap','hpe.directive','ngCsv'
                                             ,'angularUtils.directives.dirPagination']);
//Define Routing for app
coronaApp.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    .when('/Logout', 		    			{templateUrl: 'resources/html/home/logout.html',							activetab: 'home'		}) 
    .when('/Login', 						{templateUrl: 'resources/html/home/login.html',				    			activetab: 'home'		})
    .when('/Home', 							{templateUrl: '../corona/home-include.htm',								activetab: 'home'		})  
    .when('/404', 							{templateUrl: 'resources/html/home/404.html',								activetab: 'home'		})
    .when('/Roles', 			        	{templateUrl: 'resources/html/home/roles.html',		            			activetab: 'home'	    })    
    .otherwise({  redirectTo: '/Home',	activetab: 'home' });
}]);


angular.module('coronaGui').config(function ($provide, $httpProvider) {
	  var $http, $body = $("body"), startTime, endTime;
	  $provide.factory('EccInterceptor', function ($q, $injector, $rootScope) {
	    return {
	      request: function (config) {
	    	$body.addClass("loading");
	    	startTime = Date.now();
	        return config || $q.when(config);
	      },

	      requestError: function (rejection) {
	    	$http = $http || $injector.get('$http');
	        if($http.pendingRequests.length < 1) {
	          $body.removeClass("loading");
	        }
	        return $q.reject(rejection);
	      },

	      response: function (response) {
	    	 
	    	$http = $http || $injector.get('$http');
	        if($http.pendingRequests.length < 1) {
	          $body.removeClass("loading");
	          console.log("Time Lapsed (in seconds): ", (Date.now() - startTime)/1000);
	        }
	        return response || $q.when(response);
	      },

	      responseError: function (rejection) {
	       	$http = $http || $injector.get('$http');
	        if($http.pendingRequests.length < 1) {
	          $body.removeClass("loading");
	        }
	        
	        if(rejection.statusText == 'Forbidden'){
	        	$rootScope.$broadcast("SessionTimeout");
	        }
	        return $q.reject(rejection);
	      }
	    };
	  });
	  $httpProvider.interceptors.push('EccInterceptor');
});


coronaApp.controller('coronaMainCtrl', function ($scope, $http, $timeout,webStorage) {
	$scope.direction = "home";	
	$scope.contextPath = location.pathname.substring(0, window.location.pathname.indexOf("/",2)) ;
});




