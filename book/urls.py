from operator import index
from django.urls import path
from book import views 

urlpatterns = [
    path('',views.index,name='start'),
]