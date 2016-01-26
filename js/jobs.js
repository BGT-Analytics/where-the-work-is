// variable init
var map;
var info;
var regions_data;
var regions_geojson;
var job_types_data;
var job_types_by_region;
var job_types_by_lep;
var display_columns_all = ['region_or_nation','job_family','occupation', 'demand_entry', 'demand_ticker', 'demand_entry_hs', 'demand_entry_fe', 'demand_entry_he'];
var display_columns_region = ['job_family','occupation', 'demand_entry', 'demand_ticker', 'demand_entry_hs', 'demand_entry_fe', 'demand_entry_he'];
var region_lep_mapping;
var occ_map;


// do stuff when the page loads
(function(){

    initialize();
    
})()



function initialize(){

    map = L.map('map-select', {
        scrollWheelZoom: false,
        center: [55, -3.5], 
        zoom: 4,
        attributionControl: false,
        zoomControl:false,
        dragging: false,
        touchZoom: false, 
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        tap: false
    });

    var geojson_opts = {
        'style': {
            'weight': 1,
            'opacity': 1,
            'fillOpacity': 0.2,
            'color': '#fbab18'
        },
        'onEachFeature': bindLayer,
    }

    initializeMapSelect(map);

    $.when($.getJSON('data/merged_regions.geojson'), $.get('data/job_types_by_region.csv')).then(function(geojson, csv){
        regions_data = geojson
        job_types_data = csv
        regions_geojson = L.geoJson(geojson[0], geojson_opts).addTo(map);
        job_types_by_region = _.where($.csv.toObjects(csv[0]), {medium_skilled: "1"});


        if($.address.parameter("region")){
            if($.address.parameter("lep")){
                // lep view
                updateLep(decodeURIComponent($.address.parameter("region")), decodeURIComponent($.address.parameter("lep")), $.address.parameter("education"))
            }
            else{
                // region view
                updateRegion(decodeURIComponent($.address.parameter("region")), $.address.parameter("education"))
            }
        }
        else{
            // aggregate view (default)
            updateAgg($.address.parameter("education"))
        }

    });


    $.when($.get('data/job_types_by_lep_merge.csv')).then(function(csv){
        job_types_by_lep = _.where($.csv.toObjects(csv), {medium_skilled: "1"});

        region_lep_mapping = _.chain(job_types_by_lep).groupBy("region_or_nation").map(function(value, key) {
            return {
                region_or_nation: key,
                leps_within: _.uniq(_.pluck(value, "lep"))
            }
        }).value()

        // populating select menu w/ regions & leps
        $.each(region_lep_mapping, function(index, value){
            var r = value['region_or_nation']
            $('#list-select').append('<p><a class="option-region" href="/#?region='+r+'">'+toTitleCase(r)+'</a></p>')
            $.each(value['leps_within'] , function(index, value){
                $('#list-select').append('<p class="small"><a class="option-lep" href="/#?region='+r+'&lep='+value+'">'+value+'</a></p>')
                $('.option-lep').last().click(function() {
                    updateLep(r, value, 'fe')
                    return false;
                });
            });

            $('.option-region').last().click(function() {
                updateRegion(r, 'fe')
                return false;
            });
        });

    });

    $('#occupation-detail-modal').on('shown.bs.modal', function (e) {
        occ_map = L.map('occupation-detail-map', {
            scrollWheelZoom: false,
            center: [55, -3.5], 
            zoom: 5,
            attributionControl: false,
            zoomControl:false
        });

        var layer = new L.StamenTileLayer("toner-lite");
        occ_map.addLayer(layer);

        var regions_occ_geojson = L.geoJson(regions_data[0], {'style': {'weight': 1,'opacity': 1,'fillOpacity': 0.2,'color': '#fbab18'}}).addTo(occ_map);
        var job_types_lep = _.where($.csv.toObjects(job_types_data[0]), {occupation: $('#occupation-detail-title').html()})

        // console.log(job_types_lep);
    })

}



function updateAgg(education){

    var agg_demand = _.chain(job_types_by_region)
        .groupBy("occupation")
        .map(function(value, key) {
            return {
                occupation: key,
                demand_entry: sum(_.pluck(value, "demand_entry")),
                demand_entry_he: sum(_.pluck(value, "demand_entry_he")),
                demand_entry_fe: sum(_.pluck(value, "demand_entry_fe")),
                demand_entry_hs: sum(_.pluck(value, "demand_entry_hs")),
                advertised_avg_salary_entry_degree: parseFloat(value[0]["advertised_avg_salary_entry_degree"]),
                //how to aggregate fe_ds_ratio_log?
                include_he: value[0]["include_he"],
                include_fe: value[0]["include_fe"]
            }
        })
        .value();

    $.address.parameter('education', education);
    $.address.parameter('region', '');
    $.address.parameter('lep', '');

    if (education=='he'){
        var agg_data_scatter = _.where(agg_demand, {include_he: "1"})

        $("#he-select").attr('class', 'btn btn-xs btn-default selected');
        $("#fe-select").attr('class', 'btn btn-xs btn-default');

        $('#fe-select').click(function() {
            updateAgg('fe')
            return false;
        });
    }
    else{
        var agg_data_scatter = _.where(agg_demand, {include_fe: "1"})

        $("#fe-select").attr('class', 'btn btn-xs btn-default selected');
        $("#he-select").attr('class', 'btn btn-xs btn-default');

        $('#he-select').click(function() {
            updateAgg('he')
            return false;
        });
    }

    $("#default-content").show()
    $("#charts").show()

    makeDemandBarChart('#bar-demand', agg_demand)
    makeDemandScatterPlot('#scatter-demand', agg_data_scatter)
    makeCompScatterPlot('#scatter-comp', agg_data_scatter)
}

