from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

# 1. Create the Custom Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, mobile, password=None, **extra_fields):
        if not mobile:
            raise ValueError('The Mobile number must be set')
        user = self.model(mobile=mobile, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, mobile, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(mobile, password, **extra_fields)

# 2. Update the User Model
class User(AbstractUser):
    username = None  # Remove username field
    mobile = models.CharField(max_length=15, unique=True)
    otp = models.CharField(max_length=6, null=True, blank=True)

    USERNAME_FIELD = 'mobile'
    REQUIRED_FIELDS = [] # No other fields required

    # Link the new manager here!
    objects = CustomUserManager()

    def __str__(self):
        return self.mobile
    
class Category(models.Model):
    title=models.CharField(max_length=100)
    slug=models.SlugField(unique=True)
    image=models.ImageField(upload_to='category_images/')
    
    def __str__(self):
        return self.name


class FoodItem(models.Model):
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='food/', blank=True, null=True)
    
    # --- THIS LINE IS MISSING OR NOT MIGRATED ---
    is_available = models.BooleanField(default=True) 

    def __str__(self):
        return self.name
    
    


# ... (Category and FoodItem are above)

class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Cooking', 'Cooking'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer.mobile}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=6, decimal_places=2) # Price at time of order

    def __str__(self):
        return f"{self.quantity} x {self.food_item.name}"
    

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.mobile}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.food_item.name}"
    
    
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE, related_name='favorited_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'food_item') # A user can only favorite an item once

    def __str__(self):
        return f"{self.user.mobile} likes {self.food_item.name}"