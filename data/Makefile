include config.mk

all: merged_regions.geojson occupation_group_data.csv occupation_data.csv full_time_percent.csv historical_employment.csv
# note: the viz now uses merged_regions_simplified.geojson
# which has been manually derived from merged_regions.geojson

.PHONY: clean
clean:
	rm merged_regions.geojson
	rm occupation_data.csv
	rm occupation_group_data.csv

define convert_srs
	ogr2ogr -t_srs EPSG:4326 $@ $<
endef

define create_shape_table
	shp2pgsql -I -s 4326 $< $* | \
		psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT)
endef

european_region_region.shp:
	touch european_region_region.shp

OSNI_Open_Data_Largescale_Boundaries__NI_Outline.shp:
	touch OSNI_Open_Data_Largescale_Boundaries__NI_Outline.shp

gb_regions.shp: european_region_region.shp
	$(convert_srs)

ni_shape.shp: OSNI_Open_Data_Largescale_Boundaries__NI_Outline.shp
	$(convert_srs)

gb_regions.table: gb_regions.shp
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c "DROP TABLE IF EXISTS gb_regions"
	$(create_shape_table)

northern_ireland.table: ni_shape.shp
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c "DROP TABLE IF EXISTS ni_shape"
	$(create_shape_table)

gb_regions.append: gb_regions.table northern_ireland.table
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"INSERT INTO gb_regions (name, geom) \
		   SELECT \
		     'Northern Ireland' AS name, \
			 geom \
		   FROM ni_shape"

merged_regions.table: gb_regions.append
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c "DROP TABLE IF EXISTS merged_regions"
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"CREATE TABLE merged_regions AS ( \
		   SELECT \
		     ST_Union(geom) AS geom, \
		     name \
		   FROM gb_regions \
		   GROUP BY name \
		 )"

full_time_percent.csv: raw/20170330_Full_Time_Percent_WTWI2.xlsx
		in2csv --sheet "Precentage Full Time" $< | \
		python slugify_header.py > $@

occ_skills.csv: raw/20170310_Titles_and_Skills_WTWI2.xlsx
		in2csv --sheet "Spec Skills" $< | \
		python slugify_header.py > $@

historical_employment.csv: raw/20170330_Historical_employment_and_projections_WTWI2.xlsx
		in2csv --sheet "Historical employment numbers" $< | \
		python slugify_header.py > $@

projection_employment.csv: raw/20170330_Historical_employment_and_projections_WTWI2.xlsx
		in2csv --sheet "Projection text" $< | \
		python slugify_header.py > $@

occupation_group_data.csv: raw/INPUT_DATA_2017-04-25.xlsx
		in2csv --sheet "Occupation x Geo" $< | \
			python calc_occupation_groups.py > $@

occupation_data.csv: raw/INPUT_DATA_2017-04-25.xlsx
	in2csv --sheet "Occupation x Geo" $< | \
		python slugify_header.py > $@

job_types_by_region.table: occupation_data.csv
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c "DROP TABLE IF EXISTS job_types_by_region"
	csvgrep -c 'geography_type' -r "(Region|Nation)" $< | csvsql --db "postgresql://$(PG_USER):@$(PG_HOST):$(PG_PORT)/$(PG_DB)" --insert --table job_types_by_region

merged_regions.alter: merged_regions.table
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"ALTER TABLE merged_regions ADD COLUMN job_region VARCHAR"

merged_regions.update: merged_regions.alter
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'EAST OF ENGLAND' \
	     WHERE name = 'Eastern Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'EAST MIDLANDS' \
	     WHERE name = 'East Midlands Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'GREATER LONDON' \
	     WHERE name = 'London Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'NORTH EAST ENGLAND' \
	     WHERE name = 'North East Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'NORTHERN IRELAND' \
	     WHERE name = 'Northern Ireland'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'NORTH WEST ENGLAND' \
	     WHERE name = 'North West Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'SCOTLAND' \
	     WHERE name = 'Scotland Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'SOUTH EAST ENGLAND' \
	     WHERE name = 'South East Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'SOUTH WEST ENGLAND' \
	     WHERE name = 'South West Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'WALES' \
	     WHERE name = 'Wales Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'WEST MIDLANDS' \
	     WHERE name = 'West Midlands Euro Region'"

	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c \
		"UPDATE merged_regions SET \
		   job_region = 'YORKSHIRE AND THE HUMBER' \
	     WHERE name = 'Yorkshire and the Humber Euro Region'"

merged_regions.shp: job_types_by_region.table merged_regions.update
	pgsql2shp -f $@ -h $(PG_HOST) -u $(PG_USER) -p $(PG_PORT) $(PG_DB) \
		"SELECT * FROM merged_regions"

merged_regions.geojson: merged_regions.shp
	ogr2ogr -simplify 0.0025 -f GeoJSON $@ $<
