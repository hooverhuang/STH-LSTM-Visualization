from pymongo import MongoClient
import re

client = MongoClient()
db1 = client["temp+tide"]
db2 = client.Mlr_predict

collection1 = db1.dongji
collection2 = db2.dongji_temp1

start_time = "2023/09/01 00:00"
end_time = "2023/09/30 23:00"

total_rmse = 0
total_count = 0

for doc1 in collection1.find({"time": {"$gte": start_time, "$lte": end_time}}):
    time1 = doc1["time"]
    temp1 = doc1.get("temp", None)


    doc2 = collection2.find_one({"time": time1})
    if doc2:
        temp2 = doc2.get("temp", None)
        if temp1 is not None and temp2 is not None:
            try:
                temp1 = float(temp1)
                temp2 = float(temp2)
                temp3 = temp1-temp2
                temp4 = temp3*temp3
                total_rmse = total_rmse + temp4
                total_count = total_count + 1

            except ValueError:
                print("Invalid numeric values for temp1 or temp2.")
        else:
            print("temp1 or temp2 is None for time:", time1)
    else:
        print("No matching document in collection2 for time:", time1)


if total_count > 0:
    rmse = (total_rmse / total_count) **0.5
    print(f"Rmse: {rmse}")
else:
    print("No matching documents found in both collections.")

client.close()
