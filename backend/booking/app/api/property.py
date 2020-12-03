from bson import ObjectId
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from jsonschema import validate

from app.decorators import admin_required
from app.schema.schema_validator import property_validator
from app.utils import send_result, send_error
from app.extensions import client

api = Blueprint('properties', __name__)


@api.route('', methods=['POST'])
@jwt_required
@admin_required()
def create_property():
    """ This is api for the property management registers property.

        Request Body:

        Returns:

        Examples::
    """

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=property_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    property_duplicated = client.db.properties.find_one({"name": json_data.get("name", None)})
    if property_duplicated:
        return send_error(message="The property name has existed!")

    keys = ["name", "address", "phone", "distance_from_center", "description", "is_near_beach", "rank", "meal",
            "city_id", "id_property_type"]

    property_type = client.db.property_types.find_one({"_id": json_data.get("id_property_type", None)})
    if not property_type:
        return send_error(message="Not found the property type")

    city = client.db.cities.find_one({"_id": json_data.get("city_id", None)})
    if not city:
        return send_error(message="Not found the city")

    property_id = str(ObjectId())
    new_property = {
        "_id": property_id
    }

    for key in keys:
        if key in json_data:
            new_property[key] = json_data.get(key)

    try:
        client.db.properties.insert_one(new_property)
    except Exception as ex:
        return send_error(message="Insert to database error: " + str(ex))

    return send_result(data=new_property, message="Create property successfully!")


@api.route('/<property_id>', methods=['PUT'])
@jwt_required
@admin_required()
def update_property(property_id):
    """ This is api for the property management edit the property.

        Request Body:

        Returns:

        Examples::

    """

    _property = client.db.properties.find_one({"_id": property_id})
    if _property is None:
        return send_error(message="Not found property!")

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=property_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    keys = ["name", "address", "phone", "distance_from_center", "description", "is_near_beach", "rank", "meal",
            "city_id", "id_property_type"]

    property_type = client.db.property_types.find_one({"_id": json_data.get("id_property_type", None)})
    if not property_type:
        return send_error(message="Not found the property type")

    city = client.db.cities.find_one({"_id": json_data.get("city_id", None)})
    if not city:
        return send_error(message="Not found the city")

    data = {}
    for key in keys:
        if key in json_data:
            data[key] = json_data.get(key)

    new_values = {
        "$set": data
    }

    try:
        client.db.properties.update_many({"_id": property_id}, new_values)
    except Exception as ex:
        return send_error(message="Database error: " + str(ex))

    return send_result(data=data, message="Update property successfully!")


@api.route('/<property_id>', methods=['DELETE'])
@jwt_required
@admin_required()
def delete_property(property_id):
    """ This api for the property management deletes the properties.

        Returns:

        Examples::

    """
    _property = client.db.properties.find_one({"_id": property_id})
    if _property is None:
        return send_error(message="Not found property!")

    # Also delete all children foreign key
    client.db.properties.delete_one({"_id": property_id})

    return send_result(data=_property, message="Delete property successfully!")


@api.route('', methods=['GET'])
def get_all_properties():
    """ This api gets all properties.

        Returns:

        Examples::

    """

    results = client.db.properties.find({})
    return send_result(data=list(results))


@api.route('/<property_id>', methods=['GET'])
def get_property_by_id(property_id):
    """ This api get information of a property.

        Returns:

        Examples::

    """

    _property = client.db.properties.find_one({"_id": property_id})
    if not _property:
        return send_error(message="property not found.")
    return send_result(data=_property)
