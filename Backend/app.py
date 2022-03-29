from flask import flask

app = Flask (__name__)

#methods, if GET, you don't have to specify
@app.route('/' methods=["GET"])
#'defining' your method
def homepage():

    #returning what you want shown in the app.route '/'
    return 'homepage'


if__name__=='__main__':
    app.run(debug=True)