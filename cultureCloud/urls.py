
from django.contrib import admin
from django.urls import path
from culture_cloud import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name="index"),
    path('signup', views.signup, name="signup"),
    path('signin', views.signin, name="signin"),
    path('cultureInfo', views.cultureInfo, name="cultureInfo"),
    # path('searchCulture/<slug:searchInput>/', views.searchCulture, name="culture"),
    path('createUser', views.createUser, name="createUser"),
    path('signinUser', views.signinUser, name="signinUser"),
]
    # path('testRequest', views.tester),
    # path('verifier/<int:num>/', views.verifier),
    
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
