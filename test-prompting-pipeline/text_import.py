import json

def import_json_data(file_path):
    with open(file_path) as file:
        data = json.load(file)

    title = data[0]['title']
    author = data[0]['author']
    url = data[0]['url']
    text = data[0]['text']

    return title, author, url, text