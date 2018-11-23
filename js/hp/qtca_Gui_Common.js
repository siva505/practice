/*!
 * common java script for qtca gui
 * This js file defines some generate functions for some common components
 * Date: Mon Mar 25 2013 21:13:05
 */

/*
 HTML5 Shiv v3.7.0 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
 define html5 tags for ie version under 9
*/
(function(l,f){function m(){var a=e.elements;return"string"==typeof a?a.split(" "):a}function i(a){var b=n[a[o]];b||(b={},h++,a[o]=h,n[h]=b);return b}function p(a,b,c){b||(b=f);if(g)return b.createElement(a);c||(c=i(b));b=c.cache[a]?c.cache[a].cloneNode():r.test(a)?(c.cache[a]=c.createElem(a)).cloneNode():c.createElem(a);return b.canHaveChildren&&!s.test(a)?c.frag.appendChild(b):b}function t(a,b){if(!b.cache)b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag();
a.createElement=function(c){return!e.shivMethods?b.createElem(c):p(c,a,b)};a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){b.createElem(a);b.frag.createElement(a);return'c("'+a+'")'})+");return n}")(e,b.frag)}function q(a){a||(a=f);var b=i(a);if(e.shivCSS&&!j&&!b.hasCSS){var c,d=a;c=d.createElement("p");d=d.getElementsByTagName("head")[0]||d.documentElement;c.innerHTML="x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>";
c=d.insertBefore(c.lastChild,d.firstChild);b.hasCSS=!!c}g||t(a,b);return a}var k=l.html5||{},s=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,r=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,j,o="_html5shiv",h=0,n={},g;(function(){try{var a=f.createElement("a");a.innerHTML="<xyz></xyz>";j="hidden"in a;var b;if(!(b=1==a.childNodes.length)){f.createElement("a");var c=f.createDocumentFragment();b="undefined"==typeof c.cloneNode||
"undefined"==typeof c.createDocumentFragment||"undefined"==typeof c.createElement}g=b}catch(d){g=j=!0}})();var e={elements:k.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:"3.7.0",shivCSS:!1!==k.shivCSS,supportsUnknownElements:g,shivMethods:!1!==k.shivMethods,type:"default",shivDocument:q,createElement:p,createDocumentFragment:function(a,b){a||(a=f);
if(g)return a.createDocumentFragment();for(var b=b||i(a),c=b.frag.cloneNode(),d=0,e=m(),h=e.length;d<h;d++)c.createElement(e[d]);return c}};l.html5=e;q(f)})(this,document);


