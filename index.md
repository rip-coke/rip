---
layout: default
pagination:
  enabled: true
---

{% assign notices = site.notices | sort_natural | reverse %}
{% for notice in paginator.posts %}
  <article class="flex flex-col items-start justify-between pt-3 break-after-column">
    <a href="{{ notice.url }}">
      <div class="relative w-full">
          <img src="{{notice.pic}}" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
          <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
      </div>
      <div class="max-w-xl mt-8 px-4">
        <span>{{notice.name}}</span>
        <div class="flex mt-5 items-center gap-x-4 text-s">
          <div class="flex-auto">
            <time datetime="2020-03" class="text-gray-500">{{notice.dob | date: "%d %b %y"}}</time>
            -
            <time datetime="2020-03" class="text-gray-500">{{notice.dod | date: "%d %b %y"}}</time>
          </div>
          <span class="flex-auto">{{notice.county}}</span>
        </div>
        <!-- <div class="group relative">
          <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ notice.content }}
          </p>
        </div> -->
      </div>
    </a>
  </article>
{% endfor %}

