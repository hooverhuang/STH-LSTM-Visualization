from flask import Flask,request
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask import render_template
import pymongo
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__) 
app.config['DEBUG'] = True
client = MongoClient('')
db = client.yoxuan
db1 = client["temp+tide"]
db2 = client.Mlr_predict
db3 = client.Ada_predict
db4 = client.Lstm_predict
db5 = client.Mae_predict
db6 = client.Rf_predict
db7 = client.Sam_predict
db8 = client.Svm_predict
collection0 = db.sea_data
collection1 = db1.dongji
collection2 = db1.jiangjyun
collection3 = db1.jibei
collection4 = db1.penghu
collection5 = db1.wengang

collection6 = db2.dongji_temp1
collection7 = db3.dongji_temp1

collection8 = db2.jiangjyun_temp1
collection9 = db3.jiangjyun_temp1


def get_data(collection):
    projects = collection.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

def get_data2(collection):
    projects = collection.find().sort("time", pymongo.ASCENDING)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

def create_route(num, collections):
    def decorator():
        collection = collections[num - 1]
        return get_data(collection)
    return decorator

route_types = ["dongji", "jiangjyun", "jibei","penghu","wengang"]

@app.context_processor
def user(): 
    collection_names = [
        "dongji_temp1", "dongji_temp2", "dongji_temp3", "dongji_temp4",
        "dongji_temp5", "dongji_temp6", "dongji_temp7", "dongji_temp8",
        "jiangjyun_temp1", "jiangjyun_temp2", "jiangjyun_temp3", "jiangjyun_temp4",
        "jiangjyun_temp5", "jiangjyun_temp6", "jiangjyun_temp7", "jiangjyun_temp8",
        "jibei_temp1", "jibei_temp2", "jibei_temp3", "jibei_temp4",
        "jibei_temp5", "jibei_temp6", "jibei_temp7", "jibei_temp8",
        "penghu_temp1", "penghu_temp2", "penghu_temp3", "penghu_temp4",
        "penghu_temp5", "penghu_temp6", "penghu_temp7", "penghu_temp8",
        "wengang_temp1", "wengang_temp2", "wengang_temp3", "wengang_temp4",
        "wengang_temp5", "wengang_temp6", "wengang_temp7", "wengang_temp8",
        "dongji_tide1", "dongji_tide2", "dongji_tide3", "dongji_tide4",
        "dongji_tide5", "dongji_tide6", "dongji_tide7", "dongji_tide8",
        "jiangjyun_tide1", "jiangjyun_tide2", "jiangjyun_tide3", "jiangjyun_tide4",
        "jiangjyun_tide5", "jiangjyun_tide6", "jiangjyun_tide7", "jiangjyun_tide8",
        "jibei_tide1", "jibei_tide2", "jibei_tide3", "jibei_tide4",
        "jibei_tide5", "jibei_tide6", "jibei_tide7", "jibei_tide8",
        "penghu_tide1", "penghu_tide2", "penghu_tide3", "penghu_tide4",
        "penghu_tide5", "penghu_tide6", "penghu_tide7", "penghu_tide8",
        "wengang_tide1", "wengang_tide2", "wengang_tide3", "wengang_tide4",
        "wengang_tide5", "wengang_tide6", "wengang_tide7", "wengang_tide8"
    ]

    users = []
    users.append(collection0.find_one(sort=[("time", -1)]))
    users.append(collection1.find_one(sort=[("time", -1)]))
    users.append(collection2.find_one(sort=[("time", -1)]))
    users.append(collection3.find_one(sort=[("time", -1)]))
    users.append(collection4.find_one(sort=[("time", -1)]))
    users.append(collection5.find_one(sort=[("time", -1)]))
    for collection_name in collection_names:
        collection = getattr(db2, collection_name)
        users.append(collection.find_one(sort=[("time", -1)]))
    
    return dict(users=users)

@app.route('/')
def user():
    return render_template('latest_data.html')

@app.route('/performance')
def predict_model():
    return render_template('performance.html')

@app.route('/performance2')
def predict_model2():
    return render_template('performance2.html')

@app.route('/history_data')
def sea_data():
    return render_template('history_data.html')

@app.route('/sensors_data')
def sensors_data():
    return render_template('sensors.html')


@app.route("/yoxuan/sea_data")
def seadata():
    return get_data2(collection0)

@app.route("/temp+tide/dongji")
def dongji():
    return get_data2(collection1)

@app.route("/temp+tide/jiangjyun")
def jiangjyun():
    return get_data2(collection2)

@app.route("/temp+tide/jibei")
def jibei():
    return get_data2(collection3)

@app.route("/temp+tide/penghu")
def penghu():
    return get_data2(collection4)

@app.route("/temp+tide/wengang")
def wengang():
    return get_data2(collection5)


for route_type in route_types:
    collections = [getattr(db2, f"{route_type}_temp{i}") for i in range(1, 9)]
    for temp_num in range(1, 9):
        route_name = f"/predict_sea/{route_type}_temp{temp_num}"
        endpoint_name = f"{route_type}_temp{temp_num}"
        app.route(route_name, endpoint=endpoint_name)(create_route(temp_num, collections))

for route_type in route_types:
    collections = [getattr(db2, f"{route_type}_tide{i}") for i in range(1, 9)]
    for tide_num in range(1, 9):
        route_name = f"/predict_sea/{route_type}_tide{tide_num}"
        endpoint_name = f"{route_type}_tide{tide_num}"
        app.route(route_name, endpoint=endpoint_name)(create_route(tide_num, collections))


db_mapping = {
    "Mlr": db2,
    "Ada": db3,
    "Lstm": db4,
    "Mae": db5,
    "Rf": db6,
    "Sam": db7,
    "Svm": db8
}

for route_type in route_types:
    for db_key, db_instance in db_mapping.items():
        collections = [getattr(db_instance, f"{route_type}_temp{i}") for i in range(1, 9)]
        for temp_num in range(1, 9):
            route_name = f"/perfor/{db_key}_{route_type}_temp{temp_num}"
            endpoint_name = f"{db_key}_{route_type}_temp{temp_num}"
            app.route(route_name, endpoint=endpoint_name)(create_route(temp_num, collections))


for route_type in route_types:
    for db_key, db_instance in db_mapping.items():
        collections = [getattr(db_instance, f"{route_type}_tide{i}") for i in range(1, 9)]
        for tide_num in range(1, 9):
            route_name = f"/perfor/{db_key}_{route_type}_tide{tide_num}"
            endpoint_name = f"{db_key}_{route_type}_tide{tide_num}"
            app.route(route_name, endpoint=endpoint_name)(create_route(tide_num, collections))


if __name__=="__main__":
    app.run(host='0.0.0.0',port=5002,debug=True)
