# -*- coding: utf-8 -*-

import traceback
from time import strftime
from flask import Flask, request
from flask_cors import CORS
from app.extensions import jwt, client, logger
from .settings import ProdConfig
from app import api as api_v1


def create_app(config_object=ProdConfig):
    """
    Init App
    :param config_object:
    :return:
    """
    app = Flask(__name__, static_url_path="", static_folder="./files", template_folder="./template")
    app.config.from_object(config_object)
    register_extensions(app)
    register_blueprints(app)
    CORS(app)

    return app


def register_extensions(app):
    """
    Init extension
    :param app:
    :return:
    """
    client.app = app
    client.init_app(app)
    jwt.init_app(app)

    @app.after_request
    def after_request(response):
        # This IF avoids the duplication of registry in the log,
        # since that 500 is already logged via @app.errorhandler.
        if response.status_code != 500:
            ts = strftime('[%Y-%b-%d %H:%M]')
            logger.error('%s %s %s %s %s %s',
                         ts,
                         request.remote_addr,
                         request.method,
                         request.scheme,
                         request.full_path,
                         response.status)
        return response

    @app.errorhandler(Exception)
    def exceptions(e):
        ts = strftime('[%Y-%b-%d %H:%M]')
        tb = traceback.format_exc()
        error = '{} {} {} {} {} 5xx INTERNAL SERVER ERROR\n{}'.format \
                (
                ts,
                request.remote_addr,
                request.method,
                request.scheme,
                request.full_path,
                tb
            )

        logger.error(error)

        return "Internal Server Error", 500


def register_blueprints(app):
    """
    Init blueprint for api url
    :param app:
    :return:
    """
    app.register_blueprint(api_v1.auth.api, url_prefix='/api/auth')
    app.register_blueprint(api_v1.user.api, url_prefix='/api/users')
    app.register_blueprint(api_v1.property.api, url_prefix='/api/properties')
    app.register_blueprint(api_v1.room.api, url_prefix='/api/rooms')
    app.register_blueprint(api_v1.city.api, url_prefix='/api/cities')
    app.register_blueprint(api_v1.property_type.api, url_prefix='/api/property_types')
    app.register_blueprint(api_v1.booking.api, url_prefix='/api/bookings')
    app.register_blueprint(api_v1.statistics.api, url_prefix='/api/statistics')
    app.register_blueprint(api_v1.predict.api, url_prefix='/api/predictions')
