if __name__ == "__main__":
    import sys
    import csv

    reader = csv.reader(sys.stdin)

    header = ['_'.join(r.replace('/', '_').replace(':', '').split(' ')).lower() for r in next(reader)]

    writer = csv.writer(sys.stdout)
    writer.writerow(header)
    writer.writerows(reader)


