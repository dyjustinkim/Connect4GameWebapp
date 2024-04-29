from django.urls import path
from .views import index, frontend_move, win, aimove

urlpatterns = [
    path('', index), 
    path('move', frontend_move),
    path('win', win),
    path('aimove', aimove)
]

