---
layout: default
title: آرشیو نوشته‌ها
permalink: /archive/
---

<section class="page-heading">
  <h1>آرشیو نوشته‌ها</h1>
  <p>همه مطالب منتشرشده در وبلاگ</p>
</section>

<section class="archive-list">
  {% for post in site.posts %}
    <article class="archive-item">
      <div>
        <h2>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>

        <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
      </div>

      <time>{{ post.date | date: "%Y/%m/%d" }}</time>
    </article>
  {% endfor %}
</section>
