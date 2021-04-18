from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    UserManager,
)
from shortuuidfield import ShortUUIDField


class User(AbstractBaseUser):
    id = ShortUUIDField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True, blank=False, null=False)
    username = models.CharField(max_length=255, unique=True, blank=False, null=False)
    first_name = models.CharField(max_length=255, unique=False)
    last_name = models.CharField(max_length=255, unique=False)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["email"]
    objects = UserManager()

    def __str__(self):
        return self.username

    def current_user(self):
        return {
            "username": self.username,
            "email": self.email,
            "id": self.id,
        }

    @property
    def staff(self):
        return self.is_staff

    @property
    def superuser(self):
        return self.is_superuser

    @property
    def active(self):
        return self.is_active

    @property
    def full_name(self):
        return self.first_name + " " + self.last_name

    @property
    def get_email(self):
        return self.email

    def applicant_completed(self):
        if (
            hasattr(self, "applicant")
            and self.applicant.email
            and self.applicant.first_name
            and self.applicant.last_name
            and self.applicant.phone
            and self.applicant.cv
        ):
            return True
        return False

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def has_object_read_permission(self, request):
        return True

    def has_object_write_permission(self, request):
        return request.user.id == self.id

    @staticmethod
    def has_read_permission(request):
        return True

    @staticmethod
    def has_write_permission(request):
        return True

    @staticmethod
    def has_create_permission(request):
        return True

    class Meta:
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["id"]),
        ]


class Company(models.Model):

    id = ShortUUIDField(primary_key=True)
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to="companies/icons", blank=True, null=True)
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="company"
    )

    def has_object_read_permission(self, request):
        return True

    def has_object_write_permission(self, request):
        return request.user.id == self.user_id

    @staticmethod
    def has_read_permission(request):
        return True

    @staticmethod
    def has_write_permission(request):
        return True

    @staticmethod
    def has_create_permission(request):
        return True

    def __str__(self):
        return self.name

    class Meta:
        db_table = ""
        managed = True
        verbose_name = "Company"
        verbose_name_plural = "Companies"


class Applicant(models.Model):

    id = ShortUUIDField(primary_key=True)
    cv = models.FileField(upload_to="applicants/cv", blank=True, null=True)
    phone = models.CharField(max_length=20)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField()
    user = models.OneToOneField(
        "users.User", on_delete=models.CASCADE, related_name="applicant"
    )

    def has_object_read_permission(self, request):
        return True

    def has_object_write_permission(self, request):
        return request.user.id == self.user_id

    @staticmethod
    def has_read_permission(request):
        return True

    @staticmethod
    def has_write_permission(request):
        return True

    @staticmethod
    def has_create_permission(request):
        return True

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = "Applicant"
        verbose_name_plural = "Applicants"
