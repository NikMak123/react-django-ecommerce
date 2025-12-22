from datetime import datetime
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Order, OrderItem, Product, ShippingAddress
from api.serializers import OrderSerializer


# Create a new order
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data.get('orderItems', [])

    if not orderItems or len(orderItems) == 0:
        return Response({'detail': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)

    # 1. Create order
    order = Order.objects.create(
        user=user,
        paymentMethod=data.get('paymentMethod') or data.get('paymnetMethod'),
        taxPrice=data['taxPrice'],
        shippingPrice=data['shippingPrice'],
        totalPrice=data['totalPrice'],
    )

    # 2. Create shipping address
    shipping = ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postalCode=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country'],
    )

    # 3. Create order items and update stock
    for item_data in orderItems:
        product = Product.objects.get(_id=item_data['_id'])
        item = OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=item_data['qty'],
            price=item_data['price'],
            image=product.image.url,
        )

        # 4. Update stock
        product.countInStock -= int(item.qty)
        product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


# Get logged-in user's orders
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# Get order by ID
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_403_FORBIDDEN)
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_404_NOT_FOUND)


# Update order to paid
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    try:
        order = Order.objects.get(_id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response({'detail': 'Order was paid'}, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_404_NOT_FOUND)
