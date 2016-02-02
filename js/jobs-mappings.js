var geo_hierarchy = {
    'name': 'UK Total',
    'level': 'Country',
    'children': [
        {
            'name': 'NORTHERN IRELAND',
            'level': 'Nation',
            'children': []
        },
        {
            'name': 'SCOTLAND',
            'level': 'Nation',
            'children': []
        },
        {
            'name': 'WALES',
            'level': 'Nation',
            'children': []
        },
        {
            'name': 'ENGLAND',
            'level': 'Nation',
            'children': [
                {
                    'name': 'EAST MIDLANDS',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Leicester and Leicestershire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Derby, Derbyshire, Nottingham and Nottinghamshire',
                            'level': 'LEP'
                        }

                    ]
                },
                {
                    'name': 'EAST OF ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Greater Cambridge & Greater Peterborough',
                            'level': 'LEP'
                        },
                        {
                            'name': 'New Anglia',
                            'level': 'LEP'
                        },
                        {
                            'name': 'South East',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'GREATER LONDON',
                    'level': 'Region',
                    'children': []
                },
                {
                    'name': 'NORTH EAST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'North East',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Tees Valley',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'NORTH WEST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Greater Manchester',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Lancashire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Liverpool City Region',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'SOUTH EAST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Coast to Capital',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Oxfordshire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Solent',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Thames Valley Berkshire',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'SOUTH WEST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Cornwall and Isles of Scilly',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Heart of the South West',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Swindon and Wiltshire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'West of England',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'WEST MIDLANDS',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Black Country',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Coventry and Warwickshire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Greater Birmingham and Solihull',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Stoke-on-Trent and Staffordshire',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'YORKSHIRE AND THE HUMBER',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Humber',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Leeds City Region',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Sheffield City Region',
                            'level': 'LEP'
                        }
                    ]
                }

            ]
        }
    ]
};

var breadcrumbs = {
    "NORTHERN IRELAND":[],
    "SCOTLAND":[],
    "WALES":[],
    "ENGLAND":[],
    "EAST MIDLANDS":["ENGLAND"],
    "Leicester and Leicestershire":["ENGLAND","EAST MIDLANDS"],
    "Derby, Derbyshire, Nottingham and Nottinghamshire":["ENGLAND","EAST MIDLANDS"],
    "EAST OF ENGLAND":["ENGLAND"],
    "Greater Cambridge & Greater Peterborough":["ENGLAND","EAST OF ENGLAND"],
    "New Anglia":["ENGLAND","EAST OF ENGLAND"],
    "South East":["ENGLAND","EAST OF ENGLAND"],
    "GREATER LONDON":["ENGLAND"],
    "NORTH EAST ENGLAND":["ENGLAND"],
    "North East":["ENGLAND","NORTH EAST ENGLAND"],
    "Tees Valley":["ENGLAND","NORTH EAST ENGLAND"],
    "NORTH WEST ENGLAND":["ENGLAND"],
    "Greater Manchester":["ENGLAND","NORTH WEST ENGLAND"],
    "Lancashire":["ENGLAND","NORTH WEST ENGLAND"],
    "Liverpool City Region":["ENGLAND","NORTH WEST ENGLAND"],
    "SOUTH EAST ENGLAND":["ENGLAND"],
    "Coast to Capital":["ENGLAND","SOUTH EAST ENGLAND"],
    "Oxfordshire":["ENGLAND","SOUTH EAST ENGLAND"],
    "Solent":["ENGLAND","SOUTH EAST ENGLAND"],
    "Thames Valley Berkshire":["ENGLAND","SOUTH EAST ENGLAND"],
    "SOUTH WEST ENGLAND":["ENGLAND"],
    "Cornwall and Isles of Scilly":["ENGLAND","SOUTH WEST ENGLAND"],
    "Heart of the South West":["ENGLAND","SOUTH WEST ENGLAND"],
    "Swindon and Wiltshire":["ENGLAND","SOUTH WEST ENGLAND"],
    "West of England":["ENGLAND","SOUTH WEST ENGLAND"],
    "WEST MIDLANDS":["ENGLAND"],
    "Black Country":["ENGLAND","WEST MIDLANDS"],
    "Coventry and Warwickshire":["ENGLAND","WEST MIDLANDS"],
    "Greater Birmingham and Solihull":["ENGLAND","WEST MIDLANDS"],
    "Stoke-on-Trent and Staffordshire":["ENGLAND","WEST MIDLANDS"],
    "YORKSHIRE AND THE HUMBER":["ENGLAND"],
    "Humber":["ENGLAND","YORKSHIRE AND THE HUMBER"],
    "Leeds City Region":["ENGLAND","YORKSHIRE AND THE HUMBER"],
    "Sheffield City Region":["ENGLAND","YORKSHIRE AND THE HUMBER"]
};


