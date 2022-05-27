from flask import Flask , request, jsonify, Response,render_template, make_response
from flask_restful import Resource , Api ,reqparse
from flask_cors import CORS , cross_origin
from bson import json_util
import pandas as pd
import pymongo

import rec

from flask_pymongo import PyMongo

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://WilsonRiccardo:Ricky2004!@cluster0-shard-00-00.mwou4.mongodb.net:27017,cluster0-shard-00-01.mwou4.mongodb.net:27017,cluster0-shard-00-02.mwou4.mongodb.net:27017/Prova1?ssl=true&replicaSet=atlas-kkdpdd-shard-0&authSource=admin&retryWrites=true&w=majority"

mongo = PyMongo(app)

cors = CORS(app)
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
        scienze = request.json["scienze"]
        storia = request.json["storia"]
        tecnologia = request.json["tecnologia"]
        musica = request.json["musica"]
        geografia = request.json["geografia"]
        pri_inglese = request.json["pri_inglese"]
        sec_leng = request.json["sec_leng"]

        condizione = user and informatica and matematica and arte and scienze and storia and tecnologia and musica and geografia and pri_inglese and sec_leng


        if condizione:
            id = mongo.db.Prova1.insert_one(
                {
                'user': user,
                'informatica': informatica,
                'matematica': matematica,
                'arte': arte,
                "scienze" : scienze,
                "storia": storia,
                "tecnologia": tecnologia,
                "musica" : musica,
                "geografia"  : geografia,
                "pri_inglese" : pri_inglese,
                "sec_leng" : sec_leng

                }
            )
            resp = {
                "id" : str(id),
                'user': user,
                'informatica': informatica,
                'matematica': matematica,
                'arte': arte,
                "scienze" : scienze,
                "storia": storia,
                "tecnologia": tecnologia,
                "musica" : musica,
                "geografia"  : geografia,
                "pri_inglese" : pri_inglese,
                "sec_leng" : sec_leng
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
        scienze = request.json["scienze"]
        storia = request.json["storia"]
        tecnologia = request.json["tecnologia"]
        musica = request.json["musica"]
        geografia = request.json["geografia"]
        pri_inglese = request.json["pri_inglese"]
        sec_leng = request.json["sec_leng"]
        condizione = user and informatica and matematica and arte and scienze and storia and tecnologia and musica and geografia and pri_inglese and sec_leng

        
        if condizione:
            id = mongo.db.Prova1.insert_one(
                {
                'user': user,
                'informatica': informatica,
                'matematica': matematica,
                'arte': arte,
                "scienze" : scienze,
                "storia": storia,
                "tecnologia": tecnologia,
                "musica" : musica,
                "geografia"  : geografia,
                "pri_inglese" : pri_inglese,
                "sec_leng" : sec_leng,

                }
            )
            resp = {
                "id" : str(id),
                'user': user,
                'informatica': informatica,
                'matematica': matematica,
                'arte': arte,
                "scienze" : scienze,
                "storia": storia,
                "tecnologia": tecnologia,
                "musica" : musica,
                "geografia"  : geografia,
                "pri_inglese" : pri_inglese,
                "sec_leng" : sec_leng,
            }
            userdata = pd.DataFrame(data=resp, index=[0])
            result = mongo.db.tabella.find()
            return rec.recommend(result,userdata)


api.add_resource(UsersRecommendation, '/usersRec')

class SchoolsApi(Resource):
    def get(self):
        points = []
        mongo.db.GeoScuole.create_index( [("geometry", pymongo.GEOSPHERE )])
        result = mongo.db.GeoScuole.find(
            {
                'geometry':
                { '$near':
                    {
                        '$geometry': { 'type': "Point",  'coordinates': [9.1869571, 45.505833] },
                        '$maxDistance': 1000
                    }
                }
            }
        ).limit(1)
        for address in result:
            points.append({
                "geometry": {
                    "type": "Point",
                    "coordinates": address['geometry']['coordinates']
                },
                "type": "Feature"
            })
        return jsonify(points)
    def post(self):
        mongo.db.GeoScuole.find().sort({_id:-1}).limit(1)
        points = []
        mongo.db.GeoScuole.create_index( [("geometry", pymongo.GEOSPHERE )])
        result = mongo.db.GeoScuole.find(
            {
                'geometry':
                { '$near':
                    {
                        '$geometry': { 'type': "Point",  'coordinates': [longitude , latitude] },
                        '$maxDistance': 100000000000000
                    }
                }
            }
        ).limit(1)
        for address in result:
            points.append({
                "geometry": {
                    "type": "Point",
                    "coordinates": address['geometry']['coordinates']
                },
                "type": "Feature"
            })
        return jsonify(points)


api.add_resource(SchoolsApi, '/scuole')
if __name__ == '__main__':
    app.run()