from app import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(250), nullable=True)
    status = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    deadline = db.Column(db.Date, nullable=True)
    priority = db.Column(db.String(10), default="No prioritaria")
    category = db.Column(db.String(50), default="Sin categoría")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "created_at": self.created_at,
            "deadline": self.deadline,
            "priority": self.priority,
            "category": self.category,
        }
