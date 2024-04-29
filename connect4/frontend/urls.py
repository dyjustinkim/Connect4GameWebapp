from django.urls import path
from .views import index, frontend_move

urlpatterns = [
    path('', index), 
    path('move', frontend_move)
]

