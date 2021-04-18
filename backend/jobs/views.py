from jobs.filters import CategoryFilter, JobFilter
from jobs.models import Category, Domain, Job, Offer
from jobs.serializers import (
    CategorySerializer,
    DomainSerializer,
    JobDetailedSerializer,
    JobSerializer,
    OfferDetailedSerializer,
    OfferSerializer,
)
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters import rest_framework as filters
from rest_framework import filters as drf_filters
from dry_rest_permissions.generics import DRYPermissions


class JobListCreateView(ListCreateAPIView):
    permission_classes = [AllowAny, DRYPermissions]
    serializer_class = JobSerializer
    filterset_class = JobFilter
    filter_backends = (filters.DjangoFilterBackend, drf_filters.SearchFilter)
    search_fields = [
        "title",
    ]
    queryset = Job.objects.all()


class JobView(RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny, DRYPermissions]
    serializer_class = JobDetailedSerializer
    queryset = Job.objects.all()


class ApplicantListCreateView(ListCreateAPIView):
    permission_classes = [AllowAny, DRYPermissions]
    serializer_class = OfferSerializer
    queryset = Offer.objects.all()

    def paginate_queryset(self, queryset):
        return None


class ApplicantView(RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny, DRYPermissions]
    serializer_class = OfferDetailedSerializer
    queryset = Offer.objects.all()


class CategoryListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
    filterset_class = CategoryFilter
    filter_backends = (filters.DjangoFilterBackend, drf_filters.SearchFilter)
    search_fields = [
        "name",
    ]
    queryset = Category.objects.all()

    def paginate_queryset(self, queryset):
        return None


class DomainListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = DomainSerializer
    filter_backends = [
        drf_filters.SearchFilter,
    ]
    search_fields = [
        "name",
    ]
    queryset = Domain.objects.all()

    def paginate_queryset(self, queryset):
        return None