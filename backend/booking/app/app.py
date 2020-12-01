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


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    user = client.db.user.find_one({'_id': identity})
    if user['group_id'] == '1':
        return {'is_admin': True, 'is_user': False, 'is_ketoan': False}
    elif user['group_id'] == '2':
        return {'is_admin': False, 'is_user': True, 'is_ketoan': False}
    else:
        return {'is_admin': False, 'is_user': False, 'is_ketoan': True}


def register_blueprints(app):
    """
    Init blueprint for api url
    :param app:
    :return:
    """
    app.register_blueprint(api_v1.auth.api, url_prefix='/api/auth')
