from django.urls import path
from .views import  RequestOTP, VerifyOTP,MenuListView,FoodItemListView,DashboardStatsView,CategoryListCreateView,FoodItemListCreateView,AdminLoginView,CreateOrderView,CartView,AddToCartView,CheckoutView,MyOrderListView

urlpatterns = [
    path('request-otp/', RequestOTP.as_view(), name='request-otp'),
    path('verify-otp/', VerifyOTP.as_view(), name='verify-otp'),
    path('auth/admin-login/', AdminLoginView.as_view(), name='admin-login'),
    
    path('menu/', MenuListView.as_view(), name='menu-list'),
    path('food/', FoodItemListView.as_view(), name='food-list'),
    
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('food-items/', FoodItemListCreateView.as_view(), name='food-list-create'),
    path('orders/', CreateOrderView.as_view(), name='create-order'),
    
    path('cart/', CartView.as_view(), name='view-cart'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    
    path('cart/checkout/', CheckoutView.as_view(), name='checkout'),
    
    path('orders/mine/', MyOrderListView.as_view(), name='my-orders'),
]   