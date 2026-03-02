$(document).ready(function () {
	if($('#contactForm').length){
		$('#contactForm').validate({ // initialize the plugin
			rules: {
				name: {
					required: true
				},				
				email: {
					required: true,
					email: true
				},
				
				subject: {
					required: true
			
				},
				message: {
					required: true
				}
				
			},
			messages: {
				captcha: "Correct captcha is required. Click the captcha to generate a new one"
			},
			submitHandler: function (form) { 
				// sending value with ajax request
				$.post($(form).attr('action'), $(form).serialize(), function (response) {
					$('.form-response').text("").append(response);
					$("input[type=text], textarea").val("");
					$("select").prop('selectedIndex',0);
					$('input[type="checkbox"]').attr('checked', false);
					
				});
				return false;
				
			}
		});
	}	
});


