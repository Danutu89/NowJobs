from jobs.views import (
    CategoryListView,
    DomainListView,
    JobListCreateView,
    JobView,
    ApplicantListCreateView,
    ApplicantView,
)
from django.conf.urls import url

urlpatterns = [
    url(r"^applicants$", ApplicantListCreateView.as_view()),
    url(r"^applicants/(?P<pk>\w+)$", ApplicantView.as_view()),
    url(r"^categories$", CategoryListView.as_view()),
    url(r"^domains$", DomainListView.as_view()),
    url(r"^$", JobListCreateView.as_view()),
    url(r"^(?P<pk>\w+)$", JobView.as_view()),
]
