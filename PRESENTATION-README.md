# VRide - Quick Start Guide

## For Your Presentation Tomorrow!

### Prerequisites Checklist:
- ✅ Java 8 or higher installed
- ✅ Node.js and npm installed  
- ⚠️ MySQL running (or we'll use H2 in-memory database)

---

## **QUICK START (2 Simple Steps):**

### Step 1: Start the Backend
**Option A - With MySQL (Recommended if MySQL is running):**
```powershell
cd backend/vride
java -jar target/vride-0.0.1-SNAPSHOT.jar
```

**Option B - With H2 Database (If MySQL issues):**
```powershell
cd backend/vride  
java -jar target/vride-0.0.1-SNAPSHOT.jar --spring.profiles.active=h2
```

✅ **Backend should start on:** http://localhost:8080

---

### Step 2: Start the Frontend (in a NEW terminal)
```powershell
cd frontend/vride
npm start
```

✅ **Frontend should open automatically at:** http://localhost:3000

---

## **Even Easier - Use the Batch Files:**

1. Double-click `start-backend.bat` 
2. Double-click `start-frontend.bat`
3. Wait for both to start
4. Browser should open automatically to http://localhost:3000

---

## **What Was Fixed:**

1. ✅ Removed unused variables in CarpoolController.java
2. ✅ Fixed MySQL connection string with proper settings
3. ✅ Added H2 in-memory database as backup option
4. ✅ Updated database driver from deprecated com.mysql.jdbc.Driver to com.mysql.cj.jdbc.Driver
5. ✅ Frontend dependencies installed and ready
6. ✅ Created easy startup scripts

---

## **Troubleshooting:**

### Backend won't start?
- Make sure port 8080 is not in use
- Try using H2 database: `java -jar target/vride-0.0.1-SNAPSHOT.jar --spring.profiles.active=h2`
- Check if MySQL is running: Open MySQL Workbench or run `mysql --version` in terminal

### Frontend won't start?
- Make sure port 3000 is not in use
- Delete `node_modules` and run `npm install` again if needed
- Check if npm is installed: `npm --version`

---

## **Testing the App:**

1. **Home Page**: http://localhost:3000
2. **Sign Up**: Create a new account  
3. **Login**: Use the account you created
4. **Create Carpool**: Add a new carpool with details
5. **View Carpools**: See available carpools
6. **Backend Health**: http://localhost:8080/carpools (should show JSON)

---

## **For Your Presentation:**

### Demo Flow:
1. Show the home page  
2. Sign up as a new user
3. Create a carpool
4. Show the carpool feed
5. Explain the carpooling system features

### Key Features to Highlight:
- User registration and authentication
- Carpool creation and management
- Search and join existing carpools
- Route sharing for cost savings
- Clean, modern UI with React
- RESTful API with Spring Boot
- MySQL/H2 database integration

---

## **Good Luck with Your Presentation! 🚗💨**

You've got this! The app is ready to run. Just start the backend, then the frontend, and you're good to go!
