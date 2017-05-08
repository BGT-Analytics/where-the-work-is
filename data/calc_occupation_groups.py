if __name__ == "__main__":
    import sys
    import csv

    reader = csv.DictReader(sys.stdin)
    reader_copy = list(reader)

    header = ['occupation_group', 'geography_name', 'demand_entry_sl', 'demand_entry_fe', 'demand_entry_he']
    writer = csv.DictWriter(sys.stdout, fieldnames=header)

    writer.writeheader()

    # Create a list of all occupation groups.
    occ_groups = set()
    for row in reader_copy:
        occ_groups.add(row['Occupation_Group'])

    # Create a list of all geographic areas.
    occ_geo_name = set()
    for row in reader_copy:
        occ_geo_name.add(row['Geography_Name'])
    # Iterate over occupation groups, sum values of relevant columns, and write row to new csv.
    for occ in occ_groups:
        for geo in occ_geo_name:
            if geo != '':
                sl_sum = set()
                fe_sum = set()
                he_sum = set()

                for x in reader_copy:
                    if (x['Occupation_Group'] == occ) and (x['Geography_Name'] == geo):
                        sl_sum.add(float(x['Demand_Entry_SL']))
                        fe_sum.add(float(x['Demand_Entry_FE']))
                        he_sum.add(float(x['Demand_Entry_HE']))

                new_row = { 'occupation_group': occ,
                        'geography_name': geo,
                        'demand_entry_sl': sum(sl_sum),
                        'demand_entry_fe': sum(fe_sum),
                        'demand_entry_he': sum(he_sum) }
                writer.writerow(new_row)