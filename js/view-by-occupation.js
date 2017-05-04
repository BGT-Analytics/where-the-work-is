// data
var occupation_data;
var regions_data;
var full_time_data;
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

    $.when($.getJSON('data/merged_regions_simplified.geojson'), $.get('data/occupation_data.csv'), $.get('data/full_time_percent.csv')).then(function(geojson, csv, full_time_csv){

        // Create objects from geojson and CSV files.
        regions_data = geojson
        occupation_data = _.map(
            $.csv.toObjects(csv[0]),
            function(row) {
                return {
                    geography_name: row.geography_name,
                    geography_type: row.geography_type,
                    occ_group: cleanOccupation(row.occupation_group),
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

        full_time_data = _.map(
            $.csv.toObjects(full_time_csv[0]),
            function(row) {
                return {
                    nation_region: row.nation_region,
                    soc3: row.soc3,
                    soc_description: row.soc_description,
                    notes: row.notes,
                    fulm_time_percent: row.percentage_of_workforce_who_are_full_time,
                };
            }
        );

        console.log(full_time_data)

        //merge location and job data
        var current_occupation;
        var occupation_list = [];
        $.each(occupation_mapping, function(key, value) {occupation_list.push(String(key))});

        $.each(occupation_list, function(k_index, occ) {
            current_occupation = _.where(occupation_data, {occupation: occ});
            $.each(current_occupation, function(j_index, job){
                // populate regions
                $.each(regions_data[0]['features'], function(r_index, region){

                    // if (job['geography_name'] == 'OXFORDSHIRE LEP') {
                    // if (region.properties['JOB_REGION'] == 'OXFORDSHIRE') {
                    //     console.log("looking for ...")
                    //     // Oxfordshire
                    //     console.log(job['geography_name'])
                        // console.log(region.properties['JOB_REGION'])
                    // }

                    if (region.properties['JOB_REGION'] == job['geography_name']) {
                    // if (region.properties['LEP/City Region'] == job['geography_name']) {
                        addDataToLocation(region, occ, job);
                                            console.log(region.properties)
                    }
                });

                // populate LEPs
                $.each(lep_locations['features'], function(l_index, lep){
                    // if (lep.properties['lep'].toUpperCase() == job['geography_name'].toUpperCase()) {
                    // if (lep.properties['LEPplus'].toUpperCase() == job['geography_name'].toUpperCase()) {
                    if (lep.properties['LEP/City Region'].toUpperCase() == job['geography_name'].toUpperCase()) {
                        addDataToLocation(lep, occ, job);
                    }
                });
            });
        });

        var occ_fams = [    'Associate professional & technical',
                            'Administrative & secretarial',
                            'Skilled trades',
                            'Caring, leisure & other service' ]


        if($.address.parameter("occupation")){
            // console.log(decodeURIComponent($.address.parameter("occupation")))
            updateOccupation(decodeURIComponent($.address.parameter("occupation")), $.address.parameter('location_level'));
        }
        else{
            $("#current-occ-name").html("View prospects by occupation")
        }

        // populating select menu w/ occupation groups & occupations
        var $occ_select_list = $('#occ-select-list');
        $.each(occ_fams, function(index, occ_fam){
            // adding occ fam label (not a link, just a label for organization)
            $occ_select_list.append('<li class="occ-fam"><span>'+occ_fam+'</span></li>')
            // loop thru jobs & add the ones within this job fam
            $.each(occupation_mapping , function(occ_name, occ_dict){

                if(occ_dict['occ_group']==occ_fam+' occupations'){
                    occ_link_html =  makeLinkHTML(occ_name, occ_name, 'option-occ')
                    $occ_select_list.append('<li>'+occ_link_html+'</li>')
                }
            });
        });

        var $control_pane = $('#control-pane');
        $control_pane.on('click', '.option-occ', function() {
            updateOccupation($(this).attr('data'), $.address.parameter('location_level'));
            $("#occ-dropdown-menu").dropdown("toggle");
            return false;
        });

        $('#geo-level-region').on('click', function (e) {

            $.address.parameter('location_level', 'region')

            if($.address.parameter("occupation")){
                if($.address.parameter('location_level') && $.address.parameter('location_level')=='lep'){
                    updateOccupation(decodeURIComponent($.address.parameter("occupation")), 'lep');
                } else{
                    // by default, view by region
                    updateOccupation(decodeURIComponent($.address.parameter("occupation")), 'region');
                }
            }
        });

        $('#geo-level-lep').on('click', function (e) {

            $.address.parameter('location_level', 'lep')

            if($.address.parameter("occupation")){
                if($.address.parameter('location_level') && $.address.parameter('location_level')=='lep'){
                    updateOccupation(decodeURIComponent($.address.parameter("occupation")), 'lep');
                } else{
                    // by default, view by region
                    updateOccupation(decodeURIComponent($.address.parameter("occupation")), 'region');
                }
            }
        });

        MapsLib.initialize();
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
    // console.log("data added", location.properties['jobs_data'])
}

function updateOccupation(occ_name, location_level){
    // TO DO: select radio button appropriately
    if(location_level!='lep'){
        // by default, if location_level not specified, show nations/regions
        var occ_data = _.filter(occupation_data, function(row){
                            return row.occupation==occ_name&&(row.geography_type=='Region'||row.geography_type=='Nation'||row.geography_type=='Country');
                        });
    } else{
        var occ_data = _.filter(occupation_data, function(row){
                            return row.occupation==occ_name&&(row.geography_type=='LEP'||row.geography_type=='Country');
                        });
    }

    $.address.parameter('occupation', encodeURIComponent(occ_name))

    // Code for back button.
    occ = $.address.parameter('occupation')
    occ_group = $.address.parameter('occupation_group')
    var index_view_url = '/#/?occupation_group='+ occ_group + '&occupation='+occ
    $('#occ-back').attr('href', index_view_url)


    if(occ_name.length>32){
        $("#current-occ-name").html('<small>'+occ_name+'</small>')
    }
    else{
        $("#current-occ-name").html(occ_name)
    }

    var table_guts = sliceColumns(occ_data, table_header_cols);
    initializeTable('#occ-table', table_header_cols, table_guts);

    initModal(occ_name, location_level);
}

function initModal(occ_name, location_level){

    // modal stuff
    var $btn_occ_lq = $('.btn-occ-lq');
    $btn_occ_lq.off('click');
    $btn_occ_lq.on('click', function() {
        $('#occupation-detail-modal').modal('show');
        return false;
    });

    var $occupation_detail_modal = $( "#occupation-detail-modal" )
    $occupation_detail_modal.off('shown.bs.modal');
    $occupation_detail_modal.on('shown.bs.modal', function (e) {
        MapsLib.occ_map._onResize();
        MapsLib.updateData(occ_name);
        $('#mapGeoRegions').click();
    });

    var $map_geo_regions = $('#mapGeoRegions');
    $map_geo_regions.off('click');
    $map_geo_regions.on('click', function (e) {
        MapsLib.toggleGeo('regions');
    });

    var $map_gep_leps = $('#mapGeoLeps');
    $map_gep_leps.off('click');
    $map_gep_leps.on('click', function (e) {
        MapsLib.toggleGeo('leps');
    });

    $.address.parameter('occupation', encodeURIComponent(occ_name));
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

    var my_table = $(table_id).DataTable({
        searching: false,
        destroy: true,
        data: data,
        columns: names,
        info: false,
        paging: false,
        aoColumns: [
            {
                "sTitle": "Location",
                "sType": "string",
                "mRender": function (data, type, full) {
                            if(data){
                                if (data == "UK Total")
                                    return "<strong> " + cleanGeo(data) + "</strong>"
                                else
                                    return cleanGeo(data);
                            }
                            else{
                                return ''
                            }
                        }
            },
            {
                "sTitle": "Job openings",
                "sType": "custom-num-html",
                "oDefault": 0,
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
                "sType": "custom-num-html",
                "oDefault": 0,
                "mRender": function (data, type, full) {
                            if(data){
                                return '<span title="' + salaryLabel(data) + ' average salary" class="label label-' + slugify(salaryLabel(data)) +'">£' + numberWithCommas(data) + '</span>';
                            }
                            else{
                                return '--'
                            }
                        }
            },
            {
                "sTitle": "Opportunity score (FE)",
                "sType": "custom-num-html",
                "oDefault": 0,
                "width": "15%",
                "mRender": function (data, type, full) {
                            if(data){
                                return '<span title="' + oppLabel(data) + ' opportunity" class="label label-' + slugify(oppLabel(data)) +'">' + data + '</span>';
                            }
                            else{
                                return '--'
                            }
                        }
            },
            {
                "sTitle": "Opportunity score (HE)",
                "sType": "custom-num-html",
                "oDefault": 0,
                "width": "15%",
                "mRender": function (data, type, full) {
                            if(data){
                                return '<span title="' + oppLabel(data) + ' opportunity" class="label label-' + slugify(oppLabel(data)) +'">' + data + '</span>';
                            }
                            else{
                                return '--'
                            }
                        }
            }
        ]
    });
}
