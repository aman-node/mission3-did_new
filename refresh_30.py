from fileinput import filename
from operator import truediv
from textwrap import indent
from tkinter import N, W
import requests
import json
from bs4 import BeautifulSoup
import schedule
import time
def refresh():
    r = requests.get('https://library.uos.ac.kr/statistics/popularloanList')

    # Parsing the HTML
    soup = BeautifulSoup(r.content, 'html.parser')

    s = soup.find('div', class_='listTable').find('tbody').find_all('tr')
    new_list=[]
    # t=0
    for i in s:
        # t+=1
        # if t==6:break
        title = i.find("td", class_="title").find("a").text
        author = i.find_all("td", class_="author")[0].text
        link = i.find("td", class_="title").find("a").get('href')

        url="https://library.uos.ac.kr"+str(link)
            # print(url)    
        html = requests.get(url).text
        isbn = html.split('var isbn="')[1].split('";')[0]
        sysdiv = html.split('var sysdiv = "')[1].split('";')[0]
        controlNo = html.split('var controlno = "')[1].split('";')[0]
        try:
            data = {'isbn': isbn, 'sysdiv': sysdiv, 'ctrl': controlNo,"detail":"DETAILS"}
            print(data)
            json_form = requests.post('https://library.uos.ac.kr/openapi/thumbnail', data=data).json()
            images = json_form["smallUrl"]
        except Exception as e:
            images='https://library.uos.ac.kr/image/ko/solution/local/noCoverImg.jpg'
        var={"smallUrl":images}
        new_list.append({"title":title,"author":author,"image":var})
        # with open("data.json", "wb",encoding='utf-8') as f:
    with open("C:\\Users\\91770\\Desktop\\mission2_DID-develope\\mission2_DID-develope\\data.json", "w",encoding='utf-8')as f:
        json_str=json.dump(new_list,f,ensure_ascii=False,indent=3)
        print(json_str)
    with open ('C:\\Users\\91770\\Desktop\\mission2_DID-develope\\mission2_DID-develope\\data.json','r',encoding='utf-8')as file:
        temp=json.load(file)
    print(temp)

schedule.every(30).minutes.do(refresh)

while true; do
    schedule.run_pending()
    time.sleep(1)