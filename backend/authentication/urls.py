from authentication.views import RegisterView
from django.conf.urls import url
from django.urls import path, include
from rest_framework_jwt.views import refresh_jwt_token


urlpatterns = [
    url(r"^", include("rest_auth.urls")),
    url(r"^registration/", RegisterView.as_view(), name="register"),
    url(r"^refresh/", refresh_jwt_token),
]

# Provider urlpatterns, as separate attribute (for reusability).
# provider_urlpatterns = []
# for provider in providers.registry.get_list():
#     try:
#         prov_mod = import_module(provider.get_package() + ".urls")
#     except ImportError:
#         continue
#     prov_urlpatterns = getattr(prov_mod, "urlpatterns", None)
#     if prov_urlpatterns:
#         provider_urlpatterns += prov_urlpatterns
# urlpatterns += provider_urlpatterns