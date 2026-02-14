// =====================
// LOGIN FUNCTION
// =====================
function login() {
  const username = document.getElementById("username").value;

  if (!username) {
    alert("Username required");
    return;
  }

  // JWT HEADER (INSECURE - DEMO)
  const header = btoa(JSON.stringify({
    alg: "none",
    typ: "JWT"
  }));

  // JWT PAYLOAD
  const payload = btoa(JSON.stringify({
    user: username,
    role: "user"
  }));

  // JWT TOKEN (NO SIGNATURE ❌)
  const token = `${header}.${payload}.`;

  // Store token insecurely
  localStorage.setItem("token", token);

  // Redirect
  window.location.href = "dashboard.html";
}


// =====================
// DASHBOARD LOGIC
// =====================
document.addEventListener("DOMContentLoaded", () => {

  const token = localStorage.getItem("token");
  if (!token) return;

  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));

  // Show decoded JWT
  const output = document.getElementById("output");
  if (output) {
    output.innerText = JSON.stringify(decoded, null, 2);
  }

  // Role-based message (VULNERABLE)
  const msgBox = document.getElementById("accessMsg");
  if (!msgBox) return;

  if (decoded.role === "admin") {
    msgBox.innerHTML =
      "<div class='admin'>🔥 Admin Access Granted</div>";
  } else {
    msgBox.innerHTML =
      "<div class='user'>User Access Only</div>";
  }
});


// =====================
// LOGOUT
// =====================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
