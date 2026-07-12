---
layout: default
title: روایت — تجربه‌ها، یادداشت‌ها و آموخته‌ها
description: روایت؛ وبلاگ شخصی درباره تجربه‌ها، یادداشت‌ها، یادگیری و زندگی آگاهانه.
permalink: /
---

{% assign published_posts = site.posts
  | where_exp: "post", "post.published != false"
%}

{% assign hero_post = nil %}

{% for post in published_posts %}
  {% if post.featured == true %}
    {% assign hero_post = post %}
    {% break %}
  {% endif %}
{% endfor %}

{% unless hero_post %}
  {% assign hero_post = published_posts.first %}
{% endunless %}

<main id="home">

  <section class="hero-section" aria-labelledby="heroTitle">
    <div class="container">

      <div class="hero-intro">

        <div>
          <span class="eyebrow">وبلاگی برای ثبت مسیر</span>

          <h1 id="heroTitle">
            هر تجربه،
            <span>روایتی برای آموختن</span>
          </h1>
        </div>

        <p>
          اینجا از تجربه‌های واقعی، آموخته‌های شخصی، مسیر ساختن،
          شکست‌خوردن و دوباره آغازکردن می‌نویسم.
        </p>

      </div>

      <div class="hero-layout">

        <div id="heroPost">

          {% if hero_post %}

            {% assign hero_category = hero_post.category | default: "experience" %}
            {% assign hero_image = hero_post.image
              | default: "/images/post-placeholder.jpg"
            %}

            {% case hero_category %}
              {% when "experience" %}
                {% assign hero_category_label = "تجربه" %}
                {% assign hero_category_class = "category-green" %}
              {% when "notes" %}
                {% assign hero_category_label = "یادداشت" %}
                {% assign hero_category_class = "category-purple" %}
              {% when "tutorial" %}
                {% assign hero_category_label = "آموزش" %}
                {% assign hero_category_class = "category-blue" %}
              {% when "learning" %}
                {% assign hero_category_label = "یادگیری" %}
                {% assign hero_category_class = "category-orange" %}
              {% when "life" %}
                {% assign hero_category_label = "زندگی" %}
                {% assign hero_category_class = "category-green" %}
              {% else %}
                {% assign hero_category_label = "مقاله" %}
                {% assign hero_category_class = "category-green" %}
            {% endcase %}

            <article
              class="hero-card"
              data-article
              data-category="{{ hero_category | escape }}"
              data-searchable="{{ hero_post.title | escape }} {{ hero_post.excerpt | strip_html | escape }} {{ hero_post.tags | join: ' ' | escape }}"
            >
              <a
                class="hero-media"
                href="{{ hero_post.url | relative_url }}"
                aria-label="خواندن مقاله {{ hero_post.title | escape }}"
              >
                <img
                  src="{{ hero_image | relative_url }}"
                  alt="{{ hero_post.title | escape }}"
                  width="1400"
                  height="900"
                  fetchpriority="high"
                >

                <span class="image-badge">روایت ویژه</span>
              </a>

              <div class="hero-content">

                <div class="post-meta">
                  <a
                    class="category {{ hero_category_class }}"
                    href="{{ '/category/' | relative_url }}?name={{ hero_category | url_encode }}"
                  >
                    {{ hero_category_label }}
                  </a>

                  <span>
                    {{ hero_post.reading_time | default: "۵ دقیقه مطالعه" }}
                  </span>
                </div>

                <h2>
                  <a href="{{ hero_post.url | relative_url }}">
                    {{ hero_post.title | default: "بدون عنوان" }}
                  </a>
                </h2>

                {% if hero_post.excerpt %}
                  <p>{{ hero_post.excerpt | strip_html | truncatewords: 32 }}</p>
                {% endif %}

                <div class="author-row">

                  {% if hero_post.author_image %}
                    <img
                      src="{{ hero_post.author_image | relative_url }}"
                      alt="تصویر {{ hero_post.author | default: 'نویسنده روایت' | escape }}"
                      width="100"
                      height="100"
                    >
                  {% else %}
                    <img
                      src="https://i.pravatar.cc/80?img=11"
                      alt="تصویر نویسنده روایت"
                      width="100"
                      height="100"
                    >
                  {% endif %}

                  <div>
                    <strong>
                      {{ hero_post.author | default: "نویسنده روایت" }}
                    </strong>

                    <span>
                      <time datetime="{{ hero_post.date | date_to_xmlschema }}">
                        {% if hero_post.display_date %}
                          {{ hero_post.display_date }}
                        {% else %}
                          {{ hero_post.date | date: "%Y/%m/%d" }}
                        {% endif %}
                      </time>
                    </span>
                  </div>

                </div>

              </div>
            </article>

          {% else %}

            <div class="empty-state">
              <p>هنوز مقاله‌ای منتشر نشده است.</p>
            </div>

          {% endif %}

        </div>

        <div class="hero-side-list" id="heroSidePosts">

          {% assign side_post_count = 0 %}

          {% for post in published_posts %}

            {% if post.url != hero_post.url and side_post_count < 3 %}

              {% assign side_post_count = side_post_count | plus: 1 %}
              {% assign post_category = post.category | default: "experience" %}
              {% assign post_image = post.image
                | default: "/images/post-placeholder.jpg"
              %}

              {% case post_category %}
                {% when "experience" %}
                  {% assign category_label = "تجربه" %}
                  {% assign category_class = "category-green" %}
                {% when "notes" %}
                  {% assign category_label = "یادداشت" %}
                  {% assign category_class = "category-purple" %}
                {% when "tutorial" %}
                  {% assign category_label = "آموزش" %}
                  {% assign category_class = "category-blue" %}
                {% when "learning" %}
                  {% assign category_label = "یادگیری" %}
                  {% assign category_class = "category-orange" %}
                {% when "life" %}
                  {% assign category_label = "زندگی" %}
                  {% assign category_class = "category-green" %}
                {% else %}
                  {% assign category_label = "مقاله" %}
                  {% assign category_class = "category-green" %}
              {% endcase %}

              <article
                class="side-card"
                data-article
                data-category="{{ post_category | escape }}"
                data-searchable="{{ post.title | escape }} {{ post.excerpt | strip_html | escape }} {{ post.tags | join: ' ' | escape }}"
              >
                <a
                  class="side-card-image"
                  href="{{ post.url | relative_url }}"
                >
                  <img
                    src="{{ post_image | relative_url }}"
                    alt="{{ post.title | escape }}"
                    width="900"
                    height="650"
                    loading="lazy"
                  >
                </a>

                <div class="side-card-content">

                  <div class="post-meta">
                    <a
                      class="category {{ category_class }}"
                      href="{{ '/category/' | relative_url }}?name={{ post_category | url_encode }}"
                    >
                      {{ category_label }}
                    </a>

                    <span>
                      {{ post.reading_time | default: "۵ دقیقه" }}
                    </span>
                  </div>

                  <h3>
                    <a href="{{ post.url | relative_url }}">
                      {{ post.title | default: "بدون عنوان" }}
                    </a>
                  </h3>

                  <span class="post-date">
                    <time datetime="{{ post.date | date_to_xmlschema }}">
                      {% if post.display_date %}
                        {{ post.display_date }}
                      {% else %}
                        {{ post.date | date: "%Y/%m/%d" }}
                      {% endif %}
                    </time>
                  </span>

                </div>
              </article>

            {% endif %}

          {% endfor %}

        </div>

      </div>

    </div>
  </section>

  <section
    class="section featured-section"
    id="experiences"
    aria-labelledby="featuredTitle"
  >
    <div class="container">

      <div class="section-heading">

        <div>
          <span class="eyebrow">پیشنهادهای من</span>
          <h2 id="featuredTitle">انتخاب نویسنده</h2>
        </div>

        <a class="text-link" href="#articles">
          مشاهده همه
          <span aria-hidden="true">←</span>
        </a>

      </div>

      <div class="featured-grid" id="featuredPosts">

        {% assign featured_count = 0 %}

        {% for post in published_posts %}

          {% if post.editor_choice == true or post.editorChoice == true or post.featured == true %}

            {% if featured_count < 3 %}

              {% assign featured_count = featured_count | plus: 1 %}
              {% assign post_category = post.category | default: "experience" %}
              {% assign post_image = post.image
                | default: "/images/post-placeholder.jpg"
              %}

              {% case post_category %}
                {% when "experience" %}
                  {% assign category_label = "تجربه" %}
                  {% assign category_class = "category-green" %}
                {% when "notes" %}
                  {% assign category_label = "یادداشت" %}
                  {% assign category_class = "category-purple" %}
                {% when "tutorial" %}
                  {% assign category_label = "آموزش" %}
                  {% assign category_class = "category-blue" %}
                {% when "learning" %}
                  {% assign category_label = "یادگیری" %}
                  {% assign category_class = "category-orange" %}
                {% when "life" %}
                  {% assign category_label = "زندگی" %}
                  {% assign category_class = "category-green" %}
                {% else %}
                  {% assign category_label = "مقاله" %}
                  {% assign category_class = "category-green" %}
              {% endcase %}

              <article
                class="post-card"
                data-article
                data-category="{{ post_category | escape }}"
                data-searchable="{{ post.title | escape }} {{ post.excerpt | strip_html | escape }} {{ post.tags | join: ' ' | escape }}"
              >
                <a
                  class="post-card-image"
                  href="{{ post.url | relative_url }}"
                >
                  <img
                    src="{{ post_image | relative_url }}"
                    alt="{{ post.title | escape }}"
                    width="1000"
                    height="700"
                    loading="lazy"
                  >
                </a>

                <div class="post-card-body">

                  <div class="post-meta">
                    <a
                      class="category {{ category_class }}"
                      href="{{ '/category/' | relative_url }}?name={{ post_category | url_encode }}"
                    >
                      {{ category_label }}
                    </a>

                    <span>
                      {{ post.reading_time | default: "۵ دقیقه مطالعه" }}
                    </span>
                  </div>

                  <h3>
                    <a href="{{ post.url | relative_url }}">
                      {{ post.title | default: "بدون عنوان" }}
                    </a>
                  </h3>

                  {% if post.excerpt %}
                    <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
                  {% endif %}

                  <div class="post-card-footer">

                    <div class="mini-author">

                      {% if post.author_image %}
                        <img
                          src="{{ post.author_image | relative_url }}"
                          alt=""
                          width="80"
                          height="80"
                          loading="lazy"
                        >
                      {% else %}
                        <img
                          src="https://i.pravatar.cc/80?img=11"
                          alt=""
                          width="80"
                          height="80"
                          loading="lazy"
                        >
                      {% endif %}

                      <span>
                        {{ post.author | default: "نویسنده روایت" }}
                      </span>
                    </div>

                    <time datetime="{{ post.date | date_to_xmlschema }}">
                      {% if post.display_date %}
                        {{ post.display_date }}
                      {% else %}
                        {{ post.date | date: "%Y/%m/%d" }}
                      {% endif %}
                    </time>

                  </div>

                </div>
              </article>

            {% endif %}

          {% endif %}

        {% endfor %}

        {% if featured_count == 0 %}

          {% for post in published_posts limit: 3 %}

            {% assign post_category = post.category | default: "experience" %}
            {% assign post_image = post.image
              | default: "/images/post-placeholder.jpg"
            %}

            {% case post_category %}
              {% when "experience" %}
                {% assign category_label = "تجربه" %}
                {% assign category_class = "category-green" %}
              {% when "notes" %}
                {% assign category_label = "یادداشت" %}
                {% assign category_class = "category-purple" %}
              {% when "tutorial" %}
                {% assign category_label = "آموزش" %}
                {% assign category_class = "category-blue" %}
              {% when "learning" %}
                {% assign category_label = "یادگیری" %}
                {% assign category_class = "category-orange" %}
              {% when "life" %}
                {% assign category_label = "زندگی" %}
                {% assign category_class = "category-green" %}
              {% else %}
                {% assign category_label = "مقاله" %}
                {% assign category_class = "category-green" %}
            {% endcase %}

            <article
              class="post-card"
              data-article
              data-category="{{ post_category | escape }}"
              data-searchable="{{ post.title | escape }} {{ post.excerpt | strip_html | escape }} {{ post.tags | join: ' ' | escape }}"
            >
              <a
                class="post-card-image"
                href="{{ post.url | relative_url }}"
              >
                <img
                  src="{{ post_image | relative_url }}"
                  alt="{{ post.title | escape }}"
                  width="1000"
                  height="700"
                  loading="lazy"
                >
              </a>

              <div class="post-card-body">

                <div class="post-meta">
                  <a
                    class="category {{ category_class }}"
                    href="{{ '/category/' | relative_url }}?name={{ post_category | url_encode }}"
                  >
                    {{ category_label }}
                  </a>

                  <span>
                    {{ post.reading_time | default: "۵ دقیقه مطالعه" }}
                  </span>
                </div>

                <h3>
                  <a href="{{ post.url | relative_url }}">
                    {{ post.title | default: "بدون عنوان" }}
                  </a>
                </h3>

                {% if post.excerpt %}
                  <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
                {% endif %}

                <div class="post-card-footer">

                  <div class="mini-author">
                    {% if post.author_image %}
                      <img
                        src="{{ post.author_image | relative_url }}"
                        alt=""
                        width="80"
                        height="80"
                        loading="lazy"
                      >
                    {% else %}
                      <img
                        src="https://i.pravatar.cc/80?img=11"
                        alt=""
                        width="80"
                        height="80"
                        loading="lazy"
                      >
                    {% endif %}

                    <span>
                      {{ post.author | default: "نویسنده روایت" }}
                    </span>
                  </div>

                  <time datetime="{{ post.date | date_to_xmlschema }}">
                    {% if post.display_date %}
                      {{ post.display_date }}
                    {% else %}
                      {{ post.date | date: "%Y/%m/%d" }}
                    {% endif %}
                  </time>

                </div>

              </div>
            </article>

          {% endfor %}

        {% endif %}

      </div>

    </div>
  </section>

  <section class="quote-section" aria-label="نقل‌قول منتخب">
    <div class="container">

      <figure class="quote-card">

        <div class="quote-avatar">
          <img
            src="https://i.pravatar.cc/160?img=11"
            alt="تصویر نویسنده روایت"
            width="160"
            height="160"
            loading="lazy"
          >
        </div>

        <div class="quote-content">

          <span class="quote-mark" aria-hidden="true">“</span>

          <blockquote>
            <p>
              نوشتن برای من راهی است برای اینکه تجربه‌های پراکنده
              را به معنایی روشن‌تر تبدیل کنم.
            </p>
          </blockquote>

          <figcaption class="quote-author">
            <strong>نویسنده روایت</strong>
            <span>پژوهشگر، نویسنده و یادگیرنده همیشگی</span>
          </figcaption>

        </div>

      </figure>

    </div>
  </section>

  <section
  class="journal-section"
  id="articles"
  aria-labelledby="articlesTitle"
