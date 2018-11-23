var coronaApp= angular.module('coronaGui', ['ngMessages','ui.bootstrap']);

//['ngAnimate'], 'ui.bootstrap']
coronaApp.controller("LoadController", function($scope, $http,$filter) {
	
	//$scope.loadNameTableStatus=false;
	$scope.tableStatus=true;
	$scope.isDisabled=true;
	$scope.message='';
	$scope.sysDate= new Date();
	$scope.selectedloadName = "";
	 $scope.isDateShow=false; 
	 
	 $scope.contextPath = location.pathname.substring(0, window.location.pathname.indexOf("/",2)) ;
	 
  
	$scope.$watch('sysDate', function () {

	$scope.lastModifiedDate = $filter('date')(new Date($scope.sysDate), 'dd-MMM-yyyy');
	 console.log($scope.lastModifiedDate);	     
	 }, true);
	 
	 $scope.validDateSelected=function()
	 {
	 $scope.isDisabled=false; 
	 }
	 
	 $scope.datePickerShow=function()
	 {
		 $scope.isDateShow=true; 
	 }
	 
	 $http({
			url : $scope.contextPath + "/" +"app_loads/table-data.json",
			method : "GET",
			headers : {
				"Accept" : "application/json; charset=utf-8",
				"Accept-Charset" : "charset=utf-8",
				"Cache-Control" : "no-cache",
				"Pragma" : "no-cache",
				"If-Modified-Since" : "0"
			},
			params: {"for-date":$scope.lastModifiedDate}
		})// http
		.success(function(data, status, headers, config) {
			$scope.tableStatus=true;
			console.log (data);
			$scope.loadData =data;	
			$scope.message='';
			
			if(data != null)
				{
				$scope.tableStatus=false; 
				$scope.isTableLoaded1=true;
		        }
			
			if(data=="" || data == null)
			{
			$scope.message="could not get connection from pool";
	        }	
			 //$timeout(function () { loadDataTable(); }, 1000);
			// $timeout.flush();
			  //loadDataTable();
			
			//$timeout(function() { loadDataTable()}, 5000);
			
		}).error(function (error, status){
	        $scope.data.error = { message: error, status:status};
	        console.log($scope.data.error.status); 
	       // alert($scope.data.error.status);
	        $scope.message=$scope.data.error.status;
	  }); 
	
	$scope.dateChange=function(dateSelected)
	{
		$scope.isDateShow=false; 
		$scope.loadNameTableStatus=false;
		$scope.isloadNameTableLoaded=false;
		$scope.tableStatus=true;
		$scope.loadData ="";
		$scope.dateSelected=dateSelected;
		$scope.isTableLoaded1=false;
		$scope.message='';
		$("#loadsDataTable_wrapper").remove(); 
		$scope.showLoadDetails = false;
		$scope.loadNewTable ( $scope.contextPath + "/" +"app_loads/for-interval/table-data.json?for-date="+$scope.lastModifiedDate, "loadsDataTableDiv", "loadsDataTable", "loadsDataProgress");
	}
 	$scope.loadNewTable = function (dataURL, divId, tableId, progressBarId) {
		  console.log("Method is invoked" );
		//$(".reports_table").hide();
		$("#" + divId).show();
		  tableHTML = $("#" + tableId).html() ; 
		  if ( tableHTML  == undefined || tableHTML == '' ){
			  $("#" + progressBarId).show();
		  var tableData = "";
		          $.ajax({
	                  "url": dataURL,
	                  "dataType": "json",
	                   
	                  "success": function(json) {
	                	  
	                      var tableHeaders = "";
	                   
	                      $.each(json.columns, function(i, val){
	                          tableHeaders += "<th>" + val + "</th>";
	                      });
	                       
	
	                      $("#" + divId).html('<table id=' + tableId + ' class="display dataGrid" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
	  
	                       tableData = json.data;
	                       
	             		  console.log(tableData);
	                      $("#" + tableId).dataTable( {
	                       "data": tableData,
	                       "table": "Data",
	                        "order": [],
	  						        "responsive": true,
	  						        "deferRender": true,
	  						        retrieve: true,
	  						         paging: true,
	  						         
	  						        searching: true,
	  						        "pageLength":  25,
	  						        "lengthMenu": [[5, 10, 15, 25, 50, -1], [5, 10, 15 ,25, 50, "All"]],
	  						        "dom": '<"top"if>rt<"bottom"lp><"clear">',
	  						      "columnDefs": [ {
	  						        "targets": 0,
	  						        "data": "download_link",
	  						        "render": function ( data, type, col ) {
	  						          return '<a onclick = "loadDataDetails(\'' + col[0] + '\',\'' + col[1] + '\')">' + col[0] + '</a>';
	  						        }
	  						      } ],
	  			        buttons: [
	  			            {
	  			               
	  			                extend: 'colvis',
	              				text: 'Columns',
	              				columns: ':gt(0)',
	  			            }
	  			        ]
	                      })
	                     
	                      
	                  $(".dataTables_filter input").addClass ("dataTables_filter_custom");
	  			      $(".dataTables_filter input").attr ("type","text");
	  			            
	  			      $("#" + divId + "-hdr").show();
	  			      $("#" + progressBarId).hide();
	  			      $("#" + divId).show();
	              }	          
			});
			} else {
				  $("#" + divId).show();
				  $("#" + divId + "-hdr").show();
			}
				 
		}
	
		$scope.loadNewTable($scope.contextPath + "/" +"app_loads/table-data.json", "loadsDataTableDiv", "loadsDataTable", "loadsDataProgress");
		
		$scope.getLoadDetails= function(loadName, status)
        {
			$scope.showLoadDetails = true;
			$scope.selectedloadName = loadName +" " + status;
			$(".showLoadsDetails").show();
			//$scope.showLoads = false; 
			$("#loadsDataDetailTable_wrapper").remove(); 
			$scope.loadNewTable ( $scope.contextPath + "/" +"system_loads/table-data.json?loadName="+loadName + "&status="+status+"&lastModifiedDate="+$scope.lastModifiedDate, "loadsDataDetailTableDiv", "loadsDataDetailTable", "loadsDataDetailProgress");
                                                        
        } //http

		
			
		
		
		
 } ) ;

	
function loadDataDetails (loadName, status){
	angular.element('#LoadController').scope().getLoadDetails(loadName, status);
	angular.element('#LoadController').scope().$apply();
}

$( document ).ready(function() {
	//$("#showLoadsDetails").hide();
	
	
});



