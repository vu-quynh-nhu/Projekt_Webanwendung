const passwordInput = document.getElementById("password");
              const lengthReq = document.getElementById("length");
              const uppercaseReq = document.getElementById("uppercase");
              const lowercaseReq = document.getElementById("lowercase");
              const numberReq = document.getElementById("number");
            
              passwordInput.addEventListener("input", () => {
                const password = passwordInput.value;
            
                // Check for minimum length
                if (password.length >= 8) {
                  lengthReq.classList.remove("invalid");
                  lengthReq.classList.add("valid");
                  lengthReq.style.color = "green";
                } else {
                  lengthReq.classList.remove("valid");
                  lengthReq.classList.add("invalid");
                  lengthReq.style.color = "gray";
                }
            
                // Check for uppercase letters
                if (/[A-Z]/.test(password)) {
                  uppercaseReq.classList.remove("invalid");
                  uppercaseReq.classList.add("valid");
                  uppercaseReq.style.color = "green";
                } else {
                  uppercaseReq.classList.remove("valid");
                  uppercaseReq.classList.add("invalid");
                  uppercaseReq.style.color = "gray";
                }
            
                // Check for lowercase letters
                if (/[a-z]/.test(password)) {
                  lowercaseReq.classList.remove("invalid");
                  lowercaseReq.classList.add("valid");
                  lowercaseReq.style.color = "green";
                } else {
                  lowercaseReq.classList.remove("valid");
                  lowercaseReq.classList.add("invalid");
                  lowercaseReq.style.color = "gray";
                }
            
                // Check for numbers
                if (/\d/.test(password)) {
                  numberReq.classList.remove("invalid");
                  numberReq.classList.add("valid");
                  numberReq.style.color = "green";
                } else {
                  numberReq.classList.remove("valid");
                  numberReq.classList.add("invalid");
                  numberReq.style.color = "gray";
                }
              });

fetch("../php/navigationbar.php").then(response => response.text()).then(data => {
    document.querySelector(".navbar").innerHTML = data;
    document.querySelector(".navbar").innerHTML = data;
  
    let cssForNavbar = "../css/navbar_style_signUp_login.css";
    console.log("Selected CSS File:", cssForNavbar);
  
    const navigationBarCss = document.createElement("link");
    navigationBarCss.rel = "stylesheet";
    navigationBarCss.href = cssForNavbar;
    document.head.appendChild(navigationBarCss);
})