from rest_framework import serializers
from .models import Company, User
from dry_rest_permissions.generics import DRYPermissionsField


class UserSerializer(serializers.ModelSerializer):
    permissions = DRYPermissionsField()

    class Meta:
        model = User
        ref_name = "User"
        fields = [
            "email",
            "id",
            "permissions",
        ]


class UserDetailedSerializer(serializers.ModelSerializer):
    permissions = DRYPermissionsField()

    class Meta:
        model = User
        ref_name = "User Detailed"
        fields = [
            "email",
            "id",
            "permissions",
        ]
        read_only_fields = [
            "id",
        ]


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["name", "icon"]