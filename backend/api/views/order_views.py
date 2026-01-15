from datetime import datetime

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Order, OrderItem, Product, ShippingAddress
from api.serializers import OrderSerializer


# ================================
# CREATE NEW ORDER
# ================================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data.get('orderItems', [])

    if not orderItems:
        return Response(
            {'detail': 'No order items'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 1️⃣ Create Order
    order = Order.objects.create(
        user=user,
        paymentMethod=data.get('paymentMethod') or data.get('paymnetMethod'),
        taxPrice=data.get('taxPrice', 0),
        shippingPrice=data.get('shippingPrice', 0),
        totalPrice=data.get('totalPrice', 0),
    )

    # 2️⃣ Create Shipping Address
    ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postalCode=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country'],
    )

    # 3️⃣ Create Order Items
    for item in orderItems:
        product = Product.objects.get(_id=item['_id'])

        OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=item['qty'],
            price=item['price'],
            image=product.image.url if product.image else "",
        )

        # 4️⃣ Update Stock
        product.countInStock -= int(item['qty'])
        product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# ================================
# GET LOGGED-IN USER ORDERS
# ================================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# ================================
# GET ORDER BY ID
# ================================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)

        if order.user != user:
            return Response(
                {'detail': 'Not authorized to view this order'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

    except Order.DoesNotExist:
        return Response(
            {'detail': 'Order does not exist'},
            status=status.HTTP_404_NOT_FOUND
        )


# ================================
# UPDATE ORDER TO PAID
# ================================
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    try:
        order = Order.objects.get(_id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()

        return Response(
            {'detail': 'Order was paid'},
            status=status.HTTP_200_OK
        )

    except Order.DoesNotExist:
        return Response(
            {'detail': 'Order does not exist'},
            status=status.HTTP_404_NOT_FOUND
        )
