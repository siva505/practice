/*
 * Selecter Plugin [Formtone Library]
 * @author Ben Plum
 * @version 2.0.0
 *
 * Copyright ? 2013 Ben Plum <mr@benplum.com>
 * Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

 (function($) {

	// Mobile Detect
	var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( (navigator.userAgent||navigator.vendor||window.opera) );

	// Default Options
	var options = {
		callback: function() {},
		cover: false,
		customClass: "",
		defaultLabel: false,
		externalLinks: false,
		links: false,
		allValue: true,
		inputFilter: false,
		trimOptions: false
	};

	// Identify each instance
	var guid = 0;
	// Public Methods
	var pub = {

		// Set Defaults
		defaults: function(opts) {
			options = $.extend(options, opts || {});
			return $(this);
		},

		// Disable field
		disable: function() {
			var $items = $(this);
			for (var i = 0, count = $items.length; i < count; i++) {
				var $target = $items.eq(i),
					$selecter = $target.next(".selecter");

				if ($selecter.hasClass("open")) {
					$selecter.find(".selecter-selected").trigger("click");
					// $selecter.find(".selecter").trigger("click");
				}

				$target.prop("disabled", true);
				$selecter.addClass("disabled");
			}
			return $items;
		},

		// Enable field
		enable: function() {
			var $items = $(this);
			for (var i = 0, count = $items.length; i < count; i++) {
				var $target = $items.eq(i),
					$selecter = $target.next(".selecter");

				$target.prop("disabled", null);
				$selecter.removeClass("disabled");
			}
			return $items;
		},

		// Destroy selecter
		destroy: function() {
			var $items = $(this);
			for (var i = 0, count = $items.length; i < count; i++) {
				var $target = $items.eq(i),
					$selecter = $target.next(".selecter");

				if ($selecter.hasClass("open")) {
					$selecter.find(".selecter-selected").trigger("click");
				}

				// Scroller support
				if ($.fn.scroller != undefined) {
					$selecter.find(".selecter-options").scroller("destroy");
				}

				$target.off(".selecter")
					   .removeClass("selecter-element")
					   .show();
				$selecter.off(".selecter")
						 .remove();
			}
			return $items;
		},
        /**
         * @method
         * @name refresh
         * @description Updates instance base on target options
         * @example $(".target").selecter("refresh");
         */
        refresh: function() {
            return $(this).each(function(i, input) {
                var data = $(input).next(".selecter").data("selecter");

                if (data !== null) {
                    var index = data.index;

                    data.$allOptions = data.$selectEl.find("option, optgroup");
                    data.$options = data.$allOptions.filter("option");
                    data.index = -1;

                    //index = data.$options.index(data.$options.filter(":selected"));
                    var indexArray = [];
                    data.$options.filter(":selected").each(function(i){
                        indexArray.push(data.$options.index($(this)));
                    });
                    data.disabled = data.$selectEl.is(":disabled");
                    _buildOptions(data);
//                    if(index!=-1){
//						_update(index, data);
//                    }
                    if(indexArray.length==0){
                        data.$selected.html("");
                        data.$selected.attr("title","");
                    }
                    for(var i= 0,length=indexArray.length;i<length;i++){
                        if(indexArray[i]!=-1){
                            _update(indexArray[i], data);
                        }
                    }
                    
                }
            });
        }
	};

	// Private Methods

	// Initialize
	function _init(opts) {
		// console.log("_init");
		opts = opts || {};
		// avoid redefine the selecter style
		if($(this).next().hasClass("selecter")){
			return;
		}
		// Define settings
		var settings = $.extend({}, options, opts);

		// Apply to each element
		var $items = $(this);
		for (var i = 0, count = $items.length; i < count; i++) {
			_build($items.eq(i), settings);
		}
		return $items;
	}

	// Build each
	function _build($selectEl, opts) {
		// console.log("_build");
		if (!$selectEl.data("selecter")) {
			if (opts.externalLinks) {
				opts.links = true;
			}

			// Build options array
			var $allOptionEls = $selectEl.find("option, optgroup"),
				$optionEls = $allOptionEls.filter("option");
			opts.multiple = $selectEl.prop("multiple");
			opts.disabled = $selectEl.is(":disabled");
			opts.required = $selectEl.attr("required");
			// if(opts.multiple && (opts.defaultLabel != false)){
			// 	$optionEls.each(function(index){
			// 		$optionEls.eq(index).prop("selected", null);
			// 	});

			// }
			var	$originalOption = $optionEls.filter(":selected"),
				originalIndex = (opts.defaultLabel) ? -1 : $optionEls.index($originalOption),
				totalItems = $allOptionEls.length - 1,
				wrapperTag = (opts.links) ? "nav" : "div",
				itemTag = (opts.links) ? "a" : "span";


			// Build HTML
			var html = '<' + wrapperTag + ' class="selecter ' + opts.customClass;
			// Special case classes
			if (isMobile) {
				html += ' mobile';
			} else if (opts.cover) {
				html += ' cover';
			}
			if (opts.multiple) {
				html += ' multiple';
				// html += '<span class="selecter-selected">';
				// html += _checkLength(opts.trimOptions, ((opts.defaultLabel != false) ? opts.defaultLabel : $originalOption.text()));
				// html += '</span><span class="icon-chevron-down"></span>';
			}
			if(opts.required || opts.required=="required"){
				html += ' required';
			}
			html += ' closed';
			if (opts.disabled) {
				html += ' disabled';
			}
			html += '">';
			html += '<span class="selecter-selected">';
			if(opts.defaultLabel != false){
				html += _checkLength(opts.trimOptions, opts.defaultLabel);
			}
			else{
				$originalOption.each(function(i){
					if(i==0){
						html += _checkLength(opts.trimOptions, $originalOption.eq(i).text());
					}
					if (i>0) {
						html += ","+_checkLength(opts.trimOptions, $originalOption.eq(i).text());
					}
				});
			}
			html += '</span><span class="icon-chevron-down"></span>';
			if(opts.multiple){
				var selecterIdStr = $selectEl.attr("id");
				html += '<div class="selecter-options multi-options">';
				html += '<div class="selecter-all"><input class="cstmeinput selcheck" type="checkbox" id="'+selecterIdStr+'-all" name="'+selecterIdStr+'-all" />';
				html += '<label for="'+selecterIdStr+'-all"><span></span></label>Check all/Uncheck all</div>';
				var j = 0, $op = null;
				for (var i = 0, count = $allOptionEls.length; i < count; i++) {
					$op = $($allOptionEls[i]);
					// Option group
					if ($op[0].tagName == "OPTGROUP") {
						var groupName = $op.attr("label").replace(/\ /g,"");
						html += '<span class="selecter-group" sgroup="'+groupName+'"><i class="icon-plus"></i>' + $op.attr("label") + '</span>';
						var groupOpts = $op[0].children;
						for(var k=0; k<groupOpts.length; k++){
							html += '<' + itemTag + ' class="selecter-item group-item sgroup-'+ groupName;
							html += '" sgroup="'+groupName+'"';
							if (opts.links) {
								html += 'href="' + groupOpts[k].value + '"';
							} else {
								html += 'title="' + groupOpts[k].text + '"';
								html += 'data-value="' + groupOpts[k].value + '"';
							}
							html += '><input class="cstmeinput selcheck" type="checkbox" id="'+groupName+i+'" name="'+groupName+'" value="'+groupOpts[k].value+'"';
							if ($(groupOpts[k]).is(':selected') && opts.defaultLabel == false) {
								html += ' checked=true';
							}
							html += ' />';
							html += '<label for="'+groupName+i+'"><span';
							if ($(groupOpts[k]).is(':selected' && ((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)))) {
								html += ' class="ccheckclass"';
							}
							html += '></span>'+_checkLength(opts.trimOptions, groupOpts[k].text)+'</label>';
							html += '</' + itemTag + '>';

						}
						i = i+groupOpts.length;

					} else {
						html += '<' + itemTag + ' class="selecter-item';
						// Default selected value - now handles multi's thanks to @kuilkoff
						if ($op.is(':selected') && opts.defaultLabel == false) {
							html += ' selected';
						}
						// CSS styling classes - might ditch for pseudo selectors
						// if(opts.allIndex!="false" && i==opts.allIndex){
						// 	html += ' selecter-item-all';
						// }
						if (i == 0) {
							html += ' first';
						}
						if (i == totalItems) {
							html += ' last';
						}
						html += '" ';
						if (opts.links) {
							html += 'href="' + $op.val() + '"';
						}
						 else {
							html += 'title="' + $op.text() + '"';
							html += 'data-value="' + $op.val() + '"';
						}
						html += '><input class="cstmeinput selcheck" type="checkbox" id="'+selecterIdStr+i+'" name="'+selecterIdStr+'" value="'+$op.val()+'"';
						if ($op.is(':selected')) {
							html += ' checked=true';
						}
						html += ' />';
						html += '<label for="'+selecterIdStr+i+'"><span';
						if ($op.is(':selected' && ((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)))) {
							html += ' class="ccheckclass"';
						}
						html += '></span>'+_checkLength(opts.trimOptions, $op.text())+'</label>';
						html += '</' + itemTag + '>';
						j++;
					}
				}

				// if(opts.inputFilter){
				// 	html += '<div class="selectFilterBtn" id="'+selecterIdStr+'Btn">';
				// 	html += '<a class="btn btn-inline btn-Primary ok">OK</a><a class="btn btn-inline btn-Secondary cancel">Cancel</a><a class="btn btn-inline btn-Secondary clear">Clear</a></div>';
				// 	html += '</div>';
				// }
			}
			else{
				html += '<div class="selecter-options">';
				var j = 0,
					$op = null;
				for (var i = 0, count = $allOptionEls.length; i < count; i++) {
					$op = $($allOptionEls[i]);
					// Option group
					
					if ($op[0].tagName == "OPTGROUP") {
						var groupName = $op.attr("label").replace(/\ /g,"");
						html += '<span class="selecter-group" sgroup="'+groupName+'"><i class="icon-plus"></i>' + $op.attr("label") + '</span>';
						var groupOpts = $op[0].children;
						for(var k=0; k<groupOpts.length; k++){
							html += '<' + itemTag + ' class="selecter-item group-item sgroup-'+ groupName;
							if ($op.is(':selected') && opts.defaultLabel == false) {
								html += ' selected';
							}
							if (i == 0) {
								html += ' first';
							}
							if (i == totalItems) {
								html += ' last';
							}
							html += '" sgroup="'+groupName+'"';
							if (opts.links) {
								html += 'href="' + groupOpts[k].value + '"';
							} else {
								html += 'title="' + groupOpts[k].text + '"';
								html += 'data-value="' + groupOpts[k].value + '"';
							}
							html += '>' + _checkLength(opts.trimOptions, groupOpts[k].text) + '</' + itemTag + '>';

						}
						i = i+groupOpts.length;
					} else {
						html += '<' + itemTag + ' class="selecter-item';
						// Default selected value - now handles multi's thanks to @kuilkoff
						if ($op.is(':selected') && opts.defaultLabel == false) {
							html += ' selected';
						}
						// CSS styling classes - might ditch for pseudo selectors
						// if(opts.allIndex!="false" && i==opts.allIndex){
						// 	html += ' selecter-item-all';
						// }
						if (i == 0) {
							html += ' first';
						}
						if (i == totalItems) {
							html += ' last';
						}
						html += '" ';
						if (opts.links) {
							html += 'href="' + $op.val() + '"';
						} else {
							html += 'title="' + $op.text() + '"';
							html += 'data-value="' + $op.val() + '"';
						}
						html += '>' + _checkLength(opts.trimOptions, $op.text()) + '</' + itemTag + '>';
						j++;
					}
				}
				html += '</div>';
			}
			html += '</' + wrapperTag + '>';

			// Modify DOM
			$selectEl.addClass("selecter-element")
					 .after(html);

			// Store plugin data
			var $selecter = $selectEl.next(".selecter");
			var data = $.extend({
				$selectEl: $selectEl,
				$optionEls: $optionEls,
				$selecter: $selecter,
				$selected: $selecter.find(".selecter-selected"),
				$itemsWrapper: $selecter.find(".selecter-options"),
				$items: $selecter.find(".selecter-item"),
				index: originalIndex,
				guid: guid
			}, opts);

			// Scroller support
			if ($.fn.scroller != undefined) {
				data.$itemsWrapper.scroller();
			}
			// if(data.$items.filter(".selected").filter(".selecter-item-all").length > 0 && opts.multiple){
			// 	data.$items.addClass("selected");
			// }
			// Bind click events
			$selecter.on("click.selecter", ".selecter-group", data, _groupViewOnmouse);
    		// $selecter.on("mouseover.selecter", ".selecter-group", data, _groupViewOnmouse)
    		// .on("mouseover.selecter", ".group-item", data, _groupItemOnmouse)
    		// .on("mouseleave.selecter", ".group-item", data, _groupItemOutmouse)
    		// 		.on("mouseleave.selecter", ".selecter-group", data, _groupViewOutmouse);
			if(opts.inputFilter && !opts.multiple){
				$selecter.on("click.selecter", ".selecter-selected", data, _handleInput)
				.on("click.selecter", "span.icon-chevron-down", data, _handleClick)
					 .on("click.selecter", ".selecter-item", data, _select)
					 .on("selecter-close", data, _close)
					 .data("selecter", data);
			}
			else if(opts.multiple){
				if(opts.inputFilter){
					$selecter.on("click.selecter", ".selecter-selected", data, _handleInput);
				}
				else{
					$selecter.on("click.selecter", ".selecter-selected", data, _handleClick);
				}
				$selecter.on("click.selecter", "span.icon-chevron-down", data, _handleClick)
					 .on("click.selecter", ".selecter-item", data, _checkSelect)
					 .on("selecter-close", data, _close)
					 .data("selecter", data);
				data.$itemsWrapper.on("click","div.selecter-all",function(){
                    if($(this).children("input").prop("checked")){
                        $(this).children("input").prop("checked",false);
                        // $(this).removeClass("selected");
                        data.$items.children("input").prop("checked",false);
                        if((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)){
                        	$(this).children("label").children("span").removeClass("ccheckclass");
                        	data.$items.children("label").children("span").removeClass("ccheckclass");
                        }
                    	data.$items.removeClass("selected");
                    	data.$optionEls.prop("selected", false);
                    	data.$selectEl.trigger("change", [ true ]);
                    	data.$selected.html("");
						data.$selected.attr("title","");
                    }
                    else{
                        $(this).children("input").prop("checked",true);
                        // $(this).addClass("selected");
                        data.$items.children("input").prop("checked",true);
                        if((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)){
                        	$(this).children("label").children("span").addClass("ccheckclass");
                        	data.$items.children("label").children("span").addClass("ccheckclass");
                        }
                    	data.$items.addClass("selected");
                    	data.$optionEls.prop("selected", true);

                    	if(!data.allValue){
                    		data.$optionEls.prop("selected", false);
                    		// data.$selecter.prev().val("");
                    	}
                    	data.$selectEl.trigger("change", [ true ]);
                    	data.$selected.html("All");
						data.$selected.attr("title","All");
                    }
     //                var selectedStr ="";
					// data.$optionEls.filter(":selected").each(function(){
					// 	selectedStr = selectedStr +this.text+"; ";
					// });
					// data.$selected.html(selectedStr.substring(0, selectedStr.lastIndexOf(";")));
					// data.$selected.attr("title",selectedStr.substring(0, selectedStr.lastIndexOf("; ")));
					// data.callback.call(data.$selecter, data.$selectEl.val(), index);
				});
			}
			else{
				$selecter.on("click.selecter", ".selecter-selected", data, _handleClick)
					.on("click.selecter", "span.icon-chevron-down", data, _handleClick)
					.on("click.selecter", ".selecter-item", data, _select)
					.on("selecter-close", data, _close)
					.data("selecter", data);
			}
			$selecter.on("focus.selecter", data, _focus);
			$selecter.on("blur.selecter", data, _blur);
			// $("body").on("click.selecter-" + data.guid, ":not(.selecter-options)", data, _closeListener);
			//if(!opts.inputFilter){
				$selecter.on("keydown.selecter-" + data.guid, data, _keypress);
			//}
			//else{
				//$selecter.on("keydown.selecter-" + data.guid, data, _inputKeypress);
			//}

			// Bind Blur/focus events
			if ((!opts.links && !isMobile) || isMobile) {
				$selectEl.on("change", data, _change)
						 .on("blur.selecter", data, _blur);
				if (!isMobile) {
					$selectEl.on("focus.selecter", data, _focus);
				}
			} else {
				// Disable browser focus/blur for jump links
				$selectEl.hide();
			}
			if(data.required || data.$selectEl.attr("required")=="required"){
				if(data.$selectEl.val()==null || data.$selectEl.val() ==""){
					data.$selecter.removeClass("valid");
					data.$selecter.addClass("invalid");
					data.$selecter.focus();
				}
				else{
					data.$selecter.removeClass("invalid");
					data.$selecter.addClass("valid");
				}
			}

			guid++;
			data.$selecter[0].tabIndex=0;
			
		}
	}
     /**
      * @method private
      * @name _buildOptions
      * @description Builds instance's option set
      * @param data [object] "Instance data"
      */
     function _buildOptions(data) {
     	// console.log("_buildOptions");
         var html = '',
             itemTag = (data.links) ? "a" : "span",
             j = 0;
        if(data.disabled){
        	data.$selecter.addClass("disabled");
        }
        else{
        	data.$selecter.removeClass("disabled");
        }
        if(data.multiple){
        	html += '<div class="selecter-all"><input class="cstmeinput selcheck" type="checkbox" id="'+data.$selectEl.attr("id")+'-all" name="'+data.$selectEl.attr("id")+'-all" />';
			html += '<label for="'+data.$selectEl.attr("id")+'-all"><span></span></label>Check all/Uncheck all</div>';
        }
         for (var i = 0, count = data.$allOptions.length; i < count; i++) {
             var $op = data.$allOptions.eq(i);

             // Option group
             if ($op[0].tagName === "OPTGROUP") {
                 // html += '<span class="selecter-group';
                 // // Disabled groups
                 // if ($op.is(":disabled")) {
                 //     html += ' disabled';
                 // }
                 // html += '">' + $op.attr("label") + '</span>';
				var groupName = $op.attr("label").replace(/\ /g,"");
				html += '<span class="selecter-group" sgroup="'+groupName+'"><i class="icon-plus"></i>' + $op.attr("label") + '</span>';
				var groupOpts = $op[0].children;
				for(var k=0; k<groupOpts.length; k++){
					html += '<' + itemTag + ' class="selecter-item group-item sgroup-'+ groupName;
					
					html += '" sgroup="'+groupName+'"';
					if (data.links) {
						html += ' href="' + groupOpts[k].value + '"';
					} else {
						html += ' title="' + groupOpts[k].text + '"';
						html += ' data-value="' + groupOpts[k].value + '"';
					}
					if(!data.multiple){
						if ($op.is(':selected') && data.defaultLabel == false) {
							html += ' selected';
						}
						html += '>' + _checkLength(data.trimOptions, groupOpts[k].text) + '</' + itemTag + '>';
					}
					else{
						html += '><input class="cstmeinput selcheck" type="checkbox" id="'+groupName+i+'" name="'+groupName+'" value="'+groupOpts[k].value+'"';
						if ($(groupOpts[k]).is(':selected') && data.defaultLabel == false) {
							html += ' checked=true';
						}
						html += ' />';
						html += '<label for="'+groupName+i+'"><span';
						if ($(groupOpts[k]).is(':selected' && ((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)))) {
							html += ' class="ccheckclass"';
						}
						html += '></span>'+_checkLength(data.trimOptions, groupOpts[k].text)+'</label>';
						html += '</' + itemTag + '>';
					}
				}
				i = i+groupOpts.length;

             } else {
                 var opVal = $op.val();

                 if (!$op.attr("value")) {
                     $op.attr("value", opVal);
                 }

                 html += '<' + itemTag + ' class="selecter-item';
                 // Default selected value - now handles multi's thanks to @kuilkoff
                 /*
                  if ($op.is(':selected') && data.label === "") {
                  html += ' selected';
                  }
                  */
                 // Disabled options
                 if ($op.is(":disabled")) {
                     html += ' disabled';
                 }
                 html += '" ';
                 if (data.links) {
                     html += 'href="' + opVal + '"';
                 } else {
                 	html += 'title="' + $op.text() + '"';
                    html += 'data-value="' + opVal + '"';
                 }
                 if (data.multiple) {
                 	html += '><input class="cstmeinput selcheck" type="checkbox" id="'+data.$selectEl.attr("id")+i+'" name="'+data.$selectEl.attr("id")+'" value="'+$op.val()+'"';
						if ($op.is(':selected')) {
							html += ' checked=true';
						}
						html += ' />';
						html += '<label for="'+data.$selectEl.attr("id")+i+'"><span';
						if ($op.is(':selected' && ((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)))) {
							html += ' class="ccheckclass"';
						}
						html += '></span>'+_trim($op.text())+'</label>';
                 }
                 else{
                 	html += '>' + $("<span></span>").text( _trim($op.text(), data.trim) ).html()
                 }
                 html += '</' + itemTag + '>';
                 j++;
             }
         }

         data.$itemsWrapper.html(html);
         data.$items = data.$selecter.find(".selecter-item");
         data.$optionEls = data.$selectEl.find("option, optgroup").filter("option");
     }
	// Handle Click
	function _handleClick(e) {
        // console.log("Enter _handleClick");
		e.preventDefault();
		e.stopPropagation();

		var data = e.data;

		if (!data.$selectEl.is(":disabled")) {
			$(".selecter").not(data.$selecter).trigger("selecter-close", [data]);

			// Handle mobile
			if (isMobile) {
				var el = data.$selectEl[0];
				if (document.createEvent) { // All
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					el.dispatchEvent(evt);
				} else if (element.fireEvent) { // IE
					el.fireEvent("onmousedown");
				}
			} else {
				// Delegate intent
				if (data.$selecter.hasClass("closed")) {
					_open(e);
					// console.log("_handleClick open");
				} else if (data.$selecter.hasClass("open")) {
					_close(e);
					// console.log("_handleClick closed");
				}
				// if (data.$selecter.hasClass("open") && data.$selecter.hasClass("focus")&& !data.$selecter.hasClass("clickFocus")) {
				// 	data.$selecter.addClass("clickFocus");
    //                 console.log("nothing in first focus");
				// }
				// else if (data.$selecter.hasClass("open") && data.$selecter.hasClass("clickFocus")) {
				// 	_close(e);
    //                 console.log("close selecter");
				// }
				// else if (data.$selecter.hasClass("closed") && data.$selecter.hasClass("clickFocus")) {
				// 	_open(e);
    //                 console.log("open selecter");
				// }
			}
		}
	}

		// Handle input
	function _handleInput(e) {
		// console.log("_handleInput");
		e.preventDefault();
		e.stopPropagation();

		var data = e.data;
		var selectedStr = $(this).html();
		if (data.inputFilter && !$(this).children().is("input")){
			if(data.multiple){
				$(this).html('<input type="text" placeholder="'+selectedStr+'" value=""/>');
			}
			else{
				$(this).html('<input type="text" value="'+selectedStr+'"/>');
			}
			// if(navigator.appVersion.indexOf("MSIE 8.")==-1){
			// 	$(this).children("input").attr("oninput","$(this).trigger('change')");
			// }
			// else{
			// 	$(this).children("input").attr("onpropertychange","$(this).trigger('change')");
			// }
		}
		if (!data.$selectEl.is(":disabled")) {
			$(".selecter").not(data.$selecter).trigger("selecter-close", [data]);
			// Handle mobile
			if (isMobile) {

			} else {
				// Delegate intent
				if (data.$selecter.hasClass("closed")) {
					_open(e);

				}
				// if (data.$selecter.hasClass("open") && data.$selecter.hasClass("focus")) {
				// 	data.$selecter.addClass("clickFocus");
				// }
				// else if (data.$selecter.hasClass("closed") && data.$selecter.hasClass("focus") && data.$selecter.hasClass("clickFocus")) {
				// 	_open(e);
				// }

			}
		}
		$(this).children("input").focus();
		data.$selecter.addClass("focus");
		if(data.multiple && $(this).children("input").val()==""){
			data.$items.removeClass("hiddenItem");
			data.$items.removeClass("filterSelected");
			data.$items.not(".hiddenItem").eq(0).addClass("filterSelected");
		}
		data.$selected.children("input").keyup(function(){
			var inputStr = data.$selected.children("input").val().toUpperCase();
				// Search for input from original index
			for (i = 0; i < data.$items.length; i++) {
				var optString = data.$optionEls.eq(i).text().toUpperCase();
				if (optString.indexOf(inputStr) ==-1) {
					data.$items.eq(i).addClass("hiddenItem");
				}
				else{
					data.$items.eq(i).removeClass("hiddenItem");
				}
			}
			if(!data.multiple){
				data.$items.removeClass("selected");
				data.$items.not(".hiddenItem").eq(0).addClass("selected");
			}
			else{
				data.$items.removeClass("filterSelected");
				data.$items.not(".hiddenItem").eq(0).addClass("filterSelected");
			}

		});
		data.$selected.on("keydown.selecter-" + data.guid, data, _inputKeypress);
	}

	function _groupViewOnmouse(e) {
		// console.log("_groupViewOnmouse");
		e.preventDefault();
		e.stopPropagation();

        if($(this).children().hasClass("icon-plus")){
            $(this).children("i").attr("class","icon-minus");
            $(this).parent().children(".group-item.sgroup-"+$(this).attr("sgroup")).css("display","inline-block");
        }
        else{
            $(this).children("i").attr("class","icon-plus");
            $(this).parent().children(".group-item.sgroup-"+$(this).attr("sgroup")).css("display","none");
        }
        // $(this).addClass("group-onmouse");
        // $(this).children("i").attr("class","icon-minus");
        // $(this).parent().children(".group-item.sgroup-"+$(this).text()).addClass("group-onmouse");
        // $(this).parent().children(".group-item.sgroup-"+$(this).text()).css("display","inline-block");


	}
	
	// function _groupViewOutmouse(e) {
	// 	e.preventDefault();
	// 	e.stopPropagation();
 //        $(this).removeClass("group-onmouse");
 //        $(this).children("i").attr("class","icon-plus");
 //        $(this).parent().children(".group-item.sgroup-"+$(this).text()).removeClass("group-onmouse");
 //        $(this).parent().children(".group-item.sgroup-"+$(this).text()).css("display","none");
	// }
	// function _groupItemOnmouse(e) {
	// 	var strClass = $(this).attr("sgroup");
 //        $(this).parent().children("[sgroup="+strClass+"]").addClass("group-onmouse");
 //        $(this).parent().children("[sgroup="+strClass+"]").css("display","inline-block");
 //        $(this).parent().children(".selecter-group[sgroup="+strClass+"]").children("i").attr("class","icon-minus");
	// }
	// function _groupItemOutmouse(e) {
	// 	var strClass = $(this).attr("sgroup");
 //        $(this).parent().children("[sgroup="+strClass+"]").removeClass("group-onmouse");
 //        $(this).parent().children(".group-item[sgroup="+strClass+"]").css("display","none");
 //        $(this).parent().children(".selecter-group[sgroup="+strClass+"]").children("i").attr("class","icon-plus");

	// }

	// Open Options
	function _open(e) {
		// console.log("_open");
		e.preventDefault();
		e.stopPropagation();

		var data = e.data;

		// Make sure it's not alerady open
		if (!data.$selecter.hasClass("open")) {
			var selectOffset = data.$selecter.offset(),
				bodyHeight = $("body").outerHeight(),
				optionsHeight = data.$itemsWrapper.outerHeight(true);

			// Calculate bottom of document if not mobile
			if (selectOffset.top + optionsHeight > bodyHeight && isMobile) {
				data.$selecter.addClass("bottom");
			} else {
				data.$selecter.removeClass("bottom");
			}

			data.$itemsWrapper.show();

			// Bind Events
			data.$selecter.removeClass("closed").addClass("open");
			data.$items.removeClass("hiddenItem");
			if(data.inputFilter && !data.multiple){
				data.$selected.on("keydown.selecter-" + data.guid, data, _inputKeypress);
			}
			else if(data.multiple){


				if(data.inputFilter){
					// data.$selected.on("keydown.selecter-" + data.guid, data, _inputKeypress);
				}
				// data.$itemsWrapper.on("click",".selectFilterBtn a.ok",function(){

				// 	var $selectedOptsArry = data.$selecter.find(".selected");
				// 	var multiSelectIdStr = data.$selectEl.attr("id")==undefined?"undefined":data.$selectEl.attr("id");
				// 	data.$optionEls.prop("selected", false);
				// 	if($selectedOptsArry.length==0){
				// 		data.$selected.html("");
				// 		data.$selected.attr("title","");
				// 		data.$selectEl.trigger("change", [ true ]);
				// 	}
				// 	for(var i=0; i<$selectedOptsArry.length; i++){
				// 		var updateIndex = $selectedOptsArry[i].children[0].id.slice(multiSelectIdStr.length)-0;
				// 		_update(updateIndex, data, false);
				// 	}
				// 	_close(e);
				// });
				// data.$itemsWrapper.on("click",".selectFilterBtn a.cancel",function(){
				// 	data.$items.children("input").prop("checked",false);
    //                 data.$items.removeClass("selected");
    //                 for(var i=0; i<data.$optionEls.filter(":selected").length; i++ ){
				// 		data.$items.eq(data.$optionEls.filter(":selected").eq(i).index()).addClass("selected");
				// 		data.$items.eq(data.$optionEls.filter(":selected").eq(i).index()).children("input").prop("checked",true);
    //                 }
				// });
				// data.$itemsWrapper.on("click",".selectFilterBtn a.clear",function(){
				// 	data.$items.children("input").prop("checked",false);
    //                 data.$items.removeClass("selected");
				// });

			}
			else{
					 // .on("keydown.selecter-" + data.guid, data, _keypress);
			}
			 $("body").on("click.selecter-" + data.guid, ":not(.selecter-options)", data, _closeListener);
			if ($.fn.scroller != undefined) {
				data.$itemsWrapper.scroller("reset");
			}
		}
	}

	// Close Options
	function _close(e) {
		e.preventDefault();
		e.stopPropagation();

		var data = e.data;
		// console.log(" closed");
		// Make sure it's actually open
		if (data.$selecter.hasClass("open")) {
			data.$itemsWrapper.hide();
			data.$selecter.removeClass("open").addClass("closed");
			$("body").off(".selecter-" + data.guid);
			if(data.inputFilter && !data.multiple){
				var inputStr = data.$selected.children("input").val();
				if(inputStr!=undefined){
					var selectedStr = data.$items.filter(".selected").text().toUpperCase();
					if(selectedStr!=inputStr.toUpperCase()){
						data.$items.removeClass("selected");
						data.$items.eq(data.$selectEl[0].selectedIndex).addClass("selected");
					}
					data.$selected.html(data.$items.filter(".selected").text());
				}
			}
			else if(data.inputFilter && data.multiple){
				data.$selected.html(data.$selected.attr("title"));
				// data.$items.children("input").prop("checked",false);
    //             data.$items.removeClass("selected");
    //             for(var i=0; i<data.$optionEls.filter(":selected").length; i++ ){
				// 	data.$items.eq(data.$optionEls.filter(":selected").eq(i).index()).addClass("selected");
				// 	data.$items.eq(data.$optionEls.filter(":selected").eq(i).index()).children("input").prop("checked",true);
    //             }

			}
		}
	}

	// Close listener
	function _closeListener(e) {
		
		// console.log("_closeListener");
		if ($(e.currentTarget).parents(".selecter").length == 0) {
			e.preventDefault();
			e.stopPropagation();
			_close(e);
			// console.log("_closeListener closed");
		}
	}

	// Select option
	function _select(e) {
		// console.log("_select");
		e.preventDefault();
		e.stopPropagation();

		var $target = $(this),
		data = e.data;

		if (!data.$selectEl.is(":disabled")) {
			if (data.links) {
				// Open link
				_launch($target.attr("href"), data.externalLinks);
			} else {
				if (data.$itemsWrapper.is(":visible")) {
					// Update
					var index = data.$items.index($target);
					_update(index, data, false);
				}
			}

			if (!data.multiple) {
				// Clean up
				_close(e);
				// console.log("_select closed");
			}
		}
	}

		// Check select option
	function _checkSelect(e) {
		// console.log("_checkSelect");
		e.preventDefault();
		e.stopPropagation();
		var $target = $(this),
		data = e.data;
		if (!data.$selectEl.is(":disabled")) {
			if (data.links) {
				// Open link
				_launch($target.attr("href"), data.externalLinks);
			} else {
				if (data.$itemsWrapper.is(":visible")) {
					// Update
					var index = data.$items.index($target);

                    if($(this).children("input").prop("checked")){
                        // $(this).children().first().removeClass("ccheckclass");
                        $(this).children("input").prop("checked",false);
                        // $(this).removeClass("selected");
                        if((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)){
                        	$(this).children("label").children("span").removeClass("ccheckclass");
                        }
                    }
                    else{
                        // $(this).children().first().addClass("ccheckclass");
                        $(this).children("input").prop("checked",true);
                        if((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)){
                        	$(this).children("label").children("span").addClass("ccheckclass");
                        }
                        // $(this).addClass("selected");
                    }
					_update(index, data, false);
				}
			}
		}
	}
	// Handle outside changes
	function _change(e, internal) {
		// console.log("_change");
		if (!internal) {
			var $target = $(this),
				data = e.data;

			// Mobile link support
			if (data.links) {
				_launch($target.attr("href"), data.externalLinks);
			} else {
				// Otherwise update
				var index = data.$optionEls.index(data.$optionEls.filter("[value=" + $target.val() + "]"));
				_update(index, data, false);
			}
		}
	}

	// Handle focus
	function _focus(e) {
		 // console.log("_focus");
		e.preventDefault();
		e.stopPropagation();

		var data = e.data;

		if (!data.$selectEl.is(":disabled")) {
			data.$selecter.addClass("focus");
			$(".selecter").not(data.$selecter).trigger("selecter-close", [data]);
			if(data.multiple){
				// $("body").on("keydown.selecter-" + data.guid, data, _inputKeypress);
				// data.$selecter.on("keydown.selecter-" + data.guid, data, _inputKeypress);
			}
			else{
				// $("body").on("keydown.selecter-" + data.guid, data, _keypress);
				// data.$selecter.on("keydown.selecter-" + data.guid, data, _keypress);
			}
			
		}

	}

	// Handle blur
	function _blur(e) {
		 // console.log("_blur");
		e.preventDefault();
		e.stopPropagation();

		var data = e.data;
		data.$selecter.removeClass("focus");
		$(".selecter").not(data.$selecter).trigger("selecter-close", [data]);
		$("body").off(".selecter-" + data.guid);
		// $("body").on("click.selecter-" + data.guid, ":not(.selecter-options)", data, function(e){
		// 	if ($(e.currentTarget).parents(".selecter").length == 0) {
		// 	_close(e);
		// 	console.log("_closeListener closed");
		// }
		// });
		_close(e);
	}

	// Handle keydown on focus
	function _keypress(e) {
		//console.log("_keypress");
		var data = e.data;
		if (data.$selecter.hasClass("focus") && data.$selecter.hasClass("closed") && e.keyCode == 13) {
			_open(e);
			// $(".selecter").not(data.$selecter).trigger("selecter-close", [data]);
		}
		else if (data.$selecter.hasClass("focus") && data.$selecter.hasClass("open") && e.keyCode == 13) {
			if(!data.multiple){ ///temp for multiple up/down
				_update(data.index, data, false);
			}
			_close(e);
		} else if (data.$selecter.hasClass("open") && e.keyCode != 9 && (!e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey) && !data.multiple && !data.inputFilter) {
			// Ignore modifiers & tabs
			e.preventDefault();
			e.stopPropagation();

			var total = data.$items.length - 1,
				index = -1;

			// Firefox left/right support thanks to Kylemade
			if ($.inArray(e.keyCode, (isFirefox) ? [38, 40, 37, 39] : [38, 40]) > -1) {
				// Increment / decrement using the arrow keys
				index = data.index + ((e.keyCode == 38 || (isFirefox && e.keyCode == 37)) ? -1 : 1);
				if (index < 0) {
					index = 0;
				}
				if (index > total) {
					index = total;
				}
			} else {
				var input = String.fromCharCode(e.keyCode).toUpperCase();

				// Search for input from original index
				for (i = data.index + 1; i <= total; i++) {
					var letter = data.$optionEls.eq(i).text().charAt(0).toUpperCase();
					if (letter == input) {
						index = i;
						break;
					}
				}

				// If not, start from the beginning
				if (index < 0) {
					for (i = 0; i <= total; i++) {
						var letter = data.$optionEls.eq(i).text().charAt(0).toUpperCase();
						if (letter == input) {
							index = i;
							break;
						}
					}
				}
			}

			// Update
			if (index >= 0) {
				_update(index, data, !data.$selecter.hasClass("open"));
			}
		}
		// else if(e.keyCode == 9){
		// 	_open(e);
		// }
	}

	function _inputKeypress(e) {
		//console.log("_inputKeypress");
		var data = e.data;
		if (data.$selecter.hasClass("focus") && data.$selecter.hasClass("closed") && e.keyCode == 13) {
			_open(e);
			// $(".selecter").not(data.$selecter).trigger("selecter-close", [data]);
		}
		else if (data.$selecter.hasClass("focus") && data.$selecter.hasClass("open") && e.keyCode == 13) {
			// data.$items.removeClass("selected");
			// data.$items.not(".hiddenItem").eq(0).addClass("selected");
			// data.$items.filter(".selected").index();
			if(data.multiple){
				$(this).children("input").val(data.$items.filter(".filterSelected").text());
				// data.$items.filter(".filterSelected").addClass("selected");
				if(!data.$items.filter(".filterSelected").children("input").prop("checked")){
					data.$items.filter(".filterSelected").children("input").prop("checked",true);
					if((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)){
                        data.$items.filter(".filterSelected").children("label").children("span").addClass("ccheckclass");
                    }
					_update(data.$items.filter(".filterSelected").index()-1, data, false);
				}
				_open(e);
			}
			else{
				$(this).children("input").val(data.$items.filter(".selected").text());
				_update(data.$items.filter(".selected").index(), data, false);
				_close(e);
			}

		}
		// else if(e.keyCode == 9){
		// 	_open(e);
		// }
		// else if(e.keyCode == 8){

		// }else if (e.keyCode != 9 && (!e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey)) {
		// 	// Ignore modifiers & tabs
		// 	e.preventDefault();
		// 	e.stopPropagation();

		// 	var total = data.$items.length,
		// 		index = -1;
		// 	// Firefox left/right support thanks to Kylemade
		// 	if ($.inArray(e.keyCode, (isFirefox) ? [38, 40, 37, 39] : [38, 40]) > -1) {
		// 		// Increment / decrement using the arrow keys
		// 		// index = data.index + ((e.keyCode == 38 || (isFirefox && e.keyCode == 37)) ? -1 : 1);
		// 		// if (index < 0) {
		// 		// 	index = 0;
		// 		// }
		// 		// if (index > total) {
		// 		// 	index = total;
		// 		// }
		// 	} else {
		// 		// var input = String.fromCharCode(e.keyCode).toUpperCase();
		// 		var inputStr = data.$selected.children("input").val().toUpperCase();
		// 		// Search for input from original index
		// 		for (i = 0; i < total; i++) {
		// 			var optString = data.$optionEls.eq(i).text().toUpperCase();
		// 			if (optString.indexOf(inputStr) ==-1) {
		// 				data.$items.eq(i).css("display","none");
		// 			}
		// 			else{
		// 				data.$items.eq(i).css("display","block");
		// 			}
		// 		}
		// 	}
		// }
	}

	// Update element value + DOM
	function _update(index, data, keypress) {
		// console.log("_update");
		var $item = data.$items.eq(index),
			isSelected = $item.hasClass("selected"),
			// allIndex = 	data.$items.filter(".selecter-item-all").index(),
			// isAllOption = $item.hasClass("selecter-item-all");
			allChecked = data.$itemsWrapper.children("div.selecter-all").children("input").prop("checked");
			// isAllOption = $item.hasClass("selecter-item-all");
		// Make sure we have a new index to prevent false 'change' triggers
		if (!isSelected && !data.multiple) {
			var newLabel = $item.html(),
				newValue = $item.data("value");

			// Modify DOM
			data.$selected.html(newLabel);
			data.$items.filter(".selected").removeClass("selected");
			if (!keypress/*  || (keypress && !isFirefox) */) {
				data.$selectEl[0].selectedIndex = index;
			}
			data.$selectEl.trigger("change", [ true ]);
			$item.addClass("selected");
			data.callback.call(data.$selecter, data.$selectEl.val(), index);
			data.index = index;
		}
		else if(data.inputFilter && !data.multiple){
			var newLabel = $item.html(),
				newValue = $item.data("value");

			// Modify DOM
			data.$selected.html(newLabel);
			// data.$items.filter(".selected").removeClass("selected");
			if (!keypress/*  || (keypress && !isFirefox) */) {
				data.$selectEl[0].selectedIndex = index;
			}
			data.$selectEl.trigger("change", [ true ]);
			$item.addClass("selected");
			data.callback.call(data.$selecter, data.$selectEl.val(), index);
			data.index = index;
		}
		// else if(data.inputFilter && data.multiple){
		// 	data.$optionEls.eq(index).prop("selected", true);
		// 	data.$selectEl.trigger("change", [ true ]);
		// 	selectedStr ="";
		// 	data.$optionEls.filter(":selected").each(function(){
		// 		selectedStr = selectedStr +this.text+";";
		// 	});
		// 	data.$selected.html(selectedStr.substring(0, selectedStr.lastIndexOf(";")));
		// 	data.$selected.attr("title",selectedStr.substring(0, selectedStr.lastIndexOf(";")));
		// }
		else if(data.multiple){

			// if(isAllOption && isSelected){
			// 	data.$optionEls.prop("selected",false);
			// 	data.$items.removeClass("selected");
			// }
			// else if(data.allValue!="undefined" && allChecked){
			// 	data.$optionEls.prop("selected",false);
			// 	data.$optionEls.eq(index).prop("selected", true);
			// 	data.$items.addClass("selected");
			// }
			if(isSelected){
				if(allChecked){
					data.$itemsWrapper.children("div.selecter-all").children("input").prop("checked", false);
					if((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1)){
                        data.$itemsWrapper.children("div.selecter-all").children("label").children("span").removeClass("ccheckclass");
                    }
					// data.$items.filter(".selecter-item-all").removeClass("selected");
					if(!data.allValue){
						data.$optionEls.prop("selected",true);
					}
				}
				data.$optionEls.eq(index).prop("selected", false);
				$item.removeClass("selected");
			}
			else{
				data.$optionEls.eq(index).prop("selected", true);
				$item.addClass("selected");
			}
			data.$selectEl.trigger("change", [ true ]);

			var selectedopts = data.$optionEls.filter(":selected") ;
			var selectedStr ="";
			// if(selectedopts.length < 1){
			// 	data.$selected.html(data.defaultLabel);
			// 	data.$selected.attr("title","");
			// }
			// else if(selectedopts.length ==1 ){
			// 	selectedopts.each(function(){
			// 		selectedStr = this.text;

			// 	});
			// 	data.$selected.html(selectedStr);
			// 	data.$selected.attr("title",selectedStr);
			// }
			// else{
			// 	selectedStr ="";
			// 	selectedopts.each(function(){
			// 		selectedStr = selectedStr +this.text+";";
			// 	});
			// 	data.$selected.html(selectedStr.substring(0, selectedStr.indexOf(";"))+"...");
			// 	data.$selected.attr("title",selectedStr.substring(0, selectedStr.lastIndexOf(";")));
			// }
			data.$optionEls.filter(":selected").each(function(){
				selectedStr = selectedStr +this.text+"; ";
			});
			data.$selected.html(selectedStr.substring(0, selectedStr.lastIndexOf(";")));
			data.$selected.attr("title",selectedStr.substring(0, selectedStr.lastIndexOf(";")));

			data.callback.call(data.$selecter, data.$selectEl.val(), index);
			data.index = index;
		}

		if(data.required || data.$selectEl.attr("required")=="required"){
			if(data.$selectEl.val()==null || data.$selectEl.val() ==""){
				data.$selecter.removeClass("valid");
				data.$selecter.addClass("invalid");
				// data.$selecter.focus();
			}
			else{
				data.$selecter.removeClass("invalid");
				data.$selecter.addClass("valid");
			}
		}
	}

	// Check label's length
	function _checkLength(length, text) {
		if (length === false) {
			return text;
		} else {
			if (text.length > length) {
				return text.substring(0, length) + "...";
			} else {
				return text;
			}
		}
	}

	// Launch link
	function _launch(link, external) {
		if (external) {
			// Open link in a new tab/window
			window.open(link);
		} else {
			// Open link in same tab/window
			window.location.href = link;
		}
	}
     /**
      * @method private
      * @name _trim
      * @description Trims text, if specified length is greater then 0
      * @param length [int] "Length to trim at"
      * @param text [string] "Text to trim"
      * @return [string] "Trimmed string"
      */
     function _trim(text, length) {
         if (length === 0) {
             return text;
         } else {
             if (text.length > length) {
                 return text.substring(0, length) + "...";
             } else {
                 return text;
             }
         }
     }
	// Define Plugin
	$.fn.selecter = function(method) {
		if (pub[method]) {
			return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return _init.apply(this, arguments);
		}
		return this;
	};

})(jq191);