>
  <div class="container">

    <header class="journal-header reveal-item">

      <div class="journal-heading">

        <span class="journal-kicker">
          <span class="journal-kicker-line"></span>
          تازه منتشر شده
        </span>

        <h2 id="articlesTitle">
          آخرین
          <span>روایت‌ها</span>
        </h2>

        <p>
          تازه‌ترین تجربه‌ها، یادداشت‌ها و آموخته‌هایی که
          در مسیر زندگی و یادگیری ثبت کرده‌ام.
        </p>

      </div>

      <div
        class="journal-filters"
        id="articleFilters"
        aria-label="فیلتر نوشته‌ها"
      >
        <button
          class="journal-filter is-active"
          type="button"
          data-filter="all"
          aria-pressed="true"
        >
          همه
        </button>

        <button
          class="journal-filter"
          type="button"
          data-filter="experience"
          aria-pressed="false"
        >
          تجربه‌ها
        </button>

        <button
          class="journal-filter"
          type="button"
          data-filter="notes"
          aria-pressed="false"
        >
          یادداشت‌ها
        </button>

        <button
          class="journal-filter"
          type="button"
          data-filter="tutorial"
          aria-pressed="false"
        >
          آموزش‌ها
        </button>

        <button
          class="journal-filter"
          type="button"
          data-filter="learning"
          aria-pressed="false"
        >
          یادگیری
        </button>

        <button
          class="journal-filter"
          type="button"
          data-filter="life"
          aria-pressed="false"
        >
          زندگی
        </button>
      </div>

    </header>

    {% if published_posts.size > 0 %}

      <div
        class="journal-grid"
        id="articleList"
        aria-live="polite"
      >

        {% for post in published_posts %}

          {% assign post_category = post.category | default: "experience" %}

          {% assign post_image = post.image
            | default: "/images/post-placeholder.jpg"
          %}

          {% case post_category %}
            {% when "experience" %}
              {% assign category_label = "تجربه" %}
              {% assign category_class = "journal-category-green" %}

            {% when "notes" %}
              {% assign category_label = "یادداشت" %}
              {% assign category_class = "journal-category-purple" %}

            {% when "tutorial" %}
              {% assign category_label = "آموزش" %}
              {% assign category_class = "journal-category-blue" %}

            {% when "learning" %}
              {% assign category_label = "یادگیری" %}
              {% assign category_class = "journal-category-orange" %}

            {% when "life" %}
              {% assign category_label = "زندگی" %}
              {% assign category_class = "journal-category-green" %}

            {% else %}
              {% assign category_label = "مقاله" %}
              {% assign category_class = "journal-category-green" %}
          {% endcase %}

          <article
            class="journal-card{% if forloop.first %} journal-card-featured{% endif %}"
            data-journal-card
            data-article
            data-category="{{ post_category | escape }}"
            data-original-index="{{ forloop.index0 }}"
            data-searchable="{{ post.title | escape }} {{ post.excerpt | strip_html | escape }} {{ post.tags | join: ' ' | escape }}"
            {% if forloop.index > 7 %}hidden{% endif %}
          >

            <div class="journal-card-inner">

              <a
                class="journal-card-media"
                href="{{ post.url | relative_url }}"
                aria-label="خواندن مطلب {{ post.title | escape }}"
                tabindex="-1"
              >
                <img
                  src="{{ post_image | relative_url }}"
                  alt="{{ post.title | escape }}"
                  {% if forloop.first %}
                    width="1400"
                    height="900"
                    loading="eager"
                  {% else %}
                    width="1000"
                    height="700"
                    loading="lazy"
                  {% endif %}
                >

                <span class="journal-image-overlay"></span>

                {% if forloop.first %}
                  <span class="journal-featured-label">
                    جدیدترین روایت
                  </span>
                {% endif %}

                <span
                  class="journal-card-arrow"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                  >
                    <path
                      d="M19 12H5M11 18L5 12L11 6"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </a>

              <div class="journal-card-content">

                <div class="journal-card-meta">

                  <a
                    class="journal-category {{ category_class }}"
                    href="{{ '/category/' | relative_url }}?name={{ post_category | url_encode }}"
                  >
                    {{ category_label }}
                  </a>

                  <span class="journal-reading-time">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="8.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                      <path
                        d="M12 7.5V12L15 14"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>

                    {{ post.reading_time | default: "۵ دقیقه مطالعه" }}
                  </span>

                </div>

                <h3>
                  <a href="{{ post.url | relative_url }}">
                    {{ post.title | default: "بدون عنوان" }}
                  </a>
                </h3>

                {% if post.excerpt %}
                  <p class="journal-card-excerpt">
                    {% if forloop.first %}
                      {{ post.excerpt | strip_html | truncatewords: 38 }}
                    {% else %}
                      {{ post.excerpt | strip_html | truncatewords: 24 }}
                    {% endif %}
                  </p>
                {% endif %}

                <footer class="journal-card-footer">

                  <div class="journal-author">

                    {% if post.author_image %}
                      <img
                        src="{{ post.author_image | relative_url }}"
                        alt=""
                        width="72"
                        height="72"
                        loading="lazy"
                      >
                    {% else %}
                      <img
                        src="https://i.pravatar.cc/80?img=11"
                        alt=""
                        width="72"
                        height="72"
                        loading="lazy"
                      >
                    {% endif %}

                    <div>
                      <strong>
                        {{ post.author | default: "نویسنده روایت" }}
                      </strong>

                      <time datetime="{{ post.date | date_to_xmlschema }}">
                        {% if post.display_date %}
                          {{ post.display_date }}
                        {% else %}
                          {{ post.date | date: "%Y/%m/%d" }}
                        {% endif %}
                      </time>
                    </div>

                  </div>

                  <a
                    class="journal-read-link"
                    href="{{ post.url | relative_url }}"
                    aria-label="مطالعه {{ post.title | escape }}"
                  >
                    مطالعه
                    <span aria-hidden="true">←</span>
                  </a>

                </footer>

              </div>

            </div>

          </article>

        {% endfor %}

      </div>

      <div
        class="journal-empty"
        id="articlesEmptyState"
        hidden
      >
        <span aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="34"
            height="34"
            fill="none"
          >
            <circle
              cx="11"
              cy="11"
              r="6.5"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M16 16L20 20"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </span>

        <h3>مطلبی پیدا نشد</h3>

        <p>
          هنوز مطلبی در این دسته منتشر نشده است.
        </p>
      </div>

      {% if published_posts.size > 7 %}

        <div class="journal-load-more-wrapper">

          <button
            class="journal-load-more"
            id="loadMoreButton"
            type="button"
            aria-controls="articleList"
          >
            <span>نمایش روایت‌های بیشتر</span>

            <svg
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

        </div>

      {% endif %}

    {% else %}

      <div class="journal-empty">

        <h3>هنوز روایتی منتشر نشده است</h3>

        <p>
          اولین نوشته به‌زودی در این قسمت قرار می‌گیرد.
        </p>

      </div>

    {% endif %}

  </div>
</section>


</main>
