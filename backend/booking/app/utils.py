from time import time

from flask import jsonify
from flask_jwt_extended import decode_token

from app.enums import ALLOWED_EXTENSIONS, ALLOWED_EXTENSIONS_IMG, ALLOWED_EXTENSIONS_EXCEL
from .extensions import parser, client
import datetime
import werkzeug
from marshmallow import fields, validate as validate_


def parse_req(argmap):
    """
    Parser request from client
    :param argmap:
    :return:
    """
    return parser.parse(argmap)


def send_result(data=None, message="OK", code=200, version=1, status=True):
    """
    Args:
        data: simple result object like dict, string or list
        message: message send to client, default = OK
        code: code default = 200
        version: version of api
    :param data:
    :param message:
    :param code:
    :param version:
    :param status:
    :return:
    json rendered sting result
    """
    res = {
        "jsonrpc": "2.0",
        "status": status,
        "code": code,
        "message": message,
        "data": data,
        "version": get_version(version)
    }

    return jsonify(res), 200


def send_error(data=None, message="Error", code=200, version=1, status=False):
    """

    :param data:
    :param message:
    :param code:
    :param version:
    :param status:
    :return:
    """
    res_error = {
        "jsonrpc": "2.0",
        "status": status,
        "code": code,
        "message": message,
        "data": data,
        "version": get_version(version)
    }
    return jsonify(res_error), code


def get_version(version):
    """
    if version = 1, return api v1
    version = 2, return api v2
    Returns:

    """
    return "QLKS v2.0" if version == 2 else "QLKS v1.0"


class FieldString(fields.String):
    """
    validate string field, max length = 1024
    Args:
        des:

    Returns:

    """
    DEFAULT_MAX_LENGTH = 1024  # 1 kB

    def __init__(self, validate=None, requirement=None, **metadata):
        """

        Args:
            validate:
            metadata:
        """
        if validate is None:
            validate = validate_.Length(max=self.DEFAULT_MAX_LENGTH)
        if requirement is not None:
            validate = validate_.NoneOf(error='Dau vao khong hop le!', iterable={'full_name'})
        super(FieldString, self).__init__(validate=validate, required=requirement, **metadata)


class FieldNumber(fields.Number):
    """
    validate number field, max length = 30
    Args:
        des:

    Returns:

    """
    DEFAULT_MAX_LENGTH = 30  # 1 kB

    def __init__(self, validate=None, **metadata):
        """

        Args:
            validate:
            metadata:
        """
        if validate is None:
            validate = validate_.Length(max=self.DEFAULT_MAX_LENGTH)
        super(FieldNumber, self).__init__(validate=validate, **metadata)


