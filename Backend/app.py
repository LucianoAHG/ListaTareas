import os
from flask import Flask
from flask_cors import CORS
from database import db, init_db

def create_app():
    app = Flask(__name__)
    
    # Configuración de CORS
    CORS(app, resources={r"/tasks/*": {"origins": "http://localhost:5173"}})

    # Configuración de la base de datos con ruta absoluta
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'database', 'database.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializar la base de datos
    init_db(app)

    # Registrar blueprints
    with app.app_context():
        from routes import task_routes
        app.register_blueprint(task_routes, url_prefix='/tasks')

    return app

if __name__ == '__main__':
    # Crear la aplicación
    app = create_app()
    
    # Crear las tablas dentro del contexto de la aplicación
    with app.app_context():
        db.create_all()
    
    # Ejecutar la aplicación
    app.run(debug=True)
