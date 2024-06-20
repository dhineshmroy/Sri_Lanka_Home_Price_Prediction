import json
import pickle
import numpy as np

__location = None
__data_columns = None
__model = None


def predict_price(Baths, Land_size, Beds, House_size, location):
    get_location()
    try:
        loc_index = __data_columns.index(location.lower())
    except IndexError:
        loc_index = - 1
        print(f"Location '{location}' not found in X.columns")
        return None

    res = np.zeros(len(__data_columns))
    res[0] = Baths
    res[1] = Land_size
    res[2] = Beds
    res[3] = House_size
    if loc_index >= 0:
        res[loc_index] = 1

    return __model.predict([res])[0]


def get_location():
    load_saved_artifacts()
    return __location

def load_saved_artifacts():
    global __data_columns
    global __location

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __location = __data_columns[4:]

    global __model
    with open("./artifacts/srilanka_home_prices_model.pickle", 'rb') as f:
        __model = pickle.load(f)

if __name__ == "__main__":
    print(get_location())
    print(predict_price(1,50,3,1,'Colombo 10'))