# -*- coding: utf-8 -*-
import scrapy


class MpApi(scrapy.Spider):
    name = 'mpapi'
    start_urls = ['https://developers.weixin.qq.com/miniprogram/dev/api/']
    # url = start_urls[0]
    def parse(self, response):
        for tr in response.css('tbody tr'):
            next_page = tr.css('a::attr(href)').get()
            next_page = response.urljoin(next_page)
            item = {
                'link': next_page,
                'api': tr.css('a::text').get(),
                'desc': tr.css('td')[1].get().replace('<td>','').replace('</td>', ''),
            }
            if next_page is not None:
                yield scrapy.Request(next_page, meta={'item': item}, callback=self.parse_version)
        
    def parse_version(self, response):
        item = response.meta['item']
        version = response.css('blockquote p');
        if version is not None:
           version = version.re(r'基础库 (\d+.\d+.\d+) 开始支持')
        else:
           version = version.get()

        yield {
            'version': version,
            'link': item['link'],
            'api': item['api'],
            'desc': item['desc'],
        }
