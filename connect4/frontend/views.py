from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def multiply_by_two(request):
    if request.method == 'POST':
        data = request.json()
        number = data.get('number')
        if number is not None:
            try:
                result = int(number) * 2
                return JsonResponse({'result': result})
            except ValueError:
                return JsonResponse({'error': 'Invalid input'})
    return JsonResponse({'error': 'Invalid request'})
