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
client = MongoClient('mongodb://dmcl:unigrid@10.141.52.16:27017/?authMechanism=DEFAULT')
db = client.yoxuan
db1 = client["temp+tide"]
db2 = client.Mlr_predict
db3 = client.shuting_performance
collection = db.sea_data
collection1 = db1.dongji
collection2 = db1.jiangjyun
collection3 = db1.jibei
collection4 = db1.penghu
collection5 = db1.wengang
collection6 = db2.dongji_temp1
collection7 = db2.dongji_temp2
collection8 = db2.dongji_temp3
collection9 = db2.dongji_temp4
collection10 = db2.jiangjyun_temp1
collection11 = db2.jiangjyun_temp2
collection12 = db2.jiangjyun_temp3
collection13 = db2.jiangjyun_temp4
collection14 = db2.jibei_temp1
collection15 = db2.jibei_temp2
collection16 = db2.jibei_temp3
collection17 = db2.jibei_temp4
collection18 = db2.penghu_temp1
collection19 = db2.penghu_temp2
collection20 = db2.penghu_temp3
collection21 = db2.penghu_temp4
collection22 = db2.wengang_temp1
collection23 = db2.wengang_temp2
collection24 = db2.wengang_temp3
collection25 = db2.wengang_temp4
collection26 = db2.dongji_tide1
collection27 = db2.dongji_tide2
collection28 = db2.dongji_tide3
collection29 = db2.dongji_tide4
collection30 = db2.jiangjyun_tide1
collection31 = db2.jiangjyun_tide2
collection32 = db2.jiangjyun_tide3
collection33 = db2.jiangjyun_tide4
collection34 = db2.jibei_tide1
collection35 = db2.jibei_tide2
collection36 = db2.jibei_tide3
collection37 = db2.jibei_tide4
collection38 = db2.penghu_tide1
collection39 = db2.penghu_tide2
collection40 = db2.penghu_tide3
collection41 = db2.penghu_tide4
collection42 = db2.wengang_tide1
collection43 = db2.wengang_tide2
collection44 = db2.wengang_tide3
collection45 = db2.wengang_tide4



@app.route('/')
def user(): 
    users_collections = [
    collection, collection1, collection2, collection3, collection4, collection5,
    collection6, collection7, collection8, collection9, collection10, collection11,
    collection12, collection13, collection14, collection15, collection16, collection17,
    collection18, collection19, collection20, collection21, collection22, collection23,
    collection24, collection25, collection26, collection27, collection28, collection29,
    collection30, collection31, collection32, collection33, collection34, collection35,
    collection36, collection37, collection38, collection39, collection40, collection41,
    collection42, collection43, collection44, collection45
    ]

    users = []
    for collection_item in users_collections:
        users.append(collection_item.find_one(sort=[("time", -1)]))
    

    return render_template('index.html', users=users)
    
         
@app.route("/yoxuan/sea_data")
def seadata():
    projects = collection.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/temp+tide/dongji")
def dongji():
    projects = collection1.find().sort("time", pymongo.ASCENDING)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/temp+tide/jiangjyun")
def jiangjyun():
    projects = collection2.find().sort("time", pymongo.ASCENDING)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/temp+tide/jibei")
def jibei():
    projects = collection3.find().sort("time", pymongo.ASCENDING)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/temp+tide/penghu")
def penghu():
    projects = collection4.find().sort("time", pymongo.ASCENDING)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/temp+tide/wengang")
def wengang():
    projects = collection5.find().sort("time", pymongo.ASCENDING)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/dongji_temp1")
def dongji_temp1():
    projects = collection6.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/dongji_temp2")
def dongji_temp2():
    projects = collection7.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/dongji_temp3")
def dongji_temp3():
    projects = collection8.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/dongji_temp4")
def dongji_temp4():
    projects = collection9.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects


@app.route("/predict_sea/jiangjyun_temp1")
def jiangjyun_temp1():
    projects = collection10.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jiangjyun_temp2")
def jiangjyun_temp2():
    projects = collection11.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jiangjyun_temp3")
def jiangjyun_temp3():
    projects = collection12.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jiangjyun_temp4")
def jiangjyun_temp4():
    projects = collection13.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects


@app.route("/predict_sea/jibei_temp1")
def jibei_temp1():
    projects = collection14.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jibei_temp2")
def jibei_temp2():
    projects = collection15.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jibei_temp3")
def jibei_temp3():
    projects = collection16.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jibei_temp4")
def jibei_temp4():
    projects = collection17.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/penghu_temp1")
def penghu_temp1():
    projects = collection18.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/penghu_temp2")
def penghu_temp2():
    projects = collection19.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/penghu_temp3")
def penghu_temp3():
    projects = collection20.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/penghu_temp4")
def penghu_temp4():
    projects = collection21.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/wengang_temp1")
def wengang_temp1():
    projects = collection22.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/wengang_temp2")
def wengang_temp2():
    projects = collection23.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/wengang_temp3")
def wengang_temp3():
    projects = collection24.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/wengang_temp4")
def wengang_temp4():
    projects = collection25.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/dongji_tide1")
def dongji_tide1():
    projects = collection26.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/dongji_tide2")
def dongji_tide2():
    projects = collection27.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/dongji_tide3")
def dongji_tide3():
    projects = collection28.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/dongji_tide4")
def dongji_tide4():
    projects = collection29.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jiangjyun_tide1")
def jiangjyun_tide1():
    projects = collection30.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jiangjyun_tide2")
def jiangjyun_tide2():
    projects = collection31.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jiangjyun_tide3")
def jiangjyun_tide3():
    projects = collection32.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jiangjyun_tide4")
def jiangjyun_tide4():
    projects = collection33.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jibei_tide1")
def jibei_tide1():
    projects = collection34.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jibei_tide2")
def jibei_tide2():
    projects = collection35.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jibei_tide3")
def jibei_tide3():
    projects = collection36.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/jibei_tide4")
def jibei_tide4():
    projects = collection37.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/penghu_tide1")
def penghu_tide1():
    projects = collection38.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/penghu_tide2")
def penghu_tide2():
    projects = collection39.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/penghu_tide3")
def penghu_tide3():
    projects = collection40.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/penghu_tide4")
def penghu_tide4():
    projects = collection41.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/wengang_tide1")
def wengang_tide1():
    projects = collection42.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/wengang_tide2")
def wengang_tide2():
    projects = collection43.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/wengang_tide3")
def wengang_tide3():
    projects = collection44.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects

@app.route("/predict_sea/wengang_tide4")
def wengang_tide4():
    projects = collection45.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    return json_projects



if __name__=="__main__":
    app.run(host='0.0.0.0',port=5002,debug=True)