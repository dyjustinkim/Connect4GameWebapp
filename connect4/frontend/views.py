from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .minimax import minimax
from .connect4game import Connect4Board
import json

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

@csrf_exempt
def frontend_move(request):
    if request.method == 'POST':
        #data = request.POST.get('input_data')
        board = minimax_move(2)
        return JsonResponse({'new_board': board})

    else:
        return JsonResponse({'error': 'Unsupported method'}, status=405)

def minimax_move(column):

    board = Connect4Board()
    move = minimax('x', board)
    board.drop_piece(move, 'x')
    board = board.returnboard().tolist()
    jsonboard = json.dumps(board)
    return jsonboard