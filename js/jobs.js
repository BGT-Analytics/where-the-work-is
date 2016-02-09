// variable init
var occupation_data;
var region_lep_mapping;
var regions_data;
var regions_occ_geojson;
var occ_map;


// do stuff when the page loads
(function(){

    initialize();
    
})()



function initialize(){

    $.when($.getJSON('data/merged_regions.geojson'), $.get('data/occupation_data.csv')).then(function(geojson, csv){
        regions_data = geojson
        occupation_data = _.where($.csv.toObjects(csv[0]), {medium_skilled: "1"});

        if($.address.parameter("location_type") && $.address.parameter("location")){
            updateLocation(decodeURIComponent($.address.parameter("location_type")), decodeURIComponent($.address.parameter("location")))
        }
        else{
            updateLocation('Country', 'UK Total')
        }

        // populating select menu w/ regions & leps
        $.each(geo_hierarchy['children'], function(index, value){
            n = value['name']
            n_link_html = makeLinkHTML(n, toTitleCase(n), 'option-nation')
            $('#location-select-list').append('<li>'+n_link_html+'</li>')
            // loop thru regions within nation
            $.each(value['children'] , function(index, value){
                r = value['name']
                r_link_html =  makeLinkHTML(r, toTitleCase(r), 'option-region')
                $('#location-select-list').append('<li>'+r_link_html+'</li>')
                // loop thru leps within region
                $.each(value['children'] , function(index, value){
                    l = value['name']
                    l_link_html = makeLinkHTML(l, l, 'option-lep')
                    $('#location-select-list').append('<li>'+l_link_html+'</li>')
                });
            });
        });

        $('#control-pane').on('click', '.option-country', function() {
            updateLocation('Country', 'UK Total');
            return false;
        });
        $('#control-pane').on('click', '.option-nation', function() {
            updateLocation('Nation', $(this).attr('data'));
            return false;
        });
        $('#control-pane').on('click', '.option-region', function() {
            updateLocation('Region', $(this).attr('data'));
            return false;
        });
        $('#control-pane').on('click', '.option-lep', function() {
            updateLocation('LEP', $(this).attr('data'));
            return false;
        });

        $('#fe-select').click(function() {
            updateEducation('fe')
            return false;
        });
        $('#he-select').click(function() {
            updateEducation('he')
            return false;
        });

        $("#location-select-list li").click(function() {
           $("#location-dropdown-menu").dropdown("toggle");
        });

    });
}

