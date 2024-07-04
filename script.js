const apikey = "e4aac77eec004e36b2d4a5530be4621e";
const blogContainer = document.getElementById("blog-container");
const SearchField = document.getElementById("search-input");
const SearchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

SearchButton.addEventListener("click", async () => {
  const query = SearchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.error("Error fetching news by query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

// Rest of your logic
function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage || "/404.jpg"; // Use a fallback image if urlToImage is null
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;

    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDes =
      article.description.length > 120
        ? article.description.slice(0, 120) + "..."
        : article.description;

    description.textContent = truncatedDes;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
    // Append img, title, and description to blogCard
    // Append blogCard to blogContainer
  });
}

// Call fetchRandomNews and displayBlogs as needed
(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();



