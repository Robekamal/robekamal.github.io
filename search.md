---
layout: default
title: جست‌وجو
permalink: /search/
---

<section class="page-heading">
  <h1>جست‌وجو</h1>
  <p>در نوشته‌های وبلاگ جست‌وجو کنید.</p>
</section>

<section class="search-box">
  <input
    type="search"
    id="search-input"
    placeholder="عبارت مورد نظر را وارد کنید..."
    autocomplete="off"
  >
</section>

<section id="search-results" class="search-results"></section>

<script>
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  fetch("{{ '/search.json' | relative_url }}")
    .then(function (response) {
      return response.json();
    })
    .then(function (posts) {
      searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length < 2) {
          searchResults.innerHTML = "";
          return;
        }

        const filteredPosts = posts.filter(function (post) {
          const searchableText = [
            post.title,
            post.excerpt,
            post.categories.join(" "),
            post.tags.join(" ")
          ].join(" ").toLowerCase();

          return searchableText.includes(query);
        });

        if (filteredPosts.length === 0) {
          searchResults.innerHTML = "<p>نتیجه‌ای پیدا نشد.</p>";
          return;
        }

        searchResults.innerHTML = filteredPosts.map(function (post) {
          return `
            <article class="search-result-card">
              <h2>
                <a href="${post.url}">${post.title}</a>
              </h2>
              <time>${post.date}</time>
              <p>${post.excerpt}</p>
            </article>
          `;
        }).join("");
      });
    });
</script>
