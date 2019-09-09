import os
from django.views.generic import View
from django.http import HttpResponse, HttpResponseNotFound

# Create your views here.

class Home(View):

    def get(self, _request):
        with open(os.path.join(os.path.dirname(__file__), 'dist', 'index.html')) as file:
            return HttpResponse(file.read())

            #this line open the file in: frontend /dist/index.html


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'dist', filename)

        if os.path.isfile(path):
            with open(path) as file:
                return HttpResponse(file.read())
        else:
            return HttpResponseNotFound()
