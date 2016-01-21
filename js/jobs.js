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

    map = L.map('map-select', {
        scrollWheelZoom: false,
        center: [55, -3.5], 
        zoom: 4,
        attributionControl: false,
        zoomControl:false
    });

    initializeMapSelect(map);


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

        if($.address.parameter("region")){
            updateRegion(decodeURIComponent($.address.parameter("region")))
        }
        else{
            makeScatterPlot(agg_demand);
        }

    });

        



    $.when($.get('data/job_types_by_lep_merge.csv')).then(function(csv){
        job_types_by_lep = _.where($.csv.toObjects(csv), {medium_skilled: "1", include_fe: "1", include_he: "1"});
    });
    
})()




function updateRegion(place_name){

    regions_geojson.eachLayer(function(layer){
        if(layer.feature.properties['JOB_REGION'] != place_name){
            layer.feature.properties['selected'] = false
            layer.setStyle({'fillOpacity': 0.2, 'color': '#fbab18'});
        }
        else{
            layer.feature.properties['selected'] = true
            layer.setStyle({'fillOpacity': 0.8, 'color': '#fbab18'});
        }
    })


    var place_data = _.where(job_types_by_region, {region_or_nation: place_name})

    var table_guts = sliceColumns(place_data, display_columns_region);

    // these are the leps within the selected region
    var lep_data = _.where(job_types_by_lep, {region_or_nation: place_name})
    console.log(lep_data)

    $("#default-content").hide()
    $("#detail-content").show()
    $("#content-heading").html('<a href="/">The United Kingdom</a> &raquo; <strong>' + toTitleCase(place_name) + '</strong>');

    makeBubbleChart(place_data);
    
    initializeTable('#job-data-region', display_columns_region, table_guts);

}


