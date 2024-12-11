from django.db import models

# Create your models here.
class ImageUpload(models.Model):
    image = models.ImageField(upload_to="images/")
    recipe = models.CharField(max_length=255)
    description = models.TextField()
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"image {self.id} - {self.recipe}"