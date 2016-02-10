var MapsLib = MapsLib || {};
var MapsLib = {

    occupation_title: null,
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
                '<b>' + toTitleCase(props['JOB_REGION']) + '</b><br />' + MapsLib.compare_name + ': ' + props[MapsLib.compare_by]
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
    },

    updateData: function(occupation, compare_by){
        MapsLib.occupation_title = occupation;
        MapsLib.compare_by = compare_by;

        if (compare_by == 'lq_label')
            MapsLib.compare_name = 'Job prospects'
        else if (compare_by == 'demand_ticker')
            MapsLib.compare_name = 'Job demand'

        $('#occupation-detail-title').html(occupation);

        if (MapsLib.regions_occ_geojson)
            MapsLib.occ_map.removeLayer(MapsLib.regions_occ_geojson);

        MapsLib.job_types_region = _.where(occupation_data, {geography_type: 'Region', occupation: MapsLib.occupation_title});

        $.each(regions_data[0]['features'], function(r_index, region){
            $.each(MapsLib.job_types_region, function(j_index, job){
                if (region.properties['JOB_REGION'] == job['geography_name']) {
                    region.properties['lq'] = job['lq'];
                    region.properties['lq_label'] = job['lq_label'];
                    region.properties['demand_sum'] = job['demand_sum'];
                    region.properties['demand_ticker'] = job['demand_ticker'];
                }
            });
        });

        MapsLib.regions_occ_geojson = L.geoJson(regions_data[0], {style: MapsLib.occ_style, onEachFeature: MapsLib.onEachFeature});
        MapsLib.regions_occ_geojson.addTo(MapsLib.occ_map);

        // MapsLib.layer.on("load",function() {
        //     console.log('loaded')
        //     $("#occupation-detail-map").spin(false);
        // });
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

    occ_style: function (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
            fillColor: MapsLib.getColor(feature.properties[MapsLib.compare_by])
        };
    },

    highlightFeature: function (e) {
        var layer = e.target;

        layer.setStyle({
            fillColor: '#F47730',
            dashArray: '',
            fillOpacity: 1
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }

        MapsLib.info.update(layer.feature.properties);
    },

    resetHighlight: function (e) {
        MapsLib.regions_occ_geojson.resetStyle(e.target);
        MapsLib.info.update();
    },

    onEachFeature: function (feature, layer) {
        layer.on({
            mouseover: MapsLib.highlightFeature,
            mouseout: MapsLib.resetHighlight
        });
    }
}