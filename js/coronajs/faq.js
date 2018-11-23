coronaApp
		.controller(
			'FaqCtrl',function($scope, $http, $timeout) {
				
				$scope.showHome = true;
				$scope.showFeed = true;
				$scope.showDash = true;
				$scope.showUser = true;
				
				var localStr = localStorage.getItem('menuTabData');
				$scope.menuAccess = JSON.parse(localStr);
				
				$scope.toggleFaq = function(div) {
				  	if(div == "home"){
				  		$scope.showHome = !$scope.showHome;
				  	};
				  	if(div == "feed"){
				  		$scope.showFeed = !$scope.showFeed;
				  	};
				  	if(div == "dash"){
				  		$scope.showDash = !$scope.showDash;
				  	};
				  	if(div == "user"){
				  		$scope.showUser = !$scope.showUser;
				  	};
				}
	
			})