(function(){
    var hpe = angular.module('hpe.directive', []);

    hpe.directive('hpeButton', function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                title: '@btnText',
                style: '@btnType',
                icon: '@btnIcon'
            },
            template: '<a class="btn btn-{{style}}"><i class="{{icon}}"></i>{{title}}</a>',
            compile: function (element, attrs) {
                if (!attrs.btnType) { attrs.btnType = 'Primary'; }
                return function (scope, element) {
                };
            }
        };
    });
    
    hpe.directive('hpeTabSet', function ($timeout) {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            scope: {
                tabChanged: '&tabChanged'
            },
            require: '?ngModel',
            controller: function($scope, $element) {			
                var tabs = $scope.tabs = [];
                this.addTab = function(tab) {
                    tabs.push(tab);
                };
            },
            template:
                '<div class="tabs">' +
                  '<ul>' +
                    '<li ng-repeat="tab in tabs">'+
                      '<a href="#{{tab.tabId}}">{{tab.tabHeader}}</a>' +
                    '</li>' +
                  '</ul>' +
                  '<div ng-transclude></div>' +
                '</div>',
            
            link: function (scope, element, attrs, ngCtrl) {
                var tab = null;
                
                if (ngCtrl) {
                    ngCtrl.$render = function () {
                        if (tab) {
                            for (var idx = 0; idx < scope.tabs.length; idx++) {
                                if (scope.tabs[idx].tabId == ngCtrl.$viewValue) {
                                    tab.tabs('option', 'active', idx);
                                    break;
                                }
                            }
                        }
                    };
                };

                $timeout(function() {
                    tab = $(element).tabs();
                    
                    for (var i = 0; i < scope.tabs.length; i++) {
                        var tabLink = $('a[href="#' + scope.tabs[i].tabId + '"]', tab);
                        tabLink.click(function (evt) {
                            var tabId = $(evt.target).attr('href').substr(1);
                            ngCtrl && scope.$apply(ngCtrl.$setViewValue(tabId));
                            scope.tabChanged && scope.tabChanged({value: tabId});
                        });
                    }

                    ngCtrl && ngCtrl.$render();
                }, 0);
            }
        };
    });
    
    hpe.directive('hpeTab', function() {
        return {
            require: '^hpeTabSet',
            restrict: 'AE',
            replace: true,
            transclude: true,
            scope: { 
                tabHeader: '@',
                tabId: '@'
            },
            link: function(scope, element, attrs, tabsCtrl) {			
                tabsCtrl.addTab(scope);
            },
            template: '<div id="{{tabId}}" ng-transclude></div>'
        };
    });

    hpe.directive('hpeSingleSelector', function ($timeout) {
        var defaultSelectText = "Select An Item";
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                'selOptions': '=',
                'selValue': '@',
                'selName': '@',
                'selFilter': '@',
                'selChanged': '&'
            },
            require: '?ngModel',
            template: '<select>' +
                        '<option value="{{item[selValue]}}" ng-repeat="item in selOptions"> {{item[selName]}} </option>' +
                      '</select>',
            link: function (scope, element, attrs, ngCtrl) {
                $(element).on('change', function (evt) {
                    var idx = evt.target.selectedIndex;
                    var selectedValue = scope.selOptions[idx][scope.selValue];
                    if (ngCtrl)
                        scope.$apply(ngCtrl.$setViewValue(selectedValue));
                    scope.selChanged && scope.selChanged({ value: selectedValue });
                });

                var updateUI = function (cur) {
                    var found = false;
                    for (var idx = 0; idx < scope.selOptions.length; idx++) {
                        if (scope.selOptions[idx][scope.selValue] == cur) {
                            found = true;
                            $(element)[0].selectedIndex = idx;
                            break;
                        }
                    }

                    var real = element.next();
                    if (!found) {
                        $(element)[0].selectedIndex = -1;
                        real.removeClass('valid').addClass('invalid');
                    } else {
                        real.removeClass('invalid').addClass('valid');
                    }
                    
                    $('*[data-value="' + cur + '"]', real).addClass("selected");
                    $('*[data-value!="' + cur + '"]', real).removeClass("selected");
                    if (typeof cur === 'undefined') {
                        for (var i = 0; i < scope.selOptions.length; i++) {
                            if (typeof scope.selOptions[i][scope.selValue] == 'undefined') {
                                var label = scope.selOptions[i][scope.selName];
                                $(".selecter-selected", real).text(label);
                                break;
                            }
                        }
                    } else {
                        $(".selecter-selected", real).text($('*[data-value="' + cur + '"]', real).text());
                    }
                };

                function updateList () {
                    $(element).selecter("destroy");
                    var opt = {};
                    if (scope.selFilter) {
                        opt.inputFilter = true;
                    } else {
                        opt.defaultLabel = "<span style='color:#007dba;'>" + defaultSelectText + "</span>";
                    }

                    $timeout(function () {
                        $(element).selecter(opt);
                        if (ngCtrl) {
                            updateUI(ngCtrl.$modelValue);
                        }
                    }, 0);
                };
                
                scope.$watch('selOptions', updateList, true);
                updateList();
                
                if (ngCtrl) {
                    ngCtrl.$render = function () {
                        updateUI(ngCtrl.$modelValue);
                    };
                }
            }
        };
    });

    hpe.directive('hpeMultipleSelector', function ($timeout) {        
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                'selOptions': '=',
                'selValue': '@',
                'selName': '@',
                'selChanged': '&'
            },
            require: '?ngModel',
            template: '<select multiple="multiple">' +
                        '<option value="{{item[selValue]}}" ng-repeat="item in selOptions"> {{item[selName]}} </option>' +
                      '</select>',
            link: function (scope, element, attrs, ngCtrl) {
                function bind() {
                    $('label', element.next()).on('click', function (evt) {
                        $timeout(function () {
                            var selected = [];
                            var inputs = $('input', element.next());
                            for (var i = 0; i < inputs.length; i++) {
                                var input = inputs.eq(i + 1);
                                if (input.prop('checked')) {
                                    selected.push(input.val());
                                }
                            }
                            
                            ngCtrl && scope.$apply(ngCtrl.$setViewValue(selected));
                            scope.selChanged && scope.selChanged({ value: selected });
                        }, 0);
                    });
                }

                var updateUI = function (cur) {
                    var options = element.find("option");
                    options.each(function (idx, opt) {
                        for (var i = 0; i < cur.length; i++) {
                            if (cur[i] == opt.value) {
                                opt.selected = true;
                            }
                        }
                    });

                    var real = element.next();
                    var items = $('*[data-value]', real);
                    items.removeClass("selected");
                    var chks = items.find('input');
                    chks.prop('checked', false);
                    //Note:IE8 fix
                    var spans = items.find('span');
                    spans.removeClass('ccheckclass');
                    //Note:End
                    for (var i = 0; i < cur.length; i++) {
                        var item = $('*[data-value="' + cur[i] + '"]', real);
                        item.addClass("selected");
                        var chk = item.find('input');
                        chk.prop('checked', true);
                        //Note:IE8 fix
                        var span = item.find('span');
                        span.addClass("ccheckclass");
                        //Note:End
                    }
                    
                    if (cur.length == 0) {
                        $(".selecter-selected", real).text('');
                    } else {
                        var txts = [];
                        for (var i = 0; i < cur.length; i++) {
                            var txt = $($('*[data-value="' + cur[i] + '"]', real)[0]).text();                            
                            txts.push(txt);
                        }

                        $(".selecter-selected", real).text(txts.join(';'));
                    }                    
                };

                function updateList() {
                    $(element).selecter("destroy");

                    $timeout(function () {
                        $(element).selecter();
                        bind();
                        if (ngCtrl)
                            updateUI(ngCtrl.$modelValue);//First time can't depend on $watch, since we use $timeout to run jQuery
                    }, 0);
                };
                
                scope.$watch('selOptions', updateList, true);
                //updateList();
                
                if (ngCtrl) {
                    ngCtrl.$render = function () {
                        updateUI(ngCtrl.$modelValue);
                    };
                }
            }
        };
    });

    hpe.directive('hpeAlert', function () {
        return {
            restrict: 'AE',
            replace: false,
            scope: {
                'alertText': '@',
                'alertType': '@'
            },
            template: '<div class="alert {{alertType}}">' +
                        '{{alertText}}' +
                      '</div>'
        };
    });
    
    hpe.directive('hpeGrid', function ($timeout) {
        return {
            restrict: 'AE',
            scope: {
                'grdId': '@',
                'grdData': '=',
                'grdHeader': '=',
                'grdColDefs': '=',
                'grdSort': '=',
                'grdColViewBy': '=',
                'grdCheckbox': '=',
                'grdSelectAll': '=',
                'grdParentSelectAll': '=',
                'grdChildSelectAll': '=',
                'grdSelectUnselectAllBoxes': '&',
                'grdSelectChanged': '&',
                'grdSelectAllName': '=',
            },
            replace: true,
            template: '<table class="TableBackground search_result">' +
                        '<thead>' +
                           '<tr class="TableHeaderRow">' +
                                '<th ng-if="grdCheckbox"></th>' +
                                '<th ng-if="grdSelectAll"><span ng-bind="grdSelectAllName"></span><input type="checkbox" style="margin:-5px 0px 0px 5px;" id="selectAll" ng-click="grdSelectUnselectAllBoxes()"/></th>' +
                                '<th ng-if="grdParentSelectAll"><input type="checkbox" id="parentTable" ng-click="grdSelectUnselectAllBoxes()"/></th>' +
                                '<th ng-if="grdChildSelectAll"><input type="checkbox" id="childTable" ng-click="grdSelectUnselectAllBoxes()"/></th>' +
                                '<th ng-repeat="x in grdHeader">{{x}}</th>' +
                           '</tr>' +
                        '</thead>'+
                        '<tbody></tbody>' +
                       '</table>',
            link: function (scope, element, attrs) {
                if (typeof scope.grdId == 'undefined') {
                    scope.grdId = 'g' + Math.random();
                }
                function addCheckColumn() {
                    var m = angular.copy(scope.grdData);
                    if (scope.grdCheckbox) {//Adjust data
                        for (var i = 0; i < m.length; i++) {
                            var arr = m[i];
                            arr.splice(0, 0, '<input class="cstmeinput" type="checkbox" id="' + scope.grdId + '_r_' + i + '" /><label for="' + scope.grdId + '_r_' + i + '"><span></span></label>');
                        }
                    }
                    return m;
                };
                function getLineId(eleId) {
                    var idArr = eleId.split('_r_');
                    return id = idArr[idArr.length - 1];
                };
                
                function bindCheckbox() {//Note: bind check event
                    if (!scope.grdCheckbox)
                        return;
                    selected = [];
                    for (var i = 0; i < scope.grdData.length; i++) {
                        var chk = $('#' + scope.grdId + '_r_' + i, element);
                        
                        //Note:IE8 fix, must bind to the label/span
                        chk.eq(0).next().bind('click', function (evt) {
                            $timeout(function () {
                                var span = $(evt.target);
                                var input = span.parent().prev();
                                var id = getLineId(input.attr('id'));
                                if (input.prop('checked')) {
                                    var idx = $.inArray(id, selected);
                                    if (idx < 0)
                                        selected.push(id);
                                    //Note:IE8 fix
                                    span.addClass('ccheckclass');
                                    //Note:End
                                } else {
                                    var idx = $.inArray(id, selected);
                                    while (idx > -1) {
                                        selected.splice(idx, 1);
                                        var idx = $.inArray(id, selected);
                                    }
                                    //Note:IE8 fix
                                    span.removeClass('ccheckclass');
                                    //Note:End
                                }
                                scope.grdSelectChanged({ value: selected });
                            }, 0);
                        });
                    }
                };
                var oTable = null;
                var draw = function () {
                    $.fn.dataTableExt.oJUIClasses.sSortJUI = "css_right icon-sort";
                    $.fn.dataTableExt.oJUIClasses.sSortJUIAsc = "css_right icon-sort-up";
                    $.fn.dataTableExt.oJUIClasses.sSortJUIDesc = "css_right icon-sort-down";
                    
                    var realData = addCheckColumn();

                    oTable = $(element).dataTable({
                        "aaSorting": scope.grdSort,
                        "aaData": realData,
                        "sPaginationType": "commonStandard", // define pagination show style is commonStandard. if sDom has p, this required.
                        "bPaginate": true,
                        "bJQueryUI": true,
                        "bRetrieve": true,
                        "bDestroy": true,
                        "sDom": '<"t_header"rClf><"t_body"t><"t_footer"pi>',
                        // define the dataTable structure
                        // C means view by, l means view results by length, f means filter input box, t is table content, p is pagination, i is information, R means be dragable. if your table don>t need all of this, just don>t add that letter, but if you use it, must the same as the sequence displayed here. Important!
                        "bSortClasses": false,
                        "aoColumnDefs": scope.grdColDefs,
                        "fnDrawCallback": function (oSettings) {
                        },
                        "oLanguage": {
                            "sLengthMenu": "<div class='sLengthText'>View Results of</div> _MENU_ ",//if sDom has l, this is required
                            "sInfo": "<span class='number_highlight'>_TOTAL_</span> items, <span class='number_highlight'>_TOTALPAGE_</span> pages",//if sDom has p, this is required
                            "sSearch": "Filter:",//if sDom has f, this is required
                            "sInfoFiltered": "",//if sDom has f, this is required
                            "sInfoEmpty": "<span class='number_highlight'>0</span> item(s)",
                            //if the search result is empty, show "0 items, 0 pages" required
                            "oPaginate": {
                    			"sFirst": "<i class='icon-double-angle-left'></i>",
                    			"sLast": "<i class='icon-double-angle-right'></i>",
                    			"sNext": "<i class='icon-angle-right'></i>",
                    			"sPrevious": "<i class='icon-angle-left'></i>"}
                        },
                        "oColVis": scope.grdColViewBy
                    });
                    if(!$("#ecc_hpegrid1_length select").next().hasClass("selecter")){  $("#ecc_hpegrid1_length select").selecter();  }
                    if(!$("#ecc_hpegrid2_length select").next().hasClass("selecter")){  $("#ecc_hpegrid2_length select").selecter();  }
                    if(!$("#ecc_hpegrid3_length select").next().hasClass("selecter")){  $("#ecc_hpegrid3_length select").selecter();  }
                    if(!$("#ecc_hpegrid4_length select").next().hasClass("selecter")){  $("#ecc_hpegrid4_length select").selecter();  }
                    if(!$("#ecc_hpegrid5_length select").next().hasClass("selecter")){  $("#ecc_hpegrid5_length select").selecter();  }
                    bindCheckbox();
                };
                setTimeout(draw, 0);

                scope.$watch('grdData', function (x, y) {
                    if (!oTable)
                        return;
                    oTable.fnClearTable();
                    oTable.fnAddData(addCheckColumn());
                    bindCheckbox();
                }, true);
            }
        };
    });

    hpe.directive('hpeRadiogroup', function ($timeout) {
        return {
            restrict: 'AE',
            scope: {                
                groupName: '@',                
                rbChanged: '&'
            },
            require: '?ngModel',
            transclude: true,
            //replace: true,
            template: '<div ng-transclude></div>',
            controller: function ($scope, $element) {
                this.getGroupName = function () {
                    return $scope.groupName;
                };

                this.getRbChanged = function () {
                    return $scope.rbChanged;
                };
            },
            link: function (scope, element, attrs, ngCtrl) {
                function updateUI() {
                    if (!ngCtrl)
                        return;
                    var btns = $('input[name="' + scope.groupName + '"]', element);
                    btns.each(function (idx, ele) {
                        ele.checked = (ele.value == ngCtrl.$modelValue);
                        var span = $('span', $(ele).next());
                        //Note:IE8 fix
                        if (ele.checked)
                            span.addClass('rcheckclass');
                        else
                            span.removeClass('rcheckclass');
                        //Note:End
                    });
                }
                if (ngCtrl) {
                    ngCtrl.$render = updateUI;
                }
                $timeout(updateUI, 0);
            }
        };
    });

    hpe.directive('hpeRadiobutton', function ($timeout) {
        return {
            restrict: 'AE',
            scope: {
                rbId: '@',                
                rbValue: '@',
                rbText: '@'
            },
            require: ['^hpeRadiogroup', '?^ngModel'],
            template: '<input class="cstmeinput" type="radio" id="{{rbId}}" name="{{rbName}}" value="{{rbValue}}" />' +
                        '<label for="{{rbId}}"><span></span>{{rbText}}</label>',
            link: function (scope, element, attrs, ctrls) {
                var grpCtrl = ctrls[0];
                var ngCtrl = ctrls[1];
                scope.rbName = grpCtrl.getGroupName();

                $('label', element).on('click', function () {
                    $timeout(function () {
                        var btns = $('input', element.parent());
                        btns.each(function (idx, ele) {
                            var span = $('span', $(ele).next());
                            //Note:IE8 fix
                            if (ele.checked)
                                span.addClass('rcheckclass');
                            else
                                span.removeClass('rcheckclass');
                            //Note:End
                        });
                    }, 0);

                    ngCtrl && scope.$apply(ngCtrl.$setViewValue(scope.rbValue));
                    var chgd = grpCtrl.getRbChanged();
                    chgd && chgd({ value: scope.rbValue });
                });
            }
        };
    });

    hpe.directive('hpeCheckbox', function ($timeout) {
        return {
            restrict: 'AE',
            //replace: true,
            scope: {
                chkId: '@',
                chkName: '@',
                chkValue: '@',
                chkText: '@',
                chkChanged: '&'
            },
            require: '?ngModel',
            template: '<input class="cstmeinput" type="checkbox" id="{{chkId}}" name="{{chkName}}" value="{{chkValue}}" />' +
                        '<label for="{{chkId}}"><span></span>{{chkText}}</label>',
            link: function (scope, element, attrs, ngCtrl) {
                $('label', element).on('click', function (evt) {
                    $timeout(function () {
                        var input = $('input', element);
                        var span = $('span', $('label', element));
                        //Note:IE8 fix
                        if (input.prop('checked'))
                            span.addClass('ccheckclass');
                        else
                            span.removeClass('ccheckclass');
                        //Note:End

                        ngCtrl && scope.$apply(ngCtrl.$setViewValue(input.prop('checked')));
                        scope.chkChanged && scope.chkChanged({ value: input.prop('checked') });
                    }, 0);
                });

                if (ngCtrl) {
                    ngCtrl.$render = function () {
                        var real = $('#' + scope.chkId, element).eq(0);
                        if (real) {
                            real.prop('checked', ngCtrl.$modelValue);
                            var span = $('span', real.next());
                            //Note:IE8 fix
                            if (ngCtrl.$modelValue)
                                span.addClass('ccheckclass');
                            else
                                span.removeClass('ccheckclass');
                            //Note:End
                        }
                    };
                }

                ngCtrl && $timeout(ngCtrl.$render, 0);
            }
        };
    });

    hpe.directive('hpeBreadcrumb', function () {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            controller: function ($scope, $element) {
                var crumbs = $scope.crumbs = [];
                this.addCrumb = function (crumb) {
                    crumbs.push(crumb);
                };
                this.refresh = function () {
                    $('span[class="carat"]', $element).css('display', 'inline').last().css('display', 'none');
                };
            },
            template: '<ul class="breadcrumbs2" ng-transclude>' +
                      '</ul>'
        };
    });

    hpe.directive('hpeCrumb', function () {
        return {
            restrict: 'AE',
            require: '^hpeBreadcrumb',
            replace: true,
            transclude: true,
            template: '<li><a tabindex="0" class="link">' +
                        '<span class="Bhv" ng-transclude></span>' +
                      '<span class="carat">&gt;&nbsp;</span></a></li>',
            link: function (scope, element, attrs, bcCtrl) {
                bcCtrl.addCrumb(scope);
                bcCtrl.refresh();
            }
        };
    });

    hpe.directive('hpeToggle', function ($timeout) {
        return {
            restrict: 'AE',
            //replace: true,
            scope: {
                tglName: '@',
                tglChanged: '&',
                tglId: '@',
                tglTrueText: '@',
                tglFalseText: '@'
            },
            require: '?ngModel',
            template: '<div class="toggle">' +
                        '<span><label class="toggle-radio" for="{{tglId}}True"><div class="textdiv">{{tglTrueText}}</div></label>' +
                        '<input type="radio" name="{{tglName}}" id="{{tglId}}True" value="true"></span>' +
                        '<span><label class="toggle-radio" for="{{tglId}}False"><div class="textdiv">{{tglFalseText}}</div></label>' +
                        '<input type="radio" name="{{tglName}}" id="{{tglId}}False" value="false"></span>' +
                      '</div>',
            link: function (scope, element, attrs, ngCtrl) {
                $('input', element).on('click', function (evt) {
                    ngCtrl && scope.$apply(ngCtrl.$setViewValue(evt.target.value == 'true'));
                    scope.tglChanged && scope.tglChanged({ value: evt.target.value == 'true' });
                });
                
                if (ngCtrl) {
                    ngCtrl.$render = function () {
                        var tInput = $('#' + scope.tglId + 'True', element);
                        var fInput = $('#' + scope.tglId + 'False', element);
                        var tLabel = $('label[for="' + scope.tglId + 'True' + '"]', element);
                        var fLabel = $('label[for="' + scope.tglId + 'False' + '"]', element);
                        var tDiv = tLabel.children().eq(0);
                        var fDiv = fLabel.children().eq(0);
                        if (ngCtrl.$modelValue) {
                            tInput.prop('checked', true);
                            fInput.prop('checked', false);
                            tDiv.addClass('selectedToggle');
                            fDiv.removeClass('selectedToggle');
                        } else {
                            fInput.prop('checked', true);
                            tInput.prop('checked', false);
                            tDiv.removeClass('selectedToggle');
                            fDiv.addClass('selectedToggle');
                        }
                    };
                }
                
                ngCtrl && $timeout(ngCtrl.$render, 0);
                
            }
        };
    });

    hpe.directive('hpeSearch', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                searchChanged: '&'
            },
            require: '?ngModel',
            template: '<div class="search">' +
                        '<i class="icon-search"></i>' +
                        '<input type="search" placeholder="Search...">' +
                      '</div>',
            link: function (scope, element, attrs, ngCtrl) {
                $('input', element).on('blur', function () {
                    var txt = $('input', element).val();
                    ngCtrl && scope.$apply(ngCtrl.$setViewValue(txt));
                    scope.searchChanged && scope.searchChanged({value: txt});
                });

                if (ngCtrl) {
                    ngCtrl.$render = function () {
                        $('input', element).val(ngCtrl.$modelValue);
                    };
                }
            }
        };
    });

    hpe.directive('hpeDatepicker', function ($timeout) {
        return {
            restrict: 'AE',
            replace: false,
            scope: {
                dpMin: '=',
                dpMax: '=',
                dpSelectOnly: '@',
                dpFormat: '@',
                dpChanged: '&'
            },
            require: '?ngModel',
            template: '<input type="text" ng-readonly="{{dpSelectOnly}}"></input>',
            link: function (scope, element, attrs, ngCtrl) {
                var old = null;
                $('input', element).on('blur', function (evt) {
                    var txt = $('input', element).val();
                    if (txt != old) {
                        ngCtrl && ngCtrl.$setViewValue(txt);
                        scope.dpChanged && scope.dpChanged({ value: txt });
                        old = txt;
                    }
                });

                $timeout(function(){
                    $('input', element).datetimepicker({
                        changeMonth: true,
                        changeYear: true,
                        showTimepicker: false,
                        showTime: false,
                        showTimezone: false,
                        minDate: scope.dpMin,
                        maxDate: scope.dpMax,
                        dateFormat: scope.dpFormat,
                        onSelect: function (txt) {
                            if (txt != old) {
                                scope.dpChanged && scope.dpChanged({ value: txt });
                                ngCtrl && scope.$apply(ngCtrl.$setViewValue(txt));
                                old = txt;
                            }
                        }
                    });
                    old = (ngCtrl) ? ngCtrl.$modelValue : '';
                }, 0);

                if (ngCtrl) {
                    ngCtrl.$render = function () {
                        $('input', element).val(ngCtrl.$modelValue);
                    };
                }
            }
        };
    });

    hpe.directive('hpeTip', function () {
        return {
            restrict: 'AE',
            replace: false,
            scope: {
                tipContent: '@'
            },
            link: function (scope, element, attrs, ngCtrl) {
                $(element).qtip({
                    content: '<div class="tip-content">' + scope.tipContent + '</div>',
                    position: {
                        corner: {
                            target: 'topRight',
                            tooltip: 'bottomLeft'
                        }
                    },
                    style: {
                        tip: {
                            size: {
                                x: 20,
                                y: 8
                            }
                        }
                    },
                    hide: {
                        fixed: true,
                        delay: 300
                    }
                });
            }
        };
    });


    hpe.directive('resellerGrid', function ($timeout) {
        return {
            restrict: 'AE',
            scope: {
                'grdId': '@',
                'grdData': '=',
                'grdHeader': '=',
                'grdHeader2': '=',
                'grdColDefs': '=',
                'grdSort': '=',
                'grdColViewBy': '=',
                'grdCheckbox': '=',
                'grdSelectAll': '=',
                'grdParentSelectAll': '=',
                'grdChildSelectAll': '=',
                'grdSelectUnselectAllBoxes': '&',
                'grdSelectChanged': '&'
            },
            replace: true,
            template: '<table class="TableBackground search_result">' +
                        '<thead>' +
                        	'<tr class="TableHeaderRow2">' +
                        	'<th align="center" colspan=1></th>'+
                	 		'<th align="center" colspan=3>*Partner Margin</th>' +
                	 		'<th align="center" colspan=3>Import Duties</th>' +
                	 		'<th align="center" colspan=18>Classic Uplifts</th>' +
                        	'<th align="center" colspan=3></th>'+
                        	'</tr>'+
                           '<tr class="TableHeaderRow">' +
                                '<th ng-if="grdCheckbox"></th>' +
                                '<th ng-if="grdSelectAll"><input type="checkbox" id="selectAll" ng-click="grdSelectUnselectAllBoxes()"/></th>' +
                                '<th ng-if="grdParentSelectAll"><input type="checkbox" id="parentTable" ng-click="grdSelectUnselectAllBoxes()"/></th>' +
                                '<th ng-if="grdChildSelectAll"><input type="checkbox" id="childTable" ng-click="grdSelectUnselectAllBoxes()"/></th>' +
                                '<th ng-repeat="x in grdHeader">{{x}}</th>' +
                           '</tr>' +
                        '</thead>'+
                        '<tbody></tbody>' +
                       '</table>',
            link: function (scope, element, attrs) {
                if (typeof scope.grdId == 'undefined') {
                    scope.grdId = 'g' + Math.random();
                }
                function addCheckColumn() {
                    var m = angular.copy(scope.grdData);
                    if (scope.grdCheckbox) {//Adjust data
                        for (var i = 0; i < m.length; i++) {
                            var arr = m[i];
                            arr.splice(0, 0, '<input class="cstmeinput" type="checkbox" id="' + scope.grdId + '_r_' + i + '" /><label for="' + scope.grdId + '_r_' + i + '"><span></span></label>');
                        }
                    }
                    return m;
                };
                function getLineId(eleId) {
                    var idArr = eleId.split('_r_');
                    return id = idArr[idArr.length - 1];
                };
                
                function bindCheckbox() {//Note: bind check event
                    if (!scope.grdCheckbox)
                        return;
                    selected = [];
                    for (var i = 0; i < scope.grdData.length; i++) {
                        var chk = $('#' + scope.grdId + '_r_' + i, element);
                        
                        //Note:IE8 fix, must bind to the label/span
                        chk.eq(0).next().bind('click', function (evt) {
                            $timeout(function () {
                                var span = $(evt.target);
                                var input = span.parent().prev();
                                var id = getLineId(input.attr('id'));
                                if (input.prop('checked')) {
                                    var idx = $.inArray(id, selected);
                                    if (idx < 0)
                                        selected.push(id);
                                    //Note:IE8 fix
                                    span.addClass('ccheckclass');
                                    //Note:End
                                } else {
                                    var idx = $.inArray(id, selected);
                                    while (idx > -1) {
                                        selected.splice(idx, 1);
                                        var idx = $.inArray(id, selected);
                                    }
                                    //Note:IE8 fix
                                    span.removeClass('ccheckclass');
                                    //Note:End
                                }
                                scope.grdSelectChanged({ value: selected });
                            }, 0);
                        });
                    }
                };
                var oTable = null;
                var draw = function () {
                    $.fn.dataTableExt.oJUIClasses.sSortJUI = "css_right icon-sort";
                    $.fn.dataTableExt.oJUIClasses.sSortJUIAsc = "css_right icon-sort-up";
                    $.fn.dataTableExt.oJUIClasses.sSortJUIDesc = "css_right icon-sort-down";
                    
                    var realData = addCheckColumn();

                    oTable = $(element).dataTable({
                        "aaSorting": scope.grdSort,
                        "aaData": realData,
                        "sPaginationType": "commonStandard", // define pagination show style is commonStandard. if sDom has p, this required.
                        "bPaginate": true,
                        "bJQueryUI": true,
                        "bRetrieve": true,
                        "bDestroy": true,
                        "sDom": '<"t_header"rClf><"t_body"t><"t_footer"pi>',
                        // define the dataTable structure
                        // C means view by, l means view results by length, f means filter input box, t is table content, p is pagination, i is information, R means be dragable. if your table don>t need all of this, just don>t add that letter, but if you use it, must the same as the sequence displayed here. Important!
                        "bSortClasses": false,
                        "aoColumnDefs": scope.grdColDefs,
                        "fnDrawCallback": function (oSettings) {
                        },
                        "oLanguage": {
                            "sLengthMenu": "<div class='sLengthText'>View Results of</div> _MENU_ ",//if sDom has l, this is required
                            "sInfo": "<span class='number_highlight'>_TOTAL_</span> items, <span class='number_highlight'>_TOTALPAGE_</span> pages",//if sDom has p, this is required
                            "sSearch": "Filter:",//if sDom has f, this is required
                            "sInfoFiltered": "",//if sDom has f, this is required
                            "sInfoEmpty": "<span class='number_highlight'>0</span> item(s)",
                            //if the search result is empty, show "0 items, 0 pages" required
                            "oPaginate": {
                    			"sFirst": "<i class='icon-double-angle-left'></i>",
                    			"sLast": "<i class='icon-double-angle-right'></i>",
                    			"sNext": "<i class='icon-angle-right'></i>",
                    			"sPrevious": "<i class='icon-angle-left'></i>"}
                        },
                        "oColVis": scope.grdColViewBy
                    });
                    if(!$("#ecc_hpegrid1_length select").next().hasClass("selecter")){  $("#ecc_hpegrid1_length select").selecter();  }
                    if(!$("#ecc_hpegrid2_length select").next().hasClass("selecter")){  $("#ecc_hpegrid2_length select").selecter();  }
                    if(!$("#ecc_hpegrid3_length select").next().hasClass("selecter")){  $("#ecc_hpegrid3_length select").selecter();  }
                    bindCheckbox();
                };
                setTimeout(draw, 0);

                scope.$watch('grdData', function (x, y) {
                    if (!oTable)
                        return;
                    oTable.fnClearTable();
                    oTable.fnAddData(addCheckColumn());
                    bindCheckbox();
                }, true);
            }
        };
    });
})();

