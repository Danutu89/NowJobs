from jobs.models import Job, Offer
from jobs.serializers import (
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

from dry_rest_permissions.generics import DRYPermissions


class JobListCreateView(ListCreateAPIView):
    permission_classes = [AllowAny, DRYPermissions]
    serializer_class = JobSerializer
    queryset = Job.objects.all()


class JobView(RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny, DRYPermissions]
    serializer_class = JobDetailedSerializer
    queryset = Job.objects.all()


class OfferListCreateView(ListCreateAPIView):
    permission_classes = [AllowAny, DRYPermissions]
    serializer_class = OfferSerializer
    queryset = Offer.objects.all()


class OfferView(RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny, DRYPermissions]
    serializer_class = OfferDetailedSerializer
    queryset = Offer.objects.all()