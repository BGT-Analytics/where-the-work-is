// variable init
var map;
var info;
var regions_geojson;
var job_types_by_region;

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

    info.update = function(props){
        console.log('updating ....')
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
            'onEachFeature': bindQuery,
        }
        $.when($.getJSON('data/merged_regions.geojson')).then(function(geojson){
            regions_geojson = L.geoJson(geojson, geojson_opts).addTo(map);
            // Papa.parse('data/job_types_by_region.csv', function(data){
            //     console.log(data)
            // });
            console.log(regions_geojson)
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

function bindQuery(feature, layer){

}
