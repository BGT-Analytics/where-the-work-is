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