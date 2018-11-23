var coronaApp= angular.module('coronaGui', ['ngMessages']);

function MyController() {
	  var vm = this;
	  vm.things = [{name: 'Thing 1'}, {name: 'Thing 2'}];
	  vm.addThing = function() {
	    vm.things.push({name: 'Thing ' + (vm.things.length + 1)});
	  };
	  vm.removeThing = function() {
	    vm.things.pop();
	  };
	}

	function onFinishRenderDirective($timeout) {
	  return {
	    restrict: 'A',
	    link: function(scope) {
	      if (scope.$first === true) {
	       // window.alert('First thing about to render');
	      }
	      if (scope.$last === true) {
	        $timeout(function() {
	        	
	        	loadDataTable ();
	        });
	      }
	    }
	  };
	}
	
coronaApp.controller("ReferenceController", function($scope, $http) {
	$scope.tableStatus=true;
	$scope.contextPath = location.pathname.substring(0, window.location.pathname.indexOf("/",2)) ;
	
	$http({
	url :  $scope.contextPath + "/" + "reference/table-data.json",
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
	$scope.referenceTable=data;
	if(data!=null)
		{
		$scope.tableStatus=false;
		}
	
}).error(function (error){
    $scope.data.error=error;
    console.log($scope.data.error.status);
    
});//http
	 
}).directive('onFinishRender',onFinishRenderDirective);

function loadDataTable ( ){
	
	
	var tableData ="";
	var referenceTableId="referenceTableId";

			$("#" + referenceTableId).dataTable( {
				                    
				                       "table": "Data",
				                        "order": [],
				  						        "responsive": true,
				  						        "deferRender": true,
				  						        retrieve: true,
				  						        paging: true, 
				  						        searching: true,
				  						        "pageLength":  5,
				  						        "lengthMenu": [[5, 10, 15, 25, 50, -1], [5, 10, 15 ,25, 50, "All"]],
				  						        "dom": '<"top"if>rt<"bottom"lp><"clear">',
				  						        //  dom: 'B<"top"i>rt<"bottom"flp><"clear">',
				                     columnDefs: [
				  			            {
				  			                targets: 1,
				  			                className: 'noVis'
				  			            },
				  			        ],
				  			        buttons: [
				  			            {
				  			               
				  			                extend: 'colvis',
				              				text: 'Columns',
				              				columns: ':gt(0)',
				  			            }
				  			        ]
				                      });
			
			
			
			$(".dataTables_filter input").addClass ("dataTables_filter_custom");
        	$(".dataTables_filter input").attr ("type","text");				                  
				                    
	}

