// variable init
var occupation_data;

var region_lep_mapping;

var regions_data;
var regions_occ_geojson;

var occ_map;

var geo_hierarchy = {
    'name': 'UK Total',
    'level': 'Country',
    'children': [
        {
            'name': 'NORTHERN IRELAND',
            'level': 'Nation',
            'children': []
        },
        {
            'name': 'SCOTLAND',
            'level': 'Nation',
            'children': []
        },
        {
            'name': 'WALES',
            'level': 'Nation',
            'children': []
        },
        {
            'name': 'ENGLAND',
            'level': 'Nation',
            'children': [
                {
                    'name': 'EAST MIDLANDS',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Leicester and Leicestershire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Derby, Derbyshire, Nottingham and Nottinghamshire',
                            'level': 'LEP'
                        }

                    ]
                },
                {
                    'name': 'EAST OF ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Greater Cambridge & Greater Peterborough',
                            'level': 'LEP'
                        },
                        {
                            'name': 'New Anglia',
                            'level': 'LEP'
                        },
                        {
                            'name': 'South East',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'GREATER LONDON',
                    'level': 'Region',
                    'children': []
                },
                {
                    'name': 'NORTH EAST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'North East',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Tees Valley',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'NORTH WEST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Greater Manchester',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Lancashire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Liverpool City Region',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'SOUTH EAST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Coast to Capital',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Oxfordshire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Solent',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Thames Valley Berkshire',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'SOUTH WEST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Cornwall and Isles of Scilly',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Heart of the South West',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Swindon and Wiltshire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'West of England',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'WEST MIDLANDS',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Black Country',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Coventry and Warwickshire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Greater Birmingham and Solihull',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Stoke-on-Trent and Staffordshire',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'YORKSHIRE AND THE HUMBER',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Humber',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Leeds City Region',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Sheffield City Region',
                            'level': 'LEP'
                        }
                    ]
                }

            ]
        }
    ]
};

var breadcrumbs = {
    "NORTHERN IRELAND":[],
    "SCOTLAND":[],
    "WALES":[],
    "ENGLAND":[],
    "EAST MIDLANDS":["ENGLAND"],
    "Leicester and Leicestershire":["ENGLAND","EAST MIDLANDS"],
    "Derby, Derbyshire, Nottingham and Nottinghamshire":["ENGLAND","EAST MIDLANDS"],
    "EAST OF ENGLAND":["ENGLAND"],
    "Greater Cambridge & Greater Peterborough":["ENGLAND","EAST OF ENGLAND"],
    "New Anglia":["ENGLAND","EAST OF ENGLAND"],
    "South East":["ENGLAND","EAST OF ENGLAND"],
    "GREATER LONDON":["ENGLAND"],
    "NORTH EAST ENGLAND":["ENGLAND"],
    "North East":["ENGLAND","NORTH EAST ENGLAND"],
    "Tees Valley":["ENGLAND","NORTH EAST ENGLAND"],
    "NORTH WEST ENGLAND":["ENGLAND"],
    "Greater Manchester":["ENGLAND","NORTH WEST ENGLAND"],
    "Lancashire":["ENGLAND","NORTH WEST ENGLAND"],
    "Liverpool City Region":["ENGLAND","NORTH WEST ENGLAND"],
    "SOUTH EAST ENGLAND":["ENGLAND"],
    "Coast to Capital":["ENGLAND","SOUTH EAST ENGLAND"],
    "Oxfordshire":["ENGLAND","SOUTH EAST ENGLAND"],
    "Solent":["ENGLAND","SOUTH EAST ENGLAND"],
    "Thames Valley Berkshire":["ENGLAND","SOUTH EAST ENGLAND"],
    "SOUTH WEST ENGLAND":["ENGLAND"],
    "Cornwall and Isles of Scilly":["ENGLAND","SOUTH WEST ENGLAND"],
    "Heart of the South West":["ENGLAND","SOUTH WEST ENGLAND"],
    "Swindon and Wiltshire":["ENGLAND","SOUTH WEST ENGLAND"],
    "West of England":["ENGLAND","SOUTH WEST ENGLAND"],
    "WEST MIDLANDS":["ENGLAND"],
    "Black Country":["ENGLAND","WEST MIDLANDS"],
    "Coventry and Warwickshire":["ENGLAND","WEST MIDLANDS"],
    "Greater Birmingham and Solihull":["ENGLAND","WEST MIDLANDS"],
    "Stoke-on-Trent and Staffordshire":["ENGLAND","WEST MIDLANDS"],
    "YORKSHIRE AND THE HUMBER":["ENGLAND"],
    "Humber":["ENGLAND","YORKSHIRE AND THE HUMBER"],
    "Leeds City Region":["ENGLAND","YORKSHIRE AND THE HUMBER"],
    "Sheffield City Region":["ENGLAND","YORKSHIRE AND THE HUMBER"]
};

