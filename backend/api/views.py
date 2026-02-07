from rest_framework.views import APIView
from rest_framework.response import Response
import pyotp

from .models import User  # <--- THIS LINE WAS MISSING

class RequestOTP(APIView):
    def post(self, request):
        mobile = request.data.get('mobile')
        
        # Logic to generate OTP
        totp = pyotp.TOTP(pyotp.random_base32(), interval=300)
        otp_code = totp.now()
        
        # Save OTP to user
        # Now 'User' is defined because we imported it above
        user, _ = User.objects.get_or_create(mobile=mobile) 
        user.otp = otp_code
        user.save()
        
        print(f"OTP for {mobile}: {otp_code}") # Look for this in your terminal
        return Response({"message": "OTP sent successfully"})
    
    
    
from rest_framework_simplejwt.tokens import RefreshToken

class VerifyOTP(APIView):
    def post(self,request):
        mobile=request.data.get('mobile')
        otp=request.data.get('otp')
        
        try:
            user=User.objects.get(mobile=mobile)
        except User.DoesNotExist:
            return Response({'error':'User not found'},status=404)
        
        if user.otp==otp:
            refresh=RefreshToken.for_user(user)
            return Response({
                'refresh':str(refresh),
                'access':str(refresh.access_token),
            })
        else:
            return Response({'error':'Invalid OTP'},status=400)
        


from django.contrib.auth import authenticate # Import this!
from rest_framework_simplejwt.tokens import RefreshToken

# ... (Previous views) ...

class AdminLoginView(APIView):
    def post(self, request):
        mobile = request.data.get('mobile')
        password = request.data.get('password')

        # 1. Check if user exists with this password
        user = authenticate(username=mobile, password=password)

        # 2. validation: Must be a user AND must be an Admin (is_staff)
        if user is not None and user.is_staff:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': 'admin'
            })
        
        # 3. If failed
        return Response({"error": "Invalid Admin Credentials"}, status=400)
        


from rest_framework import generics
from .models import Category, FoodItem
from .serializers import CategorySerializer, FoodItemSerializer

# Endpoint 1: List all Categories with their Food Items (Best for Menu Page)
class MenuListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Endpoint 2: List all Food Items (Good for Search/Filtering)
class FoodItemListView(generics.ListAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer


from django.db.models import Sum, Count
from .models import Order # Add Order to your imports


class DashboardStatsView(APIView):
    # Only Admin (Superuser) should see this!
    def get(self, request):
        # 1. Calculate Total Revenue
        revenue = Order.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        
        # 2. Count Total Orders
        total_orders = Order.objects.count()
        
        # 3. Count Pending Orders (To be cooked)
        pending_orders = Order.objects.filter(status='Pending').count()
        
        # 4. Get Latest 5 Orders (For a list view)
        recent_orders = Order.objects.all().order_by('-created_at')[:5].values(
            'id', 'customer__mobile', 'total_amount', 'status'
        )

        return Response({
            "total_revenue": revenue,
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "recent_orders": recent_orders
        })
        
        
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser # Required for Image Uploads
from .models import Category, FoodItem
from .serializers import CategorySerializer, FoodItemSerializer
from .permissions import IsAdminOrReadOnly # Import the new permission

# 1. Category View (List & Create)
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly] # Only Admin can POST
    parser_classes = [MultiPartParser, FormParser] # Allow image uploads

# 2. Food Item View (List & Create)
class FoodItemListCreateView(generics.ListCreateAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    permission_classes = [IsAdminOrReadOnly] # Only Admin can POST
    parser_classes = [MultiPartParser, FormParser] # Allow image uploads
    
    
from rest_framework import permissions # Import permissions
from .serializers import OrderSerializer # Import your new serializer

class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated] # Only logged-in users can order
    
    
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get or Create the cart for the current user
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        food_id = request.data.get('food_id')
        quantity = int(request.data.get('quantity', 1))

        # Get User's Cart
        cart, _ = Cart.objects.get_or_create(user=request.user)

        # Check if item already exists in cart
        try:
            cart_item = CartItem.objects.get(cart=cart, food_item_id=food_id)
            cart_item.quantity += quantity # Increase quantity
            cart_item.save()
        except CartItem.DoesNotExist:
            # Create new item
            CartItem.objects.create(cart=cart, food_item_id=food_id, quantity=quantity)

        return Response({"message": "Item added to cart"})
    
from .models import Order, OrderItem, Cart # Make sure these are imported
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1. Get the user's cart
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({"error": "Cart is empty"}, status=400)

        if not cart.items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        # 2. Calculate Total Price
        total_amount = 0
        for item in cart.items.all():
            total_amount += item.food_item.price * item.quantity

        # 3. Create the Order
        order = Order.objects.create(
            customer=request.user,
            total_amount=total_amount,
            status='Pending'
        )

        # 4. Move Cart Items to Order Items
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                food_item=item.food_item,
                quantity=item.quantity,
                price=item.food_item.price # Lock the price at time of purchase
            )

        # 5. Clear the Cart (CRITICAL STEP)
        cart.items.all().delete()

        return Response({
            "message": "Order placed successfully!",
            "order_id": order.id,
            "total_amount": total_amount
        }, status=201)

from .serializers import OrderListSerializer # Import the new serializer

class MyOrderListView(generics.ListAPIView):
    serializer_class = OrderListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return orders belonging to the current user, newest first
        return Order.objects.filter(customer=self.request.user).order_by('-created_at')