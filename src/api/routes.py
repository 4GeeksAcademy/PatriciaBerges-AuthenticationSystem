"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"id": user.id, "email": user.email }), 200

@api.route("/signup", methods=["POST"])
def create_user():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify({"error": "The email is already in use"}), 401
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"id": new_user.id, "email": new_user.email}), 201
