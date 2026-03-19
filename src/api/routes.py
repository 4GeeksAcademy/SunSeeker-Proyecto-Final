"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Michi, Partida, Accesorios, MichiInventario
from api.utils import generate_sitemap, APIException
from sqlalchemy import select
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API


#  REGISTRO E INGRESO
@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    michi_name = data.get("michi_name")
    email = data.get("email")
    password = data.get("password")

    if not all([michi_name, email, password]):
        return jsonify({"error": "Todo los campos son requeridos"}), 400
    existing_user = db.session.execute(db.select(User).where(
        User.email == email)).scalar_one_or_none()

    if existing_user:
        return jsonify({"error": "Usuario con ese email ya existe"}), 400

    existing_michi = db.session.execute(db.select(Michi).where(
        Michi.michi_name == michi_name)).scalar_one_or_none()

    if existing_michi:
        return jsonify({"error": "Nombre de michi ya existe"}), 400
    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.flush()
    new_michi = Michi(
        michi_name=michi_name,
        user_id=new_user.id,
        color="Naranja"
    )
    db.session.add(new_michi)
    db.session.flush()
    new_partida = Partida(michi_id=new_michi.id, score=0)
    db.session.add(new_partida)
    db.session.commit()
    return jsonify({"msg": "Usuario creado correctamente!"}), 201


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

        partida = db.session.execute(db.select(Partida).where(
            Partida.michi_id == michi.id)).scalar_one_or_none()

        return jsonify({
            "msg": "Inicio de sesión exitosa",
            "token": access_token,
            "michi_color": michi.color,
            "michi_accesorio": partida.accesorio if partida else None  
        }), 200
    else:
        return jsonify({"msg": "Contraseña o Michi_Name incorrectos"}), 400
    
# USUARIO C R U D por renombrar las rutas
# VERIFICAR LOS RETURN si se necesita que se devuelva la serializacioin en alguno.


@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    response = [user.serialize() for user in users]
    return jsonify(response), 200


@api.route('/get_user', methods=['GET'])
@jwt_required()
def get_user_detail():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"error": "User not found"}), 400

    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()
    # ------------------------------------------------------------------------------------------------- if cat else None?? v Puede romperse?
    run = db.session.execute(db.select(Partida).where(
        Partida.michi_id == cat.id)).scalar_one_or_none()

    return jsonify(
        {"user": user.serialize(),
         "michi": cat.serialize() if cat else None,
         "partida": run.serialize() if run else None}
    )


@api.route('/get_user', methods=['PUT'])
@jwt_required()
def edit_user():
    data = request.get_json()
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))

    if user:
        existing_email = User.query.filter_by(email=data.get('email')).first()
        if existing_email:
            return jsonify({"error": "email already exist"}), 400

        user.email = data.get('email', user.email)
        if data.get('password'):
            user.set_password(data.get('password'))
        db.session.commit()
        return jsonify(user.serialize()), 200
    return jsonify({"error": "User doesn't exist"}), 404


@api.route('/get_user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))

    if not user:
        return jsonify({"error": "invalid credentials"}), 401
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "user deleted"}), 200

# MICHI C R U D por renombrar las rutas


@api.route('/michis', methods=['GET'])
def get_all_michi():
    cat = Michi.query.all()
    response = [michi.serialize() for michi in cat]
    return jsonify(response), 200


@api.route('/get_michi', methods=['GET'])
@jwt_required()
def get_michi_detail():
    user = db.session.get(User, int(get_jwt_identity()))
    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()

    if not user:
        return jsonify({"error": "invalid credentials"}), 401
    return jsonify(cat.serialize()), 200


@api.route('/get_michi', methods=['PUT'])
@jwt_required()
def modify_michi_aspect():
    data = request.get_json()
    user = db.session.get(User, int(get_jwt_identity()))

    if not user:
        return jsonify({"error": "invalid credentials"}), 401

    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()

    if not cat:
        return jsonify({"error": "michi not found"}), 404

    cat.michi_name = data.get('michi_name', cat.michi_name)
    cat.color = data.get('color', cat.color)
    db.session.commit()
    return jsonify(cat.serialize()), 200
