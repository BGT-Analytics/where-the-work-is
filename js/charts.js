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



function makeDemandChart(place_data, occupation_group_data, n_cols){
    if ($.address.parameter('occupation_group')) {
        occ_group = decodeURIComponent($.address.parameter('occupation_group'))
        console.log(place_data)
        var filtered_data = _.filter(place_data, function(el) {
            return el['occ_group'] == occ_group;
        });

        var sorted_data = _.sortBy(filtered_data, 'demand_sum').reverse()
        occupations = _.pluck(sorted_data, "occupation").slice(0,n_cols)
    }
    else {
        var sorted_data = _.sortBy(occupation_group_data, 'demand_sum').reverse()
        occupations = _.pluck(sorted_data, "occ_group").slice(0,n_cols)
    }

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

    stackedBarHelper(prepped_data, occupations, place_data)
    // stackedBarHelper(prepped_data, occupations, place_data)
}

function makeCompScatterPlot(place_data, education){

    if (education=='he'){
        var point_color = he_color
        var col_name = 'he_opportunity_score'
        $('#selected-edu').html('higher education graduates (HE)');
        $('#scatter-note-edu').html('HE graduates');
    }
    else{
        // fe is default when no education is provided
        var point_color = he_color
        var col_name = 'fe_opportunity_score'
        $('#selected-edu').html('further education finishers (FE)');
        $('#scatter-note-edu').html('FE finishers');
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

function highlightOccFamily(occ_group){

    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'scatter'){
            // looping thru stuff in scatterplot
            $.each(chart.series[0].points, function(index, point){
                if(occupation_mapping[point.full_name]['occ_group'] == occ_group){
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
                    if(occupation_mapping[point.category]['occ_group'] == occ_group){
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
function selectOccFamily(occ_group){
    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'scatter'){
            // looping thru stuff in scatterplot
            $.each(chart.series[0].points, function(index, point){
                if(occupation_mapping[point.full_name]['occ_group'] == occ_group){
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
                    if(occupation_mapping[point.category]['occ_group'] == occ_group){
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
    // console.log('long_name:', long_name)
    // return occupation_mapping[long_name]['short_name'];
    return(long_name)
};