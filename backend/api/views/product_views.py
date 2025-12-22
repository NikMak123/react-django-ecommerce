from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# local import
from api.models import Product, Review
from api.serializers import ProductSerilizer


# ✅ Get all products with pagination & search
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query is None:
        query = ''

    products = Product.objects.filter(name__icontains=query).order_by('-_id')

    page = request.query_params.get('page', 1)

    try:
        page = int(page)
    except ValueError:
        page = 1

    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    serializer = ProductSerilizer(products, many=True)
    return Response({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })


# ✅ Get top-rated products
@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerilizer(products, many=True)
    return Response(serializer.data)

# Get Product by category
@api_view(['GET'])
def getCategory(request,category):
    products = Product.objects.filter(category__iexact=category)
    serializer = ProductSerilizer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCategories(request):
    categories = Product.objects.values_list('category', flat=True).distinct()
    return Response(categories)



# ✅ Get single product
@api_view(['GET'])
def singleProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)   # ❌ aap filter use kar rahe the (queryset return hota hai)
        serializer = ProductSerilizer(product, many=False)  # ❌ galat serializer tha (rest_framework ka base Serializer import kiya tha)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)


# ✅ Create product review
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def createProductReview(request, pk):
#     user = request.user
#     try:
#         product = Product.objects.get(_id=pk)
#     except Product.DoesNotExist:
#         return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

#     data = request.data

#     # 1. review already exists
#     if product.review_set.filter(user=user).exists():
#         return Response({'detail': 'Product already reviewed'}, status=status.HTTP_400_BAD_REQUEST)

#     # 2. no rating or 0 rating
#     elif data.get('rating') is None or data.get('rating') == 0:
#         return Response({'detail': 'Please select a rating'}, status=status.HTTP_400_BAD_REQUEST)

#     # 3. create review
#     else:
#         review = Review.objects.create(
#             user=user,
#             product=product,
#             name=user.first_name,
#             rating=data['rating'],
#             comment=data['comment'],
#         )

#         reviews = product.review_set.all()
#         product.numReviews = reviews.count()

#         total = sum([r.rating for r in reviews])
#         product.rating = total / len(reviews)
#         product.save()

#         return Response({'detail': 'Review Added'})

# ✅ Create product review safely
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data

    # Determine correct Review foreign key field
    review_field = 'product' if hasattr(Review, 'product') else 'Product'

    # 1. review already exists
    if Review.objects.filter(user=user, **{review_field: product}).exists():
        return Response({'detail': 'Product already reviewed'}, status=status.HTTP_400_BAD_REQUEST)

    # 2. no rating or 0 rating
    if not data.get('rating') or data.get('rating') == 0:
        return Response({'detail': 'Please select a rating'}, status=status.HTTP_400_BAD_REQUEST)

    # 3. create review
    review = Review.objects.create(
        user=user,
        name=user.first_name,
        rating=data['rating'],
        comment=data.get('comment', ''),
        **{review_field: product}
    )

    # Update product rating and numreview
    reviews = Review.objects.filter(**{review_field: product})
    product.numreview = reviews.count()
    product.rating = sum(r.rating for r in reviews) / reviews.count()
    product.save()

    return Response({'detail': 'Review Added'})

