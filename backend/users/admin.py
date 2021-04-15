from django.contrib import admin
from .models import Company, User


class UserAdmin(admin.ModelAdmin):
    model = User


class CompanyAdmin(admin.ModelAdmin):
    model = Company


admin.site.register(Company, CompanyAdmin)
admin.site.register(User, UserAdmin)
# Register your models here.
