from django.urls import path
from api.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('top/', views.getTopProducts, name='top-products'),
    path('categories/',views.getCategories,name='categoires'),
    path('category/<str:category>/', views.getCategory, name='category'),
    path('<str:pk>/reviews/', views.createProductReview, name="create_review"),
    path('<int:pk>/', views.singleProduct, name='product'),
]


# urlpatterns = [
#     path('',views.getProducts,name='products'),
#     path('<str:pk>/reviews/',views.createProductReview,name="create_review"),
#     path('top/',views.getTopProducts,name='top-products'),
#     path('<int:pk>/', views.singleProduct, name='product'),
#     path('category/<str:category>/',views.getCategory,name='category'),

# ]
