from django.db import models
import json

# Create your models here.
class board(models.Model):
    rows = models.IntegerField()
    columns = models.IntegerField()
    current_rows = models.IntegerField()
    current_columns = models.IntegerField()
    board = models.JSONField()


   
    #self.my_array = json.dumps(self.my_array)


    #return json.loads(self.my_array)