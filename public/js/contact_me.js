// Contact Form Scripts
$(function() {
  authenticate();
  $('#contactForm').on('submit', function(e) {
    e.preventDefault(); // prevent default submit behaviour
    if ($(this).parsley().validate()) { // OR $(this).parsley().validate() and then call $(this).parsley().isValid()
      sendAJAXRequest();
    }
  });
  $("a[data-toggle=\"tab\"]").click(function(e) {
      e.preventDefault();
      $(this).tab("show");
  });
});

function authenticate() {
  $('#contactForm').parsley();
  $('#name').parsley({ required: true, pattern: '[a-zA-Z0-9\'\-,.&:/!@ ]+', maxlength: 255 });
  $('#email').parsley({ required: 'true', type: 'email' });
  $('#phone').parsley({ required: 'true', pattern: '[0-9\-+ ]+', maxlength: 20 });
  $('#message').parsley({ required: 'true', pattern: '[a-zA-Z0-9\'\-,.&:/!@? ]+', maxlength: 500 });
}

function sendAJAXRequest() {
  var name = $("#name").val();
  var email = $("#email").val();
  var phone = $("#phone").val();
  var message = $("#message").val();
  var _csrf = $("#_csrf").val();

  $.ajax({
      url: "http://localhost:3000/contact",
      type: "POST",
      data: {
          name: name,
          email: email,
          phone: phone,
          message: message,
          _csrf: _csrf
      },
      cache: false,
      success: function() {
          // Success message
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
      error: function(xhr, status, error) {
          var res = isJSON(xhr.responseText)? JSON.parse(xhr.responseText): xhr.responseText;

          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");

          // Fail message
          if(xhr.status == 400) { // or error == 'Bad Request'
            $('#success > .alert-danger').append("<strong>Validation Error: Please check the form!</strong><br><br>");
            $.each(res.error, function(index, value){
              $('#success > .alert-danger').append((index+1) + '. ' + value.param + ': ' + value.msg + '<br>');
            });
          } else if (xhr.status == 403) {
            $('#success > .alert-danger').append("<strong>Sorry " + name + ", the Session has expired or Form tampered with. Please refresh and try again!<br><br>");
          } else { // 500
            $('#success > .alert-danger').append("<strong>Sorry " + name + ", there seems to have been a problem on the server. Please try again later!<br><br>");
          }

          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
      }
  });
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
