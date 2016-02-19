Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    },
    chart: {
        style: {
            fontFamily: '"Source Sans Pro", sans-serif'
        }
    }
});


var he_color = '#ECF0F1';
var fe_color = '#959DA6';
var sl_color = '#667481';

function initializeTable(table_id, column_names, data){
    // column_names is an array of names to be used as the header row of the table
    // data is a 2D array of values for the table
    var names = [];
    $.each(column_names, function(i, name){
        names.push({'title': name});
    })
    $(table_id).DataTable({
        searching: false,
        lengthMenu: [ [20, 100, -1], [20, 100, "All"] ],
        destroy: true,
        data: data,
        columns: names,
        info: false,
        paging: false
    });
}


function makeDemandChart(place_data){

    var sorted_data = _.sortBy(place_data, 'demand_sum').reverse()

    var n_cols = 36
    var prepped_data = [
        {
            name: 'Higher education',
            color: he_color,
            data: _.pluck(sorted_data, "demand_entry_he").slice(0,n_cols)
        }, {
            name: 'Further education',
            color: fe_color,
            data: _.pluck(sorted_data, "demand_entry_fe").slice(0,n_cols)
        }
        , {
            name: 'School leavers',
            color: sl_color,
            data: _.pluck(sorted_data, "demand_entry_sl").slice(0,n_cols)
        }
    ]

    occupations = _.pluck(sorted_data, "occupation").slice(0,n_cols)

    stackedBarHelper(prepped_data, occupations, place_data)
}



function makeCompScatterPlot(place_data, education){

    if (education=='he'){
        var point_color = he_color
        var col_name = 'he_opportunity_score'
        $('#selected-edu').html('higher education');
    }
    else{
        // fe is default when no education is provided
        var point_color = fe_color
        var col_name = 'fe_opportunity_score'
        $('#selected-edu').html('further education');
    }


    var prepped_data = []
    $(place_data).each(function(i, row){
        point = {
            x: row['reg_salary'],
            y: row[col_name],
            name: shortenName(row['occupation']),
            full_name: row['occupation']
        }
        if (!isNaN(point.x) && !isNaN(point.y)) prepped_data.push(point)
    })

    scatterHelper(prepped_data, point_color, place_data)
}



function scatterHelper(prepped_data, point_color, place_data){

    $('#scatter-comp').highcharts({

        chart: {
            type: 'scatter',
            zoomType: 'xy',
            marginLeft: 20,
            marginTop: 10,
            backgroundColor: 'transparent'
        },

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
            lineColor: '#eee'
        },

        yAxis: {
            gridLineWidth: 0,
            startOnTick: false,
            endOnTick: false,
            max: 115,
            min: -15,
            title: {
                text: 'Job opportunity',
                style: {
                    color: '#bdc3c7',
                }
            },
            labels: {
                enabled: false
            },
            // lineColor: '#eee',
            // lineWidth: 1,
            plotBands: [
                // using http://meyerweb.com/eric/tools/color-blend/
                {
                    // #9e4940,
                    color: 'rgba(65, 73, 82, 0.1)',
                    label: {
                        text: 'Very low',
                        style: {
                            color: '#bdc3c7',
                            fontSize: '9px'
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
                            color: '#bdc3c7',
                            fontSize: '9px'
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
                            color: '#bdc3c7',
                            fontSize: '9px'
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
                            color: '#bdc3c7',
                            fontSize: '9px'
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
                            color: '#bdc3c7',
                            fontSize: '9px'
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
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2">{point.full_name}</th></tr>' +
                '<tr><td>Average salary:</td><td style="text-align:right;">£{point.x:,.0f}</td></tr>' +
                '<tr><td>opportunity:</td><td style="text-align:right;">{point.y:.0f}/100</td></tr>',
            footerFormat: '</table>',
            followPointer: true,
            shadow: false,
            borderColor: '#eee'
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
                            lineColor: "#2c3e50",
                            radius: 7
                        },
                        hover: {
                            fillColor: "#e2be7c",
                            lineWidth: 1,
                            lineColor: "#2c3e50",
                            radius: 7
                        }
                    }
                }
            },
        },

        series: [{
            data: prepped_data,
        }]

    });
};