function render_occ_map(){
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

    var job_types_region = _.where(occupation_data, {geography_type: 'Region', occupation: occupation_title});

    $.each(regions_data[0]['features'], function(r_index, region){
        $.each(job_types_region, function(j_index, job){
            if (region.properties['JOB_REGION'] == job['geography_name']) {
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
}


function updateLocation(geo_type, geo_name){
    var education = decodeURIComponent($.address.parameter("education"))
    var geo_display_name = geo_name

    if(education != 'fe' && education != 'he'){
        // setting default education level
        education = 'fe'
    }

    if(geo_type=="Country" && geo_name=='UK Total'){
        geo_display_name = "The United Kingdom"
        $.address.parameter('location_type', '')
        $.address.parameter('location', '')
    }
    else{
        $.address.parameter('location_type', encodeURIComponent(geo_type))
        $.address.parameter('location', encodeURIComponent(geo_name))
        if(geo_type=="Nation" || geo_type=="Region"){
            geo_display_name = toTitleCase(geo_name)
        }
    }

    var place_data = _.where(occupation_data, {geography_type: geo_type, geography_name: geo_name})

    $("#current-location-name").text(geo_display_name)

    // updating breadcrumbs
    $('#breadcrumbs').html("&nbsp;") // TO-DO: add default text for breadcrumbs for uk
    var breadcrumb_links = makeBreadcrumbLinks(geo_name)
    $.each(breadcrumb_links, function(index, value){
        $('#breadcrumbs').append(value+' &raquo; ')
    });

    makeDemandChart('#bar-demand', place_data)
    // makeDemandScatterPlot('#scatter-demand', agg_data_scatter)
    makeCompScatterPlot('#scatter-comp', place_data, education)

    if ($.address.parameter('occupation')){
        selectOccupation(decodeURIComponent($.address.parameter('occupation')), place_data)
    }
}

function updateEducation(education){
    $.address.parameter('education', encodeURIComponent(education));

    // TO-DO: move this logic elsewhere
    if ($.address.parameter('location_type') && $.address.parameter('location')){
        var geo_type = decodeURIComponent($.address.parameter('location_type'))
        var geo_name = decodeURIComponent($.address.parameter('location'))
    }
    else {
        geo_type = 'Country'
        geo_name = 'UK Total'
    }

    var place_data = _.where(occupation_data, {geography_type: geo_type, geography_name: geo_name})

    makeCompScatterPlot('#scatter-comp', place_data, education)

    if ($.address.parameter('occupation')){
        selectOccupation(decodeURIComponent($.address.parameter('occupation')), place_data)
    }
}



function selectOccupation(occupation, place_data){
    // this populates the occupation detail pane on the main location view

    $("#occ-info-pane").removeClass("well-occ-inactive")
    $("#occ-info-pane").addClass("well-occ-active")
    $("#occ-info-pane").addClass("well-sm")
    $("#default-occ-info").hide()
    $("#occ-detail").show()

    $("#sel-occ-name").html(occupation)
    $("#sel-occ-desc").html('<a href="#" data-toggle="tooltip" data-placement="left" title="'+occupation_mapping[occupation]['description']+'"><i class="fa fa-info-circle"></i></a>')


    var place_occ_data = _.where(place_data, {occupation: occupation})[0]

    demand_sum = parseInt(place_occ_data["demand_entry_fe"])+parseInt(place_occ_data["demand_entry_he"])+parseInt(place_occ_data["demand_entry_sl"])


    if (parseInt(place_occ_data['advertised_avg_salary_entry_degree'])){
        salary_fig = '£'+numberWithCommas(parseInt(place_occ_data['advertised_avg_salary_entry_degree']))
    }
    else {
        salary_fig = '--'
    }

    if (parseInt(place_occ_data['he_ds_ratio_log'])){
        figure_comp = parseInt(place_occ_data['he_ds_ratio_log'])
    }
    else {
        figure_comp = '--'
    }

    $("#occ-figure-demand").html(numberWithCommas(demand_sum))
    $("#occ-figure-salary").html(salary_fig)
    $("#occ-figure-comp").html(figure_comp)


    $('#btn-occ-lq').click(function() {
        $('#occupation-detail-title').html(occupation);
        $('#occupation-detail-modal').modal('show');
        return false;
    });

    $('#occupation-detail-modal').on('shown.bs.modal', function (e) {
        render_occ_map();
    });

    $.address.parameter('occupation', encodeURIComponent(occupation));

    highlightOcc(occupation);

    $('[data-toggle="tooltip"]').tooltip();
}




function makeLinkHTML(data, display_name, cls){
    return '<a class="'+cls+'" data="'+data+'" href="">'+display_name+'</a>'
}

function makeBreadcrumbLinks(geo_name){
    if(geo_name=='UK Total'){
        return [];
    }
    else{
        var links = [ makeLinkHTML("UK Total", "The United Kingdom", "option-country") ]
        var b = breadcrumbs[geo_name]
        if(b.length==0){
            return links
        }
        else if(b.length==1){
            var n = b[0]
            return links.concat( [makeLinkHTML(n, toTitleCase(n), 'option-nation')] )
        }
        else if(b.length==2){
            var n = b[0]
            var r = b[1]
            return links.concat( [makeLinkHTML(n, toTitleCase(n), 'option-nation'), makeLinkHTML(r, toTitleCase(r), 'option-region')] )
        }
    }
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
