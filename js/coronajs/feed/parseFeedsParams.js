function parseJSON ( ) {
	
		console.log  (destinations.length);
		for (var i = 0; i < destinations.length; i++) {
			var jsonobject = destinations[i];
			var label = jsonobject.label;
		    var busname = jsonobject.busname;
			
			var loadnames = jsonobject.loadname;
			parseLoadArray ( loadnames );
			
		}
	
	}
	
	function parseLoadArray ( jsonArray ) {
		
		
			
		 if ( Array.isArray( jsonArray ) ) {
			for ( var i = 0; i < jsonArray.length; i++ ){
			
				var jsonObj = jsonArray [i];
				parseLabelAndBusName ( jsonObj );
				
				var columns = jsonObj.colname; 
				parseColumnArray ( columns );
			}
		 } else {
			    parseLabelAndBusName ( jsonArray );
				var columns = jsonArray.colname;
				parseColumnArray (  columns );
		 }
		
	}
	
	function parseColumnArray ( jsonArray ) {
		if ( Array.isArray( jsonArray ) ) {
		 
			for ( var i = 0; i < jsonArray.length; i++ ){
				
				var jsonObj = jsonArray [i];
				parseLabelAndBusName ( jsonObj );
			}
		 } else {
			  parseLabelAndBusName ( jsonArray );
		 }
	}
	
	function parseLabelAndBusName ( jsonObj ) {
		console.log ( " " + jsonObj.label + " " + jsonObj.busname );
	}
	
	parseJSON ( );