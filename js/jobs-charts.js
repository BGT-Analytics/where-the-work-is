
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

    scatterHelper(element_id, prepped_data, 'Total Demand (job openings)', 'Demand (# jobs)')
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

    scatterHelper(element_id, prepped_data, 'Opportunity (demand ratio)', 'demand ratio')
}



function scatterHelper(element_id, prepped_data, y_label_full, y_label_short){
    $(element_id).highcharts({

        chart: {
            type: 'scatter',
            zoomType: 'xy'
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
                color: '#777'
            }
        },

        series: [{
            data: prepped_data,
        }]

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
