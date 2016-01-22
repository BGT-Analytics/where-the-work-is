var geojson_opts = {
    'style': {
        'weight': 1,
        'opacity': 1,
        'fillOpacity': 0.2,
        'color': '#fbab18'
    },
    'onEachFeature': bindLayer,
}


function initializeMapSelect(map){

	info = L.control({position: 'topright'});
    info.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    }

    info.update = function(properties){
        if(properties){
            var content = '<p>' + toTitleCase(properties['JOB_REGION']) + '</p>';
            this._div.innerHTML = content;
        }
    }

    info.clear = function(){
        this._div.innerHTML = '';
    }

    info.addTo(map);


}


function bindLayer(feature, layer){
    if(typeof feature.properties !== 'undefined'){
        layer.on('mouseover', function(e){
            info.update(e.target.feature.properties);
            if(!e.target.feature.properties['selected']){
                e.target.setStyle({'fillOpacity': 0.4, 'color': '#fbab18'});
            }
        });
        layer.on('mouseout', function(e){
            info.clear();
            if(!e.target.feature.properties['selected']){
                e.target.setStyle({'fillOpacity': 0.2, 'color': '#fbab18'});
            }
        })
        layer.on('click', function(e){
            updateRegion(feature.properties['JOB_REGION'])
        });
    }
}
