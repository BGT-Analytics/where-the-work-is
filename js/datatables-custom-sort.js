jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "custom-num-html-pre": function ( a ) {
        // remove html tags, make missing vals zero, & replace non-digit characters
        return parseFloat( a.replace( /<.*?>/g, "" ).replace('--', '0').replace(/\D/g,''));
    },
    
    "custom-num-html-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ?  1 : 0));
    },
    
    "custom-num-html-desc": function ( a, b ) {
        return ((a < b) ?  1 : ((a > b) ? -1 : 0));
    }
} );