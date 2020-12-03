class Bookng {
    constructor(
        _id,
        username,
        room_id,
        date_reservation,
        date_check_in,
        date_check_out,
        service,
        note,
        total,
        is_cancel
    ) {
        this._id = _id;
        this.username = username;
        this.room_id = room_id;
        this.date_reservation = date_reservation;
        this.date_check_in = date_check_in;
        this.date_check_out = date_check_out;
        this.service = service;
        this.note = note;
        this.total = total;
        this.is_cancel = is_cancel;
    }
}

export default Booking;
