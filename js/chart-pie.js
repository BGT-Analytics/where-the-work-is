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
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    distance: -30,
                    format: '<b>{point.name}</b>',
                    style: {
                        color: '#fff',
                    }
                },
                colors: ['#3A4B5D', '#FDAC00'],
                size: "100%",
            }
        },
        series: prepped_data
    }

    $('#pie-full-time').highcharts(config);
}
