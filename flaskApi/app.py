from flask import Flask , request, jsonify, Response,render_template, make_response
from flask_restful import Resource , Api ,reqparse
from flask_cors import CORS
from bson import json_util
import pandas as pd
import folium
import rec

from flask_pymongo import PyMongo

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://WilsonRiccardo:Ricky2004!@cluster0-shard-00-00.mwou4.mongodb.net:27017,cluster0-shard-00-01.mwou4.mongodb.net:27017,cluster0-shard-00-02.mwou4.mongodb.net:27017/Prova1?ssl=true&replicaSet=atlas-kkdpdd-shard-0&authSource=admin&retryWrites=true&w=majority"

mongo = PyMongo(app)

CORS(app)
api = Api(app)


#-------------------------------------------------------------------------------------------------------------------Prova

class UsersApi(Resource):
    def get(self):
        uss = mongo.db.Prova1.find()
        resp = json_util.dumps(uss)
        return Response(resp, mimetype = 'application/json') 
    def post(self):
        user = request.json["user"]
        informatica = request.json["informatica"]
        matematica = request.json["matematica"]
        arte = request.json["arte"]
        latitude = request.json['latitude']
        longitude = request.json["longitude"]
        if user and informatica and matematica and arte and latitude:
            id = mongo.db.Prova1.insert_one(
                {
                'user': user,
                'informatica': informatica,
                'matematica': matematica,
                'arte': arte,
                'latitude': latitude,
                'longitude': longitude

                }
            )
            resp = {
                "id" : str(id),
                'user': user,
                'informatica': informatica,
                'matematica': matematica,
                'arte': arte,
                'latitude': latitude,
                'longitude': longitude
            }
            return resp
        else:
            return {'message': 'received'}

api.add_resource(UsersApi, '/users')


class UsersRecommendation(Resource):
    def get(self):
        uss = mongo.db.Prova1.find()
        resp = json_util.dumps(uss)
        return Response(resp, mimetype = 'application/json') 
    def post(self):
        user = request.json["user"]
        informatica = request.json["informatica"]
        matematica = request.json["matematica"]
        arte = request.json["arte"]
        if user and informatica and matematica and arte:
            id = mongo.db.Prova1.insert_one(
                {
                'user': user,
                'informatica': informatica,
                'matematica': matematica,
                'arte': arte,
                }
            )
            resp = {
                "id" : str(id),
                'user': user,
                'informatica': informatica,
                'matematica': matematica,
                'arte': arte ,
            }
            userdata = pd.DataFrame(data=resp, index=[0])
            result = mongo.db.tabella.find()
            return rec.recommend(result,userdata)


api.add_resource(UsersRecommendation, '/usersRec')

class ScuolaMap(Resource):
    def __init__(self):
        pass
    def get(self):
        start_coords = (46.9540700, 142.7360300)
        folium_map = folium.Map(location=start_coords, zoom_start=14)
        headers = {'Content-Type': 'text/html'}
        return folium_map._repr_html_()

api.add_resource(ScuolaMap, '/ScuolaMap')
if __name__ == '__main__':
    app.run()