# Hago el  delete, pero por ahora no le veo el sentido en hacer un delete.


@api.route('/get_michi', methods=['DELETE'])
@jwt_required()
def delete_michi():
    user = db.session.get(User, int(get_jwt_identity()))
    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()

    if user:
        db.session.delete(cat)
        db.session.commit()
        return jsonify({"msg": "michi deleted successfully"}), 200
    return jsonify({"error": "invalid credentials"}), 401


# MichiInventario C R U D

@api.route('/inventarios', methods=['GET'])
def get_all_inventories():
    inventories = MichiInventario.query.all()
    response = [inventorie.serialize() for inventorie in inventories]
    return jsonify(response), 200


@api.route('/get_inventario', methods=['GET'])
@jwt_required()
def get_michi_inventory():
    user = db.session.get(User, int(get_jwt_identity()))
    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()
    inventory = db.session.execute(db.select(MichiInventario).where(
        MichiInventario.michi_id == cat.id)).scalars().all()

    if not user:
        return jsonify({"error": "invalid credentials"}), 401
    return jsonify([e.serialize() for e in inventory]), 200

# Unico uso al eliminarle el inventario a un usuario.


@api.route('/get_inventario', methods=['POST'])
@jwt_required()
def create_inventory():
    data = request.get_json()
    user = db.session.get(User, int(get_jwt_identity()))
    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()

    if user:
        new_inventory = MichiInventario(
            michi_id=cat.id,
            accesorios_id=data.get('accesorios_id'),
            esta_equipado=data.get('esta_equipado'),
            pescados_totales=data.get("pescados_totales")
        )
        db.session.add(new_inventory)
        db.session.commit()
        return jsonify({"msg": "inventory created"}), 201


@api.route('/get_inventario', methods=['PUT'])
@jwt_required()
def modify_inventory():
    data = request.get_json()
    user = db.session.get(User, int(get_jwt_identity()))
    if not user:
        return jsonify({"error": "invalid credentials"}), 401

    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()
    inventory = db.session.execute(db.select(MichiInventario).where(
        MichiInventario.michi_id == cat.id)).scalar_one_or_none()

    inventory.accesorios_id = data.get(
        'accesorios_id', inventory.accesorios_id)
    inventory.esta_equipado = data.get(
        'esta_equipado', inventory.esta_equipado)
    inventory.pescados_totales = data.get(
        "pescados_totales", inventory.pescados_totales)
    db.session.commit()
    return jsonify(inventory.serialize()), 200


@api.route('/get_inventario', methods=['DELETE'])
@jwt_required()
def delete_inventory():
    user = db.session.get(User, int(get_jwt_identity()))
    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()
    inventory = db.session.execute(db.select(MichiInventario).where(
        MichiInventario.michi_id == cat.id)).scalar_one_or_none()

    if user:
        db.session.delete(inventory)
        db.session.commit()
        return jsonify({"msg": "inventory deleted succesfully"}), 200
    return jsonify({"error": "invalid credentials"}), 401

#  PARTIDAS C R U D


@api.route('/partidas', methods=['GET'])
def get_all_runs():
    run = Partida.query.all()
    response = [run.serialize() for run in run]
    return jsonify(response), 200


@api.route('/get_partida', methods=['GET'])
@jwt_required()
def get_run():
    user = db.session.get(User, int(get_jwt_identity()))
    if not user:
        return jsonify({"error": "invalid credentials"}), 401

    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()
    run = db.session.execute(db.select(Partida).where(
        Partida.michi_id == cat.id)).scalar_one_or_none()
    if not run:
        return jsonify({"error": "no run found"}), 404
    return jsonify(run.serialize()), 200


