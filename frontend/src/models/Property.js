class Property {
    constructor(
        _id,
        name,
        address,
        phone,
        distance_from_center,
        description,
        is_near_beach,
        rank,
        meal,
        city_id,
        id_property_type
    ) {
        this._id = _id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.distance_from_center = distance_from_center;
        this.description = description;
        this.is_near_beach = is_near_beach;
        this.rank = rank;
        this.meal = meal;
        this.city_id = city_id;
        this.id_property_type = id_property_type;
    }
}

export default Property;
