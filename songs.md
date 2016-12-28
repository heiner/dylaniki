---
layout: page
title: All Songs
permalink: songs
---

{% for page in site.pages %}
{% for tag in page.tags %}
{% if tag == "Songs" %}
-   [{{ page.title }}]({{ page.url | uri_escape }})
{% endif %}
{% endfor %}
{% endfor %}

* * * * *

[List of songs at bobdylan.com](http://www.bobdylan.com/songs/)
