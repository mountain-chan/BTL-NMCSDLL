from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.decorators import admin_required
from app.utils import send_result, get_timestamp_now
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
        bookings = client.db.bookings.find({"rooms_id": {"$in": rooms_id}}).count()
        results[city["name"]] = bookings

    return send_result(data=results)


@api.route('/rooms_available_by_city', methods=['GET'])
@jwt_required
@admin_required()
def rooms_available_by_city():
    """
        Returns:

        Examples::

    """
    datetime = request.args.get('datetime', get_timestamp_now())

    cities = client.db.cities.find({})
    results = {}
    for city in cities:
        properties = client.db.properties.find({"city_id": city["_id"]})

        properties_id = [p["_id"] for p in properties]
        rooms = client.db.rooms.find({"property_id": {"$in": properties_id}})

        rooms_id = [r["_id"] for r in rooms]
        query = {"$and": [
            {"rooms_id": {"$in": rooms_id}},
            {"$and": [
                {"date_check_out": {"$gte": datetime}},
                {"date_check_in": {"$lte": datetime}}
            ]}
        ]}
        bookings = client.db.bookings.find(query)

        rooms_booking_id = [b["room_id"] for b in bookings]

        results[city["name"]] = len(rooms_id) - len(rooms_booking_id)

    return send_result(data=results)
