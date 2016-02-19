// variable init
var occupation_data;
var regions_data;
var occ_map;

var clicked_location = false;
var clicked_occ_family = false;
var clicked_occ = false;
var clicked_map = false;


// do stuff when the page loads
(function(){

    initialize();
    
})()



function initialize(){

    $.when($.getJSON('data/merged_regions.geojson'), $.get('data/occupation_data.csv')).then(function(geojson, csv){
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
        });
        $('#he-select').click(function() {
            updateEducation('he')
        });

        $("#location-select-list li").click(function() {
           $("#location-dropdown-menu").dropdown("toggle");
        });

        $("#close-occ").click(function(){
            $('#occ-info-pane').fadeTo(0, 0, function () {
                $('#occ-info-pane').fadeTo(800, 1)
            });

            $("#occ-detail").hide();
            $("#default-occ-info").show();

            $.address.parameter('occupation', '');
            highlightOcc('');
        });

        $(".job-family").hover(
            function(){
                highlightOccFamily($(this).attr('data'));
            },
            function(){
                highlightOccFamily('');
            }
        );
        $(".job-family").click(function(){
            var clicked_job_fam_name = $(this).attr('data')
            // unselect other selected stuff
            $('.job-family').each(function(index, elem){
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

            if(clicked_occ_family==false){
                clicked_occ_family = true;
                $("#helper-job-family i").removeClass('flash');
                $("#helper-job-family").fadeOut(800);
            }
            if(clicked_occ==false){
                // show & flash occupation helper
                $("#helper-occupation").fadeIn(800);
                $("#helper-occupation i").addClass('flash');
            };

        });


        setInterval(function () {
            $('.flash').fadeTo(400, 1, function () {
                $('.flash').fadeTo(400, .1)
            });
        }, 800);

        $("#location-dropdown-menu").click(function(){

            if(clicked_location==false){
                clicked_location=true;
                $("#location-dropdown-menu i").removeClass('flash')
                $("#location-dropdown-menu i").addClass('opaque')
            }
            // show & flash job family helper
            if(clicked_occ_family==false){
                $("#helper-job-family").fadeIn(800);
                $("#helper-job-family i").addClass('flash');
            };

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

    // clear any selected job families
    $('.job-family').each(function(index, elem){
        if ($(elem).hasClass('selected')){
            $(elem).removeClass('selected');
        };
    });


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

    $('#occ-info-pane').fadeTo(0, 0, function () {
        $('#occ-info-pane').fadeTo(800, 1)
    });

    if(clicked_map==false&&clicked_location==true){
        $("#btn-occ-lq i").addClass('flash');
    };


    $("#default-occ-info").hide();
    $("#occ-detail").show();

    $("#sel-occ-name").html(occupation)
    var tooltip_content = 'Jobs included:<br/><ul>'
    $.each(occupation_mapping[occupation]['example_titles'], function(index, title){
        tooltip_content = tooltip_content +'<li>'+ title + '</li>'
    });
    tooltip_content = tooltip_content+'</ul>'+occupation_mapping[occupation]['description']
    $("#sel-occ-desc").html('<a href="#" data-toggle="tooltip" data-placement="right" title="'+tooltip_content+'"><i class="fa fa-info-circle"></i></a>')

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

    $("#occ-figure-demand").html(numberWithCommas(place_occ_data['demand_sum'])+' jobs')
    $("#occ-figure-salary").html(salary_fig_str)
    $("#occ-figure-comp-fe").html(comp_fig_str_fe)
    $("#occ-figure-comp-he").html(comp_fig_str_he)


    $( "#btn-occ-lq" ).off('click');
    $('#btn-occ-lq').on('click', function() {

        if(clicked_map==false){
            clicked_map = true;
            $('#btn-occ-lq').removeClass('flash');
            $('#btn-occ-lq').addClass('opaque');
        };

        $('#occupation-detail-modal').modal('show');
        return false;
    });

    $( "#occupation-detail-modal" ).off('shown.bs.modal');
    $( "#occupation-detail-modal" ).on('shown.bs.modal', function (e) {
        MapsLib.occ_map._onResize();
        MapsLib.updateData(occupation);
        $('#mapGeoRegions').click();
    });

    $( "#mapGeoRegions" ).off('click');
    $( "#mapGeoRegions" ).on('click', function (e) {
        MapsLib.toggleGeo('regions');
    });

    $( "#mapGeoLeps" ).off('click');
    $( "#mapGeoLeps" ).on('click', function (e) {
        MapsLib.toggleGeo('leps');
    });

    $.address.parameter('occupation', encodeURIComponent(occupation));

    highlightOcc(occupation);

    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });
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