(function($) {
        
    
    this.hideAllMessages=function(myMessages)
    {
        var messagesHeights = new Array(); // this array will store height for each
        for (i=0; i<myMessages.length; i++) {
            messagesHeights[i] = $('.' +myMessages[i]).outerHeight(); // fill array
            $('.' + myMessages[i]).css('top',-messagesHeights[i]); //move element outside viewport
        }
    }
    this.showMessage=function(type) {
        $('.'+ type +'-trigger').click(function(){
            hideAllMessages();
            $('.'+type).animate({top:"0"}, 500);
        });
    }

    this.showPageNation=function(totalResults,showLength){
        totalPage=Math.ceil(totalResults/showLength);
        if(totalPage<5){
            for(var i=5; i>totalPage; i--){
                $(".pageNationDiv").eq(0).find("[name="+i+"]").remove();
            }
        }
        if (totalPage>5) {
            if (currentPage<=3){
                $(".pageNationDiv").eq(0).find("[name='1']").val(1);
                $(".pageNationDiv").eq(0).find("[name='2']").val(2);
                $(".pageNationDiv").eq(0).find("[name='3']").val(3);
                $(".pageNationDiv").eq(0).find("[name='4']").val(4);
                $(".pageNationDiv").eq(0).find("[name='5']").val(5);
            }
            if (currentPage>3 && (currentPage+2)<totalPage) {
                $(".pageNationDiv").eq(0).find("[name='1']").val(currentPage-2);
                $(".pageNationDiv").eq(0).find("[name='2']").val(currentPage-1);
                $(".pageNationDiv").eq(0).find("[name='3']").val(currentPage);
                $(".pageNationDiv").eq(0).find("[name='4']").val(currentPage+1);
                $(".pageNationDiv").eq(0).find("[name='5']").val(currentPage+2);
            }
            if ((currentPage+2)>=totalPage) {
                $(".pageNationDiv").eq(0).find("[name='1']").val(totalPage-4);
                $(".pageNationDiv").eq(0).find("[name='2']").val(totalPage-3);
                $(".pageNationDiv").eq(0).find("[name='3']").val(totalPage-2);
                $(".pageNationDiv").eq(0).find("[name='4']").val(totalPage-1);
                $(".pageNationDiv").eq(0).find("[name='5']").val(totalPage);
            }
        }
        if (currentPage==1) {
            $(".pageNationDiv .pageBtn[name='firstBtn']").attr("disabled",true);
            $(".pageNationDiv .pageBtn[name='previousBtn']").attr("disabled",true);
            $(".pageNationDiv .pageBtn[name='nextBtn']").attr("disabled",false);
            $(".pageNationDiv .pageBtn[name='lastBtn']").attr("disabled",false);

        }
        else if (currentPage==totalPage) {
            $(".pageNationDiv .pageBtn[name='firstBtn']").attr("disabled",false);
            $(".pageNationDiv .pageBtn[name='previousBtn']").attr("disabled",false);
            $(".pageNationDiv .pageBtn[name='nextBtn']").attr("disabled",true);
            $(".pageNationDiv .pageBtn[name='lastBtn']").attr("disabled",true);
        }
        else if (totalPage==1) {
            $(".pageNationDiv .pageBtn[name='firstBtn']").attr("disabled",true);
            $(".pageNationDiv .pageBtn[name='previousBtn']").attr("disabled",true);
            $(".pageNationDiv .pageBtn[name='nextBtn']").attr("disabled",true);
            $(".pageNationDiv .pageBtn[name='lastBtn']").attr("disabled",true);
        }
        else{
            $(".pageNationDiv .pageBtn[name='firstBtn']").attr("disabled",false);
            $(".pageNationDiv .pageBtn[name='previousBtn']").attr("disabled",false);
            $(".pageNationDiv .pageBtn[name='nextBtn']").attr("disabled",false);
            $(".pageNationDiv .pageBtn[name='lastBtn']").attr("disabled",false);
        }
        $(".pageNationDiv div.dataTables_info").html("<span class='number_highlight'>"+totalResults+"</span> items, <span class='number_highlight'>"+totalPage+"</span> pages");
         $(".pageNationDiv input.gotoPage_Txt").val(currentPage);
         $(".pageNationDiv .pageNumber").each(function(){
            if($(this).val()==currentPage){
                $(this).addClass("selectedPage").siblings().removeClass("selectedPage");
            }
         });
    }
    $(document).on("click",".pageNationDiv .pageChange",function(event){
        var pageValue =this.value;
        if(pageValue=="<<"){
            currentPage=1;
        }
        else if (pageValue==">>") {currentPage=totalPage;}
        else if (pageValue=="<") {currentPage=currentPage-1;}
        else if (pageValue==">") {currentPage=currentPage+1;}
        else{
            currentPage=parseInt(pageValue);
        }
        showPageNation(95,10);  //for example:totalResults is 95, each page show 10 results

     });
     $(document).on("click",".pageNationDiv #search_goTO_btn",function(event){
            var pageNumber =  $(".pageNationDiv").find("input.gotoPage_Txt").val();
            if (parseInt(pageNumber) ==pageNumber)
            {   
                pageNumber=parseInt(pageNumber);
                if(pageNumber < 1){
                    currentPage=1;
                }
                else if(pageNumber > totalPage){
                    currentPage=totalPage;
                }
                else{currentPage=parseInt(pageNumber);}
                showPageNation(95,10);
            }
            else{
                return false;
            }
        });
    //pagination function end
    //toggle control
    $(document).css("cursor", "pointer").on("click",".toggle .textdiv",function(event){
        if (!$(this).parent().next().prop("checked")) {
            $(".toggle .textdiv").removeClass("selectedToggle");
             $(this).parent().next().prop("checked", true);
             $(this).addClass("selectedToggle");
             $(this).parent().next().trigger("change", [true]);
        }
    });

    //change inputs class according its values when it has placeHolder feature
    this.initialPlaceHolderChange = function(){
        $('[placeholder]').addClass('placeholder');
         $('[placeholder]').each(function(){
            var input = $(this);
            if (input.val() != input.attr('placeholder')) {
                input.removeClass('placeholder');
            }
         });
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    if(!input.hasClass('placeholder')){
                        input.addClass('placeholder');
                    }
                    input.val(input.attr('placeholder'));
                }
            }).blur();
        $('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }
    //menu active class
    //accordion slide function
    $(document).css("cursor", "pointer").on("click",".udkmenu > li > a",function(event){
        if(!$(this).parent().hasClass('active')) {
            $(".udkmenu > li").removeClass('active');
            $(this).parent().addClass('active');
        }
    });
    $(document).css("cursor", "pointer").on("click",".udkmenu > li > ul > li > a",function(event){
        if(!$(this).parent().parent().parent().hasClass('active')) {
            $(".udkmenu > li").removeClass('active');
            $(this).parent().parent().parent().addClass('active');
        }
    });
    //accordion slide function
    

    $(document).on("click",".control-accordion .accordion-icon",function(event){
        var accordionId = $(this).parent().parent("div.accordion").attr("id");
        if(accordionId==""||accordionId ==null){
            accordionId="";
        }
        else{
            accordionId="#"+accordionId;
        }
        if ($(this).hasClass("icon-plus")) {
            $(this).removeClass("icon-plus");
            $(this).addClass("icon-minus");
            $(this).next("span").html("Collapse All");
            // $(this).parent().parent(".accordion").find("section").
            $(accordionId+ ".accordion section h2 + div").slideDown();
            $(accordionId+ ".accordion section h2 .accordion-icon").removeClass("icon-plus");
            $(accordionId+ ".accordion section h2 .accordion-icon").addClass("icon-minus");
        }
        else{
            $(this).removeClass("icon-minus");
            $(this).addClass("icon-plus");
            $(this).next("span").html("Expand All");
            $(accordionId+ ".accordion section h2 + div").slideUp();
            $(accordionId+ ".accordion section h2 .accordion-icon").removeClass("icon-minus");
            $(accordionId+ ".accordion section h2 .accordion-icon").addClass("icon-plus");

        }
    });
    $(document).on("click",".accordion section h2",function(event){
        if ($(this).children().hasClass("icon-minus")) {
            $(this).next().slideUp();
            $(this).find(".accordion-icon").removeClass("icon-minus");
            $(this).find(".accordion-icon").addClass("icon-plus");
        }
        else if($(this).children().hasClass("icon-plus")){
            $(this).next().slideDown();
            $(this).find(".accordion-icon").removeClass("icon-plus");
            $(this).find(".accordion-icon").addClass("icon-minus");
        }
        var $accordionSections = $(this).parent().parent();
        var $controlAllIcon = $accordionSections.children(".control-accordion").children(".accordion-icon");
        if($accordionSections.children("section").find(".accordion-icon").hasClass("icon-plus") && 
            !$accordionSections.children("section").find(".accordion-icon").hasClass("icon-minus")){
            if($controlAllIcon.hasClass("icon-minus")){
                $controlAllIcon.removeClass("icon-minus");
                $controlAllIcon.addClass("icon-plus");
                $controlAllIcon.next("span").html("Expand All");
            }
        }
        if($accordionSections.children("section").find(".accordion-icon").hasClass("icon-minus") && 
            !$accordionSections.children("section").find(".accordion-icon").hasClass("icon-plus")){
            if($controlAllIcon.hasClass("icon-plus")){
                $controlAllIcon.removeClass("icon-plus");
                $controlAllIcon.addClass("icon-minus");
                $controlAllIcon.next("span").html("Collapse All");
            }
        }
    });   
    //dropdown button function
    $(document).css("cursor", "pointer").on("click",".dropdown-toggle",function(event){
        $(".dropdown-menu").slideToggle();
    });

// this.callbackForAll=function (){
//   var $moptionEls = this.prev().find("option"),
//       $mitems = this.find(".selecter-item"),
//      $mitemSelected = this.find(".selected"),
//      $allItem = this.find(".selecter-item-all"),
//      $mselecterBox = this.find(".selecter-selected");
//     if($mitemSelected.filter(".selecter-item-all").length ){
//         this.prev().val($allItem.attr("data-value"));
//         $mselecterBox.html($allItem.html());
//         $mselecterBox.attr("title",$allItem.html());
//     }
//     else{
//         $allItem.removeClass("selected");
//         var titleStr="";
//         if($mitemSelected.length==0){
//             $mselecterBox.html(titleStr);
//         }
//         $mitemSelected.each(function(i){
//           if(i==0){
//             titleStr = $mitemSelected.eq(0).html();
//             $mselecterBox.html(titleStr);
//           }
//           else{
//             titleStr = titleStr +";"+$mitemSelected.eq(i).html();
//              $mselecterBox.html($mitemSelected.eq(0).html()+"...");
//           }
//        });
//         $mselecterBox.attr("title",titleStr);

//     }
    

// }

		this.country = [   {"code":"AD","name":"Andorra"},{"code":"AE","name":"United Arab Emirates"},{"code":"AF","name":"Afghanistan"},
		{"code":"AG","name":"Antigua and Barbuda"},{"code":"AI","name":"Anguilla"},{"code":"AL","name":"Albania"},
		{"code":"AM","name":"Armenia"},{"code":"AO","name":"Angola"},{"code":"AQ","name":"Antarctica"},
		{"code":"AR","name":"Argentina"},{"code":"AS","name":"American Samoa"},
		{"code":"AT","name":"Austria"},{"code":"AU","name":"Australia"},{"code":"AW","name":"Aruba"},
		{"code":"AX","name":"Aland Islands"},{"code":"AZ","name":"Azerbaijan"},{"code":"BA","name":"Bosnia and Herzegovina"},
		{"code":"BB","name":"Barbados"},{"code":"BD","name":"Bangladesh"},{"code":"BE","name":"Belgium"},
		{"code":"BF","name":"Burkina Faso"},{"code":"BG","name":"Bulgaria"},{"code":"BH","name":"Bahrain"},
		{"code":"BI","name":"Burundi"},{"code":"BJ","name":"Benin"},{"code":"BL","name":"Saint Barthelemy"},
		{"code":"BM","name":"Bermuda"},{"code":"BN","name":"Brunei Darussalam"},{"code":"BO","name":"Bolivia, Plurinational State of"},
		{"code":"BQ","name":"Bonaire, Sint Eustatius and Saba"},
		{"code":"BR","name":"Brazil"},{"code":"BS","name":"Bahamas"},{"code":"BT","name":"Bhutan"},
		{"code":"BV","name":"Bouvet Island"},{"code":"BW","name":"Botswana"},{"code":"BY","name":"Belarus"},
		{"code":"BZ","name":"Belize"},{"code":"CA","name":"Canada"},
		{"code":"CC","name":"Cocos (Keeling) Islands"},{"code":"CD","name":"Congo, the Democratic Republic of the"},{"code":"CF","name":"Central African Republic"},
		{"code":"CG","name":"Congo"},{"code":"CH","name":"Switzerland"},{"code":"CI","name":"Cote d'Ivoire"},
		{"code":"CK","name":"Cook Islands"},{"code":"CL","name":"Chile"},{"code":"CM","name":"Cameroon"},
		{"code":"CN","name":"China"},{"code":"CO","name":"Colombia"},{"code":"CR","name":"Costa Rica"},
		{"code":"CU","name":"Cuba"},{"code":"CV","name":"Cape Verde"},{"code":"CW","name":"Curacao"},
		{"code":"CX","name":"Christmas Island"},{"code":"CY","name":"Cyprus"},{"code":"CZ","name":"Czech Republic"},
		{"code":"DE","name":"Germany"},{"code":"DJ","name":"Djibouti"},
		{"code":"DK","name":"Denmark"},{"code":"DM","name":"Dominica"},{"code":"DO","name":"Dominican Republic"},
		{"code":"DZ","name":"Algeria"},{"code":"EC","name":"Ecuador"},{"code":"EE","name":"Estonia"},
		{"code":"EG","name":"Egypt"},{"code":"EH","name":"Western Sahara"},{"code":"ER","name":"Eritrea"},
		{"code":"ES","name":"Spain"},{"code":"ET","name":"Ethiopia"},{"code":"FI","name":"Finland"},
		{"code":"FJ","name":"Fiji"},{"code":"FK","name":"Falkland Islands (Malvinas)"},{"code":"FM","name":"Micronesia, Federated States of"},
		{"code":"FO","name":"Faroe Islands"},{"code":"FR","name":"France"},{"code":"GA","name":"Gabon"},
		{"code":"GB","name":"United Kingdom"},{"code":"GD","name":"Grenada"},
		{"code":"GE","name":"Georgia"},{"code":"GF","name":"French Guiana"},{"code":"GG","name":"Guernsey"},
		{"code":"GH","name":"Ghana"},{"code":"GI","name":"Gibraltar"},{"code":"GL","name":"Greenland"},
		{"code":"GM","name":"Gambia"},{"code":"GN","name":"Guinea"},{"code":"GP","name":"Guadeloupe"},
		{"code":"GQ","name":"Equatorial Guinea"},{"code":"GR","name":"Greece"},{"code":"GS","name":"South Georgia and the South Sandwich Islands"},
		{"code":"GT","name":"Guatemala"},{"code":"GU","name":"Guam"},{"code":"GW","name":"Guinea-Bissau"},
		{"code":"GY","name":"Guyana"},{"code":"HK","name":"Hong Kong"},{"code":"HM","name":"Heard Island and McDonald Islands"},
		{"code":"HN","name":"Honduras"},{"code":"HR","name":"Croatia"},{"code":"HT","name":"Haiti"},
		{"code":"HU","name":"Hungary"},{"code":"ID","name":"Indonesia"},{"code":"IE","name":"Ireland"},
		{"code":"IL","name":"Israel"},{"code":"IM","name":"Isle of Man"},{"code":"IN","name":"India"},
		{"code":"IO","name":"British Indian Ocean Territory"},{"code":"IQ","name":"Iraq"},{"code":"IR","name":"Iran, Islamic Republic of"},
		{"code":"IS","name":"Iceland"},{"code":"IT","name":"Italy"},{"code":"JE","name":"Jersey"},
		{"code":"JM","name":"Jamaica"},{"code":"JO","name":"Jordan"},{"code":"JP","name":"Japan"},
		{"code":"KE","name":"Kenya"},{"code":"KG","name":"Kyrgyzstan"},{"code":"KH","name":"Cambodia"},
		{"code":"KI","name":"Kiribati"},{"code":"KM","name":"Comoros"},
		{"code":"KN","name":"Saint Kitts and Nevis"},{"code":"KP","name":"Korea, Democratic People's Republic of"},{"code":"KR","name":"Korea, Republic of"},
		{"code":"KW","name":"Kuwait"},{"code":"KY","name":"Cayman Islands"},{"code":"KZ","name":"Kazakhstan"},
		{"code":"LA","name":"Lao People's Democratic Republic"},{"code":"LB","name":"Lebanon"},{"code":"LC","name":"Saint Lucia"},
		{"code":"LI","name":"Liechtenstein"},{"code":"LK","name":"Sri Lanka"},{"code":"LR","name":"Liberia"},
		{"code":"LS","name":"Lesotho"},{"code":"LT","name":"Lithuania"},{"code":"LU","name":"Luxembourg"},
		{"code":"LV","name":"Latvia"},{"code":"LY","name":"Libya"},{"code":"MA","name":"Morocco"},
		{"code":"MC","name":"Monaco"},{"code":"MD","name":"Moldova, Republic of"},{"code":"ME","name":"Montenegro"},
		{"code":"MF","name":"Saint Martin (French part)"},{"code":"MG","name":"Madagascar"},{"code":"MH","name":"Marshall Islands"},
		{"code":"MK","name":"Macedonia, the former Yugoslav Republic of"},{"code":"ML","name":"Mali"},
		{"code":"MM","name":"Myanmar"},{"code":"MN","name":"Mongolia"},{"code":"MO","name":"Macao"},
		{"code":"MP","name":"Northern Mariana Islands"},{"code":"MQ","name":"Martinique"},{"code":"MR","name":"Mauritania"},
		{"code":"MS","name":"Montserrat"},{"code":"MT","name":"Malta"},{"code":"MU","name":"Mauritius"},
		{"code":"MV","name":"Maldives"},{"code":"MW","name":"Malawi"},{"code":"MX","name":"Mexico"},
		{"code":"MY","name":"Malaysia"},{"code":"MZ","name":"Mozambique"},{"code":"NA","name":"Namibia"},
		{"code":"NC","name":"New Caledonia"},{"code":"NE","name":"Niger"},{"code":"NF","name":"Norfolk Island"},
		{"code":"NG","name":"Nigeria"},{"code":"NI","name":"Nicaragua"},{"code":"NL","name":"Netherlands"},
		{"code":"NO","name":"Norway"},{"code":"NP","name":"Nepal"},{"code":"NR","name":"Nauru"},
		{"code":"NU","name":"Niue"},{"code":"NZ","name":"New Zealand"},{"code":"OM","name":"Oman"},
		{"code":"PA","name":"Panama"},{"code":"PE","name":"Peru"},{"code":"PF","name":"French Polynesia"},
		{"code":"PG","name":"Papua New Guinea"},{"code":"PH","name":"Philippines"},{"code":"PK","name":"Pakistan"},
		{"code":"PL","name":"Poland"},{"code":"PM","name":"Saint Pierre and Miquelon"},{"code":"PN","name":"Pitcairn"},
		{"code":"PR","name":"Puerto Rico"},{"code":"PS","name":"Palestine, State of"},
		{"code":"PT","name":"Portugal"},{"code":"PW","name":"Palau"},{"code":"PY","name":"Paraguay"},
		{"code":"QA","name":"Qatar"},{"code":"RE","name":"Reunion"},{"code":"RO","name":"Romania"},
		{"code":"RS","name":"Serbia"},{"code":"RU","name":"Russian Federation"},{"code":"RW","name":"Rwanda"},
		{"code":"SA","name":"Saudi Arabia"},{"code":"SB","name":"Solomon Islands"},{"code":"SC","name":"Seychelles"},
		{"code":"SD","name":"Sudan"},{"code":"SE","name":"Sweden"},{"code":"SG","name":"Singapore"},
		{"code":"SH","name":"Saint Helena, Ascension and Tristan da Cunha"},{"code":"SI","name":"Slovenia"},{"code":"SJ","name":"Svalbard and Jan Mayen"},
		{"code":"SK","name":"Slovakia"},{"code":"SL","name":"Sierra Leone"},{"code":"SM","name":"San Marino"},
		{"code":"SN","name":"Senegal"},{"code":"SO","name":"Somalia"},{"code":"SR","name":"Suriname"},
		{"code":"SS","name":"South Sudan"},{"code":"ST","name":"Sao Tome and Principe"},{"code":"SV","name":"El Salvador"},
		{"code":"SX","name":"Sint Maarten (Dutch part)"},{"code":"SY","name":"Syrian Arab Republic"},{"code":"SZ","name":"Swaziland"},
		{"code":"TC","name":"Turks and Caicos Islands"},{"code":"TD","name":"Chad"},{"code":"TF","name":"French Southern Territories"},
		{"code":"TG","name":"Togo"},{"code":"TH","name":"Thailand"},
		{"code":"TJ","name":"Tajikistan"},{"code":"TK","name":"Tokelau"},{"code":"TL","name":"Timor-Leste"},
		{"code":"TM","name":"Turkmenistan"},{"code":"TN","name":"Tunisia"},{"code":"TO","name":"Tonga"},
		{"code":"TR","name":"Turkey"},{"code":"TT","name":"Trinidad and Tobago"},{"code":"TV","name":"Tuvalu"},
		{"code":"TW","name":"Taiwan, Province of China"},{"code":"TZ","name":"Tanzania, United Republic of"},
		{"code":"UA","name":"Ukraine"},{"code":"UG","name":"Uganda"},
		{"code":"UM","name":"United States Minor Outlying Islands"},{"code":"US","name":"United States"},{"code":"UY","name":"Uruguay"},
		{"code":"UZ","name":"Uzbekistan"},{"code":"VA","name":"Holy See (Vatican City State)"},
		{"code":"VC","name":"Saint Vincent and the Grenadines"},{"code":"VE","name":"Venezuela, Bolivarian Republic of"},{"code":"VG","name":"Virgin Islands, British"},
		{"code":"VI","name":"Virgin Islands, U.S."},{"code":"VN","name":"Viet Nam"},{"code":"VU","name":"Vanuatu"},
		{"code":"WF","name":"Wallis and Futuna"},{"code":"WS","name":"Samoa"},{"code":"YE","name":"Yemen"},
		{"code":"YT","name":"Mayotte"},{"code":"ZA","name":"South Africa"},
		{"code":"ZM","name":"Zambia"},{"code":"ZW","name":"Zimbabwe"},{"code":"CS","name":"Serbia and Montenegro"},{"code":"KV","name":"Kosovo"}];
		
		this.codeOrder = country.sort(  
		  function(a, b){  
		  	if(a.name < b.name) return -1;  
		    if(a.name > b.name) return 1;  
		    return 0;  
		  }  
		);
	
		this.generateSelectOptionwithjson = function(selectClass,optionArray,defaultVal){
				$("select."+selectClass).empty();
				var returnString = '';//"<option value='' selected>All</option>";
				$.each(codeOrder,  
					function(index, value){  
		  				if(value.code == 'All'){
							returnString += '<option value="" selected>'+value.name+'</option>';
						}else{
							returnString += '<option value="'+value.code+'">'+value.name+'</option>';
						}
		  			}  
				);    
				
				$("select."+selectClass).append(returnString);
			}
			
			
			
			
	/**
	 * [CREATE MAIN FIELDSET FUNCTION]
	 * @PARAMETER: obj   TYPE: Object
	 * @EXAMPLE:
	 * 	$(CLASSNAME || ID NAME).fieldset({
	 *		fieldsetID: "",  	{TYPE: STRING}
	 *		divID: "",			{TYPE: STRING}
	 *		value: ""			{TYPE: STRING}
	 *	});
	 */
	$.fn.fieldset = function(obj) {
		// DEFINE: OJBECT
		var obj = obj || {},
			_fieldsetID = obj.fieldsetID || '',
			 _fClazz =  obj.fieldsetCLAZZ || 'MAIN_FIELDSET',
			_divID = obj.divID  || '', 	
			_dClazz = obj.divCLAZZ || 'MAIN_FIELDSET_DIV',		
			_spanValue = obj.value || 'THIS IS A FIELDSET';
		// DECLARE: BASIC FIELDSET ELEMENTS
		var $FIELDSET = $('<fieldset>', {'id' : _fieldsetID,'class' : _fClazz}), 
			$LEGNED = $('<legend>'), 
			$I = $('<i>', {'class' : 'icon-minus-sign-alt'}), 
			$SPAN = $('<span>'), 
			$DIV = $('<div>', {'class' : 'FIELDSET_WRAPPER_INLINE '+_dClazz+'','id' : _divID});
		// CREATE: FIELDSET
		$SPAN.html(_spanValue);
		$FIELDSET.append($LEGNED.append($I).append($SPAN)).append($DIV);
		// RETURN: VALUE
		this.prepend($FIELDSET);
		// CONBINE: CLICK EVENT
		$I.bind('click', function() {
			if ($(this).prop('class') == 'icon-minus-sign-alt') {
				$(this).removeClass('icon-minus-sign-alt').addClass('icon-plus-sign-2').closest('fieldset').children("[class*='FIELDSET_WRAPPER']").css({
					"display" : "none"
				});
				return false;
			} else {
				$(this).removeClass('icon-plus-sign-2').addClass('icon-minus-sign-alt').closest('fieldset').children("[class*='FIELDSET_WRAPPER']").css({
					"display" : "block"
				});
				return false;
			}
		});
		return _divID;
	};
	/**
	 * [CREATE SUB FIELDSET FUNCTION]
	 * @PARAMETER: obj   TYPE: Object
	 * @EXAMPLE:
	 * 	$(CLASSNAME || ID NAME).subFieldset({
	 *		fieldsetID: "",  	{TYPE: STRING}
	 *		divID: "",			{TYPE: STRING}
	 *		value: ""			{TYPE: STRING}
	 *	});
	 */
	$.fn.subFieldset = function(obj) {
		// DEFINE: OJBECT
		var obj = obj || {},
			_fieldsetID = obj.fieldsetID || '',
			 _fClazz =  obj.fieldsetCLAZZ || 'SUB_FIELDSET',
			_divID = obj.divID  || '', 	
			_dClazz = obj.divCLAZZ || 'SUB_FIELDSET_DIV',		
			_spanValue = obj.value || 'THIS IS A SUB FIELDSET';
		// DECLARE: BASIC FIELDSET ELEMENTS
		var $FIELDSET = $('<fieldset>', {'id' : _fieldsetID, 'class' : _fClazz}), 
			$LEGNED = $('<legend>'), 
			$I = $('<i>', {'class' : 'icon-minus-sign-alt'}), 
			$SPAN = $('<span>'), 
			$DIV = $('<div>', {'class' : 'FIELDSET_WRAPPER_INLINE'}), 
			$DIV_INNER = $('<div>', {'class' : 'INNER_CONTENT_INLINE '+_dClazz+'','id' : _divID});
		// CREATE: FIELDSET
		$SPAN.html(_spanValue);
		$FIELDSET.append($LEGNED.append($I).append($SPAN)).append($DIV.append($DIV_INNER));
		// RETURN VALUE
		this.append($FIELDSET);
		$I.bind('click', function() {
			if ($(this).prop('class') == 'icon-minus-sign-alt') {
				$(this).removeClass('icon-minus-sign-alt').addClass('icon-plus-sign-2').closest('fieldset').children("[class*='FIELDSET_WRAPPER']").css({
					"display" : "none"
				});
				return false;
			} else {
				$(this).removeClass('icon-plus-sign-2').addClass('icon-minus-sign-alt').closest('fieldset').children("[class*='FIELDSET_WRAPPER']").css({
					"display" : "block"
				});
				return false;
			}
		});
		return _divID;
	};
			
			
    $(document).ready(function() {
        /**
         *  MENU EFFECT - MAIN NAVIGATION MENU: HOVER - APPEND 2ND MENU
         */
        $(".accordion section:last-child").css({"border-bottom-width": 1,"border-bottom-color": '#CCCCCC',"border-bottom-style": 'solid'}) ;

        $(document).on("mouseenter", ".navMenu", function() {
            $(this).find(".udkmenu_2nd").css("visibility", "visible");
            $(this).find(".udkmenu_separator").css({
                "height":"1px"
            }).parent().css({
                "height":"9px"
            });
        });
        $(document).on("mouseleave", ".navMenu", function() {
            $(this).find(".udkmenu_2nd").css("visibility", "hidden");
                try {
                    $(".udkmenu_3rd").css("display", "none");
                    $(".udkmenu_right").css("color", "#000").removeClass("udkmenu_right_active");
                    $(".udkmenu_left").css("color", "#000").removeClass("udkmenu_left_active");
                    $(".udkmenu_2nd > li").css({
                        "background":"#FFF"
                    }).find("a").css({
                        "color":"#000"
                    });
                } catch(e) {}

            });
            /**
             *  MENU EFFECT - 2ND NAVIGATION MENU: HOVER - APPEND 3RD MENU
             */
            $(document).on("mouseenter", ".udkmenu_2nd > li", function() {
                $(".udkmenu_2nd > li").css({
                    "background":"#FFF"
                }).find("a").css({
                    "color":"#000"
                });
                if($(this).find("a").hasClass("udkmenu_right") || $(this).find("a").hasClass("udkmenu_left")){
                    $(this).css({
                        "background":"#007dba"
                    }).find("a").css({
                        "color":"#fff"
                    });
                }else{
                    $(this).css({
                        "background":"#FFF",
                        "color":"#007dba"
                    }).find("a").css({
                        "color":"#007dba"
                    });
                }
                //  
                var $this = $(this);
                var $content = $this.find("a").attr("to");
                //
                if ($content != undefined) {
                    if ($this.find("a").hasClass("udkmenu_right")) {
                        //
                        $(".udkmenu_right").removeClass("udkmenu_right_active");
                        $this.find("a").addClass("udkmenu_right_active");
                        //
                        var $dock_right = $this.parent(".udkmenu_2nd").width() + 27 + "px";
                        var $height = $this.parent(".udkmenu_2nd").height();
                        //
                        $this.parent(".udkmenu_2nd").parent(".navMenu").find(".udkmenu_3rd").css({
                            left : $dock_right,
                            height : $height + 15 + "px",
                            display : 'block',
                            borderLeft : '0px'
                        });
                        //
                        if ($this.find("a").parent().parent().children("li").length > $("#" + $content).find(".udkmenu_3rd_ol > li").length) {
                            $(".udkmenu_3rd_grid").css({
                                height : ($height - 24) + "px",
                                // From here to update the code
                                width : "250px",
                                borderRight : 'none',
                                borderLeft : '1px #ccc solid'
                            });
                            $(".udkmenu_3rd_ol > li").css({
                                width : "100%"
                            });
                        } else {
                            var $temp_pecent = Math.ceil($("#" + $content).find(".udkmenu_3rd_ol > li").length/1.5 / $this.find("a").parent().parent().children("li").length);
                            $temp_pecent = Math.floor(100 / $temp_pecent);
                            //
                            $(".udkmenu_3rd_grid").css({
                                height : ($height - 24) + "px",
                                // From here to update the code
                                width : "400px",
                                borderRight : 'none',
                                borderLeft : '1px #ccc solid'
                            });
                            $(".udkmenu_3rd_ol > li").css({
                                width : $temp_pecent + "%"
                            });
                        }
                        //
                        $(".udkmenu_3rd_grid").css("display", "none");
                        $("#" + $content).css("display", "block");
                    } else if ($this.find("a").hasClass("udkmenu_left")) {
                        //
                        $(".udkmenu_left").removeClass("udkmenu_left_active");
                        $this.find("a").addClass("udkmenu_left_active");
                        //
                        var $dock_left = -($this.parent(".udkmenu_2nd").parent(".navMenu").find(".udkmenu_3rd").width()) + "px";
                        var $height = $this.parent(".udkmenu_2nd").height();
                        //
                        $this.parent(".udkmenu_2nd").parent(".navMenu").find(".udkmenu_3rd").css({
                            right : "277px",
                            height : $height + 10 + "px",
                            display : 'block',
                            borderRight : '0px'
                        });
                        //
                        if ($this.find("a").parent().parent().children("li").length > $("#" + $content).find(".udkmenu_3rd_ol > li").length) {
                            $(".udkmenu_3rd_grid").css({
                                height : ($height - 14) + "px",
                                width : "250px",
                                borderLeft : 'none',
                                borderRight : '1px #ccc solid'
                            });
                            $(".udkmenu_3rd_ol > li").css({
                                width : "100%"
                            });
                        } else {
                            $(".udkmenu_3rd_grid").css({
                                height : ($height - 4) + "px",
                                width : "400px",
                                borderLeft : 'none',
                                borderRight : '1px #ccc solid'
                            });
                            $(".udkmenu_3rd_ol > li").css({
                                width : "50%"
                            });
                        }

                        $(".udkmenu_3rd_grid").css("display", "none");
                        $("#" + $content).css("display", "block");
                    }
                } else {
                    //HOVER OUT
                    $this.parent(".udkmenu_2nd").parent(".navMenu").find(".udkmenu_3rd").css({
                        display : 'none'
                    });
                    $(".udkmenu_right").css("color", "#000").removeClass("udkmenu_right_active");
                    $(".udkmenu_left").css("color", "#000").removeClass("udkmenu_left_active");
                }
            });

        //bind placeHolder for each inputs
        if(navigator.appVersion.indexOf("MSIE")!=-1){
            initialPlaceHolderChange();
        }
        //breadcrmub
        $('.breadcrumbs2 li').last().addClass('last-child');
       
        // IE7.0+
       
            if((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1))
                {
                    
                     //button radius
                    // $('.btn').corner("tr bl 5px");

                    //Checkbox&radio  Initialize
                    
                     $("input[type='radio'][class*='cstmeinput']:checked").next().find('span').addClass("rcheckclass");
                     $("input[type='checkbox'][class*='cstmeinput']:checked").next().find('span').addClass("ccheckclass");
                     $("input[type='radio'][class*='cstmeinput']:not(:checked)").next().find('span').removeClass("rcheckclass");
                     $("input[type='checkbox'][class*='cstmeinput']:not(:checked)").next().find('span').removeClass("ccheckclass");

                   //Checkbox
                        $(document).on("click","input[type='checkbox'][class*='cstmeinput']+label",function(event){                                                                      
                             if($(this).prev().prop("checked")){                 
                                $(this).children().first().removeClass("ccheckclass");              
                                $(this).prev().prop("checked",false);                                                    
                                  }
                             else{                 
                                $(this).children().first().addClass("ccheckclass");                 
                                $(this).prev().prop("checked",true);  
                                }                               

                      });

                   //Radio
                     
                        $(document).on("click","input[type='radio'][class*='cstmeinput']+label",function(event){
                                               
                            $(this).prev().prop("checked",true);
                            var LabelPrevRadio=$(this).prev().attr("name");
                                       
                            $("input[type='radio'][class*='cstmeinput'][name="+LabelPrevRadio+"]").each(function(index,element){              
                                    if ($(this).prop("checked")) {
                                        $(this).next().children().addClass("rcheckclass");                                       
                                        $(this).prop("checked",true);                                                                                                  
                                    }
                                    else{
                                        $(this).next().children().removeClass("rcheckclass");                                       
                                        $(this).prop("checked",false);                                        
                                    };

                            });

                    });

                    

                }
                    
                    
        
        this.InitializeCheckboxRadio=function(){

            if((navigator.appVersion.indexOf("MSIE 8.")!=-1)||(navigator.appVersion.indexOf("MSIE 7.")!=-1))
                {
                    
                     $("input[type='radio'][class*='cstmeinput']:checked").next().find('span').addClass("rcheckclass");
                     $("input[type='checkbox'][class*='cstmeinput']:checked").next().find('span').addClass("ccheckclass");
                     $("input[type='radio'][class*='cstmeinput']:not(:checked)").next().find('span').removeClass("rcheckclass");
                     $("input[type='checkbox'][class*='cstmeinput']:not(:checked)").next().find('span').removeClass("ccheckclass");

                }

        }

    
            //breadcrumb
            
            // $('.breadcrumbs2 li').click(function(){

            //          $('.breadcrumbs2 li').find('span.Bhv').each(function(){

            //          $(this).removeClass('bhvhover');


            // });

            // $(this).find('span.Bhv').addClass('bhvhover');
            // });

            //StepDescriptor 


            $('.StepDescriptor li').click(function(){
           
            var index = $('.StepDescriptor li').index(this);
            var indexlength=$('.StepDescriptor li').length;                       
            if($(this).find('span.hoverStepN').length==0){
                if(index>0){                                   
                    for(var i=0;i<=index;i++){
                        
                        $('.StepDescriptor li').eq(i).find('span.StepN').addClass('hoverStepN');
                              
                    }

                }

            }

            else {
                
                var Stepindex=indexlength-index-1;
                
                for(var i=0;i<Stepindex;i++){
       
                    $('.StepDescriptor li').eq(index+1+i).find('span.StepN').removeClass('hoverStepN');

                }
            }

            });


            
            
        
    });

    
       
        


var requirejs,require,define;
(function(aa){function I(b){return"[object Function]"===L.call(b)}function J(b){return"[object Array]"===L.call(b)}function y(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function M(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function s(b,c){return ga.call(b,c)}function m(b,c){return s(b,c)&&b[c]}function G(b,c){for(var d in b)if(s(b,d)&&c(b[d],d))break}function R(b,c,d,m){c&&G(c,function(c,j){if(d||!s(b,j))m&&"string"!==typeof c?(b[j]||(b[j]={}),R(b[j],
c,d,m)):b[j]=c});return b}function u(b,c){return function(){return c.apply(b,arguments)}}function ba(b){if(!b)return b;var c=aa;y(b.split("."),function(b){c=c[b]});return c}function B(b,c,d,m){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=m;d&&(c.originalError=d);return c}function ha(b){function c(a,f,b){var e,n,c,g,d,S,i,h=f&&f.split("/");e=h;var j=k.map,l=j&&j["*"];if(a&&"."===a.charAt(0))if(f){e=m(k.pkgs,f)?h=[f]:h.slice(0,h.length-1);f=a=e.concat(a.split("/"));
for(e=0;f[e];e+=1)if(n=f[e],"."===n)f.splice(e,1),e-=1;else if(".."===n)if(1===e&&(".."===f[2]||".."===f[0]))break;else 0<e&&(f.splice(e-1,2),e-=2);e=m(k.pkgs,f=a[0]);a=a.join("/");e&&a===f+"/"+e.main&&(a=f)}else 0===a.indexOf("./")&&(a=a.substring(2));if(b&&j&&(h||l)){f=a.split("/");for(e=f.length;0<e;e-=1){c=f.slice(0,e).join("/");if(h)for(n=h.length;0<n;n-=1)if(b=m(j,h.slice(0,n).join("/")))if(b=m(b,c)){g=b;d=e;break}if(g)break;!S&&(l&&m(l,c))&&(S=m(l,c),i=e)}!g&&S&&(g=S,d=i);g&&(f.splice(0,d,
g),a=f.join("/"))}return a}function d(a){A&&y(document.getElementsByTagName("script"),function(f){if(f.getAttribute("data-requiremodule")===a&&f.getAttribute("data-requirecontext")===i.contextName)return f.parentNode.removeChild(f),!0})}function z(a){var f=m(k.paths,a);if(f&&J(f)&&1<f.length)return d(a),f.shift(),i.require.undef(a),i.require([a]),!0}function h(a){var f,b=a?a.indexOf("!"):-1;-1<b&&(f=a.substring(0,b),a=a.substring(b+1,a.length));return[f,a]}function j(a,f,b,e){var n,C,g=null,d=f?f.name:
null,j=a,l=!0,k="";a||(l=!1,a="_@r"+(M+=1));a=h(a);g=a[0];a=a[1];g&&(g=c(g,d,e),C=m(q,g));a&&(g?k=C&&C.normalize?C.normalize(a,function(a){return c(a,d,e)}):c(a,d,e):(k=c(a,d,e),a=h(k),g=a[0],k=a[1],b=!0,n=i.nameToUrl(k)));b=g&&!C&&!b?"_unnormalized"+(Q+=1):"";return{prefix:g,name:k,parentMap:f,unnormalized:!!b,url:n,originalName:j,isDefine:l,id:(g?g+"!"+k:k)+b}}function r(a){var f=a.id,b=m(p,f);b||(b=p[f]=new i.Module(a));return b}function t(a,f,b){var e=a.id,n=m(p,e);if(s(q,e)&&(!n||n.defineEmitComplete))"defined"===
f&&b(q[e]);else r(a).on(f,b)}function v(a,f){var b=a.requireModules,e=!1;if(f)f(a);else if(y(b,function(f){if(f=m(p,f))f.error=a,f.events.error&&(e=!0,f.emit("error",a))}),!e)l.onError(a)}function w(){T.length&&(ia.apply(H,[H.length-1,0].concat(T)),T=[])}function x(a){delete p[a];delete V[a]}function F(a,f,b){var e=a.map.id;a.error?a.emit("error",a.error):(f[e]=!0,y(a.depMaps,function(e,c){var g=e.id,d=m(p,g);d&&(!a.depMatched[c]&&!b[g])&&(m(f,g)?(a.defineDep(c,q[g]),a.check()):F(d,f,b))}),b[e]=!0)}
function D(){var a,f,b,e,n=(b=1E3*k.waitSeconds)&&i.startTime+b<(new Date).getTime(),c=[],g=[],h=!1,j=!0;if(!W){W=!0;G(V,function(b){a=b.map;f=a.id;if(b.enabled&&(a.isDefine||g.push(b),!b.error))if(!b.inited&&n)z(f)?h=e=!0:(c.push(f),d(f));else if(!b.inited&&(b.fetched&&a.isDefine)&&(h=!0,!a.prefix))return j=!1});if(n&&c.length)return b=B("timeout","Load timeout for modules: "+c,null,c),b.contextName=i.contextName,v(b);j&&y(g,function(a){F(a,{},{})});if((!n||e)&&h)if((A||da)&&!X)X=setTimeout(function(){X=
0;D()},50);W=!1}}function E(a){s(q,a[0])||r(j(a[0],null,!0)).init(a[1],a[2])}function K(a){var a=a.currentTarget||a.srcElement,b=i.onScriptLoad;a.detachEvent&&!Y?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=i.onScriptError;(!a.detachEvent||Y)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function L(){var a;for(w();H.length;){a=H.shift();if(null===a[0])return v(B("mismatch","Mismatched anonymous define() module: "+a[a.length-
1]));E(a)}}var W,Z,i,N,X,k={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},p={},V={},$={},H=[],q={},U={},M=1,Q=1;N={require:function(a){return a.require?a.require:a.require=i.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?a.exports:a.exports=q[a.map.id]={}},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return k.config&&m(k.config,a.map.id)||{}},exports:q[a.map.id]}}};Z=function(a){this.events=
m($,a.id)||{};this.map=a;this.shim=m(k.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};Z.prototype={init:function(a,b,c,e){e=e||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=u(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;this.ignore=e.ignore;e.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=
!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;i.startTime=(new Date).getTime();var a=this.map;if(this.shim)i.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;U[a]||(U[a]=!0,i.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;
var e=this.exports,n=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(I(n)){if(this.events.error)try{e=i.execCb(c,n,b,e)}catch(d){a=d}else e=i.execCb(c,n,b,e);this.map.isDefine&&((b=this.module)&&void 0!==b.exports&&b.exports!==this.exports?e=b.exports:void 0===e&&this.usingExports&&(e=this.exports));if(a)return a.requireMap=this.map,a.requireModules=[this.map.id],a.requireType="define",v(this.error=
a)}else e=n;this.exports=e;if(this.map.isDefine&&!this.ignore&&(q[c]=e,l.onResourceLoad))l.onResourceLoad(i,this.map,this.depMaps);x(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=j(a.prefix);this.depMaps.push(d);t(d,"defined",u(this,function(e){var n,d;d=this.map.name;var g=this.map.parentMap?this.map.parentMap.name:null,h=
i.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(e.normalize&&(d=e.normalize(d,function(a){return c(a,g,!0)})||""),e=j(a.prefix+"!"+d,this.map.parentMap),t(e,"defined",u(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),d=m(p,e.id)){this.depMaps.push(e);if(this.events.error)d.on("error",u(this,function(a){this.emit("error",a)}));d.enable()}}else n=u(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),n.error=u(this,
function(a){this.inited=!0;this.error=a;a.requireModules=[b];G(p,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&x(a.map.id)});v(a)}),n.fromText=u(this,function(e,c){var d=a.name,g=j(d),C=O;c&&(e=c);C&&(O=!1);r(g);s(k.config,b)&&(k.config[d]=k.config[b]);try{l.exec(e)}catch(ca){return v(B("fromtexteval","fromText eval for "+b+" failed: "+ca,ca,[b]))}C&&(O=!0);this.depMaps.push(g);i.completeLoad(d);h([d],n)}),e.load(a.name,h,n,k)}));i.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){V[this.map.id]=
this;this.enabling=this.enabled=!0;y(this.depMaps,u(this,function(a,b){var c,e;if("string"===typeof a){a=j(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=m(N,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;t(a,"defined",u(this,function(a){this.defineDep(b,a);this.check()}));this.errback&&t(a,"error",this.errback)}c=a.id;e=p[c];!s(N,c)&&(e&&!e.enabled)&&i.enable(a,this)}));G(this.pluginMaps,u(this,function(a){var b=m(p,a.id);b&&!b.enabled&&i.enable(a,
this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){y(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};i={config:k,contextName:b,registry:p,defined:q,urlFetched:U,defQueue:H,Module:Z,makeModuleMap:j,nextTick:l.nextTick,onError:v,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=k.pkgs,c=k.shim,e={paths:!0,config:!0,map:!0};G(a,function(a,b){e[b]?
"map"===b?(k.map||(k.map={}),R(k[b],a,!0,!0)):R(k[b],a,!0):k[b]=a});a.shim&&(G(a.shim,function(a,b){J(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=i.makeShimExports(a);c[b]=a}),k.shim=c);a.packages&&(y(a.packages,function(a){a="string"===typeof a?{name:a}:a;b[a.name]={name:a.name,location:a.location||a.name,main:(a.main||"main").replace(ja,"").replace(ea,"")}}),k.pkgs=b);G(p,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=j(b))});if(a.deps||a.callback)i.require(a.deps||[],
a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(aa,arguments));return b||a.exports&&ba(a.exports)}},makeRequire:function(a,f){function d(e,c,h){var g,k;f.enableBuildCallback&&(c&&I(c))&&(c.__requireJsBuild=!0);if("string"===typeof e){if(I(c))return v(B("requireargs","Invalid require call"),h);if(a&&s(N,e))return N[e](p[a.id]);if(l.get)return l.get(i,e,a,d);g=j(e,a,!1,!0);g=g.id;return!s(q,g)?v(B("notloaded",'Module name "'+g+'" has not been loaded yet for context: '+
b+(a?"":". Use require([])"))):q[g]}L();i.nextTick(function(){L();k=r(j(null,a));k.skipMap=f.skipMap;k.init(e,c,h,{enabled:!0});D()});return d}f=f||{};R(d,{isBrowser:A,toUrl:function(b){var d,f=b.lastIndexOf("."),g=b.split("/")[0];if(-1!==f&&(!("."===g||".."===g)||1<f))d=b.substring(f,b.length),b=b.substring(0,f);return i.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return s(q,j(b,a,!1,!0).id)},specified:function(b){b=j(b,a,!1,!0).id;return s(q,b)||s(p,b)}});a||(d.undef=function(b){w();var c=
j(b,a,!0),d=m(p,b);delete q[b];delete U[c.url];delete $[b];d&&(d.events.defined&&($[b]=d.events),x(b))});return d},enable:function(a){m(p,a.id)&&r(a).enable()},completeLoad:function(a){var b,c,e=m(k.shim,a)||{},d=e.exports;for(w();H.length;){c=H.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}c=m(p,a);if(!b&&!s(q,a)&&c&&!c.inited){if(k.enforceDefine&&(!d||!ba(d)))return z(a)?void 0:v(B("nodefine","No define call for "+a,null,[a]));E([a,e.deps||[],e.exportsFn])}D()},nameToUrl:function(a,
b,c){var e,d,h,g,j,i;if(l.jsExtRegExp.test(a))g=a+(b||"");else{e=k.paths;d=k.pkgs;g=a.split("/");for(j=g.length;0<j;j-=1)if(i=g.slice(0,j).join("/"),h=m(d,i),i=m(e,i)){J(i)&&(i=i[0]);g.splice(0,j,i);break}else if(h){a=a===h.name?h.location+"/"+h.main:h.location;g.splice(0,j,a);break}g=g.join("/");g+=b||(/\?/.test(g)||c?"":".js");g=("/"===g.charAt(0)||g.match(/^[\w\+\.\-]+:/)?"":k.baseUrl)+g}return k.urlArgs?g+((-1===g.indexOf("?")?"?":"&")+k.urlArgs):g},load:function(a,b){l.load(i,a,b)},execCb:function(a,
b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ka.test((a.currentTarget||a.srcElement).readyState))P=null,a=K(a),i.completeLoad(a.id)},onScriptError:function(a){var b=K(a);if(!z(b.id))return v(B("scripterror","Script error",a,[b.id]))}};i.require=i.makeRequire();return i}var l,w,x,D,t,E,P,K,Q,fa,la=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ma=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,ea=/\.js$/,ja=/^\.\//;w=Object.prototype;var L=w.toString,ga=w.hasOwnProperty,ia=
Array.prototype.splice,A=!!("undefined"!==typeof window&&navigator&&document),da=!A&&"undefined"!==typeof importScripts,ka=A&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,Y="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},r={},T=[],O=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(I(requirejs))return;r=requirejs;requirejs=void 0}"undefined"!==typeof require&&!I(require)&&(r=require,require=void 0);l=requirejs=function(b,c,d,z){var h,
j="_";!J(b)&&"string"!==typeof b&&(h=b,J(c)?(b=c,c=d,d=z):b=[]);h&&h.context&&(j=h.context);(z=m(F,j))||(z=F[j]=l.s.newContext(j));h&&z.configure(h);return z.require(b,c,d)};l.config=function(b){return l(b)};l.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=l);l.version="2.1.5";l.jsExtRegExp=/^\/|:|\?|\.js$/;l.isBrowser=A;w=l.s={contexts:F,newContext:ha};l({});y(["toUrl","undef","defined","specified"],function(b){l[b]=function(){var c=F._;return c.require[b].apply(c,
arguments)}});if(A&&(x=w.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0]))x=w.head=D.parentNode;l.onError=function(b){throw b;};l.load=function(b,c,d){var l=b&&b.config||{},h;if(A)return h=l.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),h.type=l.scriptType||"text/javascript",h.charset="utf-8",h.async=!0,h.setAttribute("data-requirecontext",b.contextName),h.setAttribute("data-requiremodule",c),
h.attachEvent&&!(h.attachEvent.toString&&0>h.attachEvent.toString().indexOf("[native code"))&&!Y?(O=!0,h.attachEvent("onreadystatechange",b.onScriptLoad)):(h.addEventListener("load",b.onScriptLoad,!1),h.addEventListener("error",b.onScriptError,!1)),h.src=d,K=h,D?x.insertBefore(h,D):x.appendChild(h),K=null,h;if(da)try{importScripts(d),b.completeLoad(c)}catch(j){b.onError(B("importscripts","importScripts failed for "+c+" at "+d,j,[c]))}};A&&M(document.getElementsByTagName("script"),function(b){x||(x=
b.parentNode);if(t=b.getAttribute("data-main"))return r.baseUrl||(E=t.split("/"),Q=E.pop(),fa=E.length?E.join("/")+"/":"./",r.baseUrl=fa,t=Q),t=t.replace(ea,""),r.deps=r.deps?r.deps.concat(t):[t],!0});define=function(b,c,d){var l,h;"string"!==typeof b&&(d=c,c=b,b=null);J(c)||(d=c,c=[]);!c.length&&I(d)&&d.length&&(d.toString().replace(la,"").replace(ma,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c));if(O){if(!(l=K))P&&"interactive"===P.readyState||M(document.getElementsByTagName("script"),
function(b){if("interactive"===b.readyState)return P=b}),l=P;l&&(b||(b=l.getAttribute("data-requiremodule")),h=F[l.getAttribute("data-requirecontext")])}(h?h.defQueue:T).push([b,c,d])};define.amd={jQuery:!0};l.exec=function(b){return eval(b)};l(r)}})(this);
     
   
})(jq191);




(function($) {

           //Datetimepicker Add "UTC" property,default UTC=true

            if(jQuery.isFunction(jQuery.fn.datepicker)==true){
                $.fn.extend({
                        datetimepicker: function(o) {
                            o = o || {};
                            var tmp_args = arguments;

                            if (typeof(o) == 'string') {
                                if (o == 'getDate') {
                                    return $.fn.datepicker.apply($(this[0]), tmp_args);
                                } else {
                                    return this.each(function() {
                                        var $t = $(this);
                                        $t.datepicker.apply($t, tmp_args);
                                    });
                                }
                            } else {
                                return this.each(function() {
                                    var $t = $(this);
                                    $.timepicker._defaults["UTC"] = true;
                                    if($.timepicker._newInst($t, o)._defaults.UTC==true){                      
                                        $.timepicker._defaults.currentText='Now of UTC';
                                    }
                                    else{
                                        $.timepicker._defaults.currentText='Now of Local Time';
                                    }
                                    $t.datepicker($.timepicker._newInst($t, o)._defaults);
                                });
                            }
                        }
                    });

              $.datepicker._gotoToday = function(id) {
                var inst = this._getInst($(id)[0]),
                $dp = inst.dpDiv;
                this._base_gotoToday(id);
                var tp_inst = this._get(inst, 'timepicker');
              //removed -> selectLocalTimeZone(tp_inst);
                if(tp_inst._defaults.UTC==true){           
                    var now = new Date();
                    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                    this._setTime(inst, now_utc);  
                }else{           
                    selectLocalTimeZone(tp_inst);
                    var now = new Date();
                    this._setTime(inst, now);             
                }
               
                 $('.ui-datepicker-today', $dp).click();

            };

            var selectLocalTimeZone = function(tp_inst, date) {
                    if (tp_inst && tp_inst.timezone_select) {
                        tp_inst._defaults.useLocalTimezone = true;
                        var now = typeof date !== 'undefined' ? date : new Date();
                        var tzoffset = $.timepicker.timeZoneOffsetString(now);
                        if (tp_inst._defaults.timezoneIso8601) {
                            tzoffset = tzoffset.substring(0, 3) + ':' + tzoffset.substring(3);
                        }
                        tp_inst.timezone_select.val(tzoffset);
                    }
                };

        }


})(jq191);