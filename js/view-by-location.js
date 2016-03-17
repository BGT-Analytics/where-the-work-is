// data
var occupation_data;
var regions_data;
var occ_map;

// remembering what has been clicked
var clicked_location = false,
    clicked_occ_family = false,
    clicked_occ = false,
    clicked_map = false;


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
                    geography_name: row.geography_name,
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

        if($.address.parameter("location_type") && $.address.parameter("location")){
            updateLocation(decodeURIComponent($.address.parameter("location_type")), decodeURIComponent($.address.parameter("location")))
        }
        else{
            updateLocation('Country', 'UK Total')
        }

        // populating select menu w/ regions & leps
        var $location_select_list = $('#location-select-list');
        $.each(geo_hierarchy['children'], function(index, value){
            n = value['name']
            n_link_html = makeLinkHTML(n, toTitleCase(n), 'option-nation')
            $location_select_list.append('<li>'+n_link_html+'</li>')
            // loop thru regions within nation
            $.each(value['children'] , function(index, value){
                r = value['name']
                r_link_html =  makeLinkHTML(r, toTitleCase(r), 'option-region')
                $location_select_list.append('<li>'+r_link_html+'</li>')
                // loop thru leps within region
                $.each(value['children'] , function(index, value){
                    l = value['name']
                    l_link_html = makeLinkHTML(l, l, 'option-lep')
                    $location_select_list.append('<li>'+l_link_html+'</li>')
                });
            });
        });

        var $control_pane = $('#control-pane');
        $control_pane.on('click', '.option-country', function() {
            updateLocation('Country', 'UK Total');
            return false;
        });
        $control_pane.on('click', '.option-nation', function() {
            updateLocation('Nation', $(this).attr('data'));
            return false;
        });
        $control_pane.on('click', '.option-region', function() {
            updateLocation('Region', $(this).attr('data'));
            return false;
        });
        $control_pane.on('click', '.option-lep', function() {
            updateLocation('LEP', $(this).attr('data'));
            return false;
        });

        $('#fe-select').click(function() {
            updateEducation('fe')
        });
        $('#he-select').click(function() {
            updateEducation('he')
        });

        var $occ_info_pane = $('#occ-info-pane');
        $("#close-occ").click(function(){
            $occ_info_pane.fadeTo(0, 0, function () {
                $occ_info_pane.fadeTo(800, 1)
            });

            $("#occ-detail").hide();
            $("#default-occ-info").show();

            $occ_info_pane.removeClass('well-occ-inactive');
            $occ_info_pane.addClass('well-occ-active');

            $.address.parameter('occupation', '');
            highlightOcc('');
        });

        var $cls_job_family = $(".job-family");
        $cls_job_family.hover(
            function(){
                highlightOccFamily($(this).attr('data'));
            },
            function(){
                highlightOccFamily('');
            }
        );
        $cls_job_family.click(function(){
            var clicked_job_fam_name = $(this).attr('data')
            // unselect other selected stuff
            $cls_job_family.each(function(index, elem){
                if ($(elem).attr('data')!=clicked_job_fam_name){
                    $(elem).removeClass('selected');
                };
            });
            if($(this).hasClass('selected')){
                // unselecting
                $(this).removeClass('selected');
                selectOccFamily('');
            }else{
                // selecting
                $(this).addClass('selected')
                selectOccFamily(clicked_job_fam_name);
            };

            hideHelperJobFamily();

        });



        // show & flash job family & occupation helpers
        // if user doesn't figure it out within 5 secs
        setTimeout(showHelperJobFamily, 4500);
        setTimeout(showHelperOcc, 5500);

        $("#location-select-list li").click(function() {
           $("#location-dropdown-menu").dropdown("toggle");
           if(clicked_location==false){
                clicked_location=true;
                $("#location-dropdown-menu").addClass('muted');
            };
        });

        $("#breadcrumbs a").click(function(){
            if(clicked_location==false){
                clicked_location=true;
                $("#location-dropdown-menu").addClass('muted');
            };
        });


        $('[data-toggle="tooltip"]').tooltip({
            html: true
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
}

function updateLocation(geo_type, geo_name){
    var education = decodeURIComponent($.address.parameter("education"))
    var geo_display_name = geo_name

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

    clearJobFamilies();


    var place_data = _.where(occupation_data, {geography_type: geo_type, geography_name: geo_name})

    if(geo_display_name.length>32){
        $("#current-location-name").html('<small>'+geo_display_name+'</small>')
    }
    else{
        $("#current-location-name").html(geo_display_name)
    }

    // // updating breadcrumbs
    // var $breadcrumbs = $('#breadcrumbs');

    // $breadcrumbs.html("<span id='helper-location'><i class='fa fa-fw fa-hand-o-left'></i> Change location to explore occupations elsewhere</span>")
    // var breadcrumb_links = makeBreadcrumbLinks(geo_name)
    // if(breadcrumb_links.length){
    //     $breadcrumbs.html("")
    //     $.each(breadcrumb_links, function(index, value){
    //         $breadcrumbs.append(value+' &raquo; ')
    //     });
    // }

    makeDemandChart(place_data)
    // makeDemandScatterPlot('#scatter-demand', agg_data_scatter)
    makeCompScatterPlot(place_data, education)

    if ($.address.parameter('occupation')){
        clicked_occ = true;
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

    makeCompScatterPlot(place_data, education)

    if ($.address.parameter('occupation')){
        highlightOcc(decodeURIComponent($.address.parameter('occupation')), place_data);
    }
}



function selectOccupation(occupation, place_data){
    highlightOcc(occupation);

    // this populates the occupation detail pane on the main location view

    var $occ_info_pane = $('#occ-info-pane');
    $occ_info_pane.fadeTo(0, 0, function () {
        $occ_info_pane.fadeTo(800, 1)
    });
    $occ_info_pane.addClass('well-occ-inactive');
    $occ_info_pane.removeClass('well-occ-active');

    // show map helper if user doesn't figure it out after 5 secs
    setTimeout(showHelperMap, 5000);

    clearJobFamilies();


    $("#default-occ-info").hide();
    $("#occ-detail").show();

    if(occupation.length>50){
        $("#sel-occ-name").html('<small class="long">'+occupation+'</small>')
    }else if(occupation.length>40){
        $("#sel-occ-name").html('<small>'+occupation+'</small>')
    }else{
        $("#sel-occ-name").html(occupation)
    }
    var tooltip_content = 'Jobs included:<br/><ul>'
    $.each(occupation_mapping[occupation]['example_titles'], function(index, title){
        tooltip_content = tooltip_content +'<li>'+ title + '</li>'
    });
    tooltip_content = tooltip_content+'</ul>'+occupation_mapping[occupation]['description']
    $("#sel-occ-desc").html('<a href="#" data-toggle="tooltip" id="occ-info-tooltip" data-placement="bottom" title="'+tooltip_content+'"><i class="fa fa-info-circle"></i></a>')

    var place_occ_data = _.where(place_data, {occupation: occupation})[0]


    var salary_fig = place_occ_data['reg_salary']
    if (salary_fig){
        salary_fig_str = '£'+numberWithCommas(salary_fig)
    }
    else {
        salary_fig_str = '--'
    }


    var comp_fig_he = place_occ_data['he_opportunity_score']
    if (comp_fig_he){
        comp_fig_str_he = parseInt(comp_fig_he)+'/100'
    }
    else {
        comp_fig_str_he = '--'
    }

    var comp_fig_fe = place_occ_data['fe_opportunity_score']
    if (comp_fig_fe){
        comp_fig_str_fe = parseInt(comp_fig_fe)+'/100'
    }
    else {
        comp_fig_str_fe = '--'
    }

    $("#occ-label-demand").html('<span class="label label-'+slugify(place_occ_data['demand_ticker'])+'">'+place_occ_data['demand_ticker']+'</span>')
    $("#occ-label-comp-fe").html('<span class="label label-'+slugify(oppLabel(comp_fig_fe))+'">'+oppLabel(comp_fig_fe)+'</span>')
    $("#occ-label-comp-he").html('<span class="label label-'+slugify(oppLabel(comp_fig_he))+'">'+oppLabel(comp_fig_he)+'</span>')
    $("#occ-label-salary").html('<span class="label label-'+slugify(salaryLabel(salary_fig))+'">'+salaryLabel(salary_fig)+'</span>')

    $("#occ-figure-demand").html(numberWithCommas(place_occ_data['demand_sum'])+'<small> jobs</small>')
    $("#occ-figure-salary").html(salary_fig_str)
    $("#occ-figure-comp-fe").html(comp_fig_str_fe)
    $("#occ-figure-comp-he").html(comp_fig_str_he)


    var $btn_occ_view = $('#btn-occ-view');
    var occ_view_url = '/occupation.html#/?occupation='+encodeURIComponent(occupation)
    $btn_occ_view.attr('href', occ_view_url)


    var $btn_occ_lq = $('#btn-occ-lq');
    $btn_occ_lq.off('click');
    $btn_occ_lq.on('click', function() {

        if(clicked_map==false){
            clicked_map = true;
            $('#helper-map').fadeOut(800);
        };

        $('#occupation-detail-modal').modal('show');
        return false;
    });

    var $occupation_detail_modal = $( "#occupation-detail-modal" )
    $occupation_detail_modal.off('shown.bs.modal');
    $occupation_detail_modal.on('shown.bs.modal', function (e) {
        MapsLib.occ_map._onResize();
        MapsLib.updateData(occupation);
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

    $.address.parameter('occupation', encodeURIComponent(occupation));

    $('#occ-info-tooltip').tooltip({
        html: true
    });
}


// function makeBreadcrumbLinks(geo_name){
//     if(geo_name=='UK Total'){
//         return [];
//     }
//     else{
//         var links = [ makeLinkHTML("UK Total", "The United Kingdom", "option-country") ]
//         var b = breadcrumbs[geo_name]
//         if(b.length==0){
//             return links
//         }
//         else if(b.length==1){
//             var n = b[0]
//             return links.concat( [makeLinkHTML(n, toTitleCase(n), 'option-nation')] )
//         }
//         else if(b.length==2){
//             var n = b[0]
//             var r = b[1]
//             return links.concat( [makeLinkHTML(n, toTitleCase(n), 'option-nation'), makeLinkHTML(r, toTitleCase(r), 'option-region')] )
//         }
//     }
// }

function cleanOccupation(text) {
    // replace 'and' w/ '&'
    return text.replace(/\b[a|A]nd\b/, '&');
}

function oppLabel(opp_val) {
    // converting demand/supply figures into natural language labels
    if (!opp_val){
        return '--'
    } else if (opp_val <= 9){
        return 'Very Low'
    } else if (opp_val <= 32){
        return 'Low'
    } else if (opp_val <= 65){
        return 'Medium'
    } else if (opp_val <= 89){
        return 'High'
    } else {
        return 'Very High'
    }

}

function salaryLabel(salary_val) {
    if (!salary_val) {
        return '--'
    } else if (salary_val <= 17818){
        return 'Very Low'
    } else if (salary_val <= 23823){
        return 'Low'
    } else if (salary_val <= 30999){
        return 'Medium'
    } else if (salary_val <= 41734){
        return 'High'
    } else{
        return 'Very High'
    }
}



function clearJobFamilies(){
    // clear any selected job families
    $(".cls_job_family").each(function(index, elem){
        if ($(elem).hasClass('selected')){
            $(elem).removeClass('selected');
        };
    });
}



function showHelperJobFamily(){
    if(clicked_occ_family==false){
        $("#helper-job-family").fadeTo(800, 1);
    };
};

function showHelperOcc(){
    if(clicked_occ==false){
        $("#helper-occupation").fadeTo(800, 1);
    };
};

function showHelperMap(){
    if(clicked_map==false){
        $("#helper-map").fadeIn(800);
    };
}

function hideHelperJobFamily(){
    if(clicked_occ_family==false){
        clicked_occ_family = true;
        $("#helper-job-family").fadeOut(800);
    }
};

function hideHelperOcc(){
    if(clicked_occ==false){
        clicked_occ = true;
        $("#helper-occupation").fadeOut(800)
    };
};



