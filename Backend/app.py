from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import psycopg2 

app = Flask (__name__)

#Setting up the path to your base directory(basedir), which is this file
# basedir=os.path.abspath(os.path.dirname(__file__))
#Light configuration for sqlite3, Sqlite3 is a testing database, perfect for getting up and off the ground
#'bookstore.sqlite' is my database name, can call it whatever you want
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://xtmbvfsrekqlzh:f84638bc39ae8783824e870f00281439369bd16744dc43f4dd34db325317f50b@ec2-52-3-60-53.compute-1.amazonaws.com:5432/d6jqevflp41lbq')
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app, resources={r'/*': {'origins': '*'}})

#todo

#Book Class
class Book(db.Model):
    #primay_key=True auto increments the id, the value will always be unique
    id = db.Column(db.Integer, primary_key=True)
    #nullable=False means that the user has to type in a book title
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    #db.String(50) 50 represent the number of characters that the genre can have
    genre = db.Column(db.String(50), nullable=False)

    #python class constructor, will always take anything that is nullable=False, nullable=True you don't have to put in here unless you want to 
    def __init__(self, title, author, price, genre):
        self.title = title
        self.author = author
        self.price = price
        self.genre = genre

#Create Schema
class BookSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'author', 'price', 'genre')

book_schema = BookSchema()
#many=True is your GET ALL
books_schema = BookSchema(many=True)

#methods, if GET, you don't have to specify
@app.route('/', methods=["GET"])
#'defining' your method
def homepage():

    #returning what you want shown in the app.route '/'
    return 'homepage'

@app.route('/books', methods=["GET"])
def get_all_books():
    books = db.session.query(Book).all()
    #Dump essentially dumps all the data for you to use
    return jsonify(books_schema.dump(books))


      #Create
@app.route('/book', methods=["POST"])
@cross_origin()
def create_book():
    book_data = request.get_json()
    title = book_data.get("title")
    author = book_data.get("author")
    price = book_data.get("price")
    genre = book_data.get("genre")

    new_book = Book(title, author, price, genre)
    db.session.add(new_book)
    db.session.commit()
    return book_schema.jsonify(new_book)

@app.route('/book/<id>', methods=["PUT"])
def update_books(id):
    book = db.session.query(Book).filter(Book.id == id).first()
    book_data = request.get_json()
    title = book_data.get("title")
    author = book_data.get("author")
    price = book_data.get("price")
    genre = book_data.get("genre")

    if title != None:
        book.title = title
    if author != None:
        book.author = author
    if price != None:
        book.price = price
    if genre != None:
        book.genre = genre

    db.session.commit()
    return jsonify("Updated Book!")

#Delete
@app.route('/book/<id>', methods=["DELETE"])
def delete_book(id):
    book_to_delete = db.session.query(Book).filter(Book.id == id).first()
    db.session.delete(book_to_delete)
    db.session.commit()
    return jsonify("Book has been deleted")

#app.run debug=True, runs with debugger. Great for development, take off for production
if __name__=='__main__':
    app.run(debug=True)