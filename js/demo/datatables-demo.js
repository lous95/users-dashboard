// Call the dataTables jQuery plugin
var editor;
$(document).ready(function () {

  var editedNameInput = document.getElementById('nameInput');
  var editedEmailInput = document.getElementById('emailInput');
  var editedAgeInput = document.getElementById('ageInput');

  $.ajax({
    url: 'http://localhost:5000/api/users',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var table = $('#dataTable').DataTable({
        data: data,
        columns: [
          { 'data': "_id" },
          { 'data': 'name' },
          { 'data': 'email' },
          { 'data': 'age' },
          { defaultContent: '<input type="button" class="delete" value="Delete"/> <input type="button" class="edit" value="Edit"/> ' }
        ],
        "columnDefs": [
          { "visible": false, "targets": 0 }
        ],
    
      });
      $('#dataTable tbody').on('click', '.edit', function (e) {
        e.preventDefault();
        var row = $(this).closest('tr');
        var data = table.row(row).data();
        editedNameInput.value = data.name;
        editedEmailInput.value = data.email;
        editedAgeInput.value = data.age;
        $('#editForm').toggle();
        $('#editUser').on('click', function (e) {
          $('#editForm').validate({
            messages: {
              nameInput: {
                required: "Name is required!",
                minlength: "Your name should be atleast 3 letter!"
              },
              emailInput: "Email is required and should be valid email",
              ageInput: "Age is required field!"
            },
            submitHandler: function () {
              data.name = editedNameInput.value;
              data.email = editedEmailInput.value;
              data.age = editedAgeInput.value;
              var url = 'http://localhost:5000/api/users/' + data._id;
              $.ajax({
                url: url,
                method: 'PUT',
                dataType: 'json',
                data: JSON.stringify({
                  name: editedNameInput.value,
                  email: editedEmailInput.value,
                  age: editedAgeInput.value,
                }),
                contentType: 'application/json',
                success: function () {
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
                  toastr["success"]("User updated!", "Success");
                  setTimeout(function () { location.href = location.href }, 1500);
                }
              })
            }
          });
        })
      });

      $('#dataTable tbody').on('click', '.delete', function (e) {
        e.preventDefault();
        var row = $(this).closest('tr');
        $.confirm({
          title: 'Confirmation!',
          content: 'Are you sure you want to delete user?',
          buttons: {
            confirm: function () {
              var dataID = table.row(row).data()._id;
              var url = 'http://localhost:5000/api/users/' + dataID;
              $.ajax({
                url: url,
                method: 'DELETE',
                success: function () {
                  table.row(row).remove().draw();
                  $.alert('Deleted!');
                }
              })
            },
            cancel: function () {
              $.alert('Canceled!');
            }
          }
        });
      });

    }
  })
});
