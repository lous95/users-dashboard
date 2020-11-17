// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$(function () {
  var  dataUrl = "http://localhost:5000/api/users/country";
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Palestine", "Hungary", "Greece", "USA", "Dubai"],
      datasets: [{
        data: [],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#E7C61D', '#625D47' ],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#D8BB25', '#58533E'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
  ajaxChart(myPieChart, dataUrl);
  function ajaxChart(chart,url){
    $.ajax({
      type: 'GET',
      url: url,
      dataType : 'json',
      success : function(response){
        chart.data.datasets[0].data = response;
        chart.update();
      }
    })
  }
});