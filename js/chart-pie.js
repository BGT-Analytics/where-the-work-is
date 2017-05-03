function pieChartHelper(prepped_data) {
    var config = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
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
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: prepped_data
        // series: [{
        //     data: [{
        //         name: 'Microsoft Internet Explorer',
        //         y: 56.33
        //     }, {
        //         name: 'Chrome',
        //         y: 24.03,
        //         sliced: true,
        //         selected: true
        //     }, {
        //         name: 'Firefox',
        //         y: 10.38
        //     }, {
        //         name: 'Safari',
        //         y: 4.77
        //     }, {
        //         name: 'Opera',
        //         y: 0.91
        //     }, {
        //         name: 'Proprietary or Undetectable',
        //         y: 0.2
        //     }]
        // }]
    }

    $('#pie-full-time').highcharts(config);
}
