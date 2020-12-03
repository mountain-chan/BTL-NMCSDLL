from bson import ObjectId
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from jsonschema import validate

from app.decorators import admin_required
from app.schema.schema_validator import property_type_validator
from app.utils import send_result, send_error
from app.extensions import client

api = Blueprint('properties_type', __name__)


@api.route('', methods=['POST'])
@jwt_required
@admin_required()
def create_property_type():
    """ This is api for the property_type management create property_type.

        Request Body:

        Returns:

        Examples::
    """

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=property_type_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    property_type_duplicated = client.db.properties_type.find_one({"name": json_data.get("name", None)})
    if property_type_duplicated:
        return send_error(message="The property_type name has existed!")

    keys = ["name", "description", "image"]

    property_type_id = str(ObjectId())
    new_property_type = {
        "_id": property_type_id
    }

    for key in keys:
        if key in json_data:
            new_property_type[key] = json_data.get(key)

    try:
        client.db.properties_type.insert_one(new_property_type)
    except Exception as ex:
        return send_error(message="Insert to database error: " + str(ex))

    return send_result(data=new_property_type, message="Create property_type successfully!")


@api.route('/<property_type_id>', methods=['PUT'])
@jwt_required
@admin_required()
def update_property_type(property_type_id):
    """ This is api for the property_type management edit the property_type.

        Request Body:

        Returns:

        Examples::

    """

    property_type = client.db.properties_type.find_one({"_id": property_type_id})
    if property_type is None:
        return send_error(message="Not found property_type!")

    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=property_type_validator)
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
        client.db.properties_type.update_many({"_id": property_type_id}, new_values)
    except Exception as ex:
        return send_error(message="Database error: " + str(ex))

    return send_result(data=data, message="Update property_type successfully!")


@api.route('/<property_type_id>', methods=['DELETE'])
@jwt_required
@admin_required()
def delete_property_type(property_type_id):
    """ This api for the property_type management deletes the properties_type.

        Returns:

        Examples::

    """
    property_type = client.db.properties_type.find_one({"_id": property_type_id})
    if property_type is None:
        return send_error(message="Not found property_type!")

    # Also delete all children foreign key
    client.db.properties_type.delete_one({"_id": property_type_id})

    return send_result(data=property_type, message="Delete property_type successfully!")


@api.route('', methods=['GET'])
@jwt_required
def get_all_properties_type():
    """ This api gets all properties_type.

        Returns:

        Examples::

    """

    results = client.db.properties_type.find({})
    return send_result(data=list(results))


@api.route('/<property_type_id>', methods=['GET'])
@jwt_required
def get_property_type_by_id(property_type_id):
    """ This api get information of a property_type.

        Returns:

        Examples::

    """

    property_type = client.db.properties_type.find_one({"_id": property_type_id})
    if not property_type:
        return send_error(message="property_type not found.")
    return send_result(data=property_type)
