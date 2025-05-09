from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    number_of_rooms = models.PositiveIntegerField()

    def __str__(self):
        return self.name


