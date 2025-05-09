from django.shortcuts import render, redirect, get_object_or_404
from .models import Hotel
from .forms import HotelForm

def hotel_list(request):
    hotels = Hotel.objects.all()
    return render(request, 'hotels/hotel_list.html', {'hotels': hotels})

def hotel_create(request):
    if request.method == 'POST':
        form = HotelForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('hotel_list')
    else:
        form = HotelForm()
    return render(request, 'hotels/hotel_form.html', {'form': form, 'title': 'Add Hotel'})

def hotel_update(request, id):
    hotel = get_object_or_404(Hotel, id=id)
    form = HotelForm(request.POST or None, instance=hotel)
    if form.is_valid():
        form.save()
        return redirect('hotel_list')
    return render(request, 'hotels/hotel_form.html', {'form': form, 'title': 'Edit Hotel'})

def hotel_delete(request, id):
    hotel = get_object_or_404(Hotel, id=id)
    if request.method == 'POST':
        hotel.delete()
        return redirect('hotel_list')
    return render(request, 'hotels/hotel_confirm_delete.html', {'hotel': hotel})
