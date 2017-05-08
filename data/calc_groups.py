import csv
import sys

# reader = csv.DictReader(sys.stdin)
reader = csv.DictReader(open('occupation_data.csv'))
reader_copy = list(reader)

header = ['occupation_group', 'demand_entry_sl', 'demand_entry_fe', 'demand_entry_he', 'geography_name']
# writer = csv.DictWriter(sys.stdout, fieldnames=header)
writer = csv.DictWriter(open('occ_groups_test.csv', 'w'), fieldnames=header)

writer.writeheader()

# Create a list of all occupation groups.
occ_groups = set()
for row in reader_copy:
    occ_groups.add(row['occupation_group'])

occ_geo_name = set()
for row in reader_copy:
    occ_geo_name.add(row['geography_name'])
# Iterate over occupation groups, sum values of relevant columns, and write row to new csv.
for occ in occ_groups:
    for geo in occ_geo_name:
        sl_sum = set()
        fe_sum = set()
        he_sum = set()

        for x in reader_copy:
            if (x['occupation_group'] == occ) and (x['geography_name'] == geo):
                sl_sum.add(float(x['demand_entry_sl']))
                fe_sum.add(float(x['demand_entry_fe']))
                he_sum.add(float(x['demand_entry_he']))

        new_row = { 'occupation_group': occ,
                'geography_name': geo,
                'demand_entry_sl': sum(sl_sum),
                'demand_entry_fe': sum(fe_sum),
                'demand_entry_he': sum(he_sum) }
        writer.writerow(new_row)