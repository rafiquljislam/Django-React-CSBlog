from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import mixins,generics
from rest_framework.generics import get_object_or_404

class PostViewset(viewsets.ModelViewSet):
    permission_classes= [IsAuthenticated, ]
    authentication_classes= [TokenAuthentication, ]
    queryset = Post.objects.all().order_by("-id")
    serializer_class = PostSerializer



class ProfileViewset(APIView):
    permission_classes= [IsAuthenticated, ]
    authentication_classes= [TokenAuthentication, ]

    def get(self,request):
        query = Profile.objects.get(user=request.user)
        serializer = ProfileSerilizer(query)
        allprofiledata = []#
        profile_data = serializer.data #
        profile_posts = Post.objects.filter(user=query)#
        profile_posts_serializer = PostSerializer(profile_posts,many=True)#
        profile_data['posts']=profile_posts_serializer.data#
        allprofiledata.append(profile_data)#
        return Response(allprofiledata)#


class SeeFriendProfile(APIView):
    permission_classes= [IsAuthenticated, ]
    authentication_classes= [TokenAuthentication, ]

    def get(self,request,username):
        query = Profile.objects.get(user__username=username)
        serializer = ProfileSerilizer(query)
        allprofiledata = []#
        profile_data = serializer.data #
        profile_posts = Post.objects.filter(user=query)#
        profile_posts_serializer = PostSerializer(profile_posts,many=True)#
        profile_data['posts']=profile_posts_serializer.data#
        allprofiledata.append(profile_data)#
        return Response(allprofiledata)#


class UserViewset(APIView):
    qureryset = User.objects.all()
    permission_classes = (AllowAny, )
    def post(self,request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"message":"Update Success full","data":serializers.data})
        return Response({"error":True,"message":"A user with that username already exists! Try Anather Username"})


class Allaboutprofile(viewsets.ViewSet):
    permission_classes= [IsAuthenticated, ]
    authentication_classes= [TokenAuthentication, ]
    def create(self,request):
        user = request.user
        data = request.data        
        user_obj = User.objects.get(username=user)
        user_obj.first_name = data["first_name"]
        user_obj.last_name = data["last_name"]
        user_obj.email = data["email"]
        user_obj.save()
        return Response({"error":False,"message":"Update Success full"})

    def update(self,request,pk=None):
        try:
            user = request.user
            qurtyset = Profile.objects.get(user=user)
            serializers = ProfileSerilizer(qurtyset, data=request.data, context={"request": request})
            serializers.is_valid(raise_exception=True)
            serializers.save()

            return_res = {"error":False,"message":"Update Success full","data":serializers.data}
        except:
            return_res = {"error":True,"message":"Not Updated"}

        return Response(return_res)