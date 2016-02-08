Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});



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


function makeDemandChart(element_id, place_data){
    var clean_demand_data = _.map(
        place_data, 
        function(row) {
            return { 
                demand_sum: parseInt(row.demand_entry_he)+parseInt(row.demand_entry_fe)+parseInt(row.demand_entry_sl),
                demand_entry_he: parseInt(row.demand_entry_he),
                demand_entry_fe: parseInt(row.demand_entry_fe),
                demand_entry_sl: parseInt(row.demand_entry_sl),
                occupation: row.occupation
            };
        }
    );
    var sorted_data = _.sortBy(clean_demand_data, 'demand_sum').reverse()


    var n_cols = 36
    var prepped_data = [
        {
            name: 'Higher Education',
            color: '#154779',
            data: _.pluck(sorted_data, "demand_entry_he").slice(0,n_cols)
        }, {
            name: 'Further Education',
            color: '#2b74a6',
            data: _.pluck(sorted_data, "demand_entry_fe").slice(0,n_cols)
        }
        , {
            name: 'School Leavers',
            color: '#60aadb',
            data: _.pluck(sorted_data, "demand_entry_sl").slice(0,n_cols)
        }
    ]

    occupations = _.pluck(sorted_data, "occupation").slice(0,n_cols)

    stackedBarHelper(element_id, prepped_data, occupations, 'Demand', 'Demand (# jobs)', place_data)
}



function makeCompScatterPlot(element_id, place_data, education){
    if (education=='he'){
        var place_data_edu = _.where(place_data, {include_he: "1"})
        var point_color = '#154779'

        $("#he-select").attr('class', 'btn selected');
        $("#fe-select").attr('class', 'btn');

        $('#fe-select').click(function() {
            updateLocation(geo_type, geo_name, 'fe')
            return false;
        });
    }
    else{
        var place_data_edu = _.where(place_data, {include_fe: "1"})
        var point_color = "#2b74a6"

        $("#fe-select").attr('class', 'btn selected');
        $("#he-select").attr('class', 'btn');

        $('#he-select').click(function() {
            updateLocation(geo_type, geo_name, 'he')
            return false;
        });
    }

    var prepped_data = []
    $(place_data_edu).each(function(i, row){
        point = {
            x: parseFloat(row['advertised_avg_salary_entry_degree']),
            y: parseFloat(row['fe_ds_ratio_log']),
            name: shortenName(row['occupation']),
            full_name: row['occupation']
        }
        if (!isNaN(point.x) && !isNaN(point.y)) prepped_data.push(point)
    })

    scatterHelper(element_id, prepped_data, 'Opportunity', 'Opportunity', point_color, place_data)
}



function scatterHelper(element_id, prepped_data, y_label_full, y_label_short, point_color, place_data){
    var chart_height = $(element_id).height()

    $(element_id).highcharts({

        chart: {
            type: 'scatter',
            zoomType: 'xy'
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
                text: 'Average Salary',
                style: {
                    color: '#aaa',
                }
            },
            labels: {
                format: '£{value}',
                style: {
                    color: '#aaa',
                    fontSize: '9px',
                }
            },
            tickColor: '#eee',
            tickLength: 5,
            lineColor: '#eee'
        },

        yAxis: {
            gridLineWidth: 0,
            startOnTick: true,
            endOnTick: true,
            title: {
                text: y_label_full,
                style: {
                    color: '#aaa',
                }
            },
            labels: {
                enabled: false
            },
            lineColor: '#eee',
            lineWidth: 1
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><strong>{point.full_name}</strong></th></tr>' +
                '<tr><th>Average Salary:</th><td>£{point.x:,.0f}</td></tr>' +
                '<tr><th>'+y_label_short+':</th><td>{point.y}</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        labels: {
            items: [
                {
                    html: "↑ Less Competition",
                    style: {
                        color: '#FBAB18',
                        left: '10px',
                        top: '10px',
                    }
                },
                {
                    html: "↓ More Competition",
                    style: {
                        color: '#FBAB18',
                        left: '10px',
                        top: chart_height - 90
                    }
                }
            ]
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
                            fillColor: point_color,
                            lineWidth: 6,
                            lineColor: "#f47730",
                            radius: 8
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


function stackedBarHelper(element_id, prepped_data, categories, y_label_full, y_label_short, place_data){
    $(element_id).highcharts({
        chart: {
            type: 'bar',
            zoomType: 'y'
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
                    color: '#aaa'
                }
            },
            lineColor: '#eee'
        },
        yAxis: {
            min: 0,
            gridLineWidth: 0,
            endOnTick: false,
            title: {
                text: y_label_short,
                style: {
                    color: '#aaa'
                }
            },
            labels: {
                style: {
                    color: '#aaa',
                    fontSize: '9px',
                }
            }
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            x: -30,
            verticalAlign: 'top',
            y: 50,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<table><tr><th colspan="2"><strong>{point.x}</strong></th></tr>',
            pointFormat:  '<tr><th>{series.name}:</th><td>{point.y:,.0f}</td></tr>',
            footerFormat: '</table>',
            shared: true,
            positioner: function () {
                return { x: 200, y: 350 };
            }
        },
        plotOptions: {
            bar: {
                stacking: 'normal'
            },
            series: {
                cursor: 'pointer',
                pointPadding: 0,
                groupPadding: .1,
                point: {
                    events: {
                        click: function () {
                            selectOccupation(categories[this.x], place_data);
                        },
                        mouseOver: function () {
                            triggerHoverScatter(categories[this.x]);
                        }
                    }
                },
                states: {
                    select: {
                        borderColor: "#f47730",
                        color: "#f47730"
                    }
                }
            }
        },
        series: prepped_data

    });
};



function highlightOcc(occupation){

    // looping thru stuff in bar chart
    $.each(Highcharts.charts[0].series, function(index, series){
        $.each(series.data, function(index, point){
            if(point.category == occupation){
                point.select(true, true);
            }
            else{
                point.select(false, true);
            }
        });
    });

    // looping thru stuff in scatterplot
    $.each(Highcharts.charts[1].series[0].points, function(index, point){
        if(point.full_name == occupation){
            point.select(true, true);
        }
        else{
            point.select(false, true);
        }
    });

}

function triggerHoverScatter(occupation){

    // looping thru stuff in scatterplot
    var chart = Highcharts.charts[1]
    $.each(chart.series[0].points, function(index, point){
        if(point.full_name == occupation){
            point.setState('hover');
            chart.tooltip.refresh(point);
        }
        else{
            point.setState();
        }
    });

}
function triggerHoverBar(occupation){

    // looping thru stuff in bar chart
    var chart = Highcharts.charts[0]
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

}


function shortenName(long_name) {
    return occupation_mapping[long_name]['short_name'];
};