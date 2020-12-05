from flask import Blueprint, request
from jsonschema import validate
import pandas as pd
import numpy as np

from app.schema.schema_validator import feature_validator
from app.utils import send_result, send_error
from app.extensions import client, scaler_x, scaler_y, linear, neural

api = Blueprint('predictions', __name__)


@api.route('', methods=['POST'])
def predictions():
    """ This api predict price of a room.

        Returns:

        Examples::

    """
    _type = request.args.get('type', "linear")
    try:
        json_data = request.get_json()
        # Check valid params
        validate(instance=json_data, schema=feature_validator)
    except Exception as ex:
        return send_error(message=str(ex))

    json_data["city_id"] = float(json_data["city_id"])
    json_data["property_type_id"] = float(json_data["property_type_id"])

    x = np.array(
        [[json_data["acreage"], json_data["bed_type"], json_data["distance_from_center"], json_data["is_near_beach"],
          json_data["rank"], json_data["meal"], json_data["city_id"], json_data["property_type_id"]]])

    # standardized data
    x = scaler_x.transform(x)

    if _type == "linear":
        price = linear.predict(x)[0]
    else:
        price = neural.predict(x)[0][0]

    price = scaler_y.revert(price)
    return send_result(data=price)


@api.route('/irregular', methods=['GET'])
def irregular():
    """ This api predict irregular.

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

    df = pd.DataFrame(items)
    for i in range(len(df)):
        df.at[i, "city_id"] = float(df["city_id"][i])
        df.at[i, "property_type_id"] = float(df["property_type_id"][i])

    x = np.array(df[["acreage", "bed_type", "distance_from_center", "is_near_beach", "rank", "meal", "city_id",
                     "property_type_id"]])

    # standardized data
    x = scaler_x.transform(x)
    y_real = np.array(df["price"])
    y_real_s = scaler_y.transform(y_real)
    y_predict_s = linear.predict(x)
    y_predict = scaler_y.revert(y_predict_s)

    regular_rooms = []
    irregular_rooms = []
    for i, j, k in zip(items, y_real, y_predict):
        if abs(j - k) > 100:
            i["predicted_price"] = float(k)
            irregular_rooms.append(i)
        else:
            item = {
                "price": float(j),
                "predicted_price": float(k)
            }
            regular_rooms.append(item)

    results = {
        "regular": regular_rooms,
        "irregular": irregular_rooms
    }

    return send_result(data=results)
