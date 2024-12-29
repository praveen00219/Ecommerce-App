# ECOMMERCE API DOCUMENTATION

Welcome to the eCommerce Backend API documentation. This API allows you to manage products, orders, and customers in your eCommerce platform programmatically.

## Authentication

### Login
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/user/login`
- **Body:**
  ```json
  {
      "email": "abc13@gmail.com",
      "password": "1234"
  }
  ```
- **Authentication:** JWT
- **Token:** (Generated JWT Token)
- **Token Type:** Bearer
- **Header:** `Authorization: Bearer (JWT Token)`

### Register
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/user/register`
- **Body:**
  ```json
  {
      "firstname": "john",
      "lastname": "dave",
      "email": "abc121@gmail.com",
      "password": "123456",
      "role": "admin"
  }
  ```
  
### Logout
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/user/logout`
- **Authentication:** None

### Forgot Password
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/user/forgot-password`
- **Body:**
  ```json
  {
      "email": "abc121@gmail.com"
  }
  ```
- **Authentication:** None

### Reset Password
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/user/reset-password/?email=samiksha13@gmail.com`
- **Body:**
  ```json
  {
      "password": "1234"
  }
  ```
- **Authentication:** None

### Change Password
- **Method:** POST
- **URL:** `http://localhost:10000/api/v1/user/change-password/`
- **Body:**
  ```json
  {
      "password": "123456",
      "newPassword": "1234"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

## User Actions

### Add to Wishlist
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/user/wishlist`
- **Body:**
  ```json
  {
      "productId": "65f03789d43cae5a876d6519"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Get Wishlist
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/user/wishlist`
- **Header:** `Authorization: Bearer (JWT Token)`

