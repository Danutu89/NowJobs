from users.serializers import CompanySerializer
from rest_framework import serializers
from .models import Job, Domain, Category, Offer
from dry_rest_permissions.generics import DRYPermissionsField


class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = [
            "name",
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "name",
        ]


class JobDetailedSerializer(serializers.ModelSerializer):
    domain = DomainSerializer(many=False)
    category = CategorySerializer(many=False)
    company = CompanySerializer(many=False)
    permisions = DRYPermissionsField()

    class Meta:
        model = Job
        fields = [
            "permissions",
            "company",
            "remote",
            "salary",
            "seats",
            "created_on",
            "description",
            "title",
        ]


class JobSerializer(serializers.ModelSerializer):
    domain = DomainSerializer(many=False)
    category = CategorySerializer(many=False)
    owner = CompanySerializer(many=False)
    permissions = DRYPermissionsField()
    description = serializers.CharField(source="get_preview")

    class Meta:
        model = Job
        fields = [
            "owner",
            "remote",
            "seats",
            "created_on",
            "description",
            "domain",
            "category",
            "permissions",
            "title",
        ]


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ["email", "first_name", "last_name"]


class OfferDetailedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ["email", "first_name", "last_name", "description", "cv"]