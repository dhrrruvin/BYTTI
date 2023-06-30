import pandas as pd
from MySQLdb import connect
import csv

# MySQL connection details
host = 'localhost'
user = 'root'
password = 'dhruvin929'
database = "booking"

# CSV file path
csv_f = 'train_details.csv'

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(csv_f, dtype=str)

# Establish a connection to the MySQL database
conn = connect(host=host, user=user, password=password, database=database)
cursor = conn.cursor()

# def convert_to_string(d):
    # Convert all columns to string data type
    # ds = d.astype(str)

    # return ds

# converted = convert_to_string(df)
# print(converted.dtypes)

df['Train No'] = df['Train No'].astype(str)
df['Station Code'] = df['Station Code'].astype(str)
df['Train Name'] = df['Train Name'].astype(str)

grouped = df.groupby("Train No")

for name, group in grouped:
    # print(group["Station Code"])

    pairs = list(zip(group["Station Code"][:-1], group["Station Code"][1:]))

    for a, b in pairs:
        train_number = name
        source_station_code = a
        destination_station_code = b
        seats = 2

        query = "insert into book_seats(train_number, source_station_code, destination_station_code, seats) values (%s, %s, %s, %s)"
        values = (train_number, source_station_code, destination_station_code, seats)

        cursor.execute(query, values)


conn.commit()
conn.close()


    # for i, row in group.iterrows():
    #     print(row)
    # break

# print(grouped.get_group("56136"))

# for name, group in grouped:
#     print(group)
#     print
#     ()
#     break

# `for name, type in converted.dtypes.iteritems():
#     print(name, type)`

# print(group_by_column(csv_f, "Train No"))

# Iterate over each row in the DataFrame and insert the data into the MySQL table
# for i, row in df.iterrows():



    # query = "INSERT INTO your_table (column1, column2, column3) VALUES (%s, %s, %s)"
    # values = (row['column1'], row['column2'], row['column3'])  # Replace column1, column2, column3 with your actual column names
    # cursor.execute(query, values)

# Commit the changes and close the connection
# conn.commit()
# conn.close()

print("Data inserted successfully.")
