api_key = "25d4e4d5fa0444b7bcbdae7c333b55f0"
print(api_key)

from newsapi import NewsApiClient

api = NewsApiClient(api_key=api_key)
abc = api.get_everything(q="Jannick Sinner")
print(abc.keys())
print(abc["totalResults"])
print(abc["articles"][0].keys())
print(abc["articles"][0]["url"])
print(abc["articles"][0]["content"])
