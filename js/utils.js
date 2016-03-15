function sliceColumns(data, columns){
    return _.map(data, function(row){
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

function sum(numbers) {
    return _.reduce(numbers, function(result, current) {
        return result + parseFloat(current);
    }, 0);
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){
        if (txt=='OF'||txt=='AND'||txt=='THE'){
            return txt.toLowerCase();
        }
        else{
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    });
}

function slugify(text) {
    return text.toString().toLowerCase().replace(/\s+/g, '-');
}

function makeLinkHTML(data, display_name, cls){
    return '<a class="'+cls+'" data="'+data+'" href="">'+display_name+'</a>'
}