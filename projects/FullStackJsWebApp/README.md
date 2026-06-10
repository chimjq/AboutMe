# FullStackJsWebApp
A modern, robust full-stack JavaScript web application built with a clear separation of concerns, scalable architecture, and development best practices.

## Features
- **Full-Stack JavaScript:** End-to-end development utilizing a unified ecosystem.
- **RESTful API:** Scalable backend routing and efficient data fetching.
- **Responsive UI:** Clean, intuitive user interface built for both desktop and mobile experiences.
- **Database Integration:** Secure data persistence and optimized query performance.
- **Authentication & Authorization:** Secure user sessions, password hashing, and protected routes.
- **Environment Management:** Centralized configuration for development, staging, and production environments.

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Vue.js
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Package Manager:** npm

## Project Structure
```text
FullStackJsWebApp/
├── appCode/                # Backend application source code
│   ├── config/                 # Database and environment configurations
│   ├── modules/                # Business logic for route handling
│   ├── queries/                # Database schemas and models
│   ├── main.js                 # Server entry point
│   └── package.json            # Project dependencies and scripts
├── modules/                # Frontend application source code
│   ├── public/                 # Static assets (images, icons, etc.)
│   ├── src/                    # main folder for frontend
│   │   ├── api/                    # API related definitions
│   │   │   └── ecommerceApi.js         # logical API endpoints
│   │   ├── components/             # [child frame] modules UI components, style and state management
│   │   ├── App.vue                 # [parent frame] main UI components, style and state management
│   │   ├── main.js                 # App initialization code
│   │   └── style.css               # default stylesheet
│   ├── index.html              # Landing Page
│   └── package.json            # Frontend Project dependencies and scripts
├── README.md               # Project documentation
```

## Application Flow

```text
Vue.js Components
        │
        ▼
ecommerceApi.js
        │
        ▼
Node.js Express Routes
        │
        ▼
Business Logic Modules
        │
        ▼
Database Queries
        │
        ▼
Database
```

## API Endpoints

### Product Management

| Method | Endpoint            | Description                            |
| ------ | ------------------- | -------------------------------------- |
| GET    | `/api/products`     | Retrieve all available products        |
| GET    | `/api/products/:id` | Retrieve product details by product ID |
| POST   | `/api/products`     | Create a new product                   |

### Shopping Cart

| Method | Endpoint        | Description                        |
| ------ | --------------- | ---------------------------------- |
| GET    | `/api/cart`     | Retrieve current user's cart items |
| POST   | `/api/cart`     | Add a product to cart              |
| DELETE | `/api/cart/:id` | Remove an item from cart           |

### Order Processing

| Method | Endpoint               | Description                           |
| ------ | ---------------------- | ------------------------------------- |
| GET    | `/api/orders`          | Retrieve order history                |
| POST   | `/api/orders/checkout` | Create an order and complete checkout |

### User Management

| Method | Endpoint              | Description                                      |
| ------ | --------------------- | ------------------------------------------------ |
| GET    | `/api/users/:email`   | Retrieve user information by email               |
| POST   | `/api/users/register` | Register a new user account                      |
| POST   | `/api/users/login`    | Authenticate user and return login session/token |

### Role Management

| Method | Endpoint     | Description                   |
| ------ | ------------ | ----------------------------- |
| GET    | `/api/roles` | Retrieve available user roles |

## Screenshots

#### Login page
<img width="1918" height="526" alt="image" src="https://github.com/user-attachments/assets/58ec565b-326c-4723-8e01-38674e96796f" />

#### Login Validation - Failed
- Invalid credentials
- Error message shown
<img width="1918" height="497" alt="image" src="https://github.com/user-attachments/assets/4d8aee51-9657-431d-8c92-92fb9781539b" />

#### Login Validation - Success
- User enters correct email and password
- User is redirected home page
<img width="1918" height="531" alt="image" src="https://github.com/user-attachments/assets/341dd002-a76b-44bf-b000-9b3d4ef44c9f" />

### Home page - Customer
- Home page of customer role
<img width="1918" height="1017" alt="image" src="https://github.com/user-attachments/assets/919346e1-2170-4aa0-9eef-1626b527c880" />

### Home page - Admin
- Home page of Admin role
- visible Admin panel button
<img width="1918" height="1017" alt="image" src="https://github.com/user-attachments/assets/fb1f4bba-55b2-4669-87d4-4a398d4e39fb" />

#### Home page - Admin Add product
<img width="1918" height="1020" alt="image" src="https://github.com/user-attachments/assets/8965d525-1ca5-4cb2-a7fa-d9d2229e1e8c" />

#### Home page - Checkout cart
<img width="1918" height="997" alt="image" src="https://github.com/user-attachments/assets/ce99025c-fbfa-470d-a8ed-3656c241d08b" />

### Home page - Historical Order
- Historical Order by the logged in customer
<img width="823" height="197" alt="image" src="https://github.com/user-attachments/assets/da575106-b664-41f3-8d46-2b0c8019ed92" />

## Future Enhancement
- PUT User route: update user details
- PUT Product route: update product details
- PUT Order route: update order status
- API Authorization: ensure all API calls access by authenticated user only
- Sales dashboard


