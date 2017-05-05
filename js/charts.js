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

function makeDemandChart(place_data, occupation_group_data){
    if ($.address.parameter('occupation_group')) {
        occ_group = decodeURIComponent($.address.parameter('occupation_group'))
        var filtered_data = _.filter(place_data, function(el) {
            return el['occ_group'] == occ_group;
        });

        var sorted_data = _.sortBy(filtered_data, 'demand_sum').reverse()
        occupations = _.pluck(sorted_data, "occupation")

        $('#bar-chart-title').html("Which " + occ_group.toLowerCase() + " have the most openings?");
        $('#mobile-bar-chart-title').html("Which " + occ_group.toLowerCase() + " have the most openings?");

        $('#chart-subtitle').html("occupation");
        $('#mobile-chart-subtitle').html("occupation");
    }
    else {
        var sorted_data = _.sortBy(occupation_group_data, 'demand_sum').reverse()
        occupations = _.pluck(sorted_data, "occ_group")
    }

    n_cols = occupations.length

    var prepped_data = [
        {
            name: 'Higher education',
            color: he_color,
            data: _.pluck(sorted_data, "demand_entry_he").slice(0,n_cols),
            states: {
                hover: {
                    color: '#FFF2D6'
                }
            },
        }, {
            name: 'Further education',
            color: fe_color,
            data: _.pluck(sorted_data, "demand_entry_fe").slice(0,n_cols),
            states: {
                hover: {
                    color: '#e2be7c'
                }
            },
        }
        , {
            name: 'School leavers',
            color: sl_color,
            data: _.pluck(sorted_data, "demand_entry_sl").slice(0,n_cols),
            states: {
                hover: {
                    color: '#FDAC00'
                }
            },
        }
    ]

    // Dynamically resize the chart based on number of columns.
    if ((n_cols * 12) > 100 ){
        pct_height = '100%'
    }
    else {
        pct_height = String(n_cols * 12) + '%'
    }
    $('#bar-demand').css('height', pct_height)

    stackedBarHelper(prepped_data, occupations, place_data)
}

function makeCompScatterPlot(place_data, education){
    console.log(place_data)
    console.log(education)
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
            full_name: row['occupation'],
            occ_group: row['occ_group'],
        }
        if (!isNaN(point.x) && !isNaN(point.y)) prepped_data.push(point)
    })

    console.log(prepped_data);

    scatterHelper(prepped_data, point_color, place_data)
}

function makePieChart(data, occ_clicked){
    var pie_prepped_data = [];
    var location = findLocation();

    $(data).each(function(i, row){
        if (row['soc_description'].replace('&', 'and') === occ_clicked.replace('&', 'and') && row['nation_region'].toLowerCase() === location) {
            pie_prepped_data = [{
                data: [{
                    name: 'Full Time',
                    y: parseFloat(row['full_time_percent']),
                }, {
                    name: 'Part Time',
                    y: 1 - row['full_time_percent'],
                }]
            }]
        }
    })

    pieChartHelper(pie_prepped_data);
}

function makeLineChart(employment_data, occ_clicked) {
    var location = findLocation();
    var data_arr = [];

    $(employment_data).each(function(i, row){
        if (row['soc_name'].replace('&', 'and') === occ_clicked.replace('&', 'and') && row['nation_region'].toLowerCase() === location) {
            data_arr.push(parseInt(row['year_2012']), parseInt(row['year_2013']), parseInt(row['year_2014']), parseInt(row['year_2015']))
        }
    });

    lineChartHelper(data_arr);
}

function makeProjectionText(projection_data, occ_clicked) {
    var location = findLocation();
    var projection_text;

    $(projection_data).each(function(i, row){
        if (row['soc_name'].replace('&', 'and') === occ_clicked.replace('&', 'and') && row['nation_region'].toLowerCase() === location) {
            projection_text = "<br><small><em>" + row['projection'] + "</em></small>"
        }
    });

    $('#projectionTable').html(projection_text);
}

function makeSkillsText(occ_skills_data, occ_clicked) {
    var skills_text;

    $(occ_skills_data).each(function(i, row){
        if (row['soc3_name'].replace('&', 'and') === occ_clicked.replace('&', 'and')) {
            console.log(row['skills'])
            skills_text += row['skills']
        }
    });

    return skills_text;
}

function findLocation() {
    var lookups = {
        'east midlands': 'east midlands',
        'east of england': 'eastern',
        'greater london': 'london',
        'north east england': 'north east',
        'north west england': 'north west (inc merseyside)',
        'south east england': 'south east',
        'south west england': 'south west',
        'west midlands': 'west midlands',
        'yorkshire & the humber': 'yorkshire and humberside',
    }

    if($.address.parameter("location_type") && $.address.parameter("location")){
        select_location_type = decodeURIComponent($.address.parameter("location_type")).toLowerCase();
        select_location = decodeURIComponent($.address.parameter("location")).toLowerCase();

        if (select_location_type === 'nation') {
            var location = select_location;
        }
        else if (select_location_type === 'region') {
            var location = lookups[select_location];
        }

        else if (select_location_type === 'lepplus') {
            var location;

            $(geo_hierarchy['children']).each(function(i, nation){
                $(nation['children']).each(function(i,region){
                    $(region['children']).each(function(i, lepPlus){
                        if (select_location === lepPlus['name'].toLowerCase()) {
                            if (region['name'] != '') {
                                location = lookups[region['name'].toLowerCase()]
                            }
                            else {
                                location = nation['name'].toLowerCase()
                            }
                        }
                    })
                })
            })
        }

    }
    else {
        var location = 'uk'
    }

    return location
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
                    // if(occupation_mapping[point.category]['occ_group'] == occ_group){
                    //     point.setState('hover');
                    // }
                    if(point.category == occ_group){
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

function highlightOccGroupIcon(occ_group){
    $('[data="' + occ_group + '"]').css('background-color', '#e2be7c');
}

function removeHighlightOccGroupIcon(occ_group){
    $('.job-family').css('background-color', '');
}

function triggerHoverScatter(occupation){
    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'scatter'){
            $.each(chart.series[0].points, function(index, point){
                if(point.full_name == occupation || point.occ_group == occupation){
                    point.setState('hover');
                    if ($.address.parameter('occupation_group')) {
                        chart.tooltip.refresh(point);
                    }
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

function triggerHoverBar(point_data){
    $.each(Highcharts.charts, function(index, chart){
        if (chart && chart.options.chart.type == 'bar'){
            $.each(chart.series, function(index, series){
                $.each(series.data, function(index, point){
                    if(point.category == point_data.full_name || point.category == point_data.occ_group){
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
    // if (occupation_mapping[long_name]) {
    //     return occupation_mapping[long_name]['short_name'];
    // }
    // else {
    //     return long_name;
    // }
    return long_name
};

function clearSelect() {
    $('#occupationModal').on('hidden.bs.modal', function () {
        // Indicate that the user knows how to click the occ bars...
        hideHelperOcc();
        clicked_occ_bar = true;

        $.each(Highcharts.charts, function(index, chart){
            if (chart) {
                points = chart.getSelectedPoints();
                $.each(points, function(index, point) {
                    point.select(false);
                })
            }
        });
    })
};