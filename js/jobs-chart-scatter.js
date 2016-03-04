function scatterHelper(prepped_data, point_color, place_data){

    var config = {

        credits: {
            enabled: false
        },

        legend: {
            enabled: false
        },

        title: {
            text: ''
        },

        xAxis: {
            title: {
                text: 'Average salary',
                style: {
                    color: '#bdc3c7',
                }
            },
            labels: {
                formatter: function () {
                   return '£'+( numberWithCommas(this.value));
                },
                style: {
                    color: '#bdc3c7',
                    fontSize: '9px',
                }
            },
            min: 17000,
            tickColor: '#eee',
            tickLength: 5,
            lineColor: '#eee',
            endOnTick: true
        },

        yAxis: {
            gridLineWidth: 0,
            startOnTick: false,
            endOnTick: false,
            max: 115,
            min: -15,
            title: {
                text: 'Employment opportunity',
                style: {
                    color: '#bdc3c7',
                }
            },
            labels: {
                enabled: false
            },
            lineColor: '#eee',
            lineWidth: 1,
            plotBands: [
                // using http://meyerweb.com/eric/tools/color-blend/
                {
                    // #9e4940,
                    color: 'rgba(65, 73, 82, 0.1)',
                    label: {
                        text: 'Very low',
                        style: {
                            color: '#9e4940',
                            fontSize: '11px'
                        },
                        x: 3,
                        y: 0
                    },
                    from: -20,
                    to: 9
                },
                {
                    // #ba7639
                    color: 'rgba(102, 116, 129, 0.1)',
                    label: {
                        text: 'Low',
                        style: {
                            color: '#ba7639',
                            fontSize: '11px'
                        },
                        x: 3,
                        y: 0
                    },
                    from: 9,
                    to: 32
                },
                {
                    // #baa242
                    color: 'rgba(149, 157, 166, 0.1)',
                    label: {
                        text: 'Medium',
                        style: {
                            color: '#baa242',
                            fontSize: '11px'
                        },
                        x: 3,
                        y: 0
                    },
                    from: 32,
                    to: 65
                },
                {
                    // #83A540
                    color: 'rgba(195, 200, 205, 0.1)',
                    label: {
                        text: 'High',
                        style: {
                            color: '#83A540',
                            fontSize: '11px'
                        },
                        x: 3,
                        y: 0
                    },
                    from: 65,
                    to: 89
                },
                {
                    // #38925e
                    color: 'rgba(236, 240, 241, 0.1)',
                    label: {
                        text: 'Very high',
                        style: {
                            color: '#38925e',
                            fontSize: '11px'
                        },
                        x: 3,
                        y: 0
                    },
                    from: 89,
                    to: 120
                }
            ],
        },

        tooltip: {
            backgroundColor: 'rgba(186, 204, 216, .85)',
            style: {
                color: '#3B4B5C',
            },
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2">{point.full_name}</th></tr>' +
                '<tr><td>Average salary:</td><td style="text-align:right;">£{point.x:,.0f}</td></tr>' +
                '<tr><td>Opportunity:</td><td style="text-align:right;">{point.y:.0f}/100</td></tr>',
            footerFormat: '</table>',
            followPointer: true,
            shadow: false,
            borderColor: '#3B4B5C'
        },

        series: [{
            data: prepped_data,
        }]

    };



    var mobile_extras = {
        chart: {
            type: 'scatter',
            marginLeft: 20,
            marginTop: 10,
            backgroundColor: 'transparent'
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                color: point_color,
                point: {
                    events: {
                        click: function () {
                            selectOccupation(this.full_name, place_data);
                        }
                    }
                },
                marker: {
                    radius: 5,
                    states: {
                        select: {
                            fillColor: "#FBAB18",
                            lineWidth: 1,
                            lineColor: "#3B4B5C",
                            radius: 9
                        },
                        hover: {
                            enabled: false
                        }
                    }
                }
            },
        }
    }
    var mobile_config = $.extend(mobile_extras, config);



    var desktop_extras = {
        chart: {
            type: 'scatter',
            zoomType: 'xy',
            marginLeft: 20,
            marginTop: 10,
            backgroundColor: 'transparent'
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                color: point_color,
                point: {
                    events: {
                        click: function () {
                            selectOccupation(this.full_name, place_data);
                        },
                        mouseOver: function () {
                            triggerHoverBar(this.full_name);
                        },
                    }
                },
                marker: {
                    states: {
                        select: {
                            fillColor: "#FBAB18",
                            lineWidth: 1,
                            lineColor: "#3B4B5C",
                            radius: 7
                        },
                        hover: {
                            fillColor: "#e2be7c",
                            lineWidth: 1,
                            lineColor: "#3B4B5C",
                            radius: 7
                        }
                    }
                }
            },
        },
    }
    var desktop_config = $.extend(desktop_extras, config);



    $('#scatter-comp').highcharts(desktop_config);
    $('#scatter-comp-mobile').highcharts(mobile_config);
};