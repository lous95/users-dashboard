
$(document).ready(function(){    
    var nameInput = $('#nameInput');
    var emailInput = $('#emailInput');
    var ageInput = $('#ageInput');
    var countryInput = $('#countryInput');
    var genderInput = $("input[name='genderInput']:checked");
  
    $('#addNewUser').on('click', function(e){ 
     
      $('#addUserForm').validate({
        messages : {
          nameInput : {
            required : "Name is required!",
            minlength : "Your name should be atleast 3 letter!"
          },
          emailInput : "Email is required and should be valid email",
          ageInput : "Age is required field!"
        },
        submitHandler: function(){
          $.ajax({
            type : "POST",
            url : "http://localhost:5000/api/users",
            dataType : 'json',
            data : JSON.stringify({
              name : nameInput.val(),
              email : emailInput.val(),
              age : ageInput.val(),
              country : countryInput.val(),
              gender : genderInput.val()
            }),
            contentType: 'application/json',
            success : function(){
              toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
              }
              toastr["success"]("A new user added", "Success")
              setTimeout(function(){ window.location.replace("tables.html"); }, 3000);
             
            }
          })

        }
      });
        
      })
})

