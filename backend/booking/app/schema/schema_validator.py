user_validator = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50
        },
        "gender": {
            "type": "boolean"
        },
        "phone": {
            "type": "string",
            "minLength": 1,
            "maxLength": 20
        },
        "email": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50
        },
        "is_admin": {
            "type": "boolean"
        }
    },
    "required": ["name", "gender", "phone", "email"]
}

password_validator = {
    "type": "object",
    "properties": {
        "current_password": {
            "type": "string",
            "minLength": 3,
            "maxLength": 50
        },
        "new_password": {
            "type": "string",
            "minLength": 3,
            "maxLength": 50
        }
    },
    "required": ["new_password"]
}

property_validator = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "maxLength": 100
        },
        "address": {
            "type": "string",
            "maxLength": 100
        },
        "phone": {
            "type": "string",
            "maxLength": 50
        },
        "distance_from_center": {
            "type": "number",
            "minimum": 0
        },
        "description": {
            "type": "string",
            "maxLength": 1000
        },
        "is_near_beach": {
            "type": "boolean"
        },
        "rank": {
            "type": "number",
            "minimum": 0,
            "maximum": 5
        },
        "meal": {
            "type": "number",
            "minimum": 0,
            "maximum": 4
        },
        "city_id": {
            "type": "string",
            "maxLength": 50
        },
        "id_property_type": {
            "type": "string",
            "maxLength": 50
        }
    },
    "required": ["name", "address", "phone", "distance_from_center", "description", "is_near_beach", "rank", "meal",
                 "city_id", "id_property_type"]
}

room_validator = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "maxLength": 100
        },
        "acreage": {
            "type": "number",
            "minimum": 0
        },
        "price": {
            "type": "number",
            "minimum": 0
        },
        "facility": {
            "type": "string",
            "maxLength": 200
        },
        "description": {
            "type": "string",
            "maxLength": 1000
        },
        "bed_type": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
        },
        "property_id": {
            "type": "string",
            "maxLength": 50
        }
    },
    "required": ["name", "acreage", "price", "facility", "description", "bed_type", "property_id"]
}

city_validator = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "maxLength": 100
        },
        "description": {
            "type": "string",
            "maxLength": 1000
        },
        "image": {
            "type": "string",
            "maxLength": 50
        }
    },
    "required": ["name", "description", "image"]
}

property_type_validator = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "maxLength": 100
        },
        "description": {
            "type": "string",
            "maxLength": 1000
        },
        "image": {
            "type": "string",
            "maxLength": 50
        }
    },
    "required": ["name", "description", "image"]
}

booking_validator = {
    "type": "object",
    "properties": {
        "user_id": {
            "type": "string",
            "maxLength": 50
        },
        "room_id": {
            "type": "string",
            "maxLength": 50
        },
        "date_reservation": {
            "type": "number",
            "minimum": 0
        },
        "date_check_in": {
            "type": "number",
            "minimum": 0
        },
        "date_check_out": {
            "type": "number",
            "minimum": 0
        },
        "service": {
            "type": "string",
            "maxLength": 500
        },
        "note": {
            "type": "string",
            "maxLength": 500
        },
        "total": {
            "type": "number",
            "minimum": 0
        },
        "is_cancel": {
            "type": "boolean"
        }
    },
    "required": ["user_id", "room_id", "date_reservation", "date_check_in", "date_check_out", "service", "note",
                 "total", "is_cancel"]
}
