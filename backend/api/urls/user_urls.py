from django.urls import path
from api.views import user_views as views

urlpatterns = [
    path('register/',views.resgisterUser,name='register'),
    path('profile/',views.getUserProfile,name='user_profile'),
    path('profile/update',views.updateUserProfile,name="user_profile_update"),
    path('login/',views.MyTokenObtainParisView.as_view(),name='token'),
    # path('update/<str:pk>/',views.updateUser,name='updateUser'),
    path('delete/<str:pk>/',views.deleteUser,name='deleteUser'),


]


