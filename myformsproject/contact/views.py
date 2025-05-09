from django.shortcuts import render, redirect
from .forms import ContactForm


# Create your views here.
def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request. POST)
        if form.is_valid():
            #process form.cleaned_data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            
            return render (request, 'contact/success.html',{'name':name})
    
    else:
        form = ContactForm()
        
    return render(request, 'contact/contact.html',{'form':form})
        