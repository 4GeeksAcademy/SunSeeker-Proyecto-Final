from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer,  ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from flask_bcrypt import generate_password_hash, check_password_hash


db = SQLAlchemy()


class User (db.Model):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(100), nullable=False)
    fecha_registro: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    # DEBERIA SER UNA LISTA?? Mapped[list["Michi"]] = relationship("Michi", back_populates="user", cascade="all, delete-orphan")
    michis: Mapped["Michi"] = relationship("Michi", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "fecha_registro": self.fecha_registro
        }


class Michi (db.Model):
    __tablename__ = "michi"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    michi_name: Mapped[str] = mapped_column(String(50), nullable=False)
    color: Mapped[str] = mapped_column(String(20))
    pescados_totales: Mapped[int] = mapped_column(Integer, default=0)

    user: Mapped["User"] = relationship("User", back_populates="michis")
    partidas: Mapped[list["Partida"]] = relationship(
        "Partida", back_populates="michi", cascade="all, delete-orphan")
    michi_inventario: Mapped[list["MichiInventario"]] = relationship(
        "MichiInventario", back_populates="michi", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "michi_name": self.michi_name,
            "color": self.color,
            "pescados_totales": self.pescados_totales
        }


class Accesorios(db.Model):
    __tablename__ = "accesorios"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    accesorios_name: Mapped[str] = mapped_column(String(50), nullable=False)
    tipo_de_accesorios: Mapped[str] = mapped_column(String(30))
    precio_pescado: Mapped[int] = mapped_column(Integer, nullable=False)

    michi_inventario: Mapped[list["MichiInventario"]] = relationship(
        "MichiInventario", back_populates="accesorios", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "accesorios_name": self.accesorios_name,
            "tipo_de_accesorios": self.tipo_de_accesorios,
            "precio_pescado": self.precio_pescado
        }


class MichiInventario (db.Model):
    __tablename__ = "michi_inventario"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    michi_id: Mapped[int] = mapped_column(
        ForeignKey("michi.id"), nullable=False)
    accesorios_id: Mapped[int] = mapped_column(
        ForeignKey("accesorios.id"), nullable=False)
    esta_equipado: Mapped[bool] = mapped_column(Boolean, default=False)

    michi: Mapped["Michi"] = relationship(
        "Michi", back_populates="michi_inventario")
    accesorios: Mapped["Accesorios"] = relationship(
        "Accesorios", back_populates="michi_inventario")

    def serialize(self):
        return {
            "id": self.id,
            "michi_id": self.michi_id,
            "accesorios_id": self.accesorios_id,
            "esta_equipado": self.esta_equipado
        }


class Partida(db.Model):
    __tablename__ = "partida"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    michi_id: Mapped[int] = mapped_column(
        ForeignKey("michi.id"), nullable=False)
    score: Mapped[int] = mapped_column(Integer, nullable=False)

    michi: Mapped["Michi"] = relationship("Michi", back_populates="partidas")

    def serialize(self):
        return {
            "id": self.id,
            "michi_id": self.michi_id,
            "score": self.score
        }
