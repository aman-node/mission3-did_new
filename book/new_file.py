import requests
import html_to_json
def index():
    my_request = requests.get("https://library.uos.ac.kr/statistics/popularloanList")
    data=my_request.text
    # print(data)
    output_json = html_to_json.convert(data)
    # print(output_json)
    print(output_json)
#    return render(requests,'data.html',{'json_data': output_json})



index()