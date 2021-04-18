from django.conf.urls import url
from .views import CompanyListView

urlpatterns = [
    url(r"^companies$", CompanyListView.as_view()),
]
