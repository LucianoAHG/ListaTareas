from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from models import Task, db

task_routes = Blueprint('task_routes', __name__)

# Crear una nueva tarea
@task_routes.route('/', methods=['POST'])
@cross_origin(origins='http://localhost:5173')
def create_task():
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({"error": "El título es obligatorio"}), 400

    new_task = Task(
        title=data['title'],
        description=data.get('description', None),
        deadline=data.get('deadline', None),
        priority=data.get('priority', 'No prioritaria'),
        category=data.get('category', 'Sin categoría')
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

# Obtener todas las tareas
@task_routes.route('/', methods=['GET'])
@cross_origin(origins='http://localhost:5173')
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([task.to_dict() for task in tasks]), 200

# Obtener una tarea por ID
@task_routes.route('/<int:task_id>', methods=['GET'])
@cross_origin(origins='http://localhost:5173')
def get_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404
    return jsonify(task.to_dict()), 200

# Actualizar una tarea
@task_routes.route('/<int:task_id>', methods=['PUT'])
@cross_origin(origins='http://localhost:5173')
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    data = request.get_json()
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = data.get('status', task.status)
    task.deadline = data.get('deadline', task.deadline)
    task.priority = data.get('priority', task.priority)
    task.category = data.get('category', task.category)

    db.session.commit()
    return jsonify(task.to_dict()), 200

# Eliminar una tarea
@task_routes.route('/<int:task_id>', methods=['DELETE'])
@cross_origin(origins='http://localhost:5173')
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Tarea eliminada con éxito"}), 200

# Alternar el estado de una tarea
@task_routes.route('/<int:task_id>/toggle', methods=['PATCH'])
@cross_origin(origins='http://localhost:5173')
def toggle_task_status(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    task.status = not task.status
    db.session.commit()
    return jsonify(task.to_dict()), 200
