# Where the work is

A website that visualizes entry-level job prospects for middle-skilled jobs in the UK, to help stakeholders better align labor supply & labor demand.

**Partners** 
- Burning Glass
- the Institute for Public Policy Research
- the J.P. Morgan Chase New Skills at Work initiative

## Running locally

This is a static site, using jekyll. Make sure jekyll is installed, then:

``` bash
git clone git@github.com:datamade/bg-ippr-jobs.git
cd bg-ippr-jobs

# to run locally
jekyll serve
```

Then navigate to http://localhost:5000/

## Updating data
We use Make to prepare the data.

**1. Add new data**  
The main excel file should be named `BGT_UK_IPPR_Data.xlsx` & it should go in `data/`  

**2. Prep the data**  
to prep the csv that the visualizations read in:
```
cd data/
make occupation_data.csv
```

**A note on updating geojson**

if you need to update the geojson, you'll need to do some additional setup:

a. ensure that `PG_USER` in `config.mk` is your username  
b. create the database (you'll only have to do this once)  
```
createdb burning_glass
```
c. add postgis extension
```
psql burning_glass
create extension postgis;
```
d. make sure you have the following OS dependencies (brew install these if missing): `gdal`, `postgis`  
e. make sure you have the following python libraries: `csvkit`, `psycopg2`, `MySQL-python`

Then, instead of `make occupation_data.csv`, run `make all`



# Web dependencies
We used the following open source tools:

* [Bootstrap](http://getbootstrap.com/) - Responsive HTML, CSS and Javascript framework
* [Underscore](http://underscorejs.org/) - javascript library for working with data
* [jQuery](https://jquery.com/) - javascript library that makes javascript less painful
* [jQuery Address](https://github.com/asual/jquery-address) - javascript library creating RESTful URLs
* [Leaflet](http://leafletjs.com/) - javascript library for interactive maps

## Team

* Cathy Deng - data munging, charts, UI
* Derek Eder - maps
* Eric Van Zanten - data munging

## Errors / Bugs

If something is not behaving intuitively, it is a bug, and should be reported.
Report it here: https://github.com/datamade/bg-ippr-jobs/issues

Bug-fix pull requests welcome!

## Copyright

Copyright (c) 2016 Burning Glass Technologies and DataMade. Released under the [MIT License](https://github.com/datamade/bg-ippr-jobs/blob/master/LICENSE).
