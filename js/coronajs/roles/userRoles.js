coronaApp
		.controller(
				"userRoleController",
				function($scope, $http) {

					$scope.contextPath = location.pathname.substring(0,window.location.pathname.indexOf("/", 2));

					$scope.successMessage = '';
					$scope.errorMessage = '';
					$scope.userRegion;
					$scope.userModule;
					$scope.userName;
					$scope.userRoleId;
					$scope.adduserprogress = false;
					$scope.showAddUserForm = true;
					$scope.userAleraydExits = '';
					$scope.userprogressBar = false;
					$scope.emailId;
					$scope.userListError = '';
					$scope.emailRegx = /[A-Za-z0-9._%+-]+@hp.com$/

					$scope.toggleManageRolesExpand = true;

					$scope.toggleManageRoles = function() {
						if ($scope.toggleManageRolesExpand == true) {
							$scope.toggleManageRolesExpand = false;
						} else {
							$scope.toggleManageRolesExpand = true;
						}
					};

					$scope.toggleSearchRolesExpand = false;

					$scope.toggleSearchRoles = function() {

						if ($scope.toggleSearchRolesExpand == true) {
							$scope.toggleSearchRolesExpand = false;
						}

						else {
							$scope.toggleSearchRolesExpand = true;
						}
					};

					$scope.resetRoles = function() {
						$scope.userName = '';
						$scope.emailId = '';
						$scope.successMessage = '';
						$scope.errorMessage = '';

					}
					
				
					$scope.userModule = 'CORONA';
					$scope.userRegion = 'NA';
					$scope.userRoleId='44';
					
					
					$scope.addRoles = function() 
					{

						$scope.userDetailsPosting = true;
						$scope.manageRoles = true;
						$scope.adduserprogress = true;
						$scope.showAddUserForm = false;

						console.log($scope.userRoleId);
						console.log($scope.userRegion);
						console.log($scope.userModule);
						rolesReq ={
							
							"name" : $scope.userName,
							"email" : $scope.emailId,
							"role" : $scope.userRoleId, 
							"module" : $scope.userModule, 							
							"regioncode" : $scope.userRegion, 
						}

						$scope.userName;
						console.log($scope.userName);
						$scope.emailId;
						console.log($scope.emailId);

						$http({
							url : $scope.contextPath + "/" + "addRole.htm",
							method : "POST",
							data : rolesReq,
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
											$scope.data = data;
											$scope.errorMessage = '';
											$scope.adduserprogress = false;
											$scope.showAddUserForm = true;
											$scope.successMessage = data.strSuccessMessage
													+ " " + data.strEmailID;
											$scope.userDetailsPosting = false;
											console.log(data);
											if (data == null) {
												$scope.successMessage = "Could not get connection from pool!";
											}
										})

								.error(function(data, status, headers, config) {

									$scope.data = data;
									$scope.errorMessage = data.strErrorMessage;
									$scope.successMessage = '';
									$scope.adduserprogress = false;
									$scope.showAddUserForm = true;
									console.log($scope.errorMessage);
									console.log(data);
								})

					};// add Roles

					$scope.showUserDetails = function() 
					{
						$scope.userprogressBar = true;
						$scope.userRolesDetails($scope.contextPath + "/"+ "displayUserList.json","userRolesDataTableDiv", "userRolesDataTable","userRolesDataTablesProgress")

					}

					$scope.userRolesDetails = function(dataURL, divId, tableId,progressBarId) 
					{
						console.log("Method is invoked");
						$("#" + divId).show();
						tableHTML = $("#" + tableId).html();
						if (tableHTML == undefined || tableHTML == '') {
							$("#" + progressBarId).show();
							var tableData = "";
							$
									.ajax({
										"url" : dataURL,
										"dataType" : "json",

										"success" : function(json) {

											var tableHeaders = "";

											$.each(json.columns, function(i,
													val) {
												tableHeaders += "<th>" + val
														+ "</th>";
											});

											$("#" + divId)
													.html(
															'<table id='
																	+ tableId
																	+ ' class="display dataGrid" cellspacing="0" width="100%"><thead><tr>'
																	+ tableHeaders
																	+ '</tr></thead></table>');

											tableData = json.data;

											$("#" + tableId)
													.dataTable(
															{
																"data" : tableData,
																"table" : "Data",
																"order" : [],
																"responsive" : true,
																"deferRender" : true,
																retrieve : true,
																paging : true,

																searching : true,
																"pageLength" : 5,
																"lengthMenu" : [
																		[5,10,15,25,50,-1 ],
																		[5,10,15,25,50,"All" ] ],
																
																"dom" : '<"top"if>rt<"bottom"lp><"clear">',
																
															})

										

											$(".dataTables_filter input")
													.addClass(
															"dataTables_filter_custom");
											$(".dataTables_filter input").attr(
													"type", "text");

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
					$scope.showUserDetails();
				});// userRoleController
