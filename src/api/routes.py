"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Michi
from api.utils import generate_sitemap, APIException
from sqlalchemy import select
from flask_cors import CORS
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    michi_name = data.get("michi_name")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirm_password")
    if not all([michi_name, email, password, confirm_password]):
        return jsonify({"error": "Todo los campos son requeridos"}), 400 
    if password != confirm_password:
        return jsonify({"error": "Las contraseñas no coinciden"}), 400
    existing_user = db.session.execute(db.select(User).where(User.email == email)).scalar_one_or_none()
    if existing_user:
        return jsonify({"error": "Usuario con ese email ya existe"}), 400
    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.flush()
    new_michi = Michi(
        michi_name = michi_name,
        user_id=new_user.id,
        color="Naranja",
        pescados_totales=0
    )
    db.session.add(new_michi)
    db.session.commit()
    return jsonify ({"msg": "Usuario creado correctamente!"}), 201


@api.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    michi_name = data.get("michi_name")
    password = data.get("password")
    if not all([michi_name, password]):
        return jsonify({"error": "Todo los campos son requeridos"}), 400
    michi = db.session.execute(select(Michi).where(
        Michi.michi_name == michi_name)).scalar_one_or_none()
    if michi is None:
        return jsonify({"msg": "Contraseña o Michi_Name incorrectos"}), 400
    user = michi.user
    if user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"msg": "Inicio de sesión exitosa", "token": access_token}), 200
    else:
        return jsonify({"msg": "Contraseña o Michi_Name incorrectos"}), 400
