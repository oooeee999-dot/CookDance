import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {serviceCategories,catalogCards,categoryHref,categoryWhatsAppUrl,conceptImageNote} from '../src/data/service-catalog.ts';
import {services,brand,cardDestination,cardRatio,mediaSource,sizeRatios} from '../src/data/creative.ts';

test('all requested service areas exist with unique, independently routable categories',()=>{
  const requested = ['graphics-design','digital-marketing','writing-localization','video-animation','music-audio','programming-tech','ai-services','data-analytics','business-support','strategy-consulting','photography-retouching','finance-bookkeeping','learning-hobbies'];
  const ids = serviceCategories.map(category=>category.id);
  assert.equal(new Set(ids).size,ids.length);
  for(const id of requested) assert.ok(ids.includes(id),`Missing requested category: ${id}`);
  for(const category of serviceCategories){
    assert.match(category.id,/^[a-z0-9-]+$/);
    assert.ok(!services.some(service=>service.id===category.id),'Category must not replace or collide with an existing creative service');
    assert.equal(categoryHref(category.id),`/services/${category.id}/`);
  }
});
test('directory cards share original dimensions and link to the correct service pages',()=>{
  assert.equal(catalogCards.length,serviceCategories.length);
  assert.equal(new Set(catalogCards.map(card=>card.id)).size,catalogCards.length);
  catalogCards.forEach((card,index)=>{
    assert.equal(cardDestination(card),categoryHref(serviceCategories[index].id));
    assert.ok(card.description.includes(serviceCategories[index].title),'Search must include the full category name even when its card title differs');
    assert.ok(Object.hasOwn(sizeRatios,card.sizeVariant));
    assert.equal(cardRatio({...card,image:undefined}),cardRatio({...card,image:'/images/example.webp'}));
  });
});
test('service illustrations exist and carry an explicit concept disclosure',()=>{
  const illustrated = serviceCategories.filter(category=>category.image);
  assert.ok(illustrated.length>0);
  for(const category of illustrated){
    assert.equal(mediaSource(category.image),category.image);
    assert.ok(existsSync(new URL(`../public${category.image}`,import.meta.url)));
    assert.ok(category.imageAlt?.trim());
  }
  assert.match(conceptImageNote,/AI-generated/);
  assert.match(conceptImageNote,/not depict a client commission/);
});
test('every service has a usable brief, scoped offerings, and valid related links',()=>{
  for(const category of serviceCategories){
    assert.ok(category.description.trim());
    assert.ok(category.introduction.trim());
    assert.ok(category.offerings.length>=3);
    for(const item of category.offerings){assert.ok(item.title.trim());assert.ok(item.description.trim());}
    assert.ok(category.brief.length>=3);
    assert.ok(category.scopeNote.trim());
    for(const id of category.related){assert.notEqual(id,category.id);assert.ok(serviceCategories.some(item=>item.id===id));}
  }
});
test('category WhatsApp links preserve the number and use the selected service in the draft',()=>{
  for(const category of serviceCategories){
    const url=new URL(categoryWhatsAppUrl(category,brand.whatsapp));
    assert.equal(url.origin,new URL(brand.whatsapp).origin);
    assert.equal(url.pathname,new URL(brand.whatsapp).pathname);
    assert.ok(url.searchParams.get('text').includes(category.title));
    assert.deepEqual([...url.searchParams.keys()],['text']);
  }
});
