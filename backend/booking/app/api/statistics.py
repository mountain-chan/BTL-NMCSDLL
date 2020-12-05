from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from app.decorators import admin_required
from app.utils import send_result, get_timestamp_now, begin_day_of_month, last_day_of_month
from app.extensions import client

api = Blueprint('statistics', __name__)


@api.route('/properties_by_city', methods=['GET'])
@jwt_required
@admin_required()
def property_by_city():
    """
        Returns:

        Examples::

    """
    cities = client.db.cities.find({})
    results = {}
    for city in cities:
        properties = client.db.properties.find({"city_id": city["_id"]}).count()
        results[city["name"]] = properties

    return send_result(data=results)


@api.route('/rooms_by_city', methods=['GET'])
@jwt_required
@admin_required()
def room_by_city():
    """
        Returns:

        Examples::

    """
    cities = client.db.cities.find({})
    results = {}
    for city in cities:
        properties = client.db.properties.find({"city_id": city["_id"]})
        properties_id = [p["_id"] for p in properties]
        rooms = client.db.rooms.find({"property_id": {"$in": properties_id}}).count()
        results[city["name"]] = rooms

    return send_result(data=results)


@api.route('/rooms_by_property', methods=['GET'])
@jwt_required
@admin_required()
def room_by_property():
    """
        Returns:

        Examples::

    """
    properties = client.db.properties.find({})
    results = {}
    for p in properties:
        rooms = client.db.rooms.find({"property_id": p["_id"]}).count()
        results[p["name"]] = rooms

    return send_result(data=results)


@api.route('/bookings_by_city', methods=['GET'])
@jwt_required
@admin_required()
def booking_by_city():
    """
        Returns:

        Examples::

    """
    cities = client.db.cities.find({})
    results = {}
    for city in cities:
        properties = client.db.properties.find({"city_id": city["_id"]})
        properties_id = [p["_id"] for p in properties]
        rooms = client.db.rooms.find({"property_id": {"$in": properties_id}})
        rooms_id = [r["_id"] for r in rooms]
        bookings = client.db.bookings.find({"room_id": {"$in": rooms_id}}).count()
        results[city["name"]] = bookings

    return send_result(data=results)


@api.route('/available_rooms_by_city', methods=['GET'])
@jwt_required
@admin_required()
def available_rooms_by_city():
    """
        Returns:

        Examples::

    """
    datetime = request.args.get('datetime', get_timestamp_now(), type=int)

    cities = client.db.cities.find({})
    results = {}
    for city in cities:
        properties = client.db.properties.find({"city_id": city["_id"]})

        properties_id = [p["_id"] for p in properties]
        rooms = client.db.rooms.find({"property_id": {"$in": properties_id}})

        rooms_id = [r["_id"] for r in rooms]
        query = {"$and": [
            {"room_id": {"$in": rooms_id}},
            {"date_check_out": {"$gte": datetime}},
            {"date_check_in": {"$lte": datetime}}
        ]}
        bookings = list(client.db.bookings.find(query))
        rooms_booking_id = set([b["room_id"] for b in bookings])
        results[city["name"]] = len(rooms_id) - len(rooms_booking_id)

    return send_result(data=results)


@api.route('/bookings_by_year', methods=['GET'])
@jwt_required
@admin_required()
def bookings_by_year():
    """
        Returns:

        Examples::

    """
    year = request.args.get('year', 2020, type=int)
    results = []
    for i in range(1, 13):
        begin_month = begin_day_of_month(i, year)
        end_month = last_day_of_month(i, year)
        query = {"$and": [
            {"is_cancel": 0},
            {"date_check_in": {"$gte": begin_month}},
            {"date_check_in": {"$lte": end_month}}
        ]}
        bookings = list(client.db.bookings.find(query))
        n = len(bookings)
        total = 0
        for b in bookings:
            total += b["total"]
        item = {
            "month": i,
            "number_of_reservations": n,
            "total_income": total
        }
        results.append(item)

    return send_result(data=results)
