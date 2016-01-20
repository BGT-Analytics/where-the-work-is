// variable init
var map;
var info;
var regions_geojson;
var job_types_by_region;
var job_types_by_lep;
var display_columns_all = ['region_or_nation','job_family','occupation', 'demand_entry', 'demand_ticker', 'demand_entry_hs', 'demand_entry_fe', 'demand_entry_he'];
var display_columns_region = ['job_family','occupation', 'demand_entry', 'demand_ticker', 'demand_entry_hs', 'demand_entry_fe', 'demand_entry_he'];


// do stuff when the page loads
(function(){

    $("#detail-content").hide()

    map = L.map('map', {
        scrollWheelZoom: false,
        center: [55, -3.5], 
        zoom: 4,
        attributionControl: false,
        zoomControl:false
    });


    info = L.control({position: 'topright'});
    info.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    }

    info.update = function(properties){
        if(properties){
            var content = '<p>' + properties['JOB_REGION'] + '</p>';
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
                'fillOpacity': 0.2,
                'color': '#fbab18'
            },
            'onEachFeature': bindLayer,
        }
        $.when($.getJSON('data/merged_regions.geojson'), $.get('data/job_types_by_region.csv')).then(function(geojson, csv){
            regions_geojson = L.geoJson(geojson[0], geojson_opts).addTo(map);
            job_types_by_region = _.where($.csv.toObjects(csv[0]), {medium_skilled: "1", include_fe: "1", include_he: "1"});


            var table_guts = sliceColumns(job_types_by_region, display_columns_all);

            var agg_demand = _.chain(job_types_by_region)
                .groupBy("occupation")
                .map(function(value, key) {
                    return {
                        occupation: key,
                        demand_entry: sum(_.pluck(value, "demand_entry")),
                        advertised_avg_salary_entry_degree: parseFloat(value[0]["advertised_avg_salary_entry_degree"])
                    }
                })
                .value();
            makeScatterPlot(agg_demand);

        });

        
    })

    $.when($.get('data/job_types_by_lep_merge.csv')).then(function(csv){
        job_types_by_lep = _.where($.csv.toObjects(csv), {medium_skilled: "1", include_fe: "1", include_he: "1"});
    });
    
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

    var table_guts = sliceColumns(place_data, display_columns_region);

    // these are the leps within the selected region
    var lep_data = _.where(job_types_by_lep, {region_or_nation: place_name})
    console.log(lep_data)

    $("#default-content").hide()
    $("#detail-content").show()
    $("#content-heading").text(place_name);

    makeBubbleChart(place_data);
    
    initializeTable('#job-data-region', display_columns_region, table_guts);

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

function sum(numbers) {
    return _.reduce(numbers, function(result, current) {
        return result + parseFloat(current);
    }, 0);
}

