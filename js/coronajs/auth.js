
//var coronaApp = angular.module('coronaGui', ['ngMessages','ui.bootstrap']);


coronaApp.controller("authController", function($scope, $http) {
	
	$scope.contextPath = location.pathname.substring(0, window.location.pathname.indexOf("/",2)) ;
	 
	/*data={
		"home":true,
		"adhoc":false,
		"dashboard":true
		}*/

	 $scope.userRoles=true;
	
	$http({
	  	  url :  $scope.contextPath + "/" + "userModules.htm",
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
	      $scope.data=data;
	      console.log(data);
		  $scope.isDBHasAccess=data.home;
		  console.log(data.home);
		  $scope.isFeedHasAccess=data.adhoc;    
		  $scope.isDashHasAccess=data.dashboard; 
		  $scope.isRolesHasAccess=data.userrole; 
		  console.log(data.home);
	      console.log(data.userrole);
	  })// success
	  .error(function(data, status, headers, config) {	
		  console.log(data);
		  console.log(status);
		})
		
	
});

