var MapsLib = MapsLib || {};
var MapsLib = {

    occupation: null,
    compare_by: null,
    compare_name: null,
    occ_map: null,
    layer: null,
    info: L.control(),
    legend: L.control({position: 'bottomright'}),
    job_types_region: null,
    regions_occ_geojson: null,

    initialize: function() {

        MapsLib.occ_map = L.map('occupation-detail-map', {
            scrollWheelZoom: false,
            center: [55, -1], 
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

        // MapsLib.layer = new L.StamenTileLayer("toner-lite");
        // MapsLib.occ_map.addLayer(MapsLib.layer);

        // control that shows state info on hover

        MapsLib.info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        MapsLib.info.update = function (props) {
            this._div.innerHTML = (props ?
                '<b>' + toTitleCase(props['JOB_REGION']) + '</b><br />' + MapsLib.compare_name + ': ' + props['jobs_data'][MapsLib.occupation][MapsLib.compare_by]
                : 'Hover over a region or nation');
        };

        MapsLib.info.addTo(MapsLib.occ_map);    

        MapsLib.legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend');

            var labels = "\
                <i style='background:" + MapsLib.getColor('Very High') + "'></i> Very High<br>\
                <i style='background:" + MapsLib.getColor('High') + "'></i> High<br>\
                <i style='background:" + MapsLib.getColor('Average') + "'></i> Average<br>\
                <i style='background:" + MapsLib.getColor('Low') + "'></i> Low<br>\
                <i style='background:" + MapsLib.getColor('Very Low') + "'></i> Very Low\
            ";

            div.innerHTML = "<h4>Job prospects</h4>"
            div.innerHTML += labels;
            return div;
        };

        MapsLib.legend.addTo(MapsLib.occ_map);

        MapsLib.regions_occ_geojson = L.geoJson(regions_data[0], {onEachFeature: MapsLib.onEachFeature});
        MapsLib.regions_occ_geojson.addTo(MapsLib.occ_map);

    },

    updateData: function(occupation, compare_by){
        MapsLib.occupation = occupation;
        MapsLib.compare_by = compare_by;

        if (compare_by == 'lq_label')
            MapsLib.compare_name = 'Job prospects'
        else if (compare_by == 'demand_ticker')
            MapsLib.compare_name = 'Job demand'

        $('#occupation-detail-title').html(occupation);

        MapsLib.regions_occ_geojson.eachLayer(function (layer) {
            layer.setStyle({
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7,
                fillColor: MapsLib.getColor(layer.feature.properties['jobs_data'][MapsLib.occupation][MapsLib.compare_by])
            });
        });
    },

    // get color depending on population density value
    getColor: function (d) {
        return d == 'Very High' ? '#0b253f' :
               d == 'High'      ? '#154779' :
               d == 'Average'   ? '#2B74A6' :
               d == 'Low'       ? '#60AADB' :
               d == 'Very Low'  ? '#8ac0e4' :
                                  '#8ac0e4' ;
    },

    highlightFeature: function (e) {
        var layer = e.target;

        layer.setStyle({
            fillColor: '#F47730',
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