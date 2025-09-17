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
