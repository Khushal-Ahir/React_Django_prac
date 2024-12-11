from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageUploadViewset

router = DefaultRouter()
router.register(r"imageupload", ImageUploadViewset)

urlpatterns = [
    path("", include(router.urls))
]
