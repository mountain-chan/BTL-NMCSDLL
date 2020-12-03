from bson import ObjectId
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from jsonschema import validate

from app.decorators import admin_required
from app.schema.schema_validator import booking_validator
from app.utils import send_result, send_error, get_timestamp_now
from app.extensions import client

api = Blueprint('bookings', __name__)


@api.route('', methods=['POST'])
@jwt_required
@admin_required()
def create_booking():
    """ This is api for the booking management create booking.

        Request Body:

        Returns:

        Examples::
    """

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=booking_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    room_id = json_data.get("room_id", None)
    date_check_in = json_data.get("date_check_in", 0)
    date_check_out = json_data.get("date_check_out", 0)

    room = client.db.rooms.find_one({"_id": room_id})
    if not room:
        return send_error(message="Not found the room")

    if date_check_in >= date_check_out:
        return send_error(message="Date check in and date check out invalid")

    query = {"$and": [
        {"room_id": room_id},
        {"$nor": [
            {"date_check_out": {"$lt": date_check_in}},
            {"date_check_in": {"$gt": date_check_out}}
        ]}
    ]}
    booking = client.db.bookings.find_one(query)
    if booking:
        return send_error(message="The reservation conflicted")

    if not room:
        return send_error(message="Not found the room")

    keys = ["room_id", "date_check_in", "date_check_out", "service", "note", "total"]
    booking_id = str(ObjectId())
    new_booking = {
        "_id": booking_id,
        "user_id": get_jwt_identity(),
        "date_reservation": get_timestamp_now()
    }

    for key in keys:
        if key in json_data:
            new_booking[key] = json_data.get(key)

    try:
        client.db.bookings.insert_one(new_booking)
    except Exception as ex:
        return send_error(message="Insert to database error: " + str(ex))

    return send_result(data=new_booking, message="Create booking successfully!")


@api.route('/<booking_id>', methods=['PUT'])
@jwt_required
@admin_required()
def update_booking(booking_id):
    """ This is api for the booking management edit the booking.

        Request Body:

        Returns:

        Examples::

    """

    booking = client.db.bookings.find_one({"_id": booking_id})
    if booking is None:
        return send_error(message="Not found booking!")

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=booking_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    room_id = json_data.get("room_id", None)
    date_check_in = json_data.get("date_check_in", 0)
    date_check_out = json_data.get("date_check_out", 0)

    room = client.db.rooms.find_one({"_id": room_id})
    if not room:
        return send_error(message="Not found the room")

    if date_check_in >= date_check_out:
        return send_error(message="Date check in and date check out invalid")

    query = {"$and": [
        {"room_id": room_id},
        {"_id": {"$ne": booking_id}},
        {"$nor": [
            {"date_check_out": {"$lt": date_check_in}},
            {"date_check_in": {"$gt": date_check_out}}
        ]}
    ]}
    booking = client.db.bookings.find_one(query)
    if booking:
        return send_error(message="The reservation conflicted")

    if not room:
        return send_error(message="Not found the room")

    keys = ["room_id", "date_check_in", "date_check_out", "service", "note", "total", "is_cancel"]
    data = {}
    for key in keys:
        if key in json_data:
            data[key] = json_data.get(key)

    new_values = {
        "$set": data
    }

    try:
        client.db.bookings.update_many({"_id": booking_id}, new_values)
    except Exception as ex:
        return send_error(message="Database error: " + str(ex))

    return send_result(data=data, message="Update booking successfully!")


@api.route('/<booking_id>', methods=['DELETE'])
@jwt_required
@admin_required()
def delete_booking(booking_id):
    """ This api for the booking management deletes the bookings.

        Returns:

        Examples::

    """
    booking = client.db.bookings.find_one({"_id": booking_id})
    if booking is None:
        return send_error(message="Not found booking!")

    # Also delete all children foreign key
    client.db.bookings.delete_one({"_id": booking_id})

    return send_result(data=booking, message="Delete booking successfully!")


@api.route('', methods=['GET'])
@jwt_required
def get_all_bookings():
    """ This api gets all bookings.

        Returns:

        Examples::

    """

    results = client.db.bookings.find({})
    return send_result(data=list(results))


@api.route('/current_user', methods=['GET'])
@jwt_required
def current_user():
    """ This api gets all bookings of current user.

        Returns:

        Examples::

    """

    results = client.db.bookings.find({"user_id": get_jwt_identity()})
    return send_result(data=list(results))


@api.route('/<booking_id>', methods=['GET'])
@jwt_required
def get_booking_by_id(booking_id):
    """ This api get information of a booking.

        Returns:

        Examples::

    """

    booking = client.db.bookings.find_one({"_id": booking_id})
    if not booking:
        return send_error(message="booking not found.")
    return send_result(data=booking)
