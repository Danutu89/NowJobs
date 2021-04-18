from users.models import Company
from users.serializers import CompanySerializer
from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework import filters as drf_filters

# Create your views here.
class CompanyListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CompanySerializer
    filter_backends = [
        drf_filters.SearchFilter,
    ]
    search_fields = [
        "name",
    ]
    queryset = Company.objects.all()

    def paginate_queryset(self, queryset):
        return None