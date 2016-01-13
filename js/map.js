// variable init
var map;
var info;
var regions_geojson;
var job_types_by_region;
var basic_columns = ['region_or_nation','job_family','occupation', 'fe_ds_ratio', 'he_ds_ratio'];

// set size of map based on window height
$(window).resize(function () {
  var h = $(window).height(),
  offsetTop = 110; // Calculate the top offset
  $('#map').css('height', (h - offsetTop));
}).resize();

// do stuff when the page loads
(function(){

    $("#detail-content").hide()

    map = L.map('map', {
        scrollWheelZoom: false,
        center: [55, -3.5], 
        zoom: 5
    });

    var layer = new L.StamenTileLayer("toner-lite");
    map.addLayer(layer);

    info = L.control({position: 'topright'});
    info.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    }

    info.update = function(properties){
        if(properties){
            var content = '<h4>' + properties['JOB_REGION'] + '</h4>';
            this._div.innerHTML = content;
        }
    }

    info.clear = function(){
        this._div.innerHTML = '';
    }

    info.addTo(map);

    map.whenReady(function(e){
        var geojson_opts = {
            'style': {
                'weight': 1,
                'opacity': 1,
                'fillOpacity': 0.2
            },
            'onEachFeature': bindLayer,
        }
        $.when($.getJSON('data/merged_regions.geojson'), $.get('data/job_types_by_region.csv')).then(function(geojson, csv){
            regions_geojson = L.geoJson(geojson[0], geojson_opts).addTo(map);
            job_types_by_region = _.where($.csv.toObjects(csv[0]), {medium_skilled: "1", include_fe: "1", include_he: "1"});


            var table_guts = sliceColumns(job_types_by_region, basic_columns);

            // TO-DO: do something as default view on page load
            // initializeTable(basic_columns, table_guts);

            // TEMPORARY
            updateRegion('GREATER LONDON')
        });
    })
    
})()

function bindLayer(feature, layer){
    if(typeof feature.properties !== 'undefined'){
        layer.on('mouseover', function(e){
            info.update(e.target.feature.properties);
        });
        layer.on('mouseout', function(e){
            info.clear();
        })
        layer.on('click', function(e){
            updateRegion(feature.properties['JOB_REGION'])
        });
}
}


function updateRegion(place_name){

    var place_data = _.where(job_types_by_region, {region_or_nation: place_name})

    var table_guts = sliceColumns(place_data, basic_columns);

    $("#default-content").hide()
    $("#detail-content").show()
    $("#content-heading").text(place_name);

    makeCharts(place_data);
    makeBubbleChart(place_data);
}


function sliceColumns(data, columns){
    return _.map(data, function(row){
        var sliced_row = [];
        $.each(columns, function(i, column){
            sliced_row.push(row[column]);
        });
        return sliced_row
    });
}

function reduceColumns(data, grouper, column_index){
    // data is a 2D array of values
    // grouper is an index of the array to group by
    return _.reduce(data, function(memo, row){
        return memo[column_index]
    })
}

function makeCharts(data){
    console.log("makin a chart")
    
}


function initializeTable(column_names, data){
    // column_names is an array of names to be used as the header row of the table
    // data is a 2D array of values for the table
    var names = [];
    $.each(column_names, function(i, name){
        names.push({'title': name});
    })
    $('#job-data').DataTable({
        destroy: true,
        data: data,
        columns: names
    });
}


function makeBubbleChart(data){
    var prepped_data = []
    $(data).each( function(i, row){
        console.log("*")
        console.log(row)
        thing = {
                    x: parseFloat(row['demand_entry']), 
                    y: parseFloat(row['advertised_avg_salary_entry_degree']), 
                    z: parseFloat(row['fe_ds_ratio']), 
                    name: row['occupation'], 
                    country: row['occupation']
                }
        if (!isNaN(thing.x) && !isNaN(thing.y) && !isNaN(thing.z)) prepped_data.push(thing)
        console.log(thing)

    })

    $('#scatterplot').highcharts({

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        title: {
            text: 'Demand & Salary by Occupation'
        },

        xAxis: {
            gridLineWidth: 1,
            title: {
                text: 'Demand'
            },
            labels: {
                format: '{value}'
            },
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Average Salary'
            },
            labels: {
                format: '{value}'
            },
            maxPadding: 0.2,
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><strong>{point.country}</strong></th></tr>' +
                '<tr><th>Demand (# jobs):</th><td>{point.x}</td></tr>' +
                '<tr><th>Average Salary:</th><td>{point.y}</td></tr>' +
                '<tr><th>Demand Ratio:</th><td>{point.z}</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false,
                }
            }
        },

        series: [{
            data: prepped_data
        }]

    });
}
