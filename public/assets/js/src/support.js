jQuery( document ).ready(function( $ ) {

	$('#main').on( 'click', 'a.toggle', function(e) {
		$(this).parent().find('textarea').toggle();
	});	

	// add test results to system report
	$('#system-status tbody').children('tr').each( function() {
		var check 	= $(this).children('td:eq(1)').text();
		var result 	= $(this).children('td:eq(2)').text();
		$('#pos_status').append( check + ': ' + result + '\n');
	});

	// add pos_params to the system report
	$('#pos_status').append('\n*** POS Params ***\n\n' + JSON.stringify( pos_params ) + '\n\n');

	// add the browser info to the system report
	$('#pos_status').append('\n*** Browser Info ***\n\n' + navigator.userAgent + '; ' + $('html').attr('class') + '\n\n');
	
	// check api auth and add it to the system report
	checkApiAuth();
	function checkApiAuth() {
		$.getJSON( pos_params.wc_api_url + 'products', { 'pos': 1, 'filter[limit]': 1 } )
		.done( function( data ) {
			$('#system-status tbody')
			.append('<tr class="pass"><td><i class="icon icon-check"></i></td><td>Product Download</td>' + 
				'<td colspan="2">Product Retrieved OK <a href="#" class="toggle"><i class="fa fa-info-circle"></i></a> ' + 
				'<textarea class="small form-control" readonly="readonly" style="display:none">' + JSON.stringify( data ) + '</textarea></td></tr>');
			$('#pos_status').append('\n*** Product Download ***\n\n' + JSON.stringify( data ) + '\n\n');
		}) 
		.fail( function( jqxhr, textStatus, error ) {
			var response = jqxhr.responseText.replace(/(<([^>]+)>)/ig,"");

			$('#system-status tbody')
			.append('<tr class="fail"><td><i class="icon icon-times"></i></td><td>Product Download</td>' + 
				'<td colspan="2">Product Download Failed <a href="#" class="toggle"><i class="fa fa-info-circle"></i></a> ' + 
				'<textarea class="small form-control" readonly="readonly" style="display:none">' + response + '</textarea></td></tr>');
			$('#pos_status').append('\n*** Product Download ***\n\n' + response.trim() + '\n\n');
		});
	}	

});