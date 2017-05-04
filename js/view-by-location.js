// The data created from the full csv document.
var occupation_data;
// The data created from the csv document, which contains only the occupation groups (made in the Makefile)
var occupation_group_data;
var regions_data;
var place_data;
var full_time_data;
var historical_employment_data;
var projection_employment_data;

// remembering what has been clicked
var clicked_location = false,
    clicked_occ_group = false,
    clicked_occ = false,
    clicked_occ_bar = false,
    clicked_map = false;

(function(){
    initialize();
})()

function initialize(){
    $.when($.getJSON('data/merged_regions_simplified.geojson'), $.get('data/occupation_data.csv'), $.get('data/occupation_group_data.csv'), $.get('data/full_time_percent.csv'), $.get('data/historical_employment.csv'), $.get('data/projection_employment.csv'), $.get('data/occ_skills.csv')).then(function(geojson, csv, csv_groups, full_time_csv, historical_employment_csv, projection_employment_csv, occ_skils_csv){

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

        occupation_group_data = _.map(
            $.csv.toObjects(csv_groups[0]),
            function(row) {
                return {
                    occ_group: cleanOccupation(row.occupation_group),
                    demand_sum: parseInt(row.demand_entry_he)+parseInt(row.demand_entry_fe)+parseInt(row.demand_entry_sl),
                    demand_entry_he: parseInt(row.demand_entry_he),
                    demand_entry_fe: parseInt(row.demand_entry_fe),
                    demand_entry_sl: parseInt(row.demand_entry_sl),
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
                    full_time_percent: row.percentage_of_workforce_who_are_full_time,
                };
            }
        );

        historical_employment_data = _.map(
            $.csv.toObjects(historical_employment_csv[0]),
            function(row) {
                return {
                    nation_region: row.nation_region,
                    soc3: row.soc3,
                    soc_name: row.soc_name,
                    year_2012: row.year_2012,
                    year_2013: row.year_2013,
                    year_2014: row.year_2014,
                    year_2015: row.year_2015,
                };
            }
        );

        projection_employment_data = _.map(
            $.csv.toObjects(projection_employment_csv[0]),
            function(row) {
                return {
                    nation_region: row.nation_region,
                    soc3: row.soc3,
                    soc_name: row.soc_name,
                    projection: row.working_futures_projection,
                };
            }
        );

        occ_skills_data = _.map(
            $.csv.toObjects(occ_skils_csv[0]),
            function(row) {
                return {
                    soc3_name: row.soc3_name,
                    skills: row.specialist_skills_required_for_this_occupation_include,
                };
            }
        );

        if($.address.parameter("location_type") && $.address.parameter("location")){
            updateLocation(decodeURIComponent($.address.parameter("location_type")), decodeURIComponent($.address.parameter("location")))
        }
        else{
            // This makes the demand bar chart.
            updateLocation('Country', 'UK');
        }

        // populating select menu w/ regions & leps
        var $location_select_list = $('#location-select-list');
        $location_select_list.append('<li><a href="/" id="option-uk">United Kingdom</a></li><hr/>')
        $.each(geo_hierarchy['children'], function(index, value){
            n = value['name']
            n_link_html = makeLinkHTML(n, cleanGeo(n), 'option-nation')
            $location_select_list.append('<li>'+n_link_html+'</li>')
            // loop thru regions within nation
            $.each(value['children'] , function(index, value){
                r = value['name']
                r_link_html =  makeLinkHTML(r, cleanGeo(r), 'option-region')
                $location_select_list.append('<li>'+r_link_html+'</li>')
                // loop thru leps within region
                $.each(value['children'] , function(index, value){
                    l = value['name']
                    l_link_html = makeLinkHTML(l, cleanGeo(l), 'option-lep')
                    $location_select_list.append('<li>'+l_link_html+'</li>')
                });
            });
        });

        // To "Browse mid-skilled jobs by location":
        var $control_pane = $('#control-pane');
        $control_pane.on('click', '.option-country', function() {
            updateLocation('Country', 'UK');
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
            updateLocation('LEPplus', $(this).attr('data'));
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

        var $cls_occ_group = $(".job-family");
        $cls_occ_group.hover(
            function(){
                highlightOccFamily($(this).attr('data'));
                triggerHoverScatter($(this).attr('data'));
            },
            function(){
                highlightOccFamily('');
            }
        );

        $cls_occ_group.on('click', function(){
            var clicked_occ_group = $(this).attr('data')
            selectOccGroup(clicked_occ_group);
        });

        // show & flash job family & occupation helpers
        // if user doesn't figure it out within 4 secs
        setTimeout(showHelperJobFamily, 3500);
        setTimeout(function(){ showHelperOcc(6); }, 4500);

        $("#location-select-list li").click(function() {
           $("#location-dropdown-menu").dropdown("toggle");
           if(clicked_location==false){
                clicked_location=true;
                $("#location-dropdown-menu").addClass('muted');
            };
        });

        $('[data-toggle="tooltip"]').tooltip({
            html: true
        });

        clearSelect();
    });
}

function updateLocation(geo_type, geo_name){
    var education = decodeURIComponent($.address.parameter("education"))
    var geo_display_name = geo_name

    if(geo_type=="Country" && geo_name=='UK'){
        geo_display_name = "United Kingdom"
        $.address.parameter('location_type', '')
        $.address.parameter('location', '')
    }
    else{
        $.address.parameter('location_type', encodeURIComponent(geo_type))
        $.address.parameter('location', encodeURIComponent(geo_name))
        if(geo_type=="Nation" || geo_type=="Region" || geo_type=='LEPplus'){
            geo_display_name = cleanGeo(geo_name)
        }
    }

    if(geo_display_name.length>32){
        $("#current-location-name").html('<small>'+geo_display_name+'</small>')
    }
    else{
        $("#current-location-name").html(geo_display_name)
    }

    // Get the right data.
    place_data = _.where(occupation_data, {geography_type: geo_type, geography_name: geo_name.toUpperCase()})

    if ($.address.parameter('occupation_group')) {
        occ_group = decodeURIComponent($.address.parameter('occupation_group'))
        var filtered_data = _.filter(place_data, function(el) {
            return el['occ_group'] == occ_group;
        });
        place_data = filtered_data;

        // Info pop up
        percent_len = filtered_data.length;
        hideHelperOcc();
        setTimeout(function(){ showHelperOcc(percent_len); }, 3500);
    }

    clearJobFamilies();
    makeDemandChart(place_data, occupation_group_data);
    makeCompScatterPlot(place_data, education);
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
        geo_name = 'UK'
    }

    if ($.address.parameter('occupation')){
        highlightOcc(decodeURIComponent($.address.parameter('occupation')), place_data);
    }

    // Get the right data.
    place_data = _.where(occupation_data, {geography_type: geo_type, geography_name: geo_name.toUpperCase()})

    if ($.address.parameter('occupation_group')) {
        occ_group = decodeURIComponent($.address.parameter('occupation_group'))
        var filtered_data = _.filter(place_data, function(el) {
            return el['occ_group'] == occ_group;
        });

        place_data = filtered_data
    }

    makeCompScatterPlot(place_data, education)
}

function selectOccupation(occupation, place_data){
    highlightOcc(occupation);

    if ($.address.parameter('occupation_group')) {
        // Add occupation to the URL, becuase someone clicked an occupation.
        $.address.parameter('occupation', encodeURIComponent(occupation));

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

        $('#occ-info-tooltip').tooltip({
            html: true
        });

        // Pop the modal
        $('#occupationModal').modal('show');

        // Give modal a title.
        $('#occupationModalLabel').html(occupation);

        // Give modal content.
        $("#modal-occ-description").html('<p>' + occupation_mapping[occupation]['description'] + '</p>');
        $("#modal-occ-label-demand").html('<span class="label label-'+slugify(place_occ_data['demand_ticker'])+'">'+place_occ_data['demand_ticker']+'</span>')
        $("#modal-occ-label-comp-fe").html('<span class="label label-'+slugify(oppLabel(comp_fig_fe))+'">'+oppLabel(comp_fig_fe)+'</span>')
        $("#modal-occ-label-comp-he").html('<span class="label label-'+slugify(oppLabel(comp_fig_he))+'">'+oppLabel(comp_fig_he)+'</span>')
        $("#modal-occ-label-salary").html('<span class="label label-'+slugify(salaryLabel(salary_fig))+'">'+salaryLabel(salary_fig)+'</span>')
        $("#modal-occ-figure-demand").html(numberWithCommas(place_occ_data['demand_sum'])+'<small> jobs</small>')
        $("#modal-occ-figure-salary").html(salary_fig_str)
        $("#modal-occ-figure-comp-fe").html(comp_fig_str_fe)
        $("#modal-occ-figure-comp-he").html(comp_fig_str_he)



        // Build the button to visit the view-by-location page.
        occ = $.address.parameter('occupation')
        occ_group = $.address.parameter('occupation_group')

        var $btn_occ_view = $('#modal-btn-occ-view');
        var occ_view_url = '/occupation.html#/?occupation_group='+ occ_group + '&occupation='+occ

        $btn_occ_view.attr('href', occ_view_url)

        // Display skills and titles information
        makeSkillsText(occ_skills_data, occupation);

        // Find and decode location
        var loc = findLocation().toUpperCase();
        if (decodeURIComponent($.address.parameter("location_type")) == 'LEPplus') {
            loc = loc + '<br><small>Complete data not available for ' + decodeURIComponent($.address.parameter("location")) + '</small>'
        }

        // Create a pie chart with a subheader
        makePieChart(full_time_data, occupation);
        $("#location-span-percent").html(loc)

        // Create a table with a subheader
        makeLineChart(historical_employment_data, occupation)
        makeProjectionText(projection_employment_data, occupation);
        $("#span-historical").html(loc);

    }
    else {
        // Add occupation group to URL.
        $.address.parameter('occupation_group', encodeURIComponent(occupation));
        selectOccGroup(occupation);
    }
}

function clearJobFamilies(){
    // clear any selected job families
    $(".cls_occ_group").each(function(index, elem){
        if ($(elem).hasClass('selected')){
            $(elem).removeClass('selected');
        };
    });
}

function showHelperJobFamily(){
    if(clicked_occ_group==false){
        $("#helper-job-family").fadeTo(700, 1);
    };
};

function showHelperOcc(len){
    if (len > 8) {
        percent = "-90%";
    }
    else {
        percent = "-" + String(len * 10) + "%"
    }

    if(clicked_occ_bar==false){
        $("#helper-occupation").css("top", percent)
        $("#helper-occupation").fadeTo(700, 1);
    };
};

function showHelperMap(){
    if(clicked_map==false){
        $("#helper-map").fadeIn(700);
    };
}

function hideHelperJobFamily(){
    if(clicked_occ_group==false){
        clicked_occ_group = true;
        $("#helper-job-family").fadeOut(700);
    }
};

function hideHelperOcc(){
    if(clicked_occ_bar==false){
        $("#helper-occupation").fadeOut(700)
    };
};

function selectOccGroup(clicked_occ_group) {
    // Add new parameter to the URL.
    $.address.parameter('occupation_group', encodeURIComponent(clicked_occ_group));

    // Call #updateLocation, which builds the bar chart.
    if($.address.parameter("location_type") && $.address.parameter("location")){
        updateLocation(decodeURIComponent($.address.parameter("location_type")), decodeURIComponent($.address.parameter("location")))
    }
    else{
        updateLocation('Country', 'UK');
    }

    // Unselect any highlighted divs.
    $(".job-family").each(function(index, elem){
        if ($(elem).attr('data')!=clicked_occ_group){
            $(elem).removeClass('selected');
        };
    });

    $this = '[data="' + clicked_occ_group + '"]'
    // Highlight the div that received the click event.
    if($($this).hasClass('selected')){
        // unselecting
        $($this).removeClass('selected');
        selectOccFamily('');
    }else{
        // selecting
        $($this).addClass('selected')
        selectOccFamily(clicked_occ_group);
    };
    hideHelperJobFamily();
}





