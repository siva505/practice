//app = angular.module("myapp", []);
 /*['ngRoute','angular.filter','webStorageModule','ui.bootstrap','hpe.directive','ngCsv','angularUtils.directives.dirPagination']*/
//app = angular.module("myapp", ['ngMessages']);

/* , 'ngRoute','angular.filter','webStorageModule','ui.bootstrap','hpe.directive','ngCsv','angularUtils.directives.dirPagination' */
var coronaApp = angular.module('coronaGui', ['ngMessages','ui.bootstrap']);
/*coronaApp.config(function($sceDelegateProvider) {
	  $sceDelegateProvider.resourceUrlWhitelist([
	    'http://localhost:7001/**'
	  ]);
	});*/
/*
(function() {
   'use strict';*/
 /*   angular.module("myapp").controller('MainController', ['$scope', '$http',*/ 
coronaApp.filter('indexed', function() {
	   return function(items, colCount) {
	      return items[colCount];
	   };
	});


coronaApp.controller("MainController", function($scope, $http, $filter) {
  
	// $scope.value = 1390477383;
	
	$scope.isDateShow=false;
	
	$scope.datePickerShow=function()
	 {
	 $scope.isDateShow=true; 
	 }
	
	$scope.menus = [
  {
    title: "Dashboard", 
    action: "#", 
    menus: [
      {
        title: "Alerts",
        action: "alerts/tab.htm",
        sidePanelDiv: "alerts-table-content"
        	
      },
      {
	      title: "Loads",
	      action: "loads/tab.htm",
	      sidePanelDiv: "loads-table-content"
	    	  
	      	
	    },
      {
          title: "Reference",
          action: "reference/tab.htm",
          sidePanelDiv: "reference-table-content"
          	
        },
      {
          title: "Reports",
          action: "reports/tab.htm",
          sidePanelDiv: "reports-table-content"	
        },
        {
          title: "Summary",
          action: "summary/tab.htm",
          sidePanelDiv: "summary-table-content"	
        }
      /*,
      {
        title: "Submenu 1b",
        action: "moreStuff",
        menus: [
          {
            title: "Submenu 1b 1",
            action: "stuff"
          },
          {
            title: "Submenu 1b 2",
            action: "moreStuff"
          }
        ]
      }*/
    ]
  }/*,
  {
	    title: "Data", 
	    action: "#", 
	    menus: [
	      {
	        title: "CoronaUI",
	        action: "#"
	      },
	      {
	        title: "FeedFwk",
	        action: "#",
	        sidePanelDiv: "feedFwk-table-content"
	      }
	    ]
	  },
	  
	  {
		    title: "Admin", 
		    action: "#", 
		    menus: [
		      {
		        title: "AdminUser",
		        action: "#"
		      },
		      {
		        title: "SupserUser",
		        action: "#"
		      }
		    ]
		  }*/
  
  
  
  /*{
    title: "Menu2", 
    action: "#", 
    menus: [
      {
        title: "Submenu 2a",
        action: "awesomeStuff"
      },
      {
        title: "Submenu 2b",
        action: "moreAwesomeStuff"
      }
    ]
  }*/
  
],


/*$scope.loader = { 
        loading1 : false ,
   };

 $scope.loader.loading1 = false;  // false
 
 $scope.loader = { 
	        loading2 : false ,
	   };
 $scope.loader.loading2 = false;
 
 $scope.loader = { 
	        loading3 : false ,
	   };
 $scope.loader.loading3 = false;
 
 $scope.loader = { 
	        loading4 : false ,
	   };
 $scope.loader.loading4 = false; 
 */
 
 
$scope.changeTab = function(url, divId) {
    
    if (divId == "feedFwk-table-content" ) {
    	window.location.href = "http://localhost:7001/CoronaUI/corona-main.html";
    } else {
        $(".table-content").hide();
        $(".table-content").empty();
        
        
        $.ajax({url: url, success: function(result){
        	
        	console.log (result);
        	$("#" +divId).show();
        	$("#" +divId).empty();
            $("#" +divId).html(result);
            //loadFeedcTrl();
           }});
    }  
}
  
  $scope.click = function() {
    //  $scope.boolChangeClass = !$scope.boolChangeClass;
	 if ( !$('#sidebar-div-sidebar').is(':visible') ) {
		 $("#sidebar-div-sidebar").show();
		 $("#corona-tab-container").addClass ("col-sm-9");
		 
		 $("#show-side-bar").removeClass();
		 $("#show-side-bar").addClass ("fa fa-hand-o-left");
	 } 
	 else {
		 $("#sidebar-div-sidebar").hide();
		 $("#corona-tab-container").removeClass ();
		 $("#corona-tab-container").addClass ("col-sm-12");
		 
		 $("#show-side-bar").removeClass();
		 $("#show-side-bar").addClass ("fa fa-hand-o-right");
	 }
		
  }
  
   $scope.toggleGuideLines = function(index) {
  	$scope[index] = !$scope[index];
   };

   //Added new function for table header label
  $scope.makeActiveSidebar = function(event)
  {
         $(".header").hide();	  
		 $("li.disabled").removeClass("disabled");
		 $(event.target).addClass('disabled');
		 //$scope.toggleGuideLines('eventalertsection');
		 $scope['eventalertsection'] = false;
		
  };  
  
  $scope.lastModifiedDate = new Date();
  
  // $scope.sysDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
	//sysDate=$filter('date')(new Date(), 'dd-MMM-yyyy');	
	
	$scope.$watch('sysDate', function () {

		 $scope.lastModifiedDate = $filter('date')(new Date($scope.sysDate), 'dd-MMM-yyyy');
	     console.log($scope.lastModifiedDate);
	}, true);
	
	 
	$scope.dateChange=function(dateSelected)
	{
		$scope.eventalertsectionLoading = true;
		$scope.healthCheckInfo = '';
		$scope.healthCheckInfoCols = '';
		$scope.healthCheckReportCount = 0;
		$scope.isDateShow=false;
		$http({
			url : "app_alerts/for-interval/table-data.json?for-date=" + $scope.lastModifiedDate,
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

			$scope.eventalertsectionLoading = false;

		})// success
		.error( function(jqXHR, textStatus, errorThrown) {
			  
			  $("#page-start-loader-container").html("Error occured while laoding.");
		});// error
	  
	    //$scope.dateSelected=dateSelected;
		//console.log(dateSelected);	
	}
	
	$scope.healthCheckInfo = '';
	$scope.healthCheckInfoCols = '';
	$scope.eventalertsectionLoading = true;
	$http({
		url : "app_alerts/table-data.json",
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

		$scope.eventalertsectionLoading = false;

	})// success
	.error( function(jqXHR, textStatus, errorThrown) {
		  
		  $("#page-start-loader-container").html("Error occured while laoding.");
	})// error
 
	
  //Added Ajax Call for Reports Tab
      $(".header").hide();
  
	 $scope.loadQuoteErrorReport = function(event)
	  {
		 $scope.makeActiveSidebar(event);
		 $scope.loadNewTable ( "quote-error-update/table-data.json", "quoteErrorReportTableDiv", "QuoteErrorReportTable", "quoteErrorReportProgress");
		 
  };
  $("#quoteErrorReportProgress").hide();
  $("#quoteErrorReportTableDiv").hide();
  
  
	  $scope.loadQuoteDealUpdateReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "quote-deal-reports/table-data.json", "loadQuoteDealUpdateReportTableDiv", "QuoteDealUpdateReportTable", "loadQuoteDealUpdateReportProgress");
		 
	  };
	  $("#loadQuoteDealUpdateReportProgress").hide();
	  $("#loadQuoteDealUpdateReportTableDiv").hide();
	  
	  
	  $scope.loadQuoteDealDeniedIssueReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "deal-denied-reports/table-data.json", "loadDealDeniedIssueReportTableDiv", "DealDeniedIssueReportTable", "loadDealDeniedIssueReportProgress");
		  
	  };
	  $("#loadDealDeniedIssueReportProgress").hide();
	  $("#loadDealDeniedIssueReportTableDiv").hide();
	  
	  
	  $scope.loadBacklogReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "backlog-reports/table-data.json", "loadBacklogReportTableDiv", "BacklogReportTable", "loadBacklogReportProgress");
		 
	  };
	  
	  $("#loadBacklogReportProgress").hide();
	  $("#loadBacklogReportTableDiv").hide();
	  
	  
