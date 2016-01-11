include config.mk

.PHONY : all
all: opp_index

.PHONY: clean
clean: 
	rm opp_index_tracts_w_data.geojson

.PHONY : opp_index
opp_index: opp_index_tracts_w_data.geojson 

opp_index_tracts.table: opp_index_tracts.shp
	shp2pgsql -I -s 4326 -d $< $* | \
		psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT)

opportunity_data.table: opportunity_data.csv
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c "DROP TABLE IF EXISTS opportunity_data"
	csvsql $< \
		--db "postgresql://$(PG_USER):@$(PG_HOST):$(PG_PORT)/$(PG_DB)" --table opportunity_data --insert

opportunity_quintiles.table: opportunity_quintiles.csv
	psql -d $(PG_DB) -U $(PG_USER) -h $(PG_HOST) -p $(PG_PORT) -c "DROP TABLE IF EXISTS opportunity_quintiles"
	csvsql $< \
		--db "postgresql://$(PG_USER):@$(PG_HOST):$(PG_PORT)/$(PG_DB)" --table opportunity_quintiles --insert

merged_opp_index_tracts.shp: opp_index_tracts.table opportunity_data.table opportunity_quintiles.table
	pgsql2shp -f $@ -h $(PG_HOST) -u $(PG_USER) -p $(PG_PORT) $(PG_DB) \
		"SELECT opp_index_tracts.geom, opportunity_quintiles.*, \"Unemployment pct\",\"Mean Travel Time\",\"Walk to Work\",\
		\"Public Transit to Work\",\"H.S. Diploma\",\"Bachelors Degree\",\"Graduate Degree\",\"Median Home Value 2010\",\
		\"FoodDesert\",\"poverty rate pct\" FROM opp_index_tracts \
		JOIN opportunity_data ON opp_index_tracts.GEOID10::bigint = opportunity_data.\"GEO.id2\"\
		JOIN opportunity_quintiles ON opp_index_tracts.GEOID10::bigint = opportunity_quintiles.\"GEO.id2\""

opp_index_tracts_w_data.geojson: merged_opp_index_tracts.shp
	ogr2ogr -simplify 0.0001 -f GeoJSON $@ $<

.PHONY : create_db
create_db :
	createdb $(PG_DB)
	psql -d $(PG_DB) -c "CREATE EXTENSION postgis"

.PHONY : cleanup_shapefiles
cleanup_tmp_shapefiles :		
	rm merged_opp_index_tracts.*
