// Global Variables
const blogs = [];
const blogsPerPage = 10;
let currentPage = 1;

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const themeIcon = document.getElementById("themeIcon");

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.textContent = "🌞"; // Sun icon for light theme
  } else {
    themeIcon.textContent = "🌙"; // Moon icon for dark theme
  }
});

// Add Blogs
function addBlog(title, tags, description, imageUrl) {
  blogs.push({ title, tags, description, imageUrl });
  renderBlogs();
}

// Render Blogs
function renderBlogs() {
  const blogSection = document.getElementById("blog-section");
  const pagination = document.getElementById("pagination");
  const start = (currentPage - 1) * blogsPerPage;
  const end = start + blogsPerPage;

  // Clear Current Content
  blogSection.innerHTML = "";
  pagination.innerHTML = "";

  // Render Blogs for Current Page
  blogs.slice(start, end).forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card", "show");
    blogCard.innerHTML = `
      <img src="${blog.imageUrl}" alt="${blog.title}">
      <div class="content">
        <div class="tags">${blog.tags
          .split(",")
          .map((tag) => `<span class="tag">${tag.trim()}</span>`)
          .join("")}</div>
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
        <span class="read-more">Read More</span>
      </div>
    `;
    blogSection.appendChild(blogCard);
  });

  // Render Pagination
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.classList.toggle("active", i === currentPage);
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderBlogs();
    });
    pagination.appendChild(pageButton);
  }

  setupReadMore(); // Call Read More setup after rendering blogs
}

// Create Blog Modal
const modal = document.getElementById("blogModal");
document.getElementById("createBlog").addEventListener("click", () => {
  modal.style.display = "block";
});
document.getElementById("closeModal").addEventListener("click", () => {
  modal.style.display = "none";
});
document.getElementById("saveBlog").addEventListener("click", () => {
  const title = document.getElementById("newTitle").value;
  const tags = document.getElementById("newTags").value;
  //   const description = document.getElementById("newDescription").value;
  const description = document.getElementById("newDescription").innerText; // Or use innerHTML if you want to capture HTML content

  const imageUrl = document.getElementById("newImageUrl").value;
  if (title && tags && description && imageUrl) {
    addBlog(title, tags, description, imageUrl);
    modal.style.display = "none";
  } else {
    alert("Please fill in all fields.");
  }
});

// Search Functionality
document.getElementById("search").addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const filteredBlogs = blogs.filter((blog) =>
    blog.tags.toLowerCase().includes(searchValue)
  );
  renderFilteredBlogs(filteredBlogs);
});

// Function to Render Filtered Blogs
function renderFilteredBlogs(filteredBlogs) {
  const blogSection = document.getElementById("blog-section");
  blogSection.innerHTML = ""; // Clear Current Blogs

  if (filteredBlogs.length === 0) {
    blogSection.innerHTML = "<p>No blogs found for the entered tag.</p>";
    return;
  }

  filteredBlogs.forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card", "show");
    blogCard.innerHTML = `
      <img src="${blog.imageUrl}" alt="${blog.title}">
      <div class="content">
        <div class="tags">${blog.tags
          .split(",")
          .map((tag) => `<span class="tag">${tag.trim()}</span>`)
          .join("")}</div>
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
        <span class="read-more">Read More</span>
      </div>
    `;
    blogSection.appendChild(blogCard);
  });

  setupReadMore(); // Call Read More setup after rendering filtered blogs
}

// Read More Functionality
function setupReadMore() {
  const blogCards = document.querySelectorAll(".blog-card");
  blogCards.forEach((card) => {
    const description = card.querySelector("p");
    const readMoreBtn = card.querySelector(".read-more");

    const fullText = description.textContent;
    if (fullText.length > 50) {
      const shortText = fullText.slice(0, 50) + "...";
      description.textContent = shortText;

      readMoreBtn.style.display = "inline-block"; // Ensure the button is visible
      readMoreBtn.addEventListener("click", () => {
        if (readMoreBtn.textContent === "Read More") {
          description.textContent = fullText;
          readMoreBtn.textContent = "Read Less";
        } else {
          description.textContent = shortText;
          readMoreBtn.textContent = "Read More";
        }
      });
    } else {
      readMoreBtn.style.display = "none"; // Hide button if the description is short
    }
  });
}

// Initialize Sample Blogs
addBlog(
  "Education for Child",
  "student, education",
  "Education empowers individuals through knowledge, skills, and values. It fosters growth, innovation, and equality, shaping a better future.",
  "https://cdn.pixabay.com/photo/2016/11/14/03/16/book-1822474_1280.jpg"
);
addBlog(
  "Importance of sports",
  "sports, fitness",
  "Sports and fitness enhance physical health, boost mental well-being, and promote discipline. Regular activity builds strength, agility, and resilience.",
  "https://cdn.pixabay.com/photo/2014/11/07/00/00/volleyball-520093_960_720.jpg"
);
addBlog(
  "Science",
  "technology, science",
  "Science explores the natural world through observation, experimentation, and analysis. It drives innovation, solves problems, and expands knowledge.",
  "https://cdn.pixabay.com/photo/2024/01/10/16/21/woman-8499939_1280.jpg"
);
addBlog(
  "evoltion of tech",
  "technology, science",
  "Technology transforms lives by improving communication, automating tasks, and driving innovation. It connects people and empowers global progress..",
  "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg"
);
addBlog(
  "Prrogramming for everyone",
  "programming",
  "Programming enables software development by creating code to solve problems. It fosters logical thinking, creativity, and technical skills.",
  "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
);
addBlog(
  "Mern stack development",
  "technology,coding",
  "MERN stack combines MongoDB, Express.js, React, and Node.js for building full-stack web applications, enabling efficient development and performance.",
  "https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_640.jpg"
);
