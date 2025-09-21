// Category filter
const categoryButtons = document.querySelectorAll(".categories button");
const cards = document.querySelectorAll(".card");
const searchInput = document.getElementById("search");

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.textContent;
    cards.forEach(card => {
      if (category === "All Categories" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Search filter
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    if (title.includes(searchText)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Dark mode toggle
const toggleDark = document.getElementById("toggleDark");
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleDark.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

// Cheat sheet content data
const cheatData = {
  "Git Commands Cheat Sheet": `
git init        # Initialize repository
git status      # Check status
git add .       # Stage changes
git commit -m ""# Commit changes
git push        # Push to remote
  `,
  "JavaScript ES6+ Features": `
let x = 10;              // Block scoped variable
const y = 20;            // Constant
[1,2,3].map(n => n*2);   // Arrow function
const {a,b} = obj;       // Destructuring
async function f() {}    // Async/await
  `,
  "CSS Flexbox Guide": `
.container { display: flex; }
.flex { flex: 1; }
.align { align-items: center; }
.justify { justify-content: space-between; }
  `,
  "HTML4 Quick Reference": `
<html>
  <head><title>My Page</title></head>
  <body>
    <h1>Hello HTML4</h1>
    <p>This is legacy markup.</p>
  </body>
</html>
  `,
  "Python Basics Cheat Sheet": `
# Variables
x = 10
# Functions
def add(a,b): return a+b
# Loop
for i in range(5): print(i)
# List comprehension
squares = [x*x for x in range(5)]
  `,
  "C Language Cheat Sheet": `
#include <stdio.h>
int main() {
  printf("Hello C");
  return 0;
}
  `,
  "C++ Reference Guide": `
#include <iostream>
using namespace std;
int main() {
  cout << "Hello C++";
  return 0;
}
  `,
  "Node Package Manager (NPM) Guide": `
npm init       # Initialize project
npm install X  # Install package
npm run build  # Run script
npm update     # Update packages
  `
};

// Modal elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

// Attach click event to all View buttons
document.querySelectorAll(".card-footer button").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".card");
    const title = card.querySelector("h3").textContent;
    modalTitle.textContent = title;
    modalBody.textContent = cheatData[title] || "Cheat sheet not available yet.";
    modal.style.display = "block";
  });
});

// Close modal
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});
