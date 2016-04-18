var MapsLib = MapsLib || {};
var MapsLib = {

    occupation: null,
    compare_by: 'lq_label',
    occ_map: null,
    layer: null,
    info: L.control(),
    legend: L.control({position: 'bottomright'}),
    job_types_region: null,
    regions_occ_geojson: null,
    lep_occ_geojson: null,
    regions_bg_geojson: null,

    initialize: function() {

        MapsLib.occ_map = L.map('occupation-detail-map', {
            scrollWheelZoom: false,
            center: [59, -9], 
            zoom: 5,
            attributionControl: false,
            zoomControl:false,
            dragging: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            tap: false
        });

        // control that shows state info on hover
        MapsLib.info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        MapsLib.info.update = function (props) {

            var location_key = 'JOB_REGION';
            if (props) {
                if (typeof props['JOB_REGION'] === 'undefined') 
                    location_key = 'lep';

                this._div.innerHTML = '<b>' + cleanGeo(props[location_key]) + '</b>\
                                       <table class="table table-condensed"><tbody>\
                                       <tr><td>Job concentration</td><td>' + props['jobs_data'][MapsLib.occupation]['lq_label'] + '</td></tr>\
                                       <tr><td>Job demand</td><td>' + props['jobs_data'][MapsLib.occupation]['demand_ticker'] + '</td></tr>\
                                       <tr><td>Salary</td><td>£' + numberWithCommas(props['jobs_data'][MapsLib.occupation]['reg_salary']) + '</td></tr>\
                                       <tr><td>Opportunity (FE)</td><td>' + oppLabel(props['jobs_data'][MapsLib.occupation]['fe_opportunity_score']) + '</td></tr>\
                                       <tr><td>Opportunity (HE)</td><td>' + oppLabel(props['jobs_data'][MapsLib.occupation]['he_opportunity_score']) + '</td></tr>';

            }
            else {
                this._div.innerHTML = '<span id="map-helper">Hover over a location</span>';
            }
        };

        MapsLib.info.addTo(MapsLib.occ_map);    

        MapsLib.legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend');

            var labels = "\
                <i style='background:" + MapsLib.getColor('Very high') + "'></i> Very high<br>\
                <i style='background:" + MapsLib.getColor('High') + "'></i> High<br>\
                <i style='background:" + MapsLib.getColor('Average') + "'></i> Average<br>\
                <i style='background:" + MapsLib.getColor('Low') + "'></i> Low<br>\
                <i style='background:" + MapsLib.getColor('Very low') + "'></i> Very low\
            ";

            div.innerHTML = "<h4>Job concentration<br /><small id='legend-occupation'></small></h4>"
            div.innerHTML += labels;
            return div;
        };

        MapsLib.legend.addTo(MapsLib.occ_map);

        // define geographic layers
        MapsLib.regions_occ_geojson = L.geoJson(regions_data[0], {onEachFeature: MapsLib.onEachFeature});
        
        MapsLib.regions_bg_geojson = L.geoJson(regions_data[0], {style: {
                weight: .5,
                opacity: .5,
                color: '#333',
                fillOpacity: 0.3,
                fillColor: '#ddd'}});

        MapsLib.lep_occ_geojson = L.geoJson(lep_locations, {
            pointToLayer: function(feature, latlng){
                return L.circleMarker(latlng, {
                    color: '#154779', 
                    fillColor: '#154779',
                    radius: 6,
                    weight: 0,
                    opacity: .8,
                    fillOpacity: .8 });
            },
            onEachFeature: MapsLib.onEachFeature
        });
    },

    toggleGeo: function(geo_type){
        //remove existing layers
        MapsLib.occ_map.removeLayer(MapsLib.regions_occ_geojson);
        MapsLib.occ_map.removeLayer(MapsLib.regions_bg_geojson);
        MapsLib.occ_map.removeLayer(MapsLib.lep_occ_geojson);

        if (geo_type == 'regions')
            MapsLib.regions_occ_geojson.addTo(MapsLib.occ_map);
        else if (geo_type == 'leps') {
            MapsLib.regions_bg_geojson.addTo(MapsLib.occ_map);
            MapsLib.lep_occ_geojson.addTo(MapsLib.occ_map);
        }
    },

    updateData: function(occupation){
        MapsLib.occupation = occupation;

        $('#modal-occ-name').html('for '+occupation.toLowerCase());
        var occupation_formatted = occupation.replace(/((\w+\W+){3})/, '$1<br/>');
        $('#legend-occupation').html(occupation_formatted);

        MapsLib.regions_occ_geojson.eachLayer(function (layer) {
            layer.setStyle({
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7,
                fillColor: MapsLib.getColor(layer.feature.properties['jobs_data'][MapsLib.occupation][MapsLib.compare_by])
            });
        });

        MapsLib.lep_occ_geojson.eachLayer(function (layer) {
            layer.setStyle({
                fillColor: MapsLib.getColor(layer.feature.properties['jobs_data'][MapsLib.occupation][MapsLib.compare_by])
            });
        });

        MapsLib.occ_map.fitBounds(MapsLib.regions_occ_geojson.getBounds(), {paddingBottomRight: [150, 0]});
    },

    // get color depending on population density value
    getColor: function (d) {
        return d == 'Very high' ? '#0e1419' :
               d == 'High'      ? '#2c3e50' :
               d == 'Average'   ? '#56799d' :
               d == 'Low'       ? '#89a4be' :
               d == 'Very low'  ? '#cbd7e3' :
                                  '#cbd7e3' ;
    },

    highlightFeature: function (e) {
        var layer = e.target;

        layer.setStyle({
            fillColor: '#FBAB18',
            fillOpacity: 1
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }

        MapsLib.info.update(layer.feature.properties);
    },

    resetHighlight: function (e) {
        e.target.setStyle({fillOpacity: 0.7, fillColor: MapsLib.getColor(e.target.feature.properties['jobs_data'][MapsLib.occupation][MapsLib.compare_by])});
        MapsLib.info.update();
    },

    onEachFeature: function (feature, layer) {
        layer.on({
            mouseover: MapsLib.highlightFeature,
            mouseout: MapsLib.resetHighlight
        });
    }
}