function updateLep(region_name, lep_name, education){

    $.address.parameter('region', region_name);
    $.address.parameter('lep', lep_name);
    $.address.parameter('education', education);

    var lep_data = _.where(job_types_by_lep, {lep: lep_name})
    if (education=='he'){
        var lep_data_scatter = _.where(job_types_by_lep, {lep: lep_name, include_he: "1"})

        $("#he-select").attr('class', 'btn btn-xs btn-default selected');
        $("#fe-select").attr('class', 'btn btn-xs btn-default');

        $('#fe-select').click(function() {
            updateLep(region_name, lep_name, 'fe')
            return false;
        });
    }
    else{
        var lep_data_scatter = _.where(job_types_by_lep, {lep: lep_name, include_fe: "1"})

        $("#fe-select").attr('class', 'btn btn-xs btn-default selected');
        $("#he-select").attr('class', 'btn btn-xs btn-default');

        $('#he-select').click(function() {
            updateLep(region_name, lep_name, 'he')
            return false;
        });
    }


    // TO DO: add lep point to selector map & clear any region highlighting
    // (will also need to clear all lep points in updateRegion)

    $("#default-content").hide()
    $("#charts").show()
    $("#breadcrumbs").html('<a href="/">The United Kingdom</a> &raquo; <a class="option-region" href="" id="/#?region='+region_name+'">'+toTitleCase(region_name)+'</a> &raquo; <strong>'+lep_name+'</strong>');
    $('.option-region').last().click(function() {
        updateRegion(region_name, 'fe')
        return false;
    });

    makeDemandBarChart('#bar-demand', lep_data)
    makeDemandScatterPlot('#scatter-demand', lep_data_scatter)
    makeCompScatterPlot('#scatter-comp', lep_data_scatter)
}


function updateRegion(region_name, education){

    $.address.parameter('region', region_name);
    $.address.parameter('lep', '');
    $.address.parameter('education', education);

    regions_geojson.eachLayer(function(layer){
        if(layer.feature.properties['JOB_REGION'] != region_name){
            layer.feature.properties['selected'] = false
            layer.setStyle({'fillOpacity': 0.2, 'color': '#fbab18'});
        }
        else{
            layer.feature.properties['selected'] = true
            layer.setStyle({'fillOpacity': 0.8, 'color': '#fbab18'});
        }
    })

    var place_data = _.where(job_types_by_region, {region_or_nation: region_name})
    if (education=='he'){
        var place_data_scatter = _.where(job_types_by_region, {region_or_nation: region_name, include_he: "1"})

        $("#he-select").attr('class', 'btn btn-xs btn-default selected');
        $("#fe-select").attr('class', 'btn btn-xs btn-default');

        $('#fe-select').click(function() {
            updateRegion(region_name, 'fe')
            return false;
        });

    }
    else{
        var place_data_scatter = _.where(job_types_by_region, {region_or_nation: region_name, include_fe: "1"})

        $("#fe-select").attr('class', 'btn btn-xs btn-default selected');
        $("#he-select").attr('class', 'btn btn-xs btn-default');

        $('#he-select').click(function() {
            updateRegion(region_name, 'he')
            return false;
        });

    }
    // var table_guts = sliceColumns(place_data, display_columns_region);


    $("#default-content").hide()
    $("#charts").show()
    $("#breadcrumbs").html('<a href="/">The United Kingdom</a> &raquo; <strong>' + toTitleCase(region_name) + '</strong>');

    //makeBubbleChart(place_data);

    makeDemandBarChart('#bar-demand', place_data)
    makeDemandScatterPlot('#scatter-demand', place_data_scatter)
    makeCompScatterPlot('#scatter-comp', place_data_scatter)
    // initializeTable('#job-data-region', display_columns_region, table_guts);

}


function showOccupationDetail(occupation){
    $('#occupation-detail-title').html(occupation);
    $('#occupation-detail-content').html(occupation+' info here<br/><br/>')

    $('#occupation-detail-modal').modal('show');
}

