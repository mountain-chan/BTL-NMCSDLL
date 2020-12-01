import json

from bson import ObjectId

from app.app import create_app
from app.extensions import client
from app.settings import DevConfig


class Worker:
    def __init__(self):
        app = create_app(config_object=DevConfig)
        app_context = app.app_context()
        app_context.push()
        client.db.command("dropDatabase")
        with open('default.json', encoding='utf-8') as file:
            self.default_data = json.load(file)

    def insert_default_group(self):
        groups = self.default_data.get('groups', {})
        client.db.group.insert_many(groups)

    def insert_default_department(self):
        departments = self.default_data.get('departments', {})
        client.db.department.insert_many(departments)

    def insert_default_holiday(self):
        holidays = self.default_data.get('holidays', {})
        client.db.department.insert_many(holidays)

    def insert_default_user(self):
        users = self.default_data.get('users', {})
        for user in users:
            client.db.user.insert_one(user)
            value = {
                '_id': str(ObjectId()),
                'user_id': user['_id'],
                'luong_hien_tai': 2000,
                'luong_co_ban_thang': 0,
                'muc_luong_dong_bao_hiem': 0,
                'so_nguoi_phu_thuoc': 0,
                'so_ngay_cong_thuc_te': 0,
                'total_days_allowed_to_leave': 12,
                'days_left': 12
            }
            client.db.salary_parameter.insert_one(value)


if __name__ == '__main__':
    worker = Worker()
    worker.insert_default_group()
    worker.insert_default_department()
    worker.insert_default_holiday()
    worker.insert_default_user()
