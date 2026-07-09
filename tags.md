---
layout: default
title: برچسب‌ها
permalink: /tags/
---

<section class="page-heading">
  <h1>برچسب‌ها</h1>
  <p>نوشته‌ها بر اساس برچسب‌های موضوعی</p>
</section>

<section class="tag-list">
  {% assign tags = site.tags | sort %}

  {% for tag in tags %}
    {% assign tag_name = tag[0] %}
    {% assign posts = tag[1] %}

    <div class="tag-block">
      <h2>#{{ tag_name }}</h2>

      <ul>
        {% for post in posts %}
          <li>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            <time>{{ post.date | date: "%Y/%m/%d" }}</time>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</section>
