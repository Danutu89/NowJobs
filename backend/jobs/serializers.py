from users.serializers import CompanySerializer
from rest_framework import serializers
from .models import Job, Domain, Category, Offer
from dry_rest_permissions.generics import DRYPermissionsField


class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = [
            "name",
            "id",
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "name",
            "id",
        ]


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = [
            "email",
            "first_name",
            "last_name",
            "opened",
            "id",
            "description",
            "job",
            "cv",
        ]
        extra_kwargs = {
            "description": {"write_only": True},
            "job": {"write_only": True},
            "cv": {"write_only": True, "required": False},
            "phone": {"write_only": True},
        }

    def validate(self, data):
        apply = (
            Offer.objects.filter(email=data["email"]).filter(job_id=data["job"]).first()
        )

        if apply is not None:
            raise serializers.ValidationError("You've already applied to that job.")

        return super().validate(data)


class OfferDetailedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = [
            "email",
            "first_name",
            "last_name",
            "description",
            "cv",
            "phone",
            "job",
        ]


class JobDetailedSerializer(serializers.ModelSerializer):
    domain = DomainSerializer(many=False)
    category = CategorySerializer(many=False)
    owner = CompanySerializer(many=False)
    permissions = DRYPermissionsField()
    applied = serializers.SerializerMethodField()
    offer = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            "permissions",
            "owner",
            "remote",
            "salary",
            "seats",
            "domain",
            "category",
            "created_on",
            "description",
            "title",
            "applied",
            "offer",
        ]

    def get_applied(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        if not user.is_authenticated:
            return False

        return (
            Offer.objects.filter(job=obj.id).filter(email=user.email).first()
            is not None
        )

    def get_offer(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        if not user.is_authenticated:
            return None

        return OfferSerializer(
            Offer.objects.filter(job=obj.id).filter(email=user.email).first()
        ).data


class JobSerializer(serializers.ModelSerializer):
    domain = DomainSerializer(many=False)
    category = CategorySerializer(many=False)
    owner = CompanySerializer(many=False)
    permissions = DRYPermissionsField()
    description = serializers.CharField(source="get_preview")
    link = serializers.CharField(source="get_link")

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
            "link",
        ]
