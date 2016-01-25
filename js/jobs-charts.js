
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


function makeDemandBarChart(element_id, data){
    var sorted_data = _.sortBy(data, parseInt('demand_entry'))
    var prepped_data = [
        {
            name: 'Higher Education',
            color: '#006167',
            data: _.map(_.pluck(sorted_data, "demand_entry_he"), Number).slice(0,10)
        }, {
            name: 'Further Education',
            color: '#fbab18',
            data: _.map(_.pluck(sorted_data, "demand_entry_fe"), Number).slice(0,10)
        }
        , {
            name: 'High School',
            color: '#f47730',
            data: _.map(_.pluck(sorted_data, "demand_entry_hs"), Number).slice(0,10)
        }
    ]

    occupations = _.pluck(data, "occupation").slice(0,10)

    barHelper(element_id, prepped_data, occupations, 'Demand', 'Demand (# jobs)')
}


function makeDemandScatterPlot(element_id, data){
    var prepped_data = []
    $(data).each(function(i, row){
        point = {
            x: parseFloat(row['advertised_avg_salary_entry_degree']),
            y: parseFloat(row['demand_entry']),
            name: row['occupation'].split(" ")[0],
            full_name: row['occupation']
        }
        if (!isNaN(point.x) && !isNaN(point.y)) prepped_data.push(point)
    })

    scatterHelper(element_id, prepped_data, 'Demand', 'Demand (# jobs)', ['More Jobs', 'Fewer Jobs'])
}

function makeCompScatterPlot(element_id, data){
    var prepped_data = []
    $(data).each(function(i, row){
        point = {
            x: parseFloat(row['advertised_avg_salary_entry_degree']),
            y: parseFloat(row['fe_ds_ratio_log']),
            name: row['occupation'].split(" ")[0],
            full_name: row['occupation']
        }
        if (!isNaN(point.x) && !isNaN(point.y)) prepped_data.push(point)
    })

    scatterHelper(element_id, prepped_data, 'Opportunity', 'Opportunity', ['Less Competition', 'More Competition'])
}



function scatterHelper(element_id, prepped_data, y_label_full, y_label_short, chart_labels){
    var chart_height = $(element_id).height()

    $(element_id).highcharts({

        chart: {
            type: 'scatter',
            zoomType: 'xy',
            plotBackgroundColor: {
                linearGradient: [0, 0, 0, chart_height],
                stops: [
                    [0, 'rgb(225, 242, 241)'], //green
                    [1, 'rgb(242, 231, 225)']  //red
                ]
            }
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
                text: 'Average Salary'
            },
            labels: {
                format: '£{value}'
            }
        },

        yAxis: {
            gridLineWidth: 0,
            title: {
                text: y_label_full,
            }
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><strong>{point.full_name}</strong></th></tr>' +
                '<tr><th>Average Salary:</th><td>{point.x}</td></tr>' +
                '<tr><th>'+y_label_short+':</th><td>{point.y}</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        labels: {
            items: [
                {
                    html: "↑ "+chart_labels[0],
                    style: {
                        color: '#006167',
                        left: '10px',
                        top: '10px',
                    }
                },
                {
                    html: "↓ "+chart_labels[1],
                    style: {
                        color: '#f47730',
                        left: '10px',
                        top: chart_height - 90
                    }
                }
            ]
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '8px',
                        color: '#777'
                    }
                },
                color: '#777',
                allowPointSelect: true,
                point: {
                    events: {
                        select: function () {
                            showOccupationDetail(this.full_name);
                        }
                    }
                }
            },
        },

        series: [{
            data: prepped_data,
        }]

    });
}



function barHelper(element_id, prepped_data, categories, y_label_full, y_label_short){
    $(element_id).highcharts({
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: y_label_short
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 10,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: prepped_data
    });
}






function makeBubbleChart(data){
    var prepped_data = []
    $(data).each( function(i, row){
        bubble = {
                    x: parseFloat(row['advertised_avg_salary_entry_degree']), 
                    y: parseFloat(row['fe_ds_ratio_log']), 
                    z: parseFloat(row['demand_entry']), 
                    name: row['occupation'].split(" ")[0], 
                    full_name: row['occupation']
                }
        if (!isNaN(bubble.x) && !isNaN(bubble.y) && !isNaN(bubble.z)) prepped_data.push(bubble)
    })

    $('#bubblechart').highcharts({

        chart: {
            type: 'bubble',
            zoomType: 'xy',
            plotBackgroundColor: {
                linearGradient: [0, 0, 0, 450],
                stops: [
                    [0, 'rgb(225, 242, 241)'], //green
                    [1, 'rgb(242, 231, 225)']  //red
                ]
            }
        },

        legend: {
            enabled: false
        },

        title: {
            //text: 'Demand & Salary by Occupation'
            text: ''
        },

        xAxis: {
            title: {
                text: 'Average Salary'
            },
            labels: {
                format: '£{value}'
            },
        },

        yAxis: {
            gridLineWidth: 0,
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Opportunity'
            },
            labels: {
                enabled: false,
            },
            maxPadding: 0.2
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><strong>{point.full_name}</strong></th></tr>' +
                '<tr><th>Average Salary:</th><td>{point.x}</td></tr>' +
                '<tr><th>Demand Ratio:</th><td>{point.y}</td></tr>' +
                '<tr><th>Demand (# jobs):</th><td>{point.z}</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '8px',
                        color: '#333'
                    }
                },
                color: '#777',
                marker: {
                    fillColor: '#FFFFFF',
                    lineWidth: 1,
                    lineColor: '#777'
                },
                allowPointSelect: true,
                point: {
                    events: {
                        select: function () {
                            var div = document.getElementById('occupation-detail');
                            div.innerHTML = this.full_name+"<br/><br/>[location quotient chloropleth map here]";
                        }
                    }
                }
            }
        },

        labels: {
            items: [
                {
                    html: "↑ Less Competition",
                    style: {
                        color: '#006167',
                        left: '20px',
                        top: '30px',
                    }
                },
                {
                    html: "↓ More Competition",
                    style: {
                        color: '#f47730',
                        left: '20px',
                        top: '290px',
                    }
                }
            ]
        },

        series: [{
            data: prepped_data,
        }]

    });
}
