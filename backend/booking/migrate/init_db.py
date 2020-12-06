import json
from flask import Flask
from flask_pymongo import PyMongo
from app.settings import DevConfig

client = PyMongo()


class Worker:
    def __init__(self):
        app = Flask(__name__)

        app.config.from_object(DevConfig)
        client.app = app
        client.init_app(app)
        app_context = app.app_context()
        app_context.push()
        client.db.command("dropDatabase")
        with open('default.json', encoding='utf-8') as file:
            self.default_data = json.load(file)

        with open('room_data.json', encoding='utf-8') as file:
            self.room_data = json.load(file)

        with open('booking_data.json', encoding='utf-8') as file:
            self.booking_data = json.load(file)

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
        rooms = self.room_data
        client.db.rooms.insert_many(rooms)

    def insert_default_users(self):
        users = self.default_data.get('users', {})
        client.db.users.insert_many(users)

    def insert_default_bookings(self):
        bookings = self.booking_data
        client.db.bookings.insert_many(bookings)


if __name__ == '__main__':
    worker = Worker()
    worker.insert_default_cities()
    worker.insert_default_properties_type()
    worker.insert_default_properties()
    worker.insert_default_rooms()
    worker.insert_default_users()
    worker.insert_default_bookings()
