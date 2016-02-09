var MapsLib = MapsLib || {};
var MapsLib = {

    occupation_title: null,
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
                '<b>' + toTitleCase(props['JOB_REGION']) + '</b><br />Job prospects: ' + props.lq_label
                : 'Hover over a region or nation');
        };

        MapsLib.info.addTo(MapsLib.occ_map);

        MapsLib.legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0.16, 0.667, 0.833, 1.2, 1.5],
                labels = [],
                from, to;

            for (var i = (grades.length - 1); i >= 0; i--) {
                from = grades[i];
                to = grades[i - 1];

                labels.push(
                    '<i style="background:' + MapsLib.getColor(from + 0.001) + '"></i> ' +
                    MapsLib.getLabel(from + 0.001));
            }

            div.innerHTML = "<h4>Job prospects</h4>"
            div.innerHTML += labels.join('<br>');
            return div;
        };

        MapsLib.legend.addTo(MapsLib.occ_map);
        
    },

    updateData: function(occupation){
        MapsLib.occupation_title = occupation;
        $('#occupation-detail-title').html(occupation);

        if (MapsLib.regions_occ_geojson)
            MapsLib.occ_map.removeLayer(MapsLib.regions_occ_geojson);

        MapsLib.job_types_region = _.where(occupation_data, {geography_type: 'Region', occupation: MapsLib.occupation_title});

        $.each(regions_data[0]['features'], function(r_index, region){
            $.each(MapsLib.job_types_region, function(j_index, job){
                if (region.properties['JOB_REGION'] == job['geography_name']) {
                    region.properties['lq'] = job['lq'];
                    region.properties['lq_label'] = job['lq_label'];
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
        return d > 1.5      ? '#0b253f' :
               d > 1.2      ? '#154779' :
               d > 0.833    ? '#2B74A6' :
               d > 0.667    ? '#60AADB' :
               d > 0.16     ? '#8ac0e4' :
                              '#8ac0e4' ;
    },

    getLabel: function (d) {
        return d > 1.5      ? 'Very High' :
               d > 1.2      ? 'High' :
               d > 0.833    ? 'Average' :
               d > 0.667    ? 'Low' :
               d > 0.16     ? 'Very Low' :
                              '' ;
    },

    occ_style: function (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
            fillColor: MapsLib.getColor(feature.properties.lq)
        };
    },

    highlightFeature: function (e) {
        var layer = e.target;

        layer.setStyle({
            weight: 3,
            color: '#5A5858',
            dashArray: '',
            fillOpacity: 0.7
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