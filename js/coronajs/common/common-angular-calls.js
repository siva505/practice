/**
 * http://usejsdoc.org/
 */
coronaApp.controller('HeaderCtrl', function($scope, $http, $location) {
	
	$scope.loadHeaderData = function() {

		var contextPath1 = location.pathname.substring(0,
				window.location.pathname.indexOf("/", 2));
		$scope.contextPath = contextPath1;
		var url = $location.$$absUrl;
		$scope.currentURI = url.split(contextPath1)[1];
		console.log($scope.currentURI);

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
		}) // http

		.success(function(data, status, headers, config) {
			$scope.username = data;
			console.log(data);
		})// success

		.error(function(data, status, headers, config) {
			console.log(data);
			console.log(status);
		})

	};

});

coronaApp.controller("authController", function($scope, $http, $location) {

	$scope.accessTabData;
	
	$scope.contextPath = location.pathname.substring(0,
			window.location.pathname.indexOf("/", 2));
	$scope.userRoles = true;

	var contextPath1 = location.pathname.substring(0, window.location.pathname
			.indexOf("/", 2));
	$scope.contextPath = contextPath1;
	var url = $location.$$absUrl;
	$scope.currentURI = url.split(contextPath1)[1];
	var starts
	$scope.isHomeActive = '';
	$scope.isFeedAdhocActive = '';
	$scope.isDashBoardActive = '';
	$scope.isRolesActive = '';
	$scope.activeTabname='';

	if ($scope.currentURI.match('^/corona/home.htm')) {
		$scope.isHomeActive = 'linkHighlight';
		$scope.activeTabname='Home';
	} 
	else if ($scope.currentURI.match('^/corona/feed.htm')) {
		$scope.isFeedAdhocActive = 'linkHighlight';
		$scope.activeTabname='AdhocFeed';
	}

	else if ($scope.currentURI.match('^/corona/adduser.htm')) {
		$scope.isRolesActive = 'linkHighlight';
		$scope.activeTabname='Users';
		
	} 
	else if ($scope.currentURI.match('^/corona/summary.htm')) {
		console.log("test")
		
		$scope.isDashboardActive = 'linkHighlight';
		$scope.isSummaryActive = 'linkHighlight';
		$scope.activeTabname='Dashboard';
		$scope.activeSubTabname='> Summary';
	}
	else if ($scope.currentURI.match('^/corona/loads.htm')) {
		console.log("test")
		$scope.isDashboardActive = 'linkHighlight';
		$scope.isLoadsActive = 'linkHighlight';
		$scope.activeTabname='Dashboard';
		$scope.activeSubTabname='> Loads';
	} 
	else if ($scope.currentURI.match('^/corona/reference.htm')) {
		console.log("test")
		$scope.isDashboardActive = 'linkHighlight';
		$scope.isReferenceActive = 'linkHighlight';
		$scope.activeTabname='Dashboard';
		$scope.activeSubTabname='> Reference';
	}
	else if ($scope.currentURI.match('^/corona/main.htm')) {
		console.log("test")
		$scope.isDashboardActive = 'linkHighlight';
		$scope.isMainActive = 'linkHighlight';
		$scope.activeTabname='Dashboard';
		$scope.activeSubTabname='> Reports';
	}
	
	function isEmpty(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    }
	    return true;
	}

	

	if(localStorage.getItem('menuTabData') == undefined) {
		
	    // Object is empty (Would return true in this example)
		$http({
			url : $scope.contextPath + "/" + "userModules.htm",
			method : "GET",
			headers : {
				"Accept" : "application/json; charset=utf-8",
				"Accept-Charset" : "charset=utf-8",
				"Cache-Control" : "no-cache",
				"Pragma" : "no-cache",
				"If-Modified-Since" : "0"
			}

		}) // http

		.success(function(data, status, headers, config) {
			$scope.data = data;
			$scope.accessTabData = data;
			
			localStorage.setItem('menuTabData', JSON.stringify($scope.accessTabData));
			$scope.retrievedMenuObject = localStorage.getItem('menuTabData');
			
			$scope.isDBHasAccess = data.home;
			$scope.isFeedHasAccess =data.adhoc;
			$scope.isDashHasAccess = data.dashboard;
			$scope.isRolesHasAccess = data.userrole;
			console.log(data);

		})// success
		.error(function(data, status, headers, config) {
			console.log(data);
			console.log(status);
		})
		
	} else {
	    // Object is NOT empty
		
		$scope.retrievedMenuObject = localStorage.getItem('menuTabData');
		$scope.data = JSON.parse($scope.retrievedMenuObject);
	
		$scope.isDBHasAccess = $scope.data.home;
		$scope.isFeedHasAccess = $scope.data.adhoc;
		$scope.isDashHasAccess = $scope.data.dashboard;
		$scope.isRolesHasAccess = $scope.data.userrole;
	}
	
	

});