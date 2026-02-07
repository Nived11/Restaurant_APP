from rest_framework import serializers
from .models import Category, FoodItem

from rest_framework import serializers
from .models import Category, FoodItem

class FoodItemSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = FoodItem
        # ADD 'category' TO THIS LIST 👇
        fields = ['id', 'category', 'name', 'description', 'price', 'image_url', 'is_available']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class CategorySerializer(serializers.ModelSerializer):
    # This nests the food items directly inside the category
    items = FoodItemSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'title', 'slug', 'image', 'items']
        
        
from .models import Order, OrderItem # Make sure these are imported at the top

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['food_item', 'quantity'] 

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True) # Enables sending a list of items

    class Meta:
        model = Order
        fields = ['id', 'status', 'total_amount', 'created_at', 'items']
        read_only_fields = ['total_amount', 'status', 'created_at'] # Frontend cannot change these

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user # Get the logged-in user
        
        # 1. Create the Order (Start with 0 total)
        order = Order.objects.create(customer=user, total_amount=0)
        
        # 2. Loop through items and calculate actual price
        total = 0
        for item_data in items_data:
            food = item_data['food_item']
            qty = item_data['quantity']
            price = food.price # SECURITY: Get price from DB, not request!
            
            OrderItem.objects.create(order=order, food_item=food, quantity=qty, price=price)
            total += price * qty
            
        # 3. Update the final total
        order.total_amount = total
        order.save()
        return order
    
    
from .models import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):
    food_name = serializers.ReadOnlyField(source='food_item.name')
    food_price = serializers.ReadOnlyField(source='food_item.price')
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'food_item', 'food_name', 'food_price', 'quantity', 'image_url']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.food_item.image and request:
            return request.build_absolute_uri(obj.food_item.image.url)
        return None

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price']

    def get_total_price(self, obj):
        total = 0
        for item in obj.items.all():
            total += item.food_item.price * item.quantity
        return total
    
    
class OrderItemDetailSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='food_item.name')
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['name', 'quantity', 'price', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.food_item.image and request:
            return request.build_absolute_uri(obj.food_item.image.url)
        return None

class OrderListSerializer(serializers.ModelSerializer):
    items = OrderItemDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'total_amount', 'created_at', 'items']