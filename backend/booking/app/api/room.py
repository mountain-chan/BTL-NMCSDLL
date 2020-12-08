from io import BytesIO
import pandas as pd
from bson import ObjectId
from flask import Blueprint, request, send_file
from flask_jwt_extended import jwt_required
from jsonschema import validate

from app.decorators import admin_required
from app.schema.schema_validator import room_validator
from app.utils import send_result, send_error, get_timestamp_now
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

    return send_result(data=new_room, message="Create room successfully!")


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

    keys = ["name", "acreage", "price", "facility", "description", "bed_type", "property_id"]
    data = {}
    for key in keys:
        if key in json_data:
            if key == "property_id":
                _property = client.db.properties.find_one({"_id": json_data.get("property_id", None)})
                if not _property:
                    return send_error(message="Not found the property")
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
def get_all_rooms():
    """ This api gets all rooms.

        Returns:

        Examples::

    """

    results = client.db.rooms.find({})
    return send_result(data=list(results))


@api.route('/detail', methods=['GET'])
def detail():
    """ This api gets all rooms.

        Returns:

        Examples::

    """

    results = list(client.db.rooms.find({}, {"facility": 0, "description": 0, "name": 0}))
    for item in results:
        _property = client.db.properties.find_one({"_id": item["property_id"]})
        item["is_near_beach"] = _property["is_near_beach"]
        item["rank"] = _property["rank"]
        item["meal"] = _property["meal"]
        item["distance_from_center"] = _property["distance_from_center"]
        item["city_id"] = _property["city_id"]
        item["property_type_id"] = _property["property_type_id"]
    return send_result(data=results)


@api.route('/<room_id>', methods=['GET'])
def get_room_by_id(room_id):
    """ This api get information of a room.

        Returns:

        Examples::

    """

    room = client.db.rooms.find_one({"_id": room_id})
    if not room:
        return send_error(message="room not found.")
    return send_result(data=room)


@api.route('/available', methods=['GET'])
@jwt_required
def available_rooms_by_date():
    """ This api get information of a booking.

        Returns:

        Examples::

    """

    datetime = request.args.get('datetime', get_timestamp_now(), type=int)
    all_rooms = client.db.rooms.find({})
    query = {"$and": [
        {"date_check_out": {"$gte": datetime}},
        {"date_check_in": {"$lte": datetime}}
    ]}
    bookings = client.db.bookings.find(query)
    booking_rooms_id = [b["room_id"] for b in bookings]
    available_rooms = [room for room in all_rooms if room["_id"] not in booking_rooms_id]
    return send_result(data=available_rooms)


# @api.route('/export', methods=['GET'])
# def export():
#     """ This api gets all rooms.
#
#         Returns:
#
#         Examples::
#
#     """
#
#     results = list(client.db.rooms.find({}, {"facility": 0, "description": 0, "name": 0}))
#     wb = Workbook()
#     sheet = wb.add_sheet("sheet1")
#     sheet.write(0, 0, 'acreage')
#     sheet.write(0, 1, 'bed_type')
#     sheet.write(0, 2, 'distance_from_center')
#     sheet.write(0, 3, 'is_near_beach')
#     sheet.write(0, 4, 'rank')
#     sheet.write(0, 5, 'meal')
#     sheet.write(0, 6, 'city_id')
#     sheet.write(0, 7, 'property_type_id')
#     for i, item in enumerate(results):
#         _property = client.db.properties.find_one({"_id": item["property_id"]})
#
#         sheet.write(i + 1, 0, item['acreage'])
#         sheet.write(i + 1, 1, item['bed_type'])
#         sheet.write(i + 1, 2, _property['distance_from_center'])
#         sheet.write(i + 1, 3, _property['is_near_beach'])
#         sheet.write(i + 1, 4, _property['rank'])
#         sheet.write(i + 1, 5, _property['meal'])
#         sheet.write(i + 1, 6, _property['city_id'])
#         sheet.write(i + 1, 7, _property['property_type_id'])
#
#     # Save book as bytes
#     output = BytesIO()
#     wb.save(output)
#     output.seek(0)
#     excel_name = "room_data"
#
#     return send_file(output, attachment_filename='{}.xls'.format(excel_name), as_attachment=True)


@api.route('/export2', methods=['GET'])
def export2():
    """ This api gets all rooms.

        Returns:

        Examples::

    """

    items = list(client.db.rooms.find({}, {"facility": 0, "description": 0, "name": 0}))
    for item in items:
        _property = client.db.properties.find_one({"_id": item["property_id"]})
        item["is_near_beach"] = _property["is_near_beach"]
        item["rank"] = _property["rank"]
        item["meal"] = _property["meal"]
        item["distance_from_center"] = _property["distance_from_center"]
        item["city_id"] = _property["city_id"]
        item["property_type_id"] = _property["property_type_id"]

    data = {
        "acreage": [i["acreage"] for i in items],
        "bed_type": [i["bed_type"] for i in items],
        "distance_from_center": [i["distance_from_center"] for i in items],
        "is_near_beach": [i["is_near_beach"] for i in items],
        "rank": [i["rank"] for i in items],
        "meal": [i["meal"] for i in items],
        "city_id": [i["city_id"] for i in items],
        "property_type_id": [i["property_type_id"] for i in items],
        "price": [i["price"] for i in items]
    }

    df = pd.DataFrame(data, columns=["acreage", "bed_type", "distance_from_center", "is_near_beach", "rank", "meal",
                                     "city_id", "property_type_id", "price"])

    df.to_csv('feature.csv', index=False, header=True)

    return send_result(message="Ok")
