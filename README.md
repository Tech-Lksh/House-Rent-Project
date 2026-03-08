# 🏠 Real Estate Property Booking Web Application

## 📌 Description

This is a **Full Stack Real Estate Web Application** where **property owners can list their properties** and **users can browse and book them online**.

The platform provides **separate dashboards for Admin, Property Owners, and Users**:

* **Property Owners** can add, edit, and manage their properties.
* **Users** can explore available listings and book properties easily.
* The **Admin Panel** allows administrators to manage the entire platform, including granting or revoking owner permissions.

Admins can also monitor **all users, properties, and bookings** to ensure smooth platform management.

---

## ✨ Features

* 🏡 Owners can add new properties
* ✏️ Owners can edit property details
* ❌ Owners can delete properties
* 📋 Users can browse available properties
* 📅 Property booking system
* 🔐 Authentication and authorization
* 📊 Property availability status
* 📱 Fully responsive UI

---

## 🛠 Tech Stack

### ➤ Frontend

* React.js
* Tailwind CSS
* Material.io
* Axios

### ➤ Backend

* Node.js
* Express.js

### ➤ Database

* MongoDB
* Mongoose

---

## ⚙ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Tech-Lksh/House-Rent-Project.git
```

### 2️⃣ Navigate into the project folder

```bash
cd House-Rent-Project
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the project

```bash
npm run dev
```



## 📁 Project Structure

### 📁 Frontend Folder Structure

```
Frontend
│
├── public
│
├── src
│   ├── images
│   │
│   ├── modules
│   │   ├── admin
│   │   │   ├── AdminHome.jsx
│   │   │   ├── AllBookings.jsx
│   │   │   ├── AllProperty.jsx
│   │   │   └── AllUsers.jsx
│   │   │
│   │   ├── common
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── owner
│   │   │   ├── AddProperty.jsx
│   │   │   ├── AllBookings.jsx
│   │   │   ├── AllProperties.jsx
│   │   │   └── OwnerHome.jsx
│   │   │
│   │   └── renter
│   │       ├── AllProperties.jsx
│   │       ├── RenterHome.jsx
│   │       └── AllPropertiesCards.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── api.js
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package-lock.json
├── package.json
└── .gitignore
```

---

### 📁 Backend Folder Structure

```
Backend
│
├── config
│   └── connect.js
│
├── controllers
│   ├── adminController.js
│   ├── ownerController.js
│   └── userController.js
│
├── middlewares
│   └── authMiddleware.js
│
├── models
│   ├── BookingSchema.js
│   ├── PropertySchema.js
│   └── UserSchema.js
│
├── routes
│   ├── adminRoutes.js
│   ├── ownerRoutes.js
│   └── userRoutes.js
│
├── uploads
│
├── node_modules
├── .env.example
├── index.js
├── package-lock.json
└── package.json
```



## 📷 Screenshots

### 🏠 Landing Page

<p align="center">
<img src="https://github.com/user-attachments/assets/4475381a-e5e7-480b-ba3e-151afbec6429" width="800"/>
</p>

<p align="center">
<img src="https://github.com/user-attachments/assets/c875a664-97db-4c24-a112-80ebd233ec4b" width="800"/>
</p>

---

### 📝 Register Page

<p align="center">
<img src="https://github.com/user-attachments/assets/e6fe6ade-374f-4a80-ba3c-dcfdd65e404e" width="800"/>
</p>

---

### 🔐 Login Page

<p align="center">
<img src="https://github.com/user-attachments/assets/c53de880-75b7-478d-ab1f-3a566df373e9" width="800"/>
</p>

---

### 🏡 Owner Dashboard

<p align="center">
<img src="https://github.com/user-attachments/assets/75d7a22e-e34f-4865-9f36-dc794f0069f1" width="800"/>
</p>

---

### 📋 Owner Properties Page

<p align="center">
<img src="https://github.com/user-attachments/assets/d854791e-a372-419a-b3ab-a2998aafa052" width="800"/>
</p>

---

### 📅 Owner Bookings Page

<p align="center">
<img src="https://github.com/user-attachments/assets/8ca6020b-3f86-4498-ad97-b3cfe22b744b" width="800"/>
</p>

---

### 🛠 Admin Dashboard

<p align="center">
<img src="https://github.com/user-attachments/assets/06385f98-95a0-44ad-a3af-85ecb848ae08" width="800"/>
</p>

---

### 🏢 Admin Properties Page

<p align="center">
<img src="https://github.com/user-attachments/assets/e319bd97-8ae3-4f63-a6f9-4d1a8c9384a4" width="800"/>
</p>

---

### 📊 Admin Bookings Page

<p align="center">
<img src="https://github.com/user-attachments/assets/cb15d92b-8389-4b16-a655-95b51a271ba2" width="800"/>
</p>

---

### 👤 Renter Home

<p align="center">
<img src="https://github.com/user-attachments/assets/b6037d0b-a831-42f9-bb03-719e5ecc9fac" width="800"/>
</p>

---

### 📜 Renter Booking History

<p align="center">
<img src="https://github.com/user-attachments/assets/f7330526-4d3f-4d2a-87ce-df1fec7a29fb" width="800"/>
</p>



## 🔗 API Endpoints

```text id="g3y7n4"
API Endpoints
│
├── Admin APIs
│   ├── GET    /api/admin/get-all-users
│   ├── PUT    /api/admin/handle-status
│   ├── GET    /api/admin/get-all-properties
│   └── GET    /api/admin/get-all-bookings
│
├── Owner APIs
│   ├── POST   /api/owner/post-property
│   ├── GET    /api/owner/get-all-properties
│   ├── GET    /api/owner/get-all-bookings
│   ├── PATCH  /api/owner/update-property/:propertyid
│   ├── DELETE /api/owner/delete-property/:propertyid
│   └── PATCH  /api/owner/handle-booking-status
│
└── User APIs
    ├── POST   /api/user/register
    ├── POST   /api/user/login
    ├── POST   /api/user/forgot-password
    ├── GET    /api/user/get-all-properties
    ├── POST   /api/user/get-user-data
    ├── POST   /api/user/booking-handle/:propertyid
    └── GET    /api/user/get-all-bookings
```




## 🚀 Future Improvements

* 💳 **Payment Gateway Integration**
* ⭐ **Property Reviews & Ratings**
* 🗺 **Google Maps Location Integration**
* 🖼 **Property Image Gallery**
* 📧 **Email Notifications**

---

## 👨‍💻 Team

### 👑 Team Leader

**Lokesh Pardhi**

* GitHub: https://github.com/Tech-Lksh
* LinkedIn: https://www.linkedin.com/in/lokesh-pardhi-2200fgh/

---

### 👨‍💻 Team Members

**Mahi Sharma**

* GitHub: https://github.com/Mahi956
* LinkedIn: https://www.linkedin.com/in/mahi-sharma-0049b836a/

**Lucky Yadav**

* GitHub: https://github.com/Lucky2336
* LinkedIn: https://www.linkedin.com/in/lucky-yadav-4679bb28b/

**Mansi Patel**

* GitHub: https://github.com/MansiPatel2604
* LinkedIn: https://www.linkedin.com/in/mansi-patel-b59a26310/


