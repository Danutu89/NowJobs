from django_filters import rest_framework as filters

from .models import Category, Job


class JobFilter(filters.FilterSet):
    created_on = filters.DateTimeFilter(lookup_expr="gte")

    class Meta:
        model = Job
        fields = ["category", "domain", "remote", "created_on"]


class CategoryFilter(filters.FilterSet):
    class Meta:
        model = Category
        fields = ["domain"]
