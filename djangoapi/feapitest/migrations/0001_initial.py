# Generated by Django 5.1.4 on 2024-12-11 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ImageUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('recipe', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('available', models.BooleanField(default=True)),
            ],
        ),
    ]
