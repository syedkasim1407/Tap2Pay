import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Your Firebase configuration (with Realtime Database URL from your screenshot)
const firebaseConfig = {
  apiKey: "AIzaSyDgfyHrLZQyBkPSazMzQQKtWVB6Bt2R5-I",
  authDomain: "tap2play-24830.firebaseapp.com",
  databaseURL: "https://tap2play-24830-default-rtdb.firebaseio.com", // Critical!
  projectId: "tap2play-24830",
  storageBucket: "tap2play-24830.appspot.com",
  messagingSenderId: "812149154502",
  appId: "1:812149154502:web:605a8e8369c8d33bbfadc7",
  measurementId: "G-TRE673XTTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Form submission handler
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const vehicleNo = document.getElementById('vehicleNo').value.trim();
  const phoneNo = document.getElementById('phoneNo').value.trim();

  // Basic validation
  if (!name || !vehicleNo || !phoneNo) {
    alert("Please fill all fields!");
    return;
  }

  try {
    // Create a new database reference and push data
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);
    
    await set(newUserRef, {
      name: name,
      vehicleNo: vehicleNo,
      phoneNo: phoneNo,
      timestamp: new Date().toISOString()
    });

    // Show success UX
    document.getElementById('successMessage').classList.remove('d-none');
    document.getElementById('userForm').reset();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      document.getElementById('successMessage').classList.add('d-none');
    }, 3000);

    console.log("Data saved successfully:", { name, vehicleNo, phoneNo });
  } catch (error) {
    console.error("Firebase save error:", error);
    alert("Failed to save. Check console for details.");
  }
});

// Optional: Log Firebase initialization status
console.log("Firebase initialized successfully");