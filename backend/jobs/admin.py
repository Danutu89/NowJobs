from jobs.models import Category, Domain, Job, Offer
from django.contrib import admin


class JobAdmin(admin.ModelAdmin):
    model = Job


class DomainAdmin(admin.ModelAdmin):
    model = Domain


class CategoryAdmin(admin.ModelAdmin):
    model = Category


class OfferAdmin(admin.ModelAdmin):
    model = Offer


# Register your models here.
admin.site.register(Job, JobAdmin)
admin.site.register(Domain, DomainAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Offer, OfferAdmin)