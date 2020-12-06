import logging
import os
import numpy as np
from joblib import load
from keras.models import load_model
from webargs.flaskparser import FlaskParser
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo
from logging.handlers import RotatingFileHandler


class PriceScaler:
    def __init__(self, mean=0, scale=1):
        self.mean = mean
        self.scale = scale

    def fit(self, x):
        self.mean = min(x)
        self.scale = max(x) - self.mean

    def transform(self, x):
        return np.array([(i - self.mean) / self.scale for i in x])

    def revert(self, x):
        return x * self.scale + self.mean


parser = FlaskParser()
jwt = JWTManager()
client = PyMongo()

# models
scaler_x = load('app/models/scaler_x.model')
scaler_y = PriceScaler(160, 570)
linear = load('app/models/linear.model')
neural = load_model('app/models/neural.h5')

os.makedirs("logs", exist_ok=True)
app_log_handler = RotatingFileHandler('logs/app.log', maxBytes=1000000, backupCount=30)

# logger
logger = logging.getLogger('api')
logger.setLevel(logging.DEBUG)
logger.addHandler(app_log_handler)