@api.route('/get_partida', methods=['POST'])
@jwt_required()
def create_run():
    data = request.get_json()
    user = db.session.get(User, int(get_jwt_identity()))
    if not user:
        return jsonify({"error": "invalid credentials"}), 401

    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()

    if not data.get('score'):
        return jsonify({"msg": "score is necessary"}), 400

    run = db.session.execute(db.select(Partida).where(
        Partida.michi_id == cat.id)).scalar_one_or_none()

    if run:
        if data.get('score') > run.score:
            run.score = data.get('score')
            db.session.commit()
            return jsonify({"msg": "score actualizado"}), 200
        return jsonify({"msg": "score no superado"}), 200
    else:
        new_run = Partida(score=data.get('score'), michi_id=cat.id)
        db.session.add(new_run)
        db.session.commit()
        return jsonify({"msg": "partida creada"}), 201


@api.route('/get_partida', methods=['PUT'])
@jwt_required()
def edit_run():
    data = request.get_json()
    user = db.session.get(User, int(get_jwt_identity()))
    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()

    if not cat:
        return jsonify({"error": "no tiene gato asignado"}), 404

    run = db.session.execute(db.select(Partida).where(
        Partida.michi_id == cat.id)).scalar_one_or_none()

    if not run:
     run = Partida(michi_id=cat.id, score=0, accesorio=None)
     db.session.add(run)

    nuevo_score = data.get('score', 0)
    if nuevo_score > run.score:
     run.score = nuevo_score
     
    run.accesorio = data.get('accesorio', run.accesorio)  
    db.session.commit()
    return jsonify(run.serialize()), 200


@api.route('/get_partida', methods=['DELETE'])
@jwt_required()
def delete_run():
    user = db.session.get(User, int(get_jwt_identity()))
    cat = db.session.execute(db.select(Michi).where(
        Michi.user_id == user.id)).scalar_one_or_none()
    run = db.session.execute(db.select(Partida).where(
        Partida.michi_id == cat.id)).scalar_one_or_none()

    if user:
        db.session.delete(run)
        db.session.commit()
        return jsonify({"msg": "run deleted succesfully"}), 200
    return jsonify({"error": "invalid credentials"}), 401

# ACCESORIOS C R U D PREGUNTAR SI AL NO TENER "METODO DE SEGURIDAD" PUEDE VULNERAR LOS DATOS DE LAS DEMAS TABLA O DATOS SENSIBLES.


@api.route('/accesorios', methods=['GET'])
def get_all_accessories():
    accessories = Accesorios.query.all()
    response = [accessorie.serialize() for accessorie in accessories]
    return jsonify(response), 200


@api.route('/accesorios', methods=['POST'])
def create_accessorie():
    data = request.get_json()
    new_accessorie = Accesorios(
        accesorios_name=data.get("accesorios_name"),
        tipo_de_accesorios=data.get("tipo_de_accesorios"),
        path_accesorio=data.get("path_accesorio"),
        precio_pescado=data.get("precio_pescado")
    )
    db.session.add(new_accessorie)
    db.session.commit()
    return jsonify("item created successfully"), 201


@api.route('/accesorios/<int:id>', methods=['PUT'])
def edit_accessorie(id):
    data = request.get_json()
    accessorie = db.session.get(Accesorios, id)

    accessorie.path_accesorio = data.get(
        "path_accesorio", accessorie.path_accesorio)
    accessorie.accesorios_name = data.get(
        "accesorios_name", accessorie.accesorios_name)
    accessorie.tipo_de_accesorios = data.get(
        "tipo_de_accesorios", accessorie.tipo_de_accesorios)
    accessorie.precio_pescado = data.get(
        "precio_pescado", accessorie.precio_pescado)
    db.session.commit()
    return jsonify(accessorie.serialize())


@api.route('/accesorios/<int:id>', methods=['DELETE'])
def delete_accessorie(id):
    accessorie = db.session.get(Accesorios, id)

    db.session.delete(accessorie)
    db.session.commit()
    return jsonify({"msg": "accessorie deleted successfully"}), 200


@api.route('/ranking', methods=['GET'])
def get_ranking():
    partidas = db.session.execute(
        db.select(Partida)
        .order_by(Partida.score.desc())
        .limit(5)
    ).scalars().all()

    return jsonify([partida.serialize() for partida in partidas]), 200
