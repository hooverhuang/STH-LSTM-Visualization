from pymongo import MongoClient
import re

client = MongoClient('')
db1 = client["temp+tide"]
db2 = client.Mlr_predict

collection1 = db1.dongji
collection2 = db2.dongji_tide4

start_time = "2023/06/01 00:00"
end_time = "2023/10/07 23:59"

total_r2 = 0
total_count = 0
total_actual = 0
total_actual_count = 0
total2 = 0


for doc1 in collection1.find({"time": {"$gte": start_time, "$lte": end_time}}):
    time1 = doc1["time"]
    temp1 = doc1.get("tide", None)

    doc2 = collection2.find_one({"time": time1})
    if doc2:
        temp2 = doc2.get("tide", None)
        if temp1 is not None and temp2 is not None:
            try:
                temp1 = float(temp1)
                total_actual = total_actual + temp1
                total_actual_count = total_actual_count + 1 

            except ValueError:
                print("Invalid numeric values for temp1 or temp2.")
        else:
            print("temp1 or temp2 is None for time:", time1)
    else:
        print("No matching document in collection2 for time:", time1)

avg_actual = total_actual/total_actual_count

for doc1 in collection1.find({"time": {"$gte": start_time, "$lte": end_time}}):
    time1 = doc1["time"]
    temp1 = doc1.get("tide", None)


    doc2 = collection2.find_one({"time": time1})
    if doc2:
        temp2 = doc2.get("tide", None)
        if temp1 is not None and temp2 is not None:
            try:
                temp1 = float(temp1)
                temp2 = float(temp2)

                temp3 = temp1-temp2
                temp4 = temp3*temp3
                total2 = total2 + temp4
                total_count = total_count + 1 

                temp5 = temp1-avg_actual
                temp6 = temp5*temp5
                total_r2 = total_r2 + temp6


            except ValueError:
                print("Invalid numeric values for temp1 or temp2.")
        else:
            print("temp1 or temp2 is None for time:", time1)
    else:
        print("No matching document in collection2 for time:", time1)


if total_count > 0:
    r2 = 1 - total2/total_r2
    print(f"R2: {r2}")
else:
    print("No matching documents found in both collections.")

client.close()
