// data
var occupation_data;
var regions_data;
var occ_map;
var table_header_cols = [   'geography_name',
                            'demand_sum',
                            'reg_salary',
                            'fe_opportunity_score',
                            'he_opportunity_score'  ];

// do stuff when the page loads
(function(){

    initialize();
    
})()



function initialize(){

    $.when($.getJSON('data/merged_regions_simplified.geojson'), $.get('data/occupation_data.csv')).then(function(geojson, csv){

        regions_data = geojson
        occupation_data = _.map(
            $.csv.toObjects(csv[0]),
            function(row) {
                return {
                    geography_name: toTitleCase(row.geography_name),
                    geography_type: row.geography_type,
                    job_family: cleanOccupation(row.job_family),
                    occupation: cleanOccupation(row.occupation),
                    demand_sum: parseInt(row.demand_entry_he)+parseInt(row.demand_entry_fe)+parseInt(row.demand_entry_sl),
                    demand_ticker: row.demand_ticker,
                    demand_entry_he: parseInt(row.demand_entry_he),
                    demand_entry_fe: parseInt(row.demand_entry_fe),
                    demand_entry_sl: parseInt(row.demand_entry_sl),
                    reg_salary: parseInt(row.reg_salary),
                    he_opportunity_score: parseInt(row.he_opportunity_score),
                    fe_opportunity_score: parseInt(row.fe_opportunity_score),
                    lq: row.lq,
                    lq_label: row.lq_label
                };
            }
        );

        //merge location and job data
        var current_occupation;
        var occupation_list = [];
        $.each(occupation_mapping, function(key, value) {occupation_list.push(String(key))});

        $.each(occupation_list, function(k_index, occ) {
            current_occupation = _.where(occupation_data, {occupation: occ});
            $.each(current_occupation, function(j_index, job){
                
                // populate regions 
                $.each(regions_data[0]['features'], function(r_index, region){
                    if (region.properties['JOB_REGION'] == job['geography_name']) {
                        addDataToLocation(region, occ, job);
                    }
                });

                // populate LEPs 
                $.each(lep_locations['features'], function(l_index, lep){
                    if (lep.properties['lep'] == job['geography_name']) {
                        addDataToLocation(lep, occ, job);
                    }
                });
            });
        });

        var occ_fams = [    'Associate Professional & Technical',
                            'Administrative & Secretarial',
                            'Skilled Trades',
                            'Caring, Leisure & Other Service' ]

        if($.address.parameter("occupation")){
            updateOccupation(decodeURIComponent($.address.parameter("occupation")))
        }
        else{
            $("#current-occ-name").html("View prospects by occupation")
            $("#current-occ-fam").html("<i class='fa fa-fw fa-hand-o-left'></i> Select an occupation")
        }

        // populating select menu w/ regions & leps
        var $occ_select_list = $('#occ-select-list');
        $.each(occ_fams, function(index, occ_fam){
            // adding occ fam label (not a link, just a label for organization)
            $occ_select_list.append('<li class="occ-fam"><span>'+occ_fam+'</span></li>')
            // loop thru jobs & add the ones within this job fam
            $.each(occupation_mapping , function(occ_name, occ_dict){

                if(occ_dict['job_family']==occ_fam+' Occupations'){
                    occ_link_html =  makeLinkHTML(occ_name, occ_name, 'option-occ')
                    $occ_select_list.append('<li>'+occ_link_html+'</li>')
                }
            });
        });

        var $control_pane = $('#control-pane');
        $control_pane.on('click', '.option-occ', function() {
            updateOccupation($(this).attr('data'));
            $("#occ-dropdown-menu").dropdown("toggle");
            return false;
        });


        // MapsLib.initialize();

    });
}

