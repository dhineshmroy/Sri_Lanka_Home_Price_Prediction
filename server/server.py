from flask import Flask, request, jsonify
from flask_cors import CORS
import util
import sklearn

# print(sklearn.__version__)

app = Flask(__name__)
CORS(app)


@app.route('/get_location')
def get_location():
    response = jsonify({
        'location': util.get_location()
    })
    return response


@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.json
    Baths = data.get('Baths')
    Land_size = data.get('Land_size')
    Beds = data.get('Beds')
    House_size = data.get('House_size')
    Location = data.get('location')

    response = jsonify({
        'estimated_price': util.predict_price(Baths,Land_size,Beds,House_size,Location)
    })
    return response


if __name__ == "__main__":
    print("Starting flask server")
    app.run()

