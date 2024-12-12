from django.urls import  path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user),
    path('login/', login_view),
    path('create/', create_view),
    path('users-list/', user_list),
    path('delete-user/<int:user_id>/', delete_user),
    path('logout/', logout_user),
    path('block/<int:user_id>/', block_user),

]