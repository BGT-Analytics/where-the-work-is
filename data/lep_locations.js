//convert from CSV to GeoJSON here: http://togeojson.com/
// OR here: http://www.convertcsv.com/csv-to-geojson.htm
// N.B. Check that the names here correlate exactly with the Geography_Name in INPUT_DATA (e.g. "Oxfordshire" vs "Oxfordshire LEP")

var lep_locations = {
   "type": "FeatureCollection",
   "features": [
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -5.927124023,54.5985223 ]
    },
    "properties": {
    "LEP/City Region":"Belfast Metropolitan Area",
    "Pin_Location":"Belfast",
    "Region":"N/A",
    "Nation":"Northern Ireland"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.052352,52.5473 ]
    },
    "properties": {
    "LEP/City Region":"Black Country",
    "Pin_Location":"Custom",
    "Region":"WEST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -0.811271667,51.81519474 ]
    },
    "properties": {
    "LEP/City Region":"Buckinghamshire Thames Valley",
    "Pin_Location":"Aylesbury",
    "Region":"SOUTH EAST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -3.177623749,51.4813829 ]
    },
    "properties": {
    "LEP/City Region":"Cardiff Capital Region",
    "Pin_Location":"Cardiff",
    "Region":"N/A",
    "Nation":"Wales"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.550888062,53.31569807 ]
    },
    "properties": {
    "LEP/City Region":"Cheshire and Warrington",
    "Pin_Location":"Custom",
    "Region":"NORTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -0.131312,50.842941 ]
    },
    "properties": {
    "LEP/City Region":"Coast to Capital",
    "Pin_Location":"Brighton",
    "Region":"SOUTH EAST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -3.488,50.903 ]
    },
    "properties": {
    "LEP/City Region":"Cornwall and the Isles of Scilly",
    "Pin_Location":"Tiverton",
    "Region":"SOUTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.510556,52.408056 ]
    },
    "properties": {
    "LEP/City Region":"Coventry and Warwickshire",
    "Pin_Location":"Coventry",
    "Region":"WEST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.942962646,54.65000162 ]
    },
    "properties": {
    "LEP/City Region":"Cumbria",
    "Pin_Location":"Custom",
    "Region":"NORTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.133333,52.95 ]
    },
    "properties": {
    "LEP/City Region":"Derby, Derbyshire, Nottingham and Nottinghamshire",
    "Pin_Location":"Nottingham",
    "Region":"EAST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.301635742,50.73949703 ]
    },
    "properties": {
    "LEP/City Region":"Dorset",
    "Pin_Location":"Custom",
    "Region":"SOUTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -3.193416595,55.95155464 ]
    },
    "properties": {
    "LEP/City Region":"Edinburgh and the Lothians",
    "Pin_Location":"Edinburgh",
    "Region":"N/A",
    "Nation":"Scotland"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.147384644,51.22150755 ]
    },
    "properties": {
    "LEP/City Region":"Enterprise M3",
    "Pin_Location":"Custom",
    "Region":"SOUTH EAST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -4.255228043,55.86201898 ]
    },
    "properties": {
    "LEP/City Region":"Glasgow City Region",
    "Pin_Location":"Glasgow",
    "Region":"N/A",
    "Nation":"Scotland"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.24395752,51.864196 ]
    },
    "properties": {
    "LEP/City Region":"Gloucestershire",
    "Pin_Location":"Gloucester",
    "Region":"SOUTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.893611,52.483056 ]
    },
    "properties": {
    "LEP/City Region":"Greater Birmingham and Solihull",
    "Pin_Location":"Birmingham",
    "Region":"WEST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ 0.119,52.205 ]
    },
    "properties": {
    "LEP/City Region":"Greater Cambridge & Greater Peterborough",
    "Pin_Location":"Cambridge",
    "Region":"EAST OF ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -0.195007324,53.29887632 ]
    },
    "properties": {
    "LEP/City Region":"Greater Lincolnshire",
    "Pin_Location":"Custom",
    "Region":"EAST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -0.127758, 51.507351 ]
    },
    "properties": {
    "LEP/City Region":"London",
    "Pin_Location":"Custom",
    "Region":"GREATER LONDON",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.233333,53.466667 ]
    },
    "properties": {
    "LEP/City Region":"Greater Manchester",
    "Pin_Location":"Manchester",
    "Region":"NORTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -3.488,50.903 ]
    },
    "properties": {
    "LEP/City Region":"Heart of the South West",
    "Pin_Location":"Tiverton",
    "Region":"SOUTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -0.210113525,51.80351991 ]
    },
    "properties": {
    "LEP/City Region":"Hertfordshire",
    "Pin_Location":"Welwyn Garden City",
    "Region":"EAST OF ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -0.333333,53.75 ]
    },
    "properties": {
    "LEP/City Region":"Humber",
    "Pin_Location":"Hull",
    "Region":"YORKSHIRE AND THE HUMBER",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.699,53.759 ]
    },
    "properties": {
    "LEP/City Region":"Lancashire",
    "Pin_Location":"Preston",
    "Region":"NORTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.549167,53.799722 ]
    },
    "properties": {
    "LEP/City Region":"Leeds City Region",
    "Pin_Location":"Leeds",
    "Region":"YORKSHIRE AND THE HUMBER",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.133333,52.633333 ]
    },
    "properties": {
    "LEP/City Region":"Leicester and Leicestershire",
    "Pin_Location":"Leicester",
    "Region":"EAST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -3,53.4 ]
    },
    "properties": {
    "LEP/City Region":"Liverpool City Region",
    "Pin_Location":"Liverpool",
    "Region":"NORTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ 0.74,52.41 ]
    },
    "properties": {
    "LEP/City Region":"New Anglia",
    "Pin_Location":"Thetford",
    "Region":"EAST OF ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.6,54.966667 ]
    },
    "properties": {
    "LEP/City Region":"North East",
    "Pin_Location":"Newcastle",
    "Region":"NORTH EAST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -0.896501541,52.23715648 ]
    },
    "properties": {
    "LEP/City Region":"Northamptonshire",
    "Pin_Location":"Northampton",
    "Region":"EAST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.257778,51.751944 ]
    },
    "properties": {
    "LEP/City Region":"Oxfordshire LEP",
    "Pin_Location":"Oxford",
    "Region":"SOUTH EAST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.466944,53.383611 ]
    },
    "properties": {
    "LEP/City Region":"Sheffield City Region",
    "Pin_Location":"Sheffield",
    "Region":"YORKSHIRE AND THE HUMBER",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.1755,50.8542 ]
    },
    "properties": {
    "LEP/City Region":"Solent",
    "Pin_Location":"Fareham",
    "Region":"SOUTH EAST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ 0.730922,51.340203 ]
    },
    "properties": {
    "LEP/City Region":"South East",
    "Pin_Location":"Swale",
    "Region":"EAST OF ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -0.761146545,52.03897658 ]
    },
    "properties": {
    "LEP/City Region":"South East Midlands",
    "Pin_Location":"Milton Keynes",
    "Region":"SOUTH EAST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.183333,53 ]
    },
    "properties": {
    "LEP/City Region":"Stoke-on-Trent and Staffordshire",
    "Pin_Location":"Stoke on Trent",
    "Region":"WEST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -3.942203522,51.62121398 ]
    },
    "properties": {
    "LEP/City Region":"Swansea Bay City Region",
    "Pin_Location":"Swansea",
    "Region":"N/A",
    "Nation":"Wales"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.78,51.56 ]
    },
    "properties": {
    "LEP/City Region":"Swindon and Wiltshire",
    "Pin_Location":"Swindon",
    "Region":"SOUTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.2355,54.5767 ]
    },
    "properties": {
    "LEP/City Region":"Tees Valley",
    "Pin_Location":"Middlesbrough",
    "Region":"NORTH EAST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -0.973056,51.454167 ]
    },
    "properties": {
    "LEP/City Region":"Thames Valley Berkshire",
    "Pin_Location":"Reading",
    "Region":"SOUTH EAST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.862625122,52.38607756 ]
    },
    "properties": {
    "LEP/City Region":"The Marches",
    "Pin_Location":"Custom",
    "Region":"WEST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.583333,51.45 ]
    },
    "properties": {
    "LEP/City Region":"West of England",
    "Pin_Location":"Bristol",
    "Region":"SOUTH WEST ENGLAND",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -2.221984863,52.19319269 ]
    },
    "properties": {
    "LEP/City Region":"Worcestershire",
    "Pin_Location":"Worcester",
    "Region":"WEST MIDLANDS",
    "Nation":"England"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -1.084213257,53.9599236 ]
    },
    "properties": {
    "LEP/City Region":"YORK, NORTH YORKSHIRE AND EAST RIDING",
    "Pin_Location":"York",
    "Region":"YORKSHIRE AND THE HUMBER",
    "Nation":"England"
    }
  }
]
}