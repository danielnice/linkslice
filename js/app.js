$( document ).ready(function() {

	// Variables
	var sampleUrl = $('#sample-url'),
			clipboard = new Clipboard('#copy');

	// Copy Button Success
	var btn = $('#copy');
	clipboard.on('success', function(e) {

		//Send to GA
		var url = $('#sample-url');
		ga('send', {
		  eventCategory: 'url',
		  eventAction: 'copy',
		  eventLabel: url
		});

		//Run Copy
    btn.text('Copied!').toggleClass('disabled');
    setTimeout(function() {
    	btn.text('COPY URL').toggleClass('disabled');
    }, 5000);
    e.clearSelection();
	});

	// Copy Button Error
	clipboard.on('error', function(e) {
	  btn.text('Press Ctrl + C to copy url');
	  console.log(e);
	});

	//Dropdown
	var dropdown = $('.dropdown');
	dropdown.click(function(){
	  dropdown.toggleClass('active');
	});
	$('.source').click(function(){
	  dropdown.toggleClass('active');
	});

	//Fill out URL
	$('#builder input').on('change', function() {
		var url = $('#url').val(),
  			campaign = encodeURI($('#campaign').val()),
  			source = $('.source:checked').val(),
  			medium = getMedium(source);
  	$('.fill-box .value').text(source);
	  sampleUrl.text(url+'?utm_source='+source+'&utm_medium='+medium+'&utm_campaign='+campaign);
	});

	//Field validation if blank
	$('input').blur(function(event){
		var field = event.currentTarget,
				parentField = $(field).parent();
		//Check if blank
		if(field.value === ''){
			parentField.addClass('error-blank');
		} else {
			parentField.removeClass('error-blank');
		}
	});

	//Field validation if URL does include http
	$('#url').blur(function(event){
		var url = $('#url'),
				parent = url.parent();
		//Check if blank
		if(url.val().substring(0, 4) !== 'http'){
			parent.addClass('error-incorrect');
		} else {
			parent.removeClass('error-incorrect');
		}
		//Send GA event
		ga('send', {
		  eventCategory: 'field',
		  eventAction: 'blur',
		  eventLabel: url.val()
		});
	});

	function getMedium(source){
		switch(source){
			case 'facebook':
			case 'twitter':
			case 'linkedin':
				return 'social';
			case 'email':
				return 'email';
			case 'blogwebsite':
			case 'ppc':
				return 'link';
			case 'other':
				return 'unknown';
		}
	}

});