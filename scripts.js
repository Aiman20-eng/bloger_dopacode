const container = document.getElementById("articles-container");

// عرض المقالات حسب الفئة
function displayArticles(category = "all") {
  container.innerHTML = "";

  // افصل المقال الأول كمقال رئيسي كبير
  let firstArticleShown = false;
  let gridArticles = []; // لتجميع باقي المقالات

  posts.forEach((post, index) => {
    if (category === "all" || post.category === category) {
      if (!firstArticleShown) {
        // المقال الأول بعرض كامل (Main Article)
        const mainArticle = document.createElement('div');
        mainArticle.classList.add('mb-4');

        mainArticle.innerHTML = `
          <div class="card h-100">
            <img src="${post.image}" class="card-img-top" alt="${post.title}" style="object-fit: cover; max-height: 400px;">
            <div class="card-body">
              <div class="small text-muted">${post.date}</div>
              <h2 class="card-title">${post.title}</h2>
              <p class="card-text">${post.content.substring(0, 250)}...</p>
              <a href="article.html?id=${index}" class="btn btn-primary">قراءة المزيد →</a>
            </div>
          </div>
        `;
        container.appendChild(mainArticle);
        firstArticleShown = true;
      } else {
        // باقي المقالات بعرض Grid
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-12', 'col-md-6', 'col-lg-6', 'mb-4');

        colDiv.innerHTML = `
          <div class="card h-100">
            <img src="${post.image}" class="card-img-top" alt="${post.title}" style="object-fit: cover; max-height: 250px;">
            <div class="card-body">
              <div class="small text-muted">${post.date}</div>
              <h2 class="card-title h5">${post.title}</h2>
              <p class="card-text">${post.content.substring(0, 120)}...</p>
              <a href="article.html?id=${index}" class="btn btn-primary">قراءة المزيد →</a>
            </div>
          </div>
        `;
        gridArticles.push(colDiv);
      }
    }
  });

  // لف باقي المقالات داخل row إذا وجدت
  if (gridArticles.length > 0) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    gridArticles.forEach(a => rowDiv.appendChild(a));
    container.appendChild(rowDiv);
  }
}

// عرض كل المقالات عند البداية
displayArticles();

// أحداث الفهرس العلوي
document.querySelectorAll("#category-cards .category-card").forEach(card => {
  card.addEventListener("click", () => {
    const cat = card.getAttribute("data-category");
    displayArticles(cat);
  });
});

// أحداث Sidebar الأقسام
document.querySelectorAll(".category-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const cat = link.getAttribute("data-category");
    displayArticles(cat);
  });
});