// helper function for stuffing data into GeoJSON object
function addDataToLocation(location, occ, job){
    if (typeof location.properties['jobs_data'] === 'undefined')
        location.properties['jobs_data'] = {};
    location.properties['jobs_data'][occ] = {};
    location.properties['jobs_data'][occ]['lq'] = job['lq'];
    location.properties['jobs_data'][occ]['lq_label'] = job['lq_label'];
    location.properties['jobs_data'][occ]['demand_sum'] = job['demand_sum'];
    location.properties['jobs_data'][occ]['demand_ticker'] = job['demand_ticker'];
    location.properties['jobs_data'][occ]['reg_salary'] = job['reg_salary'];
    location.properties['jobs_data'][occ]['fe_opportunity_score'] = job['fe_opportunity_score'];
    location.properties['jobs_data'][occ]['he_opportunity_score'] = job['he_opportunity_score'];
    location.properties['jobs_data'][occ]['fe_opportunity_level'] = job['fe_opportunity_level'];
    location.properties['jobs_data'][occ]['he_opportunity_level'] = job['he_opportunity_level'];
}

function updateOccupation(occ_name){

    $.address.parameter('occupation', encodeURIComponent(occ_name))
    $("#current-occ-name").html(occ_name)
    $("#current-occ-fam").html(occupation_mapping[occ_name]['job_family'])

    var occ_data = _.where(occupation_data, {occupation: occ_name})
    var table_guts = sliceColumns(occ_data, table_header_cols);
    initializeTable('#occ-table', table_header_cols, table_guts);


    // TO DO: update control pane

    // if(geo_display_name == "The United Kingdom"){
    //     $("#current-location-name").html('<span id="default-location">'+geo_display_name+'</span>')
    // }
    // else if(geo_display_name.length>32){
    //     $("#current-location-name").html('<small>'+geo_display_name+'</small>')
    // }
    // else{
    //     $("#current-location-name").html(geo_display_name)
    // }



    // TO DO: update breadcrumbs
    // var $breadcrumbs = $('#breadcrumbs');

    // $breadcrumbs.html("<span id='helper-location'><i class='fa fa-fw fa-hand-o-left'></i> Change location to explore occupations elsewhere</span>")
    // var breadcrumb_links = makeBreadcrumbLinks(geo_name)
    // if(breadcrumb_links.length){
    //     $breadcrumbs.html("")
    //     $.each(breadcrumb_links, function(index, value){
    //         $breadcrumbs.append(value+' &raquo; ')
    //     });
    // }



    // TO DO: populate chart
}



function cleanOccupation(text) {
    // replace 'and' w/ '&'
    return text.replace(/\b[a|A]nd\b/, '&');
}


function initializeTable(table_id, column_names, data){
    // column_names is an array of names to be used as the header row of the table
    // data is a 2D array of values for the table
    var names = [];
    $.each(column_names, function(i, name){
        names.push({'title': name});
    })

    $(table_id).DataTable({
        searching: false,
        destroy: true,
        data: data,
        columns: names,
        info: false,
        paging: false,
        aoColumns: [
            { "sTitle": "Location", "sType": "string", "width": "40%"},
            {
                "sTitle": "Openings", 
                "sType": "numeric", 
                "oDefault": 0, 
                "width": "15%",
                "mRender": function (data, type, full) {
                            if(data){
                                return numberWithCommas(data);
                            }
                            else{
                                return '--'
                            }
                        }
            },
            { 
                "sTitle": "Average salary", 
                "sType": "numeric", 
                "oDefault": 0, 
                "width": "15%",
                "mRender": function (data, type, full) {
                            if(data){
                                return '£'+numberWithCommas(data);
                            }
                            else{
                                return '--'
                            }
                        }
            },
            { 
                "sTitle": "Opportunity score (FE)", 
                "sType": "numeric", 
                "oDefault": 0, 
                "width": "15%",
                "mRender": function (data, type, full) {
                            if(data){
                                return data;
                            }
                            else{
                                return '--'
                            }
                        }
            },
            { 
                "sTitle": "Opportunity score (HE)", 
                "sType": "numeric", 
                "oDefault": 0, 
                "width": "15%",
                "mRender": function (data, type, full) {
                            if(data){
                                return data;
                            }
                            else{
                                return '--'
                            }
                        }
            }
        ]
    });
}