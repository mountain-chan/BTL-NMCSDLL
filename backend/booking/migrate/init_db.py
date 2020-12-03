import json

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

    def insert_default_cities(self):
        cities = self.default_data.get('cities', {})
        client.db.cities.insert_many(cities)

    def insert_default_properties_type(self):
        property_types = self.default_data.get('property_types', {})
        client.db.property_types.insert_many(property_types)

    def insert_default_properties(self):
        properties = self.default_data.get('properties', {})
        client.db.properties.insert_many(properties)

    def insert_default_rooms(self):
        rooms = self.default_data.get('rooms', {})
        client.db.rooms.insert_many(rooms)

    def insert_default_users(self):
        users = self.default_data.get('users', {})
        client.db.users.insert_many(users)

    def insert_default_bookings(self):
        bookings = self.default_data.get('bookings', {})
        client.db.bookings.insert_many(bookings)


if __name__ == '__main__':
    worker = Worker()
    worker.insert_default_cities()
    worker.insert_default_properties_type()
    worker.insert_default_properties()
    worker.insert_default_rooms()
    worker.insert_default_users()
    worker.insert_default_bookings()
