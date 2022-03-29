from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask (__name__)

#Setting up the path to your base directory(basedir), which is this file
basedir=os.path.abspath(os.path.dirname(__file__))
#Light configuration for sqlite3, Sqlite3 is a testing database, perfect for getting up and off the ground
#'bookstore.sqlite' is my database name, can call it whatever you want
app.config['SQL_DATABASE_URL']='sqlite:///' + os.path.join(basedir, 'bookstore.sqlite')

#methods, if GET, you don't have to specify
@app.route('/', methods=["GET"])
#'defining' your method
def homepage():

    #returning what you want shown in the app.route '/'
    return 'homepage'


if __name__=='__main__':
    app.run(debug=True)