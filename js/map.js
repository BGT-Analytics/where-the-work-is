// variable init
var map;
var lastClickedLayer;
var tract_boundaries;
var marker;
var info;
var layerUrl = '';
var tableName = '';

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
        var txt;
        if (typeof props !== 'undefined'){
          if (props['final'])
            txt = '<h4>'+ props['municipali'] + "<br />" + displayQuintile(props['final']) + '</h4>';
          else
            txt = '<h4>'+ props['municipali'] + "<br />No data</h4>";
          this._div.innerHTML = txt;
        }
    }

    info.clear = function(){
        this._div.innerHTML = '';
    }

    info.addTo(map);

    var cartocss = "\
    #opp_index_tracts_w_data{\
      [final = 1] {polygon-fill: " + getColor(1) + ";}\
      [final = 2] {polygon-fill: " + getColor(2) + ";}\
      [final = 3] {polygon-fill: " + getColor(3) + ";}\
      [final = 4] {polygon-fill: " + getColor(4) + ";}\
      [final = 5] {polygon-fill: " + getColor(5) + ";}\
      polygon-opacity: 0.5;\
      line-color: #FFF;\
      line-width: 0.5;\
      line-opacity: 1;\
    }"

    var subLayerOptions = {
      cartocss: cartocss,
      interactivity: 'geo_id2,final,municipali'
    }

    cartodb.createLayer(map, layerUrl)
      .addTo(map)
      .on('done', function(layer) {
        sublayer = layer.getSubLayer(0);
        sublayer.set(subLayerOptions);
        sublayer.setInteraction(true);
        sublayer.on('featureOver', function(e, latlng, pos, data, subLayerIndex){
          $('#map div').css('cursor','pointer');
          info.update(data);
      })
      sublayer.on('featureOut', function(e, latlng, pos, data, subLayerIndex){
          $('#map div').css('cursor','inherit');
          info.clear();
      })
      sublayer.on('featureClick', function(e, pos, latlng, data){
          getOneTract(data['geo_id2']);
      })

      window.setTimeout(function(){
        if($.address.parameter('tract_id')){
            getOneTract($.address.parameter('tract_id'))
        }
      }, 1000)

      }).on('error', function() {
        //log the error
      });


    // $.when($.getJSON('data/city_of_chicago.geojson')).then(
    //     function(shapes){
    //         L.geoJson(shapes, {
    //             style: chicago_style
    //         }).addTo(map);
    //     }
    // );

    // function chicago_style(feature){
    //     var style = {
    //         "color": "white",
    //         "fillColor": "#713589",
    //         "opacity": 1,
    //         "weight": 1,
    //         "fillOpacity": 0.5,
    //     }
    //     return style;
    // }

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

    var address = convertToPlainString($.address.parameter('address'));
    if(address){
        $("#search_address").val(address);
        $('#search_address').geocomplete('find', address)
    }
})()

// helper functions
function getOneTract(tract_id){
  if (lastClickedLayer){
    map.removeLayer(lastClickedLayer);
  }
  var sql = new cartodb.SQL({user: 'datamade', format: 'geojson'});
  sql.execute('select * from ' + tableName + ' where geo_id2 = {{tract_id}}', {tract_id:tract_id})
    .done(function(data){
        var shape = data.features[0];
        lastClickedLayer = L.geoJson(shape);
        lastClickedLayer.addTo(map);
        lastClickedLayer.setStyle({fillColor:'#f7fcb9', weight: 2, fillOpacity: 0.8, color: '#000'});
        
        map.setView(lastClickedLayer.getBounds().getCenter(), 12);
        selectParcel(shape.properties);
    }).error(function(e){console.log(e)});
}

function selectParcel(props){
  var info = "<div class='row'><div class='col-xs-6 col-md-12'>\
    <h2>" + props['municipali'] + " <small><br />Tract #" + props['geo_id2'] + "</small></h2>\
    <table class='table table-bordered table-condensed'><tbody>\
      <tr data-content='Composite score for access to education, employment, fiscal capacity, income, and transportation opportunities.'><td><h3>Opportunity Index</h3></td><td><h3>" + displayQuintile(props['final']) + "</h3></td><td></td></tr>\
      <tr data-content='Median market value of homes in 2010.'><td><i class='fa fa-home fa-fw'></i> Home value</td><td>" + displayQuintile(props['homeidx']) + "</td><td><small>" + accounting.formatMoney(props['median_hom'], {precision: 0}) + "</small></td></tr>\
      <tr data-content='Percent of residents above the poverty line.'><td><i class='fa fa-dollar fa-fw'></i> Above poverty</td><td>" + displayQuintile(props['povertyidx']) + "</td><td><small>" + formatPovertyRate(props['poverty_ra']) + "</small></td></tr>\
      <tr data-content='Average time spent commuting to work.'><td><i class='fa fa-clock-o fa-fw'></i> Job travel time</td><td>" + displayQuintile(props['trvlidx']) + "</td><td><small>" + props['mean_trave'].toFixed(0) + "min</small></td></tr>\
      <tr data-content='Residents over 18 who are employed.'><td><i class='fa fa-pie-chart fa-fw'></i> Employment rate</td><td>" + displayQuintile(props['unempidx']) + "</td><td><small>" + (100 - props['unemployme']).toFixed(0) + "%</small></td></tr>\
      <tr data-content='Highest level of education completed. Percent of residents who earned a High School Diploma, Bachelors Degree or Graduate Degree.'><td><i class='fa fa-graduation-cap fa-fw'></i> Education level</td><td>" + displayQuintile(props['degreeidx']) + "</td><td><small>" + props['h_s_diplo'].toFixed(0) + "% H.S. Diploma<br />" + props['bachelors'].toFixed(0) + "% Bachelors<br />" + props['graduate_d'].toFixed(0) + "% Graduate</small></td></tr>\
      ";
      
  info += "</tbody></table><p><a href='about.html'>About the opportunity index &raquo;<a/></p></div></div>";

  $.address.parameter('tract_id', props.geo_id2)
  $('#tract-info').html(info);

  $('#tract-info tr').popover({trigger: "hover", placement: "left", container: 'body'})
}

function displayQuintile(val){
    if (val == 0)
        return "No data";

    else {
        var stars = Array( val + 1 ).join( "<i class='fa fa-circle'></i> " );
        return "<span class='nowrap'>" + stars + "</span>";
    }
}

function getColor(val) {
    switch (val) {
        case 1: return "#edf8e9";
        case 2: return "#bae4b3";
        case 3: return "#74c476";
        case 4: return "#31a354";
        case 5: return "#006d2c";
        default: return "#cccccc";
    }
}

function convertToPlainString(text) {
  if (text == undefined) return '';
  return decodeURIComponent(text);
}

function formatPovertyRate(rate) {
  return (1.0 - rate).toFixed(0) * 100 + "%"
}
