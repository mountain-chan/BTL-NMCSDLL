from bson import ObjectId
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from jsonschema import validate

from app.decorators import admin_required
from app.schema.schema_validator import room_validator
from app.utils import send_result, send_error
from app.extensions import client

api = Blueprint('rooms', __name__)


@api.route('', methods=['POST'])
@jwt_required
@admin_required()
def create_room():
    """ This is api for the room management create room.

        Request Body:

        Returns:

        Examples::
    """

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=room_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    room_duplicated = client.db.rooms.find_one({"name": json_data.get("name", None)})
    if room_duplicated:
        return send_error(message="The room name has existed!")

    _property = client.db.properties.find_one({"_id": json_data.get("property_id", None)})
    if not _property:
        return send_error(message="Not found the property")

    keys = ["name", "acreage", "price", "facility", "description", "bed_type", "property_id"]
    room_id = str(ObjectId())
    new_room = {
        "_id": room_id
    }

    for key in keys:
        if key in json_data:
            new_room[key] = json_data.get(key)

    try:
        client.db.rooms.insert_one(new_room)
    except Exception as ex:
        return send_error(message="Insert to database error: " + str(ex))

    return send_result(message="Create room successfully!")


@api.route('/<room_id>', methods=['PUT'])
@jwt_required
@admin_required()
def update_room(room_id):
    """ This is api for the room management edit the room.

        Request Body:

        Returns:

        Examples::

    """

    room = client.db.rooms.find_one({"_id": room_id})
    if room is None:
        return send_error(message="Not found room!")

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=room_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    _property = client.db.properties.find_one({"_id": json_data.get("property_id", None)})
    if not _property:
        return send_error(message="Not found the property")

    keys = ["name", "acreage", "price", "facility", "description", "bed_type", "property_id"]
    data = {}
    for key in keys:
        if key in json_data:
            data[key] = json_data.get(key)

    new_values = {
        "$set": data
    }

    try:
        client.db.rooms.update_many({"_id": room_id}, new_values)
    except Exception as ex:
        return send_error(message="Database error: " + str(ex))

    return send_result(data=data, message="Update room successfully!")


@api.route('/<room_id>', methods=['DELETE'])
@jwt_required
@admin_required()
def delete_room(room_id):
    """ This api for the room management deletes the rooms.

        Returns:

        Examples::

    """
    room = client.db.rooms.find_one({"_id": room_id})
    if room is None:
        return send_error(message="Not found room!")

    # Also delete all children foreign key
    client.db.rooms.delete_one({"_id": room_id})

    return send_result(data=room, message="Delete room successfully!")


@api.route('', methods=['GET'])
@jwt_required
def get_all_rooms():
    """ This api gets all rooms.

        Returns:

        Examples::

    """

    results = client.db.rooms.find({})
    return send_result(data=list(results))


@api.route('/<room_id>', methods=['GET'])
@jwt_required
def get_room_by_id(room_id):
    """ This api get information of a room.

        Returns:

        Examples::

    """

    room = client.db.rooms.find_one({"_id": room_id})
    if not room:
        return send_error(message="room not found.")
    return send_result(data=room)
