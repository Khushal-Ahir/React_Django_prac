from django.shortcuts import render
from rest_framework import viewsets
from .models import ImageUpload
from .serializers import ImageUploadSerializer

# Create your views here.

class ImageUploadViewset(viewsets.ModelViewSet):
    queryset = ImageUpload.objects.all()
    serializer_class = ImageUploadSerializer