---
layout: default
---
{% for notice in site.notices %}
  <article class="flex flex-col items-start justify-between pt-3">
      <div class="relative w-full">
          <img src="{{notice.pic}}" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
          <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
      </div>
      <div class="max-w-xl">
        <div class="mt-8 flex items-center gap-x-4 text-s">
          <div class="flex-auto">
            <time datetime="2020-03" class="text-gray-500">{{notice.dob}}</time>
            -
            <time datetime="2020-03" class="text-gray-500">{{notice.dod}}</time>
          </div>
          <span class="flex-auto">{{notice.name}}</span>
        </div>
        <div class="group relative">
          <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ notice.content }}
          </p>
        </div>
      </div>
    </article>
{% endfor %}

