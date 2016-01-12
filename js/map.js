// variable init
var map;
var info;
var regions_geojson;
var job_types_by_region;
var basic_columns = ['region_or_nation','job_family','occupation','demand_entry'];

// set size of map based on window height
$(window).resize(function () {
  var h = $(window).height(),
  offsetTop = 150; // Calculate the top offset
  $('#map').css('height', (h - offsetTop));
}).resize();

// do stuff when the page loads
(function(){
    map = L.map('map', {center: [53.383328, -2.977295], zoom: 6});

    var googleLayer = new L.Google('ROADMAP', {animate: false});
    map.addLayer(googleLayer);

    info = L.control({position: 'topright'});
    info.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    }

    info.update = function(properties){
        if(properties){
            var content = '<h4>' + properties['NAME'] + '</h4>';
            this._div.innerHTML = content;
        }
    }

    info.clear = function(){
        this._div.innerHTML = '';
    }

    info.addTo(map);

    map.whenReady(function(e){
        var geojson_opts = {
            'style': {
                'weight': 1,
                'opacity': 1,
                'fillOpacity': 0.2
            },
            'onEachFeature': bindLayer,
        }
        $.when($.getJSON('data/merged_regions.geojson'), $.get('data/job_types_by_region.csv')).then(function(geojson, csv){
            regions_geojson = L.geoJson(geojson[0], geojson_opts).addTo(map);
            job_types_by_region = $.csv.toObjects(csv[0]);

            var table_guts = sliceColumns(basic_columns);
            //var reduced_rows = reduceColumns(table_guts, 3);

            initializeTable(basic_columns, table_guts);
        });
    })
    $('#search_address').geocomplete()
      .bind('geocode:result', function(event, result){
        if (typeof marker !== 'undefined'){
            map.removeLayer(marker);
        }

        var search_address = $('#search_address').val();
        var currentPinpoint = [result.geometry.location.lat(), result.geometry.location.lng()]
        marker = L.marker(currentPinpoint).addTo(map);

        var sql = new cartodb.SQL({user: 'datamade', format: 'geojson'});
        sql.execute('select geo_id2, the_geom from ' + tableName + ' where ST_Intersects( the_geom, ST_SetSRID(ST_POINT({{lng}}, {{lat}}) , 4326))', {lat:currentPinpoint[0], lng:currentPinpoint[1]})
        .done(function(data){
            // console.log(data);
            getOneTract(data.features[0].properties.geo_id2)
        }).error(function(e){console.log(e)});

        $.address.parameter('address', encodeURI(search_address));
      });

    $("#search").click(function(){
      $('#search_address').trigger("geocode");
    });

    // var address = convertToPlainString($.address.parameter('address'));
    // if(address){
    //     $("#search_address").val(address);
    //     $('#search_address').geocomplete('find', address)
    // }
})()

function bindLayer(feature, layer){
    if(typeof feature.properties !== 'undefined'){
        layer.on('mouseover', function(e){
            info.update(e.target.feature.properties);
        });
        layer.on('mouseout', function(e){
            info.clear();
        })
    }
}

function sliceColumns(columns){
    return _.map(job_types_by_region, function(row){
        var sliced_row = [];
        $.each(columns, function(i, column){
            sliced_row.push(row[column]);
        });
        return sliced_row
    });
}

function reduceColumns(data, grouper, column_index){
    // data is a 2D array of values
    // grouper is an index of the array to group by
    return _.reduce(data, function(memo, row){
        return memo[column_index]
    })
}

function initializeTable(column_names, data){
    // column_names is an array of names to be used as the header row of the table
    // data is a 2D array of values for the table
    var names = [];
    $.each(column_names, function(i, name){
        names.push({'title': name});
    })
    $('#job-data').DataTable({
        data: data,
        columns: names
    });
}
