---
layout: default
title: "آرشیو نوشته‌ها"
permalink: /archive/
---

<section class="page-heading">
  <h1>{{ page.title }}</h1>
  <p>همه مطالب منتشرشده در وبلاگ</p>
</section>

<section class="archive-list" aria-label="فهرست نوشته‌ها">
  {% if site.posts.size > 0 %}
    {% for post in site.posts %}
      <article class="archive-item">
        <div class="archive-item__content">
          <h2 class="archive-item__title">
            <a href="{{ post.url | relative_url }}">
              {{ post.title | escape }}
            </a>
          </h2>

          {% if post.excerpt %}
            <p class="archive-item__excerpt">
              {{ post.excerpt | strip_html | normalize_whitespace | truncate: 160 | escape }}
            </p>
          {% endif %}
        </div>

        <time
          class="archive-item__date"
          datetime="{{ post.date | date_to_xmlschema }}"
        >
          {{ post.date | date: "%Y/%m/%d" }}
        </time>
      </article>
    {% endfor %}
  {% else %}
    <p class="archive-list__empty">هنوز نوشته‌ای منتشر نشده است.</p>
  {% endif %}
</section>
