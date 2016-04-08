function cleanOccupation(text) {
    // replace 'and' w/ '&'
    return text.replace(/\b[a|A]nd\b/, '&');
}

function oppLabel(opp_val) {
    // converting demand/supply figures into natural language labels
    if (!opp_val){
        return '--'
    } else if (opp_val <= 9){
        return 'Very low'
    } else if (opp_val <= 32){
        return 'Low'
    } else if (opp_val <= 65){
        return 'Medium'
    } else if (opp_val <= 89){
        return 'High'
    } else {
        return 'Very high'
    }

}

function salaryLabel(salary_val) {
    if (!salary_val) {
        return '--'
    } else if (salary_val <= 17818){
        return 'Very low'
    } else if (salary_val <= 23823){
        return 'Low'
    } else if (salary_val <= 30999){
        return 'Medium'
    } else if (salary_val <= 41734){
        return 'High'
    } else{
        return 'Very high'
    }
}

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

function cleanGeo(str)
{
    return str.replace(/\w\S*/g, function(txt){
        if (txt.toUpperCase()=='OF'||txt.toUpperCase()=='THE'||txt.toUpperCase()=='TO'){
            return txt.toLowerCase();
        }else if (txt.toUpperCase()=='AND'){
            return '&';
        }else if (txt.toUpperCase()=='UK'){
            return txt.toUpperCase();
        }else{
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

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}