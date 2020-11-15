// Call the dataTables jQuery plugin
$(document).ready(function () {
//   editor = new $.fn.dataTable.Editor( {
//     ajax: "http://localhost:5000/api/users",
//     table: "#dataTable",
//     fields: [ {
//             label: "Full name",
//             name: "name"
//         }, {
//             label: "Email",
//             name: "email"
//         }, {
//             label: "age",
//             name: "age"
//         }
//     ]
// } );

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
          { defaultContent: '<input type="button" class="delete" value="Delete"/> ' }
        ],
        "columnDefs": [
          { "visible": false, "targets": 0 }
        ]
      });
      // <input type="button" class="edit" value="Edit"/> 
      // $('#dataTable').on('click', 'tbody tr', function () {
      //   console.log(this);
      //   table.row(this).edit();

      // });
      $('#dataTable').on( 'click', 'tbody tr', function () {
        table.row( this ).edit();
    } );

      // $('#dataTable tbody').on('click', '.edit', function (e) {
      //   e.preventDefault();
      //   var row = $(this).closest('tr');
      //   table.row(this).edit();
      // });
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
