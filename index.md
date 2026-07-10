---
layout: default
title: خانه
description: "آخرین یادداشت‌ها، پژوهش‌ها و نوشته‌های وبلاگ"
---

{% assign featured_post = site.posts | first %}

<section class="hero">
  <div class="hero-decoration hero-decoration-one"></div>
  <div class="hero-decoration hero-decoration-two"></div>

  <div class="hero-content">
    <div class="eyebrow">
      <span class="eyebrow-dot"></span>
      وبلاگ شخصی
    </div>

    <h1>
      جایی برای
      <span class="gradient-text">اندیشه‌ها، تجربه‌ها</span>
      و چیزهایی که می‌آموزم
    </h1>

    <p class="hero-text">
      اینجا دربارهٔ یادداشت‌ها، تجربه‌ها، پژوهش‌ها و موضوعاتی
      که برایم جذاب‌اند می‌نویسم؛ ساده، دقیق و بدون حاشیه.
    </p>

    <div class="hero-actions">
      <a class="btn primary" href="{{ '/archive/' | relative_url }}">
        مشاهدهٔ نوشته‌ها
        <span aria-hidden="true">←</span>
      </a>

      <a class="btn secondary" href="{{ '/about/' | relative_url }}">
        دربارهٔ من
      </a>
    </div>

    <div class="hero-stats">
      <div>
        <strong>{{ site.posts | size }}</strong>
        <span>نوشته</span>
      </div>

      <span class="stat-divider"></span>

      <div>
        <strong>{{ site.categories | size }}</strong>
        <span>موضوع</span>
      </div>

      <span class="stat-divider"></span>

      <div>
        <strong>{{ site.tags | size }}</strong>
        <span>برچسب</span>
      </div>
    </div>
  </div>

  <div class="hero-visual" aria-hidden="true">
    <div class="floating-card floating-card-main">
      <span class="visual-label">یادداشت تازه</span>
      <span class="visual-line visual-line-long"></span>
      <span class="visual-line"></span>
      <span class="visual-line visual-line-short"></span>

      <div class="visual-footer">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="floating-card floating-card-small">
      <span>✦</span>
      <strong>ایده‌ها</strong>
    </div>

    <div class="floating-dot dot-one"></div>
    <div class="floating-dot dot-two"></div>
  </div>
</section>

{% if featured_post %}
  <section class="section featured-section">
    <div class="section-heading">
      <div>
        <span class="section-kicker">پیشنهاد سردبیر</span>
        <h2>تازه‌ترین نوشته</h2>
      </div>

      <a class="section-link" href="{{ '/archive/' | relative_url }}">
        مشاهدهٔ همه
        <span aria-hidden="true">←</span>
      </a>
    </div>

    <article class="featured-post">
      <a
        class="featured-image"
        href="{{ featured_post.url | relative_url }}"
        aria-label="{{ featured_post.title }}"
      >
        {% if featured_post.image %}
          <img
            src="{{ featured_post.image | relative_url }}"
            alt="{{ featured_post.image_alt | default: featured_post.title | escape }}"
            loading="eager"
          >
        {% else %}
          <div class="image-placeholder">
            <span>ن</span>
          </div>
        {% endif %}
      </a>

      <div class="featured-content">
        <div class="post-card-meta">
          <time datetime="{{ featured_post.date | date_to_xmlschema }}">
            {{ featured_post.date | date: "%Y/%m/%d" }}
          </time>

          {% assign featured_words = featured_post.content | strip_html | number_of_words %}
          {% assign featured_reading_time = featured_words | divided_by: 180 | plus: 1 %}

          <span>{{ featured_reading_time }} دقیقه مطالعه</span>
        </div>

        <h3>
          <a href="{{ featured_post.url | relative_url }}">
            {{ featured_post.title }}
          </a>
        </h3>

        <p>
          {{ featured_post.description
             | default: featured_post.excerpt
             | strip_html
             | strip_newlines
             | truncate: 190 }}
        </p>

        <a
          class="read-more"
          href="{{ featured_post.url | relative_url }}"
        >
          خواندن نوشته
          <span aria-hidden="true">←</span>
        </a>
      </div>
    </article>
  </section>
{% endif %}

<section class="section">
  <div class="section-heading">
    <div>
      <span class="section-kicker">منتشرشده‌های اخیر</span>
      <h2>آخرین نوشته‌ها</h2>
    </div>

    <p>تازه‌ترین مطالب منتشرشده در وبلاگ</p>
  </div>

  {% if site.posts.size > 1 %}
    <div class="post-grid">
      {% for post in site.posts offset:1 limit:6 %}
        <article class="post-card">
          <a
            class="post-card-image"
            href="{{ post.url | relative_url }}"
            aria-label="{{ post.title }}"
          >
            {% if post.image %}
              <img
                src="{{ post.image | relative_url }}"
                alt="{{ post.image_alt | default: post.title | escape }}"
                loading="lazy"
              >
            {% else %}
              <div class="image-placeholder">
                <span>{{ forloop.index | plus: 1 }}</span>
              </div>
            {% endif %}
          </a>

          <div class="post-card-body">
            <div class="post-card-meta">
              <time datetime="{{ post.date | date_to_xmlschema }}">
                {{ post.date | date: "%Y/%m/%d" }}
              </time>

              {% assign words = post.content | strip_html | number_of_words %}
              {% assign reading_time = words | divided_by: 180 | plus: 1 %}

              <span>{{ reading_time }} دقیقه مطالعه</span>
            </div>

            <h3>
              <a href="{{ post.url | relative_url }}">
                {{ post.title }}
              </a>
            </h3>

            <p>
              {{ post.description
                 | default: post.excerpt
                 | strip_html
                 | strip_newlines
                 | truncate: 130 }}
            </p>

            <a class="read-more" href="{{ post.url | relative_url }}">
              ادامهٔ مطلب
              <span aria-hidden="true">←</span>
            </a>
          </div>
        </article>
      {% endfor %}
    </div>
  {% elsif site.posts.size == 1 %}
    <div class="empty-state">
      <span>✍️</span>
      <h3>نوشته‌های بیشتری در راه‌اند</h3>
      <p>اولین نوشته منتشر شده و به‌زودی مطالب تازه‌ای اضافه می‌شود.</p>
    </div>
  {% else %}
    <div class="empty-state">
      <span>✍️</span>
      <h3>هنوز نوشته‌ای منتشر نشده است</h3>
      <p>پس از انتشار اولین نوشته، این قسمت به‌صورت خودکار تکمیل می‌شود.</p>
    </div>
  {% endif %}
</section>

<section class="newsletter">
  <div>
    <span class="section-kicker">همراه وبلاگ بمانید</span>
    <h2>نوشته‌های تازه را از دست ندهید</h2>
    <p>
      برای پیدا کردن مطالب موردنظرتان می‌توانید از آرشیو،
      موضوعات یا جست‌وجوی وبلاگ استفاده کنید.
    </p>
  </div>

  <div class="newsletter-actions">
    <a class="btn primary" href="{{ '/categories/' | relative_url }}">
      مشاهدهٔ موضوعات
    </a>

    <a class="btn secondary" href="{{ '/search/' | relative_url }}">
      جست‌وجو در وبلاگ
    </a>
  </div>
</section>