// do stuff when the page loads
(function(){

    initialize();
    
})()



function initialize(){

    $.when($.getJSON('data/merged_regions.geojson'), $.get('data/occupation_data.csv')).then(function(geojson, csv){
        regions_data = geojson
        occupation_data = _.where($.csv.toObjects(csv[0]), {medium_skilled: "1"});

        var edu_param = decodeURIComponent($.address.parameter("education"))

        if($.address.parameter("location_type") && $.address.parameter("location")){
            updateLocation(decodeURIComponent($.address.parameter("location_type")), decodeURIComponent($.address.parameter("location")), edu_param)
        }
        else{
            updateLocation('Country', 'UK Total', decodeURIComponent($.address.parameter("education")))
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
            updateLocation('Country', 'UK Total', edu_param);
            return false;
        });
        $('#control-pane').on('click', '.option-nation', function() {
            updateLocation('Nation', $(this).attr('data'), edu_param);
            return false;
        });
        $('#control-pane').on('click', '.option-region', function() {
            updateLocation('Region', $(this).attr('data'), edu_param);
            return false;
        });
        $('#control-pane').on('click', '.option-lep', function() {
            updateLocation('LEP', $(this).attr('data'), edu_param);
            return false;
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


function updateLocation(geo_type, geo_name, education){

    var geo_display_name = geo_name

    if(education != 'fe' && education != 'he'){
        // setting default education level
        education = 'fe'
    }
    else{
        $.address.parameter('education', encodeURIComponent(education));
    }

    if(geo_type=="Country" && geo_name=='UK Total'){
        geo_display_name = "The United Kingdom"
    }
    else{
        $.address.parameter('location_type', encodeURIComponent(geo_type))
        $.address.parameter('location', encodeURIComponent(geo_name))
    }

    var place_data = _.where(occupation_data, {geography_type: geo_type, geography_name: geo_name})
    if (education=='he'){
        var place_data_edu = _.where(occupation_data, {geography_type: geo_type, geography_name: geo_name, include_he: "1"})

        $("#he-select").attr('class', 'btn btn-xs btn-default selected');
        $("#fe-select").attr('class', 'btn btn-xs btn-default');

        $('#fe-select').click(function() {
            updateLocation(geo_type, geo_name, 'fe')
            return false;
        });
    }
    else{
        var place_data_edu = _.where(occupation_data, {geography_type: geo_type, geography_name: geo_name, include_fe: "1"})

        $("#fe-select").attr('class', 'btn btn-xs btn-default selected');
        $("#he-select").attr('class', 'btn btn-xs btn-default');

        $('#he-select').click(function() {
            updateLocation(geo_type, geo_name, 'he')
            return false;
        });
    }

    $("#current-location-name").text(geo_display_name)

    // updating breadcrumbs
    $('#breadcrumbs').html("&nbsp;") // TO-DO: add default text for breadcrumbs for uk
    var breadcrumb_links = makeBreadcrumbLinks(geo_name)
    $.each(breadcrumb_links, function(index, value){
        $('#breadcrumbs').append(value+' &raquo; ')
    });

    // TO-DO: move this logic elsewhere
    if(geo_type=='Country'){
        $("#default-content").show()
    }
    else{
        $("#default-content").hide()
    }

    makeDemandChart('#bar-demand', place_data)
    makeSalaryChart('#salary-chart', place_data)
    makeCompChart('#comp-chart', place_data)
    // makeDemandScatterPlot('#scatter-demand', agg_data_scatter)
    // makeCompScatterPlot('#scatter-comp', agg_data_scatter)
}



function showOccupationDetail(occupation){
    $('#occupation-detail-title').html(occupation);
    $('#occupation-detail-content').html('Description for this occupation<br/>')

    $('#occupation-detail-modal').modal('show');
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
