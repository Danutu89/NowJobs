from jobs.views import JobListCreateView, JobView
from django.conf.urls import url

urlpatterns = [
    url(r"^$", JobListCreateView.as_view()),
    url(r"^(?P<pk>\d+)$", JobView.as_view()),
    url(r"^offers$", JobListCreateView.as_view()),
    url(r"^offers/(?P<pk>\d+)$", JobView.as_view()),
]
