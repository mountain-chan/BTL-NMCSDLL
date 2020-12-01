import logging
import os

from webargs.flaskparser import FlaskParser
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo
from logging.handlers import RotatingFileHandler

parser = FlaskParser()
jwt = JWTManager()
client = PyMongo()

os.makedirs("logs", exist_ok=True)
app_log_handler = RotatingFileHandler('logs/app.log', maxBytes=1000000, backupCount=30)

# logger
logger = logging.getLogger('api')
logger.setLevel(logging.DEBUG)
logger.addHandler(app_log_handler)