function stackedBarHelper(prepped_data, categories, place_data){
    $('#bar-demand').highcharts({
        chart: {
            type: 'bar',
            zoomType: 'y',
            backgroundColor: 'transparent'
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: categories,
            tickWidth: 0,
            labels: {
                formatter: function () {
                    return shortenName(this.value);
                },
                style: {
                    fontSize: '9px',
                    color: '#bdc3c7'
                },
                x: -6
            },
            lineColor: '#eee'
        },
        yAxis: {
            min: 0,
            gridLineWidth: 0,
            endOnTick: false,
            title: {
                text: 'Entry level job openings',
                style: {
                    color: '#bdc3c7'
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
            }
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            x: -20,
            verticalAlign: 'top',
            y: 50,
            floating: true,
            backgroundColor: '#34495e',
            borderWidth: 0,
            shadow: false,
            itemStyle: {
                color: '#ecf0f1',
                fontWeight: 200
            },
            itemHoverStyle: {
                color: '#fff'
            },
            itemHiddenStyle: {
                color: '#1d2a38'
            },
            title: {
                text: 'Click to hide or show',
                style: {
                    fontSize: '9px',
                    color: '#bdc3c7',
                    fontWeight: 200,
                }
            }
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<table><tr><th colspan="2">{point.x}</th></tr>',
            pointFormat:  '<tr><td>{series.name}:</td><td style="text-align:right;">{point.y:,.0f}</td></tr>',
            footerFormat: '</table>',
            shared: true,
            positioner: function (boxWidth, boxHeight, point) {
                var xpos = this.chart.plotWidth-160
                var ypos = Math.max(120, point.plotY)+40 // keep tooltip below legend
                var ypos = Math.min(this.chart.plotHeight-80, ypos) // keep tooltip above bottom of chart
                return { x: xpos, y: ypos };
            },
            shadow: false,
            borderColor: '#eee'
        },
        plotOptions: {
            bar: {
                stacking: 'normal'
            },
            series: {
                borderColor: '#2c3e50',
                cursor: 'pointer',
                pointPadding: 0,
                groupPadding: .1,
                point: {
                    events: {
                        click: function () {
                            if(clicked_occ==false){
                                clicked_occ = true;
                                $("#helper-occupation i").removeClass('flash')
                                $("#helper-occupation").fadeOut(800)
                            };
                            selectOccupation(categories[this.x], place_data);
                        },
                        mouseOver: function () {
                            triggerHoverScatter(categories[this.x]);
                        },
                        mouseOut: function () {
                            removeHoverScatter();
                        }
                    }
                },
                states: {
                    select: {
                        borderColor: '#2c3e50',
                        color: "#FBAB18"
                    },
                    hover: {
                        color: '#e2be7c'
                    }
                }
            }
        },
        series: prepped_data

    });
};



function highlightOcc(occupation){

    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'scatter'){
            var isVisible = false; 
            // looping thru stuff in scatterplot
            $.each(chart.series[0].points, function(index, point){
                if(point.full_name == occupation){
                    isVisible = true;
                    point.select(true, true);
                }
                else{
                    point.select(false, true);
                }
            });
            if (isVisible || !occupation){
                $('#scatter-note').hide()
            }
            else{
                $('#scatter-note').fadeIn(800)
                $('#scatter-note-occ').html(shortenName(occupation))
            }
        }
        else if (chart && chart.options.chart.type == 'bar'){
            // looping thru stuff in bar chart
            $.each(chart.series, function(index, series){
                $.each(series.data, function(index, point){
                    if(point.category == occupation){
                        point.select(true, true);
                    }
                    else{
                        point.select(false, true);
                    }
                });
            });
        };
    });

}

function highlightOccFamily(job_family){

    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'scatter'){
            // looping thru stuff in scatterplot
            $.each(chart.series[0].points, function(index, point){
                if(occupation_mapping[point.full_name]['job_family'] == job_family){
                    point.setState('hover');
                }
                else{
                    point.setState();
                }
            });
        }
        else if (chart && chart.options.chart.type == 'bar'){
            // looping thru stuff in bar chart
            $.each(chart.series, function(index, series){
                $.each(series.data, function(index, point){
                    if(occupation_mapping[point.category]['job_family'] == job_family){
                        point.setState('hover');
                    }
                    else{
                        point.setState();
                    }
                });
            });
        };
    });

}
function selectOccFamily(job_family){
    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'scatter'){
            // looping thru stuff in scatterplot
            $.each(chart.series[0].points, function(index, point){
                if(occupation_mapping[point.full_name]['job_family'] == job_family){
                    point.select(true, true);
                }
                else{
                    point.select(false, true);
                }
            });
        }
        else if (chart && chart.options.chart.type == 'bar'){
            // looping thru stuff in bar chart
            $.each(chart.series, function(index, series){
                $.each(series.data, function(index, point){
                    if(occupation_mapping[point.category]['job_family'] == job_family){
                        point.select(true, true);
                    }
                    else{
                        point.select(false, true);
                    }
                });
            });
        };
    });
}

function triggerHoverScatter(occupation){
    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'scatter'){
            $.each(chart.series[0].points, function(index, point){
                if(point.full_name == occupation){
                    point.setState('hover');
                    chart.tooltip.refresh(point);
                }
                else{
                    point.setState();
                }
            });
        };
    });

}
function removeHoverScatter(){
    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'scatter'){
            $.each(chart.series[0].points, function(index, point){
                point.setState();
            });
            chart.tooltip.hide()
        };
    });
}
function triggerHoverBar(occupation){

    // looping thru stuff in bar chart
    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'bar'){
            $.each(chart.series, function(index, series){
                $.each(series.data, function(index, point){
                    if(point.category == occupation){
                        point.setState('hover');
                        chart.tooltip.refresh([chart.series[0].data[index], chart.series[1].data[index], chart.series[2].data[index]]);
                    }
                    else{
                        point.setState();
                    }
                });
            });
        };
    });

}


function shortenName(long_name) {
    return occupation_mapping[long_name]['short_name'];
};