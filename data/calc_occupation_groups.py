if __name__ == "__main__":
    import sys
    import csv

    reader = csv.DictReader(sys.stdin)
    reader_copy = list(reader)

    header = ['occupation_group', 'demand_entry_sl', 'demand_entry_fe', 'demand_entry_he']
    writer = csv.DictWriter(sys.stdout, fieldnames=header)
    writer.writeheader()

    # Create a list of all occupation groups.
    occ_groups = set()
    for row in reader_copy:
        occ_groups.add(row['Occupation_Group'])

    # Iterate over occupation groups, sum values of relevant columns, and write row to new csv.
    for occ in occ_groups:
        sl_sum = sum(float(x['Demand_Entry_SL']) for x in reader_copy if x['Occupation_Group'] == occ)
        fe_sum = sum(float(x['Demand_Entry_FE']) for x in reader_copy if x['Occupation_Group'] == occ)
        he_sum = sum(float(x['Demand_Entry_HE']) for x in reader_copy if x['Occupation_Group'] == occ)

        new_row = {'occupation_group': occ, 'demand_entry_sl': sl_sum, 'demand_entry_fe': fe_sum, 'demand_entry_he': he_sum}
        writer.writerow(new_row)