var occupation_mapping = {
    "Science, Engineering and Production Technicians":{
        "short_name":"Engineering Techs",
        "description":"",
        "example_titles":""},
    "Draughtspersons and Related Architectural Technicians":{
        "short_name":"Architectural Techs",
        "description":"",
        "example_titles":""},
    "Information Technology Technicians":{
        "short_name":"IT Techs",
        "description":"",
        "example_titles":""},
    "Health Associate Professionals":{
        "short_name":"Health Assoc. Profnls",
        "description":"",
        "example_titles":""},
    "Welfare and Housing Associate Professionals":{
        "short_name":"Welfare Assoc. Profnls",
        "description":"",
        "example_titles":""},
    "Protective Service Occupations":{
        "short_name":"Protective Service",
        "description":"",
        "example_titles":""},
    "Artistic, Literary and Media Occupations":{
        "short_name":"Artistic/Media Occs",
        "description":"",
        "example_titles":""},
    "Design Occupations":{
        "short_name":"Design Occs",
        "description":"",
        "example_titles":""},
    "Sports and Fitness Occupations":{
        "short_name":"Sports Occs",
        "description":"",
        "example_titles":""},
    "Transport Associate Professionals":{
        "short_name":"Transport Assoc. Profnls",
        "description":"",
        "example_titles":""},
    "Legal Associate Professionals":{
        "short_name":"Legal Assoc. Profnls",
        "description":"",
        "example_titles":""},
    "Business, Finance and Related Associate Professionals":{
        "short_name":"Business Assoc. Profnls",
        "description":"",
        "example_titles":""},
    "Sales, Marketing and Related Associate Professionals":{
        "short_name":"Sales  Assoc. Profnls",
        "description":"",
        "example_titles":""},
    "Conservation and Environmental Associate Professionals":{
        "short_name":"Environmental Assoc. Profnls",
        "description":"",
        "example_titles":""},
    "Public Services and Other Associate Professionals":{
        "short_name":"Public Services Assoc. Profnls",
        "description":"",
        "example_titles":""},
    "Administrative Occupations: Finance":{
        "short_name":"Administrative: Finance",
        "description":"",
        "example_titles":""},
    "Administrative Occupations: Records":{
        "short_name":"Administrative: Records",
        "description":"",
        "example_titles":""},
    "Administrative Occupations: Office Managers and Supervisors":{
        "short_name":"Administrative: Office Mngrs",
        "description":"",
        "example_titles":""},
    "Secretarial and Related Occupations":{
        "short_name":"Secretarial Occs",
        "description":"",
        "example_titles":""},
    "Agricultural and Related Trades":{
        "short_name":"Agricultural Trades",
        "description":"",
        "example_titles":""},
    "Metal Forming, Welding and Related Trades":{
        "short_name":"Metal Forming Trades",
        "description":"",
        "example_titles":""},
    "Metal Machining, Fitting and Instrument Making Trades":{
        "short_name":"Metal Machining Trades",
        "description":"",
        "example_titles":""},
    "Vehicle Trades":{
        "short_name":"Vehicle Trades",
        "description":"",
        "example_titles":""},
    "Electrical and Electronic Trades":{
        "short_name":"Electrical/Electronic Trades",
        "description":"",
        "example_titles":""},
    "Skilled Metal, Electrical and Electronic Trades Supervisors":{
        "short_name":"Metal Trades Supvrs",
        "description":"",
        "example_titles":""},
    "Construction and Building Trades":{
        "short_name":"Construction Trades",
        "description":"",
        "example_titles":""},
    "Building Finishing Trades":{
        "short_name":"Building Finishing Trades",
        "description":"",
        "example_titles":""},
    "Construction and Building Trades Supervisors":{
        "short_name":"Construction Trades Supvrs",
        "description":"",
        "example_titles":""},
    "Textiles and Garments Trades":{
        "short_name":"Textiles Trades",
        "description":"",
        "example_titles":""},
    "Printing Trades":{
        "short_name":"Printing Trades",
        "description":"",
        "example_titles":""},
    "Food Preparation and Hospitality Trades":{
        "short_name":"Hospitality Trades",
        "description":"",
        "example_titles":""},
    "Other Skilled Trades":{
        "short_name":"Skilled Trades (Other)",
        "description":"",
        "example_titles":""},
    "Childcare and Related Personal Services":{
        "short_name":"Childcare",
        "description":"",
        "example_titles":""},
    "Animal Care and Control Services":{
        "short_name":"Animal Care",
        "description":"",
        "example_titles":""},
    "Caring Personal Services":{
        "short_name":"Personal Care",
        "description":"",
        "example_titles":""}
}

