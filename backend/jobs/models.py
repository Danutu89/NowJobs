from django.db import models
from shortuuidfield import ShortUUIDField

# Create your models here.
class Job(models.Model):

    id = ShortUUIDField(primary_key=True)
    title = models.CharField(max_length=200)
    salary = models.DecimalField(decimal_places=2, max_digits=8, blank=True, null=True)
    remote = models.BooleanField(default=False)
    description = models.TextField()
    seats = models.IntegerField(default=1)
    created_on = models.DateField(auto_now_add=True)
    domain = models.ForeignKey(
        "jobs.Domain", on_delete=models.CASCADE, related_name="jobs"
    )
    category = models.ForeignKey(
        "jobs.Category", on_delete=models.CASCADE, related_name="jobs"
    )
    owner = models.ForeignKey(
        "users.Company", on_delete=models.CASCADE, related_name="jobs"
    )

    def get_preview(self):
        return self.description[:60]

    def get_link(self):
        return "/jobs/" + (str(self.id))

    def has_object_read_permission(self, request):
        return True

    def has_object_write_permission(self, request):
        return request.user.id == self.owner.user_id

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
        return self.title

    class Meta:
        verbose_name = "Job"
        verbose_name_plural = "Jobs"


class Offer(models.Model):

    id = ShortUUIDField(primary_key=True)
    job = models.ForeignKey("jobs.Job", on_delete=models.CASCADE, related_name="offers")
    email = models.EmailField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    cv = models.FileField(upload_to="jobs/cv")
    description = models.TextField()
    phone = models.CharField(max_length=20)
    opened = models.BooleanField(default=False)

    def has_object_read_permission(self, request):
        if not request.user.is_authenticated:
            return False
        return request.user.email == self.job.owner.user.email

    def has_object_write_permission(self, request):
        if not request.user.is_authenticated:
            return False
        return request.user.email == self.email

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
        return self.first_name + " " + self.last_name

    class Meta:
        verbose_name = "Offer"
        verbose_name_plural = "Offers"


class Domain(models.Model):

    id = ShortUUIDField(primary_key=True)
    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Domain"
        verbose_name_plural = "Domains"


class Category(models.Model):

    id = ShortUUIDField(primary_key=True)
    name = models.CharField(max_length=40)
    domain = models.ForeignKey(
        "jobs.Domain", on_delete=models.CASCADE, related_name="categories"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
