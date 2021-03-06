$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            // // Not connected yet
            // $('#success').html("<div class='alert alert-success'>");
            // $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //     .append("</button>");
            // $('#success > .alert-success')
            //     .append("<strong>Not connected to send messages yet. </strong>");
            // $('#success > .alert-success')
            //     .append('</div>');

            // // clear all fields
            // $('#contactForm').trigger("reset");

            $.ajax({
                url: 'https://jamesdelemar.com/api/mail', // 'http://localhost:4300/api/mail', // 'http://localhost:9000/.netlify/functions/mail', // 'https://sleepy-almeida-ee8173.netlify.com/.netlify/functions/mail',
                type: 'POST',
                data: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                }),
                cache: false,
                success: function(result) {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + name + ", it seems the mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    
                    //clear all fields
                    // $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