def hash_password(str_pass):
    return werkzeug.generate_password_hash(str_pass)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def allowed_file_img(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS_IMG


def allowed_file_excel(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS_EXCEL


def set_auto_MaNV():
    lst = []
    list_user = client.db.user.find({}, {'MaNV': 1})
    if list_user is None:
        return 'BA001'
    list_user = list(list_user)
    for i in list_user:
        lst.append(i['MaNV'])
    tmp = max(lst)
    str1 = tmp[0:2]
    stt = int(tmp[2: len(tmp)]) + 1
    mnv = str1 + '{:03d}'.format(stt)
    return mnv


def get_datetime_now():
    """
        Returns:
            current datetime
    """
    return datetime.datetime.now()


def get_timestamp_now():
    """
        Returns:
            current time in timestamp
    """
    return int(time())


def get_end_time_of_day(timestamp):
    """
    :param timestamp:
    :return:
    """
    end_time = datetime.datetime.fromtimestamp(timestamp).strftime('%d/%m/%Y')
    end_time = datetime.datetime.strptime(end_time, '%d/%m/%Y')
    end_time = int(end_time.timestamp()) + 86400
    return end_time


def get_begin_time_of_day(timestamp):
    """
    :param timestamp:
    :return:
    """
    begin_time = datetime.datetime.fromtimestamp(timestamp).strftime('%d/%m/%Y')
    begin_time = datetime.datetime.strptime(begin_time, '%d/%m/%Y')
    begin_time = int(begin_time.timestamp())
    return begin_time


def get_date_now_for_check_birthday():
    return datetime.datetime.today().strftime('%d/%m')


def get_date_now_for_check_breaks():
    return datetime.datetime.now().strftime("%H:%M:%S")


def get_current_month():
    return datetime.datetime.today().strftime('%m')


def get_current_year():
    return datetime.datetime.today().strftime('%Y')


def begin_day_of_month(any_month):
    """
    :param any_month:
    :return:
    """
    tmp_day = datetime.datetime.now().replace(month=int(any_month), day=1)
    return float(tmp_day.timestamp())


def last_day_of_month(any_month):
    """
    :param any_month:
    :return:
    """
    month = int(any_month) + 1
    year = int(datetime.datetime.today().year)
    if month > 12:
        month = 1
        year = year + 1
    next_month = datetime.datetime.now().replace(year=year, month=month, day=1)
    return next_month.timestamp()


def get_birthday(float_data):
    """
    :param float_data:
    :return:
    """
    return datetime.datetime.fromtimestamp(float(float_data)).strftime('%d/%m')


def add_token_to_database(encoded_token, user_identity):
    """
    Adds a new token to the database. It is not revoked when it is added.
    :param encoded_token:
    :param user_identity:
    """
    decoded_token = decode_token(encoded_token)
    jti = decoded_token['jti']
    token_type = decoded_token['type']
    expires = decoded_token['exp']
    revoked = False

    db_token = {
        "jti": jti,
        "token_type": token_type,
        "user_identity": user_identity,
        "expires": expires,
        "revoked": revoked
    }
    client.db.tokens.insert_one(db_token)


def revoke_token(jti):
    """
    Revokes the given token. Raises a TokenNotFound error if the token does
    not exist in the database
    :param jti:
    :return:
    """
    try:
        token = TokenBlacklist.query.filter_by(jti=jti).first()
        token.revoked = True
        db.session.commit()
    except Exception as ex:
        return send_error(message="Could not find the token")


def is_token_revoked(decoded_token):
    """
    Checks if the given token is revoked or not. Because we are adding all the
    tokens that we create into this database, if the token is not present
    in the database we are going to consider it revoked, as we don't know where
    it was created.
    """
    jti = decoded_token['jti']
    try:
        token = TokenBlacklist.query.filter_by(jti=jti).one()
        return token.revoked
    except Exception:
        return True


def revoke_all_token(users_identity):
    """
    Revokes the given token. Raises a TokenNotFound error if the token does
    not exist in the database.
    Set token Revoked flag is False to revoke this token.
    Args:
        users_identity: list or string, require
            list users id or user_id. Used to query all token of the user on the database
    """
    try:
        if type(users_identity) is not list:
            # convert user_id to list user_ids
            users_identity = [users_identity]

        tokens = TokenBlacklist.query.filter(TokenBlacklist.user_identity.in_(users_identity),
                                             TokenBlacklist.revoked == False).all()

        for token in tokens:
            token.revoked = True
        db.session.commit()
    except Exception:
        return send_error(message="Could not find the user")


def revoke_all_token2(users_identity):
    """
    Revokes all token of the given user except current token. Raises a TokenNotFound error if the token does
    not exist in the database.
    Set token Revoked flag is False to revoke this token.
    Args:
        users_identity: user id
    """
    jti = get_raw_jwt()['jti']
    try:
        tokens = TokenBlacklist.query.filter(TokenBlacklist.user_identity == users_identity,
                                             TokenBlacklist.revoked == False, TokenBlacklist.jti != jti).all()
        for token in tokens:
            token.revoked = True
        db.session.commit()
    except Exception:
        return send_error(message="Could not find the user")


def unrevoke_token(jti):
    """
    Unrevokes the given token. Raises a TokenNotFound error if the token does
    not exist in the database
    """
    try:
        token = TokenBlacklist.query.filter_by(jti=jti).one()
        token.revoked = False
        db.session.commit()
    except Exception:
        return send_error(message="Could not find the token")


def prune_database():
    """
    Delete tokens that have expired from the database.
    How (and if) you call this is entirely up you. You could expose it to an
    endpoint that only administrators could call, you could run it as a cron,
    set it up with flask cli, etc.
    """
    now_in_seconds = get_datetime_now()
    expired = TokenBlacklist.query.filter(TokenBlacklist.expires < now_in_seconds).all()
    for token in expired:
        db.session.delete(token)
    db.session.commit()
