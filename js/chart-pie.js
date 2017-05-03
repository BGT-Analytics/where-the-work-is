function pieChartHelper(prepped_data) {
    var config = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                },
                colors: ['#3A4B5D', '#FDAC00'],
            }
        },
        series: prepped_data
    }

    $('#pie-full-time').highcharts(config);
}
