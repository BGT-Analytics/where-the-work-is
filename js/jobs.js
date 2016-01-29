// variable init
var map;
var info;
var regions_data;
var regions_geojson;
var job_types_data;
var job_types_by_region;
var job_types_by_lep;
var display_columns_all = ['region_or_nation','job_family','occupation', 'demand_entry', 'demand_ticker', 'demand_entry_sl', 'demand_entry_fe', 'demand_entry_he'];
var display_columns_region = ['job_family','occupation', 'demand_entry', 'demand_ticker', 'demand_entry_sl', 'demand_entry_fe', 'demand_entry_he'];
var region_lep_mapping;
var occ_map;
var regions_occ_geojson;


// do stuff when the page loads
(function(){

    initialize();
    
})()



function initialize(){

    $.when($.getJSON('data/merged_regions.geojson'), $.get('data/job_types_by_region.csv')).then(function(geojson, csv){
        regions_data = geojson
        job_types_data = csv
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
            $('#location-select-list').append('<li><a class="option-region" href="/#?region='+r+'">'+toTitleCase(r)+'</a></li>')
            $.each(value['leps_within'] , function(index, value){
                $('#location-select-list').append('<li class="small"><a class="option-lep" href="/#?region='+r+'&lep='+value+'">'+value+'</a></li>')
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
        var occupation_title = $('#occupation-detail-title').html();

        if (occ_map == null) {
            occ_map = L.map('occupation-detail-map', {
                scrollWheelZoom: false,
                center: [55, -3.5], 
                zoom: 5,
                attributionControl: false,
                zoomControl:false
            });

            var layer = new L.StamenTileLayer("toner-lite");
            occ_map.addLayer(layer);

            // control that shows state info on hover
            var info = L.control();

            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };

            info.update = function (props) {
                this._div.innerHTML = (props ?
                    '<b>' + toTitleCase(props['JOB_REGION']) + '</b><br />Job prospects: ' + props.lq_label
                    : 'Hover over a region or nation');
            };

            info.addTo(occ_map);

            var legend = L.control({position: 'bottomright'});

            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0.16, 0.667, 0.833, 1.2, 1.5],
                    labels = [],
                    from, to;

                for (var i = 0; i < grades.length; i++) {
                    from = grades[i];
                    to = grades[i + 1];

                    labels.push(
                        '<i style="background:' + getColor(from + 0.001) + '"></i> ' +
                        getLabel(from + 0.001));
                }

                div.innerHTML = "<h4>Job prospects</h4>"
                div.innerHTML += labels.join('<br>');
                return div;
            };

            legend.addTo(occ_map);
        }

        var job_types_region = _.where($.csv.toObjects(job_types_data[0]), {occupation: occupation_title});

        $.each(regions_data[0]['features'], function(r_index, region){
            $.each(job_types_region, function(j_index, job){
                if (region.properties['JOB_REGION'] == job['region_or_nation']) {
                    region.properties['lq'] = job['lq'];
                    region.properties['lq_label'] = job['lq_label'];
                }
            });
        });

        regions_occ_geojson = L.geoJson(regions_data[0], {style: occ_style, onEachFeature: onEachFeature}).addTo(occ_map);


        // get color depending on population density value
        function getColor(d) {
            return d > 1.5      ? '#993404' :
                   d > 1.2      ? '#d95f0e' :
                   d > 0.833    ? '#fe9929' :
                   d > 0.667    ? '#fed98e' :
                   d > 0.16     ? '#ffffd4' :
                                  '#ffffd4' ;
        }

        function getLabel(d) {
            return d > 1.5      ? 'Very High' :
                   d > 1.2      ? 'High' :
                   d > 0.833    ? 'Average' :
                   d > 0.667    ? 'Low' :
                   d > 0.16     ? 'Very Low' :
                                  '' ;
        }

        function occ_style(feature) {
            return {
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7,
                fillColor: getColor(feature.properties.lq)
            };
        }

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 3,
                color: '#5A5858',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }

            info.update(layer.feature.properties);
        }

        function resetHighlight(e) {
            regions_occ_geojson.resetStyle(e.target);
            info.update();
        }

        function zoomToFeature(e) {
            occ_map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });
        }
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
                demand_entry_sl: sum(_.pluck(value, "demand_entry_sl")),
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

    $("#current-location-name").text("The United Kingdom")
    $("#default-content").show()
    $("#charts").show()

    makeDemandChart('#bar-demand', agg_demand)
    // makeDemandScatterPlot('#scatter-demand', agg_data_scatter)
    // makeCompScatterPlot('#scatter-comp', agg_data_scatter)
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


    $("#default-content").hide()
    $("#charts").show()
    $("#breadcrumbs").html('<a href="/">The United Kingdom</a> &raquo; <a class="option-region" href="" id="/#?region='+region_name+'">'+toTitleCase(region_name)+'</a> &raquo; <strong>'+lep_name+'</strong>');
    $("#current-location-name").text(lep_name)
    $('.option-region').last().click(function() {
        updateRegion(region_name, 'fe')
        return false;
    });

    makeDemandChart('#bar-demand', lep_data)
    // makeDemandScatterPlot('#scatter-demand', lep_data_scatter)
    // makeCompScatterPlot('#scatter-comp', lep_data_scatter)
}


function updateRegion(region_name, education){

    $.address.parameter('region', region_name);
    $.address.parameter('lep', '');
    $.address.parameter('education', education);

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


    $("#default-content").hide()
    $("#charts").show()
    $("#breadcrumbs").html('<a href="/">The United Kingdom</a> &raquo; <strong>' + toTitleCase(region_name) + '</strong>');
    $("#current-location-name").text(toTitleCase(region_name))


    makeDemandChart('#bar-demand', place_data)
    makeSalaryChart('#salary-chart', place_data)
    makeCompChart('#comp-chart', place_data)
    // makeDemandScatterPlot('#scatter-demand', place_data_scatter)
    // makeCompScatterPlot('#scatter-comp', place_data_scatter)

}


function showOccupationDetail(occupation){
    $('#occupation-detail-title').html(occupation);
    $('#occupation-detail-content').html('Description for this occupation<br/>')

    $('#occupation-detail-modal').modal('show');
}

