from bson import ObjectId
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from jsonschema import validate

from app.decorators import admin_required
from app.schema.schema_validator import city_validator
from app.utils import send_result, send_error
from app.extensions import client

api = Blueprint('cities', __name__)


@api.route('', methods=['POST'])
@jwt_required
@admin_required()
def create_city():
    """ This is api for the city management create city.

        Request Body:

        Returns:

        Examples::
    """

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=city_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    city_duplicated = client.db.cities.find_one({"name": json_data.get("name", None)})
    if city_duplicated:
        return send_error(message="The city name has existed!")

    keys = ["name", "description", "image"]

    city_id = str(ObjectId())
    new_city = {
        "_id": city_id
    }

    for key in keys:
        if key in json_data:
            new_city[key] = json_data.get(key)

    try:
        client.db.cities.insert_one(new_city)
    except Exception as ex:
        return send_error(message="Insert to database error: " + str(ex))

    return send_result(data=new_city, message="Create city successfully!")


@api.route('/<city_id>', methods=['PUT'])
@jwt_required
@admin_required()
def update_city(city_id):
    """ This is api for the city management edit the city.

        Request Body:

        Returns:

        Examples::

    """

    city = client.db.cities.find_one({"_id": city_id})
    if city is None:
        return send_error(message="Not found city!")

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=city_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    keys = ["name", "description", "image"]
    data = {}
    for key in keys:
        if key in json_data:
            data[key] = json_data.get(key)

    new_values = {
        "$set": data
    }

    try:
        client.db.cities.update_many({"_id": city_id}, new_values)
    except Exception as ex:
        return send_error(message="Database error: " + str(ex))

    return send_result(data=data, message="Update city successfully!")


@api.route('/<city_id>', methods=['DELETE'])
@jwt_required
@admin_required()
def delete_city(city_id):
    """ This api for the city management deletes the cities.

        Returns:

        Examples::

    """
    city = client.db.cities.find_one({"_id": city_id})
    if city is None:
        return send_error(message="Not found city!")

    # Also delete all children foreign key
    client.db.cities.delete_one({"_id": city_id})

    return send_result(data=city, message="Delete city successfully!")


@api.route('', methods=['GET'])
@jwt_required
def get_all_cities():
    """ This api gets all cities.

        Returns:

        Examples::

    """

    results = client.db.cities.find({})
    return send_result(data=list(results))


@api.route('/<city_id>', methods=['GET'])
@jwt_required
def get_city_by_id(city_id):
    """ This api get information of a city.

        Returns:

        Examples::

    """

    city = client.db.cities.find_one({"_id": city_id})
    if not city:
        return send_error(message="city not found.")
    return send_result(data=city)
