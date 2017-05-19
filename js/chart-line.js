function lineChartHelper(prepped_data) {

    var config = {
        xAxis: {
            categories: ['2012', '2013', '2014', '2015'],
        },
        yAxis: {
            title: {
                text: 'Number of workers employed'
            },
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
        },
        tooltip: {
            pointFormat: '<b>{point.y}</b>'
        },
        series: [{
            showInLegend: false,
            data: prepped_data,
            color: '#FDAC00',
        }]
    }

    $('#employmentLine').highcharts(config);
}


