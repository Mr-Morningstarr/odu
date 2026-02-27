
// Step 1: Wait for the HTML to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // --- PART A: COURSE REGISTRATION LOGIC ---
  
  // Step 2: Select all checkboxes and the unit display span
  const checkboxes = document.querySelectorAll('.course-checkbox');
  const unitDisplay = document.getElementById('unit-count');
  const msgBox = document.getElementById('msg-box');
  const MAX_UNITS = 18; // The university limit

  // Only run if we are on the registration page
  if (checkboxes.length > 0) {
    // Step 3: Define the calculation function
    const calculateTotal = (event) => {
      let total = 0;

      // FIX: Clear the message every time a box is clicked
      if (msgBox) {
        msgBox.textContent = '';
      }
      
      checkboxes.forEach(cb => {
        // Step 4: If box is checked, add its data-unit value to total
        if (cb.checked) {
          total += parseInt(cb.dataset.unit);
        }
      });

      // Step 5: Check if the new total exceeds the limit
      if (total > MAX_UNITS) {
        if (msgBox){
          msgBox.textContent = '⚠️ Maximum unit limit reached! You cannot exceed ' + MAX_UNITS + ' units.';
        }
        
        // Step 6: Prevent the checkbox from being checked
        if (event) {
          event.target.checked = false;
        }
        
        // Step 7: Recalculate the correct total after unchecking
        total = 0;
        checkboxes.forEach(cb => {
          if (cb.checked) {
            total += parseInt(cb.dataset.unit);
          }
        });
      }

      // Step 8: Update the display on the page
      if (unitDisplay) {
        unitDisplay.textContent = total;
      }
    };

    // Step 9: Attach the function to every checkbox
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', calculateTotal);
    });
  }

  // --- PART B: LOGIN & PASSWORD LOGIC ---

  // 1. SHOW/HIDE PASSWORD LOGIC
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.getElementById('toggle-password');

  if (toggleIcon && passwordInput) {
    toggleIcon.addEventListener('click', () => {
      // Toggle between 'password' (dots) and 'text' (visible)
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      
      // Change the icon and hover text
      toggleIcon.textContent = isPassword ? '🔒' : '👁️';
      toggleIcon.title = isPassword ? 'Hide Password' : 'Show Password';
    });
  }

  
  // 2. SIMPLE LOGIN LOGIC
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const studentId = document.getElementById('student-id').value;
      const plainPassword = passwordInput.value;

      // Simple comparison
      if (studentId === "ODU/2026/001" && plainPassword === "password123") {
        window.open("dashboard.html", "_blank");
      } else {
        alert("Invalid Student ID or Password!");
      }
    });
  }
});