/*Added code for 17 new reports*/
	  
	  $scope.loadSummaryReplicationReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-replication-reports/table-data.json?hours=1", "loadSummaryReplicationReportTableDiv", "SummaryReplicationReportTable", "loadSummaryReplicationReportProgress");
		 
	  };
	  
	  $("#loadSummaryReplicationReportProgress").hide();
	  $("#loadSummaryReplicationReportTableDiv").hide();
	  
	  
	  $scope.loadQuoteBmiReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "quote-bmi-reports/table-data.json?hours=1", "loadQuoteBmiReportTableDiv", "QuoteBmiReportTable", "loadQuoteBmiReportProgress");
		 
	  };
	  
	  $("#loadQuoteBmiReportProgress").hide();
	  $("#loadQuoteBmiReportTableDiv").hide();
	  
	  
	  $scope.loadWcsErrorReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "wcs-error-reports/table-data.json?hours=1", "loadWcsErrorReportTableDiv", "WcsErrorReportTable", "loadWcsErrorReportProgress");
		 
	  };
	  
	  $("#loadWcsErrorReportProgress").hide();
	  $("#loadWcsErrorReportTableDiv").hide();
	  
	  $scope.loadBmiErrorReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "bmi-error-reports/table-data.json?hours=1", "loadBmiErrorReportTableDiv", "BmiErrorReportTable", "loadBmiErrorReportProgress");
		 
	  };
	  
	  $("#loadBmiErrorReportProgress").hide();
	  $("#loadBmiErrorReportTableDiv").hide();
	  
	  
	  $scope.loadSummaryQidsReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-qids-reports/table-data.json?hours=1", "loadSummaryQidsReportTableDiv", "SummaryQidsReportTable", "loadSummaryQidsReportProgress");
		 
	  };
	  
	  $("#loadSummaryQidsReportProgress").hide();
	  $("#loadSummaryQidsReportTableDiv").hide();
	  
	  //Added New	  
	  $scope.loadSummaryQidsProcessedReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-qids-reports-processed/table-data.json?hours=1", "loadSummaryQidsProcessedReportTableDiv", "SummaryQidsProcessedReportTable", "loadSummaryQidsProcessedReportProgress");
		 
	  };
	  
	  $("#loadSummaryQidsProcessedReportProgress").hide();
	  $("#loadSummaryQidsProcessedReportTableDiv").hide();
	  

	  $scope.loadSummaryQidsReportFailed = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-qids-reports-failed/table-data.json?hours=1", "loadSummaryQidsReportFailedTableDiv", "SummaryQidsReportFailedTable", "loadSummaryQidsReportFailedProgress");
		 
	  };
	  
	  $("#loadSummaryQidsReportFailedProgress").hide();
	  $("#loadSummaryQidsReportFailedTableDiv").hide();
	  
	  
	  
	  $scope.loadSummaryQidsReportTransaction = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-qids-reports-transaction/table-data.json?hours=1", "loadSummaryQidsReportTransactionTableDiv", "SummaryQidsReportTransactionTable", "loadSummaryQidsReportTransactionProgress");
		 
	  };
	  
	  $("#loadSummaryQidsReportTransactionProgress").hide();
	  $("#loadSummaryQidsReportTransactionTableDiv").hide();
	  
	  $scope.loadSummaryQidsReportErrorEntries = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-qids-reports-errorentries/table-data.json?hours=1", "loadSummaryQidsReportErrorEntriesTableDiv", "SummaryQidsReportErrorEntriesTable", "loadSummaryQidsReportErrorEntriesProgress");
		 
	  };
	  
	  $("#loadSummaryQidsReportErrorEntriesProgress").hide();
	  $("#loadSummaryQidsReportErrorEntriesTableDiv").hide();
	  
	  
	  $scope.loadSummaryQidsReportRta = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-qids-reports-rta/table-data.json?hours=1", "loadSummaryQidsReportRtaTableDiv", "SummaryQidsReportRtaTable", "loadSummaryQidsReportRtaProgress");
		 
	  };
	  
	  $("#loadSummaryQidsReportRtaProgress").hide();
	  $("#loadSummaryQidsReportRtaTableDiv").hide();
	  
	  $scope.loadListPriceCompletionStatus = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "list-price-completion-status/table-data.json", "loadListPriceCompletionStatusTableDiv", "ListPriceCompletionStatusTable", "loadListPriceCompletionStatusProgress");
		 
	  };
	  
	  $("#loadListPriceCompletionStatusProgress").hide();
	  $("#loadListPriceCompletionStatusTableDiv").hide();
	  
	  
	  
	  $scope.loadListPriceReportFailed = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "list-price-report-failed/table-data.json", "loadListPriceReportFailedTableDiv", "ListPriceReportFailedTable", "loadListPriceReportFailedProgress");
		 
	  };
	  
	  $("#loadListPriceReportFailedProgress").hide();
	  $("#loadListPriceReportFailedTableDiv").hide();
	  
	  $scope.loadSummaryReportService = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-report-service/table-data.json?hours=1", "loadSummaryReportServiceTableDiv", "SummaryReportServiceTable", "loadSummaryReportServiceProgress");
		 
	  };
	  
	  $("#loadSummaryReportServiceProgress").hide();
	  $("#loadSummaryReportServiceTableDiv").hide();
	  
	  
	  $scope.loadSummaryEventsReportCto = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-events-report-cto/table-data.json?hours=1", "loadSummaryEventsReportCtoTableDiv", "SummaryEventsReportCtoTable", "loadSummaryEventsReportCtoProgress");
		 
	  };
	  
	  $("#loadSummaryEventsReportCtoProgress").hide();
	  $("#loadSummaryEventsReportCtoTableDiv").hide();
	  
	  $scope.loadSummaryPropagationReport = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-propagation-report/table-data.json?hours=1", "loadSummaryPropagationReportTableDiv", "SummaryPropagationReportTable", "loadSummaryPropagationReportProgress");
		 
	  };
	  
	  $("#loadSummaryPropagationReportProgress").hide();
	  $("#loadSummaryPropagationReportTableDiv").hide();
	  
	  
	  $scope.loadSummaryPermutationReport = function(event)
	  
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-permutation-report/table-data.json?hours=1", "loadSummaryPermutationReportTableDiv", "SummaryPermutationReportTable", "loadSummaryPermutationReportProgress");
		 
	  };
	  
	  $("#loadSummaryPermutationReportProgress").hide();
	  $("#loadSummaryPermutationReportTableDiv").hide();
	  
	  
	  $scope.loadSummaryGenericService = function(event)
	  {
		  $scope.makeActiveSidebar(event);
		  $scope.loadNewTable ( "summary-generic-service/table-data.json", "loadSummaryGenericServiceTableDiv", "SummaryGenericServiceTable", "loadSummaryGenericServiceProgress");
		 
	  };
	  
	  $("#loadSummaryGenericServiceProgress").hide();
	  $("#loadSummaryGenericServiceTableDiv").hide();
	  
	  //Adding new methods........
  
	  $scope.loadNewTable = function (dataURL, divId, tableId, progressBarId) {
		  console.log("Method is invoked" );
		$(".reports_table").hide();
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
		  						        "pageLength":  5,
		  						        "lengthMenu": [[5, 10, 15, 25, 50, -1], [5, 10, 15 ,25, 50, "All"]],
		  						  /* dom:   '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-tl ui-corner-tr"lfr>'+
		  						    't'+
		  						    '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-bl ui-corner-br"ip>',*/
		  						        "dom": '<"top"if>rt<"bottom"lp><"clear">',
		  						     // "dom": '<lf<t>ip>',
		  						        //  "dom": '<"top"i>rt<"bottom"flp><"clear">',
		  						       // dom: '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-bl ui-corner-br"ifp>',
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
		                      })
		                      
		                     /* .on( 'mouseenter', 'td', function () {
		                          var table = $("#" +tableId).DataTable();
		  			            var colIdx = table.cell(this).index().column;
		  			 
		  			            $( table.cells().nodes() ).removeClass( 'highlight' );
		  			            $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
		  			            
		  			           
		  			        } );*/
		                      
		                      
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
	  
		
});

/*
app
		.controller(
				'feedCtrl',
				function feedCtrl($scope, $http) {

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
					
					$scope.toggleGuideLinesExpand = false;
                    $scope.toggleGuideLines = function() {
						if ($scope.toggleGuideLinesExpand == true) {
							$scope.toggleGuideLinesExpand = false;
						} else {
							$scope.toggleGuideLinesExpand = true;
						}
					  };

					$http({
						url : "getFeedData.htm",
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
							var dataReq = jsonReqObj;
							console.log(dataReq);
						}
					
						$scope.loader.loading = true;  // false
						$scope.feed.form = false;
						
						$http({
							url : "adhoc/feed.htm",
							method : "POST",
							data : dataReq,
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
								if (responseCode == 200) {
									
									$scope.errorMessage = "";
									$scope.successMessage = "Adhoc Feed successfully Posted, LoadId: "
											+ successResponse.data.loadId;
								} else {
									
									$scope.errorMessage = successResponse.description;
									$scope.successMessage ="";
								}

							})
							
						.error(function(data, status, headers, config) {
							
							$scope.loader.loading = false;
							$scope.feed.form = true;
							
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
	});// feed controller

*/

$(document).ready(function() {});