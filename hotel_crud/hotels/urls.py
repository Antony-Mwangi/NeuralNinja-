from django.urls import path
from . import views

urlpatterns = [
    path('', views.hotel_list, name='hotel_list'),
    path('create/', views.hotel_create, name='hotel_create'),
    path('update/<int:id>/', views.hotel_update, name='hotel_update'),
    path('delete/<int:id>/', views.hotel_delete, name='hotel_delete'),
]
