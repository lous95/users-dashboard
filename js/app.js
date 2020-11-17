$(document).ready(function(){

    var numberOfUsers = $('#number-of-users');
    var numberOfMaleUsers = $('#number-of-males');
    var numberOfFemalesUsers = $('#number-of-females');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/api/users/count?gender=',
        dataType : 'json',
        success: function(data){
            numberOfUsers.html(data);
        }
    })
    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/api/users/count?gender=male',
        dataType : 'json',
        success: function(data){
            numberOfMaleUsers.html(data);
        }
    })
    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/api/users/count?gender=female',
        dataType : 'json',
        success: function(data){
            numberOfFemalesUsers.html(data);
        }
    })



})