### Add Address
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/user/address`
- **Body:**
  ```json
  {
      "address": "sai nagar",
      "city": "mumbai",
      "state": "maharashtra",
      "pincode": "123445"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

---

# product
Here's the README file for the provided JSON data outlining the eCommerce product API documentation:

---



## Retrieving Products

### Get Products
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/product`
- **Authentication:** None

### Get Product Details
- **Method:** GET
- **URL:** `http://localhost:10000/api/v1/product/product-by-id?productId=66028be6e0ffabf516b7aa1c`
- **Query Parameter:** `productId`

## Managing Products

### Create Product
- **Method:** POST
- **URL:** `http://localhost:10000/api/v1/product`
- **Body:**
  ```json
  {
      "title": "Iphone 11",
      "description": "not much expensive",
      "stock": 5,
      "category": "mobile",
      "price": 23534,
      "brand": "apple"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Edit Product
- **Method:** PATCH
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/product`
- **Body:**
  ```json
  {
      "id": "66028be6e0ffabf516b7aa1c",
      "title": "samsung",
      "description": "not much expensive",
      "stock": 5,
      "category": "mobile",
      "price": 16000,
      "brand": "samsung"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Delete Product
- **Method:** DELETE
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/product?productId=65f1c0dca1bd6181db7fa116`
- **Query Parameter:** `productId`
- **Header:** `Authorization: Bearer (JWT Token)`

## User Interactions

### Like or Dislike Product
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/product/likes`
- **Body:**
  ```json
  {
      "productId": "66028be6e0ffabf516b7aa1c"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Add Product Review
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/product/:productId/review`
- **Path Parameter:** `productId`
- **Body:**
  ```json
  {
      "rating": 5,
      "comment": "nice product"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

---

Here'sr the provided JSON data outlining the eCommerce cart API documentation:

---

# Cart API 

## Creating and Retrieving Cart

### Create Cart
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/cart`
- **Body:**
  ```json
  {
     "products":[
        {
            "productId":"66028be6e0ffabf516b7aa1c",
            "quantity":2,
            "color":"grey"
        },
         {
            "productId":"65f83d7aa9b63237aa869965",
            "quantity":1,
            "color":"black"
        }
     ]
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Get Cart
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/cart`
- **Authentication:** JWT Token in Header

---

# Coupon API

This document describes the API endpoints available for managing coupons on the eCommerce platform.

## Creating, Updating, and Deleting Coupons

### Create Coupon
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/coupon`
- **Body:**
  ```json
  {
      "couponCode": 32145,
      "discountPercentage": 5,
      "maxDiscountInRs": 200,
      "startDate": "2024/02/05",
      "endDate": "2024/12/10",
      "isActive": true
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Update Coupon
- **Method:** PATCH
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/coupon?couponId=6603c6caf2852f333fcbff7b`
- **Body:**
  ```json
  {
      "couponCode": "34m4df",
      "discountPercentage": 6,
      "maxDiscountInRs": 300,
      "startDate": "2024/02/05",
      "endDate": "2024/12/10",
      "isActive": true
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Delete Coupon
- **Method:** DELETE
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/coupon?couponId=6603c6caf2852f333fcbff7b`
- **Header:** `Authorization: Bearer (JWT Token)`

## Retrieving Coupons

### Get Coupon
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/coupon`
- **Authentication:** JWT Token in Header

---


# Order API 

This section describes the API endpoints available for managing orders on the eCommerce platform.

## Creating and Retrieving Orders

### Create Order
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/order`
- **Body:**
  ```json
  {
      "deliveryAddress": {
          "address": "gandhi street",
          "city": "mumbai",
          "state": "maharashtra",
          "pincode": "442132"
      },
      "modeOfPayment": "ONLINE",
      "coupon": "32145"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Get Order
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/order`
- **Authentication:** JWT Token in Header

---



# Blog API 

This document describes the API endpoints available for managing blogs on the eCommerce platform.

## Creating, Updating, Deleting, and Retrieving Blogs

### Create Blog
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/blog`
- **Body:**
  ```json
  {
      "title": "my first blog on electronics",
      "description": "this is my first blog on electronics , this is sample blog",
      "category": "electronics",
      "author": "xyz"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Update Blog
- **Method:** PATCH
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/blog?blogId=6603f24cced7d2bb0f1acece`
- **Body:**
  ```json
  {
      "title": "blog on electronics",
      "description": "this is my updated blog on electronics , this is sample blog",
      "category": "electronics",
      "author": "xyz"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Delete Blog
- **Method:** DELETE
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/blog?blogId=6603f24cced7d2bb0f1acece`
- **Header:** `Authorization: Bearer (JWT Token)`

### Get Blog
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/blog`
- **Body:**
  ```json
  {
      "blogId": "6603f24cced7d2bb0f1acece"
  }
  ```

### Get All Blogs
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/blog/all`

---


# Brand API 

This section describes the API endpoints available for managing brands on the eCommerce platform.

## Creating, Updating, Deleting, and Retrieving Brands

### Create Brand
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/brand`
- **Body:**
  ```json
  {
      "title": "samsung"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Update Brand
- **Method:** PATCH
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/brand`
- **Body:**
  ```json
  {
      "brandId": "66043751557a77e92ab62134",
      "title": "boat"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Delete Brand
- **Method:** DELETE
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/brand`
- **Body:**
  ```json
  {
      "brandId": "6604397d0e886522951b1041"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Get Brand
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/brand`
- **Body:**
  ```json
  {
      "brandId": "66043751557a77e92ab62134"
  }
  ```

### Get All Brands
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/brand/all`
- **Header:** `Authorization: Bearer (JWT Token)`

---


# Category API Documentation

This section describes the API endpoints available for managing categories on the eCommerce platform.

## Creating, Updating, Deleting, and Retrieving Categories

### Add Category
- **Method:** POST
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/category`
- **Body:**
  ```json
  {
      "title": "electronics"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Update Category
- **Method:** PATCH
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/category`
- **Body:**
  ```json
  {
      "categoryId": "66044cd7aab5f182da2c8918",
      "title": "mobiles"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Delete Category
- **Method:** DELETE
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/category`
- **Body:**
  ```json
  {
      "categoryId": "66044cd7aab5f182da2c8918"
  }
  ```
- **Header:** `Authorization: Bearer (JWT Token)`

### Get Category
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/category`
- **Body:**
  ```json
  {
      "categoryId": "66044cd7aab5f182da2c8918"
  }
  ```

### Get All Categories
- **Method:** GET
- **URL:** `https://ecom-backend-hdop.onrender.com/api/v1/category/all`

---








   

    
