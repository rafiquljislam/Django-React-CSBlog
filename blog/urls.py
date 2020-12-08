from django.urls import path, include
from rest_framework import routers
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register('post',PostViewset,basename='PostViewset')
router.register('updateprofile',Allaboutprofile,basename='Allaboutprofile')

urlpatterns = [
    path('',include(router.urls)),
    path('profile/',ProfileViewset.as_view(),name='profile'),
    path('user-<str:username>/',SeeFriendProfile.as_view(),name="friend"),
    path('register/',UserViewset.as_view(),name='user'),
    path('login/',obtain_auth_token),
]
