from flask_sqlalchemy import SQLAlchemy

# Crear una instancia de SQLAlchemy
db = SQLAlchemy()

# Configuración para inicializar la base de datos
def init_db(app):
    """
    Inicializa la base de datos con la aplicación Flask.
    Crea las tablas si no existen.
    """
    db.init_app(app)
    with app.app_context():
        db.create_all()
