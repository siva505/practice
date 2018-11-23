coronaApp
		.controller(
			'HomeCtrl',function($scope, $http, $timeout, webStorage, $routeParams,$filter) {

					$scope.contextPath = location.pathname.substring(0, window.location.pathname.indexOf("/",2)) ;
					
					$scope.successMessage = '';
					$scope.errorMessage = '';
					$scope.maxSize = 5;
							
					$scope.moduleList;
					$scope.moduleSelected;
					
					$scope.spMsg = false;
					$scope.tableMap;
					$scope.moduleToTableMap;
					$scope.moduleToColumnMap;

					$scope.parentChildLinkMap;
					$scope.childTableList;

					$scope.tableList;
					$scope.tableSelected;
					$scope.selectedLocale;
					$scope.getCountryVal;
					$scope.getCountryCodeVal;
					$scope.getCultureCodeVal;
					$scope.getMaterialVal;
					$scope.getMaterial1;
					$scope.getPriceDescVal;
					
					//$scope.disDataBtn = false;
					$scope.viewTypeList = [ 'Business View' ];
					$scope.viewTypeSelected = $scope.viewTypeList[0];
					$scope.isBusinessView = true;

					$scope.operatorList = [ ' ', 'AND', 'OR' ];
					$scope.operatorSelected1 = ' ';
					$scope.operatorSelected2 = ' ';
					$scope.operatorSelected3 = ' ';

					$scope.line2disabled = true;
					$scope.line3disabled = true;
					$scope.line4disabled = true;

					$scope.columnList;
					$scope.columnSelected1;
					$scope.columnSelected2;
					$scope.columnSelected3;
					$scope.columnSelected4;
					$scope.multiColumnSelected;
					$scope.multiColumnValue;

					$scope.criteria1 = ' ';
					$scope.criteria2 = ' ';
					$scope.criteria3 = ' ';
					$scope.criteria4 = ' ';

					$scope.radioSelected = 'individual';
					$scope.isBulkSelected = false;
					$scope.skuSearch = false;
					
					$scope.tablecolumns = [];
					$scope.tablecolumns2 = [];
					$scope.selectedColumns2 = {};

					$scope.selectedColumnsAsObject;

					$scope.fromClause = '';
					$scope.whereClause = '';

					$scope.excelData;
					$scope.headerBusinessCsv;
					$scope.headerSupportCsv;

					$scope.selectedMasterRow;

					$scope.showMsg = function(success, error) {
						$scope.successMessage = success;
						$scope.errorMessage = error;
					};

					$scope.hideMsg = function() {
						$scope.successMessage = '';
						$scope.errorMessage = '';
					};

					$scope.testShowHide = function(showhide) {
						if ($scope.selectedColumns[showhide] == 'true'
								|| $scope.selectedColumns[showhide] == true) {
							$scope.selectedColumns[showhide] = false;
						} else {
							$scope.selectedColumns[showhide] = true;
						}
					};

					$scope.init = function() {

						$http({
							url : $scope.contextPath + "/home/getTableMap.htm",
							method : "GET",
							headers : {
								"Accept" : "application/json; charset=utf-8",
								"Accept-Charset" : "charset=utf-8",
								"Cache-Control" : "no-cache",
								"Pragma" : "no-cache",
								"If-Modified-Since" : "0"
							}
						})
								.success(
										function(data, status, headers, config) {
											$scope.tableMap = data;
											$scope.moduleList = data.moduleList;
											
											$scope.moduleSelected = $scope.moduleList[2];
											$scope.moduleToTableMap = data.moduleToTableMap;
											
											$scope.moduleToColumnMap = data.moduleToColumnMap;
											$scope.moduleToColumnFilterMap = data.moduleToColumnFilterMap;

											$http(
													{
														url : $scope.contextPath + "/" + "home/getParentChildMap.htm",
														method : "GET",
														headers : {
															"Accept" : "application/json; charset=utf-8",
															"Accept-Charset" : "charset=utf-8",
															"Cache-Control" : "no-cache",
															"Pragma" : "no-cache",
															"If-Modified-Since" : "0"
														}
													})
													.success(
															function(data,
																	status,
																	headers,
																	config
																	) {
																$scope.parentChildLinkMap = data.parentChildLinkMap;
																$scope
																		.moduleChange();
															});
										});

						

						$http({
							url : $scope.contextPath + "/home/getServerRestartDate.htm",
							method : "GET",
							headers : {
								"Accept" : "application/json; charset=utf-8",
								"Accept-Charset" : "charset=utf-8",
								"Cache-Control" : "no-cache",
								"Pragma" : "no-cache",
								"If-Modified-Since" : "0"
							}
						}).success(
								function(data, status, headers, config) {
									webStorage.session.add(
											'SERVER_RESTART_DATE', data);
								});
						
						$http({
							url :  "../getSkuDetails.htm",
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
							
							$scope.skuDetails = JSON.stringify(data[1].localList);
							$scope.localObj = JSON.parse($scope.skuDetails);
							$scope.ddlVal = [$scope.localObj[0].de_DE,$scope.localObj[0].fr_FR,$scope.localObj[0].ja_JP,$scope.localObj[0].pt_PT,$scope.localObj[0].ru_RU,$scope.localObj[0].de_US,$scope.localObj[0].it_IT,$scope.localObj[0].hu_HU,$scope.localObj[0].ko_KR,$scope.localObj[0].cs_CZ,$scope.localObj[0].hr_HR,$scope.localObj[0].fr_CA,$scope.localObj[0].en_US,$scope.localObj[0].zh_CN,$scope.localObj[0].zh_TW,$scope.localObj[0].el_GR,$scope.localObj[0].sl_SI,$scope.localObj[0].tr_TR,$scope.localObj[0].de_FR,$scope.localObj[0].es_ES,$scope.localObj[0].pl_PL,$scope.localObj[0].sk_SK,$scope.localObj[0].th_TH,$scope.localObj[0].pt_BR,$scope.localObj[0].bg_BG];
								//Object.values($scope.localObj[0]);
							
							$scope.skuTableDetails = JSON.stringify(data[0].tables);
							$scope.skuTableObj = JSON.parse($scope.skuTableDetails);
							$scope.skuTableSelected = $scope.skuTableObj[0];
							
							$scope.skuColDetails = JSON.stringify(data[0].columns);
							$scope.skuColObj = JSON.parse($scope.skuColDetails);
							$scope.skuColSelected = $scope.skuColObj[0];
							
							$scope.skuMultiColDetails = JSON.stringify(data[0].multiColumnSelected);
							$scope.skuMultiColObj = JSON.parse($scope.skuMultiColDetails);
							$scope.skuMultiColSelected = $scope.skuMultiColObj[0];
							
							/*console.log("$scope.skuJSON",JSON.stringify(data));
							console.log("$scope.skuTableSelected",$scope.skuTableSelected.skuTable1);
							console.log("$scope.skuColSelected",$scope.skuColSelected.skuCol1);
							console.log("$scope.skuMultiColSelected",$scope.skuMultiColSelected.skuMultiCol1);*/

						})// success

					};
					
					$scope.updateLocale = function(item){
						$scope.selectedLocale = item;
						console.log("$scope.selectedLocale",$scope.selectedLocale);
					}

					$scope.viewTypeChange = function() {
						if ($scope.isBusinessView == true) {
							$scope.isBusinessView = false;
						} else {
							$scope.isBusinessView = true;
						}
					};

					$scope.moduleChange = function() {
						$scope.tableList = $scope.moduleToTableMap[$scope.moduleSelected];
						
						$scope.tableSelected = $scope.tableList[0].label;
						$scope.tableChange();
					};
					
					String.prototype.trim = function() {
						return this.replace(/^\s+|\s+$/g,"");
					}

					$scope.checkSpaces = function(e){
						
						if(($scope.multiColumnValue.indexOf(' ') >= 0)||(e.keyCode==32)){
							$scope.spMsg = true;
						}
						else{
							$scope.spMsg = false;
						} 
				
						
						
					}
					
					$scope.ddnChange1 = function(label) {
						
						$scope.originalColList1  = JSON.parse(JSON.stringify($scope.columnList));
						$scope.originalColList2  = JSON.parse(JSON.stringify($scope.originalColList1));
						$scope.originalColList3  = JSON.parse(JSON.stringify($scope.originalColList2));
						for(var j=0;j<$scope.columnList.length;j++){
							if($scope.columnList[j].label == label){
								$scope.originalColList1.splice(j, 1);
								
								$scope.columnSelected2 = '';
								$scope.columnSelected3 = '';
								$scope.columnSelected4 = '';
								if(!$scope.line2disabled){
									$scope.ddnSChange1();
								}
								
							}
						}
					}
					$scope.ddnSChange1 = function() {
						if(!$scope.line2disabled){
							$scope.columnSelected2 = $scope.originalColList1[0].label;
						}
						else{
							$scope.columnSelected2 = '';
							$scope.columnSelected3 = '';
							$scope.columnSelected4 = '';
						}
					}
					$scope.ddnChange2 = function(label) {
						
						$scope.originalColList2  = JSON.parse(JSON.stringify($scope.originalColList1));
						$scope.originalColList3  = JSON.parse(JSON.stringify($scope.originalColList2));
						for(var j=0;j<$scope.originalColList1.length;j++){
							if($scope.originalColList1[j].label == label){
								$scope.originalColList2.splice(j, 1);
								$scope.columnSelected3 = '';
								$scope.columnSelected4 = '';
							}
						}
					}
					$scope.ddnSChange2 = function() {
						if(!$scope.line3disabled){
							$scope.columnSelected3 = $scope.originalColList2[0].label;
						}
						else{
							$scope.columnSelected3 = '';
							$scope.columnSelected4 = '';
						}
						
					}
					
					$scope.ddnChange3 = function(label) {
						
						$scope.originalColList3  = JSON.parse(JSON.stringify($scope.originalColList2));
						for(var j=0;j<$scope.originalColList2.length;j++){
							if($scope.originalColList2[j].label == label){
								$scope.originalColList3.splice(j, 1);
								$scope.columnSelected4 = '';
							}
						}
					}
					$scope.ddnSChange3 = function() {
						if(!$scope.line4disabled){
							$scope.columnSelected4 = $scope.originalColList3[0].label;
						}
						else{
							$scope.columnSelected4 = '';
						}
						
					}

					$scope.tableChange = function() {
						$scope.tablecolumns = [];
						
						$scope.columnList = $scope.moduleToColumnFilterMap[$scope.moduleSelected][$scope.tableSelected];
						console.info("Line 313",$scope.tableSelected)
						$scope.originalColList1  = JSON.parse(JSON.stringify($scope.columnList));
						$scope.columnSelected1 = null;
						$scope.columnSelected2 = null;
						$scope.columnSelected3 = null;
						$scope.columnSelected4 = null;
						
						var jsonSkuVal = [$scope.skuTableSelected.skuTable1,$scope.skuTableSelected.skuTable2,$scope.skuTableSelected.skuTable3,$scope.skuTableSelected.skuTable4,$scope.skuTableSelected.skuTable5,$scope.skuTableSelected.skuTable6,$scope.skuTableSelected.skuTable7];
						
						for(var j=0;j<jsonSkuVal.length;j++){
							
							if(jsonSkuVal[j] == $scope.tableSelected){
								$scope.skuSearch = true;
							}
						}

						if ($scope.columnList.length > 0) {
							$scope.columnSelected1 = $scope.columnList[0].label;
							$scope.multiColumnSelected = $scope.columnList[0].label;
						}
						

						if ($scope.form != undefined
								&& $scope.form.beanList != undefined) {
							$scope.form.beanList.length = 0;
						}

						$scope.criteria1 = ' ';
						$scope.criteria2 = ' ';
						$scope.criteria3 = ' ';
						$scope.criteria4 = ' ';
						$scope.operatorSelected1 = ' ';
						$scope.operatorSelected2 = ' ';
						$scope.operatorSelected3 = ' ';
						$scope.line2disabled = true;
						$scope.line3disabled = true;
						$scope.line4disabled = true;
						$scope.multiColumnValue = '';
						
					    $scope.tableColumns();
					};
					
					 
					 $scope.tableColumns = function() 
					  {
					$scope.headerList = $scope.moduleToColumnMap[$scope.moduleSelected][$scope.tableSelected];
                                    
				    for (var i = 0; i < $scope.headerList.length; i++) 
				   {
				   $scope.tablecolumns.push($scope.headerList[i].label)
				    }
                   /* console.log("headerlist",$scope.tablecolumns); */
					};

					$scope.radioChange = function() {
						if ($scope.radioSelected == 'bulk') {
							$scope.isBulkSelected = true;
						} else {
							$scope.isBulkSelected = false;
						}
					};

					$scope.operatorChange = function(identifier1) {
						
						if ($scope.operatorSelected1 != ' ') {
							$scope.line2disabled = false;
						} else {
							$scope.operatorSelected2 = ' ';
							$scope.operatorSelected3 = ' ';
							$scope.operatorSelected4 = ' ';
							$scope.line2disabled = true;
							$scope.line3disabled = true;
							$scope.line4disabled = true;
							$scope.criteria2 = ' ';
							$scope.criteria3 = ' ';
							$scope.criteria4 = ' ';
						}

						if ($scope.operatorSelected2 != ' ' && $scope.operatorSelected1 != ' ') {
							$scope.line3disabled = false;
						} else {
							$scope.operatorSelected3 = ' ';
							$scope.operatorSelected4 = ' ';
							$scope.line3disabled = true;
							$scope.line4disabled = true;
							$scope.criteria3 = ' ';
							$scope.criteria4 = ' ';
						}

						if ($scope.operatorSelected3 != ' ' && $scope.operatorSelected1 != ' ' && $scope.operatorSelected3 != ' ') {
							$scope.line4disabled = false;
						} else {
							$scope.line4disabled = true;
							$scope.criteria4 = ' ';
						}
					};
						
					$scope.recordRange1=10000;
					$scope.recordRange2=50000;
					$scope.recordRange3=100000;
					$scope.recordRange4=200000;
					
					$scope.loadIndexFrom =1;
					$scope.loadIndexTo=9999;
					$scope.cumulativeData = [];
					$scope.maxLoadCount=10000; 
					$scope.recordCount=0;
					$scope.cumalativeDataLength=0;
					$scope.maxRecordLimit=200000;
					$scope.tableLoadStartTime=new Date();
					
					$scope.resetGetDataSet = function(){
						$scope.maxLoadCount=10000;
						$scope.loadIndexFrom =1;
						$scope.loadIndexTo =10000;
						$scope.cumulativeData = [];
						$scope.cumalativeDataLength=0;
						$scope.column ="";
						$scope.recordCount=0;
						$scope.tableLoadStartTime=new Date();
						$("#" + "homeDataTableDiv").hide();
						
					};
					
					$scope.getCountry = function(countryValue)
					{
						$scope.getCountryVal = countryValue;
						console.info("countryValue",countryValue);
					}
					
					$scope.getCultureCode = function(cultureCodeValue)
					{
						$scope.getCultureCodeVal =cultureCodeValue;
						console.info("countryValue"+cultureCodeValue);
					}
					
					$scope.getCountryCode = function(countryCodeValue)
					{
						$scope.getCountryCodeVal =countryCodeValue;
						console.info("countryValue",countryCodeValue);
					}
					
					/*$scope.getMaterial = function(materialValue) {
						$scope.getMaterialVal = materialValue;
						console.info("materialValue",materialValue);
					}
					
					$scope.getMaterial1 = function(materialValue1) {
						$scope.getMaterial1 = materialValue1;
						console.info("materialValue1",materialValue1);
					}*/
					
					$scope.getPriceDesc = function(priceDesc) {
						$scope.getPriceDescVal = priceDesc;
						console.info("priceDesc",priceDesc);
					}
					
					$scope.updateMultiCol = function(multiColumnSelected){
						
						$scope.multiColumnSelected = multiColumnSelected;
					}
					
					$scope.getDataSet = function() {				
						if ($scope.isBulkSelected == true) {
							console.info("Line 464",$scope.isBulkSelected);
							if($scope.tableSelected == $scope.skuTableSelected.skuTable1){
						    	
						    	if($scope.getCountryVal == undefined){
									/*$scope.disDataBtn = true;*/
									$scope.errorMessage = 'Filter not defined';
									return false;
								}
								else{
									/*$scope.disDataBtn = false;*/
									$scope.errorMessage = '';
								}
							}
							if($scope.tableSelected == $scope.skuTableSelected.skuTable4){
								if($scope.getPriceDescVal == undefined){
									/*$scope.disDataBtn = true;*/
									$scope.errorMessage = 'Filter not defined';
	                                return false;
								}
								else{
									/*$scope.disDataBtn = false;*/
									$scope.errorMessage = '';
								}
							}
							if($scope.tableSelected == $scope.skuTableSelected.skuTable5){
								if($scope.selectedLocale == undefined){
									/*$scope.disDataBtn = true;*/
									$scope.errorMessage = 'Filter not defined';
									return false;
								}
								else{
									/*$scope.disDataBtn = false;*/
									$scope.errorMessage = '';
								}
							}
							
						}
					    
						
						if($scope.spMsg){
							alert("Please remove spaces from upload");
							return false;
						}
						
						$scope.successMessage='';
					
						$scope.hideMsg();
						var fromClause = $scope.tableSelected;
						var whereClause = '';

						if ($scope.isBulkSelected == false) 
						{

							if ($scope.criteria1 == undefined
									|| $scope.criteria1.trim() == '') 
						{
								$scope.errorMessage = 'Filter not defined';
								return;
						}

							whereClause += $scope.columnSelected1 + "='"
									+ $scope.criteria1 + "' ";

							if ($scope.operatorSelected1 != ' ') {
								whereClause += $scope.operatorSelected1 + ' ';
								whereClause += $scope.columnSelected2 + "='"
										+ $scope.criteria2 + "' ";

								if ($scope.operatorSelected2 != ' ') {
									whereClause += $scope.operatorSelected2
											+ ' ';
									whereClause += $scope.columnSelected3
											+ "='" + $scope.criteria3 + "' ";

									if ($scope.operatorSelected3 != ' ') {
										whereClause += $scope.operatorSelected3
												+ ' ';
										whereClause += $scope.columnSelected4
												+ "='" + $scope.criteria4
												+ "' ";
									}
								}
							}
						} else {

						   if($scope.skuSearch && $scope.isBulkSelected)
						   {
							   		if($scope.tableSelected == $scope.skuTableSelected.skuTable1)
							   		{
							   			if ($scope.multiColumnValue == undefined || $scope.multiColumnValue.trim() == '') 
                                        {
                                          $scope.errorMessage = 'Filter not defined';
                                          return;
                                        }
                                        console.info("USER SELECTED",$scope.multiColumnSelected)
                                        
                                        whereClause += $scope.skuColSelected.skuCol1 + " ="
                                        whereClause += "  '"+$scope.getCountryVal +"' ";
                                        whereClause += "AND ";
                                        whereClause += $scope.skuMultiColSelected.skuMultiCol1;
                                        
                                        whereClause += " IN ('";
                                        whereClause += $scope.multiColumnValue.replace(/,/g, "','");
                                        whereClause += "')";
							   		}
							   		else if($scope.tableSelected == $scope.skuTableSelected.skuTable2)
							   		{
							   			if ($scope.multiColumnValue == undefined || $scope.multiColumnValue.trim() == '') 
                                        {
                                          $scope.errorMessage = 'Filter not defined';
                                          return;
                                        }
                                        console.info("USER SELECTED",$scope.multiColumnSelected)
                                        whereClause += $scope.skuMultiColSelected.skuMultiCol2 ;
                                        whereClause += " IN ('";
                                        whereClause += $scope.multiColumnValue.replace(/,/g, "','");
                                        whereClause += "')";
							   		}
									else if($scope.tableSelected == $scope.skuTableSelected.skuTable3){
										
										if ($scope.multiColumnValue == undefined || $scope.multiColumnValue.trim() == '') 
                                        {
                                          $scope.errorMessage = 'Filter not defined';
                                          return;
                                        }
                                        console.info("USER SELECTED",$scope.multiColumnSelected)
                                        whereClause += $scope.skuMultiColSelected.skuMultiCol3;
                                        whereClause += " IN ('";
                                        whereClause += $scope.multiColumnValue.replace(/,/g, "','");
                                        whereClause += "')";						   			
									}
									else if($scope.tableSelected == $scope.skuTableSelected.skuTable4)
									{
										
										if ($scope.multiColumnValue == undefined || $scope.multiColumnValue.trim() == '') 
                                        {
                                          $scope.errorMessage = 'Filter not defined';
                                          return;
                                        }
                                        console.info("USER SELECTED",$scope.multiColumnSelected)
                                        whereClause += $scope.skuColSelected.skuCol4 + " ="
                                        whereClause += "  '"+$scope.getPriceDescVal +"' ";
                                        whereClause += "AND ";
                                        whereClause += $scope.skuMultiColSelected.skuMultiCol4;
                                        
                                        whereClause += " IN ('";
                                        whereClause += $scope.multiColumnValue.replace(/,/g, "','");
                                        whereClause += "')";
                                       
									}
									else if($scope.tableSelected == $scope.skuTableSelected.skuTable5)
									{
										
										if ($scope.multiColumnValue == undefined || $scope.multiColumnValue.trim() == '') 
                                        {
                                          $scope.errorMessage = 'Filter not defined';
                                          return;
                                        }
                                        console.info("USER SELECTED",$scope.multiColumnSelected)
                                        whereClause += $scope.skuColSelected.skuCol5 + " ="
                                        	
                                        whereClause +=  "  '"+$scope.selectedLocale+"' ";
                                        whereClause += "AND ";
                                        
                                        whereClause += $scope.skuMultiColSelected.skuMultiCol5;
                                        whereClause += " IN ('";
                                        whereClause += $scope.multiColumnValue.replace(/,/g, "','");
                                        whereClause += "')";
									}
									else if($scope.tableSelected == $scope.skuTableSelected.skuTable6)
							   		{
							   			if ($scope.multiColumnValue == undefined || $scope.multiColumnValue.trim() == '') 
                                        {
                                          $scope.errorMessage = 'Filter not defined';
                                          return;
                                        }
                                        console.info("USER SELECTED",$scope.multiColumnSelected)
                                        
                                        whereClause += $scope.skuColSelected.skuCol6 + " ="
                                        whereClause += "  '"+$scope.getCountryCodeVal +"' ";
                                        whereClause += "AND ";
                                        whereClause += $scope.skuMultiColSelected.skuMultiCol6;
                                        
                                        whereClause += " IN ('";
                                        whereClause += $scope.multiColumnValue.replace(/,/g, "','");
                                        whereClause += "')";
							   		}
									else if($scope.tableSelected == $scope.skuTableSelected.skuTable7)
							   		{
							   			if ($scope.multiColumnValue == undefined || $scope.multiColumnValue.trim() == '') 
                                        {
                                          $scope.errorMessage = 'Filter not defined';
                                          return;
                                        }
                                        console.info("USER SELECTED",$scope.multiColumnSelected)
                                        
                                        whereClause += $scope.skuColSelected.skuCol7 + " ="
                                        whereClause += "  '"+$scope.getCultureCodeVal +"' ";
                                        whereClause += "AND ";
                                        whereClause += $scope.skuMultiColSelected.skuMultiCol7;
                                        
                                        whereClause += " IN ('";
                                        whereClause += $scope.multiColumnValue.replace(/,/g, "','");
                                        whereClause += "')";
							   		}
									else
									{
										
									}
										
                                 }
							   else {
										if ($scope.multiColumnValue == undefined || $scope.multiColumnValue.trim() == '') 
										{
											$scope.errorMessage = 'Filter not defined';
											return;
										}
											console.info("USER SELECTED",$scope.multiColumnSelected)
										whereClause += $scope.multiColumnSelected;
										whereClause += " IN ('";
										whereClause += $scope.multiColumnValue.replace(/,/g, "','");
										whereClause += "')";
								}
								
								
						}
						whereClause;

						$scope.fromClause = fromClause;
						$scope.whereClause = whereClause;
							
						var reqData = {"contextId": $scope.moduleSelected, "fromClause":$scope.fromClause,"whereClause":$scope.whereClause,"loadIndexFrom":$scope.loadIndexFrom,"loadIndexTo":$scope.loadIndexTo,"recordCount":$scope.recordCount};
						
						console.log(reqData);
						console.log($scope.loadIndexFrom+" "+$scope.loadIndexTo);
						
						
						 	$http({
								
								url :"../home/getDataSet.htm",
								method : "GET",
							    params:reqData,
								headers : {
									"Accept" : "application/json; charset=utf-8",
									"Cache-Control" : "no-cache",
									"Pragma" : "no-cache",
									"If-Modified-Since" : "0"
								}
								
							}).success(function(data, status, headers, config) 
									{
								
								      
								 if(data.offerMessage[0]!=undefined || data.offerMessage[0]!=null)
									{
									 console.log($scope.errorMessage);
									return $scope.errorMessage=data.offerMessage[0];
									}
								
											if($scope.recordCount==0)
											{
											$scope.recordCount=Number(data.message[0]);
											
											if($scope.recordCount > 10000)
											{
											
											 
											    if (confirm("There are "+$scope.recordCount+" records. Click OK to continue get the results or Click cancel to abandon search.")) {
											    	
											    } else {
											    	$scope.errorMessage='you have canceled search operation !';
											    	return false;
											    }
											
											}

											console.log($scope.recordCount);
											}
											
											
																				
											if($scope.recordCount > $scope.recordRange1 &&  $scope.recordCount <= $scope.recordRange2)
											{
											$scope.maxLoadCount=10000;
											console.log($scope.maxLoadCount);
											}

											if($scope.recordCount > $scope.recordRange2 &&  $scope.recordCount <= $scope.recordRange3)
											{
											$scope.maxLoadCount=20000;
											console.log($scope.maxLoadCount);
											}

											if($scope.recordCount > $scope.recordRange3 &&  $scope.recordCount <= $scope.recordRange4)
											{
											$scope.maxLoadCount=50000;
											console.log($scope.maxLoadCount);
											}

											
											
											 if($scope.column=="")
												{
											  $scope.column=$scope.tablecolumns;
												}
											 console.log($scope.tablecolumns);
											 console.log($scope.column);
											 
											for(var i=0; i<data.data.length;i++)
												{
                                                $scope.cumulativeData.push(data.data[i]);
												}
										
										
										 $scope.cumalativeDataLength=$scope.cumalativeDataLength+Number(data.data.length);
										 
										  if($scope.cumalativeDataLength < $scope.recordCount && $scope.recordCount!=0 && $scope.recordCount > $scope.maxLoadCount)
											{
											 $scope.loadIndexFrom=$scope.loadIndexTo+1;
											 $scope.loadIndexTo=$scope.loadIndexFrom +$scope.maxLoadCount-1;
											 if( $scope.loadIndexTo > $scope.recordCount)
												 {
												 $scope.loadIndexTo=$scope.recordCount;
												 }
										     $scope.getDataSet();   
											}
											
										   if($scope.recordCount==0 && $scope.errorMessage!='' && data.offerMessage[0]!=undefined || data.offerMessage[0]!=null) 
										    return $scope.errorMessage='No data found with criteria';

											
											// data tables call
											$scope.homeTableDetails("homeDataTableDiv", "homeDataTable");
											
											  if( $scope.recordCount >= $scope.maxRecordLimit && $scope.cumalativeDataLength >= $scope.recordCount )
												{
											     $scope.successMessage='Record Limited to 200,000 please filter with more criteria to get more data !';
											   }
												
											  if($scope.recordCount==undefined && $scope.errorMessage==undefined)
											  return $scope.errorMessage='Error in service';
											  

											 
														
												
											}).error(function(data, status, headers, config) 
													{
							                     console.log(data);
							                    $scope.errorMessage=data;
												$scope.successMessage ='';
												
							                    })
											
					                         
											
					};

					
					$scope.toggleFilterExpand=true;

					$scope.toggleFilter = function() {
						if ($scope.toggleFilterExpand == true) {
							$scope.toggleFilterExpand = false;
						} else {
							$scope.toggleFilterExpand = true;
						}
					};

					$scope.toggleShowhideExpand = false;

					$scope.toggleShowhide = function() {
						if ($scope.toggleShowhideExpand == true) {
							$scope.toggleShowhideExpand = false;
						} else {
							$scope.toggleShowhideExpand = true;
						}
					};

					$scope.toggleResultExpand = true;

					$scope.toggleResult = function() {
						if ($scope.toggleResultExpand == true) {
							$scope.toggleResultExpand = false;
						} else {
							$scope.toggleResultExpand = true;
						}
					};

					
					$scope.homeTableDetails = function(divId,tableId)

					{

						  
						$("#" + divId).show();
					    tableHTML = $("#" + tableId).html();
					   
					    var tableData = "";
					    var tableHeaders = "";
                        
                        
					    $.each($scope.column, function(i, val) {
					        tableHeaders += "<th>" + val + "</th>";

					    });


					    $("#" + divId)
					        .html('<table id=' +
					            tableId +
					            ' class="display dataGrid" cellspacing="0" width="100%"><thead><tr>' +
					            tableHeaders +
					            '</tr></thead></table>');

					    tableData = $scope.cumulativeData;
					   
					    
					    $("#" + tableId).dataTable({
					        "data": tableData,
					        "table": "Data",
					        "order": [],
					        "responsive": true,
					        "deferRender": true,
					        retrieve: true,
					        paging: true,

					        searching: true,
					        "pageLength": 100,
					        "lengthMenu": [

					            [50, 100, 200, 500, -1],

					            [50, 100, 200, 500, "All"]
					        ],

					        "dom": '<"top"Bif>rt<"bottom"lp><"clear"> ',
					       


					        buttons: [

                                {
					        	extend: 'colvis',
		              			text: 'Show/Hide',
		              			columns: ':gt(0)',
		              			titleAttr: 'Filter/Columns'
					            },
					            {
					                extend: 'csv',
					                text: 'Export',
					                title: $scope.fromClause,
					                float:'right',
					                exportOptions: {
					                    columns: ':visible'
					                },
					            titleAttr: 'CSV'
					            }

					        ]
					    })
                        
					    

					    $(".dataTables_filter input").addClass("dataTables_filter_custom");
					    $(".dataTables_filter input").attr("type", "text");

					    $("#" + divId + "-hdr").show();
					    
					    $("#" + divId).show();
					}
											               
													
							
				});


             

coronaApp.controller('FooterCtrl', function($scope, $http, $timeout,
		webStorage, $routeParams, $templateCache, $location) {
});

coronaApp.controller('NavigationCtrl', function($scope, $http, $timeout,
		webStorage, $routeParams, $templateCache, $location) {
});