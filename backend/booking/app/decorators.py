from functools import wraps

from flask_jwt_extended import get_jwt_identity

from app.extensions import client
from app.utils import send_error


def admin_required():
    """
    Check admin user
    """

    def wrapper(func):
        @wraps(func)
        def inner(*args, **kwargs):
            current_user = client.db.users.find_one({"_id": get_jwt_identity()})
            if not current_user["is_admin"]:
                return send_error(message='You do not have permission')
            return func(*args, **kwargs)

        return inner
    return wrapper
