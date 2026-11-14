import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { creativeCards, services, sizeRatios, cardRatio, cardColors, mediaSource, safeDestination, cardDestination, briefMailto, briefText, brand, whatsappProjectUrl } from '../src/data/creative.ts';

test('WhatsApp uses the correct international number and preserves the complete draft', () => {
  const url = new URL(whatsappProjectUrl);
  assert.equal(url.origin,'https://wa.me');
  assert.match(url.pathname,/^\/[1-9][0-9]{7,14}$/);
  assert.equal(url.pathname,new URL(brand.whatsapp).pathname);
  assert.ok(brand.whatsappMessage.trim().length > 0);
  assert.equal(url.searchParams.get('text'),brand.whatsappMessage);
  assert.deepEqual([...url.searchParams.keys()],['text']);
});

test('original size rules remain stable without restricting card count, order, or media', () => {
  const originalSizes = {tall:'3 / 5',portrait:'5 / 8',standard:'4 / 5',square:'1 / 1',editorial:'3 / 4',landscape:'4 / 3'};
  assert.deepEqual(sizeRatios,originalSizes);
  for (const [sizeVariant,ratio] of Object.entries(originalSizes)) {
    assert.equal(cardRatio({sizeVariant,image:undefined}),ratio);
    assert.equal(cardRatio({sizeVariant,image:'/images/new-photo.webp'}),ratio);
  }
});
test('configured cards have unique routes, real local assets, and an existing service', () => {
  assert.equal(new Set(creativeCards.map(card => card.id)).size,creativeCards.length);
  // Content may grow, be reordered, or contain only text cards.
  for (const card of creativeCards) {
    assert.match(card.id,/^[a-z0-9-]+$/);
    assert.ok(services.some(service => service.id === card.service));
    assert.ok(Object.hasOwn(sizeRatios,card.sizeVariant),`Unknown size for ${card.id}`);
    if (card.image?.trim()) {
      const source = mediaSource(card.image);
      assert.ok(source,`Invalid image URL for ${card.id}`);
      if (source.startsWith('/')) assert.ok(existsSync(new URL(`../public${source}`, import.meta.url)),`Missing local image for ${card.id}`);
      assert.ok(card.imageAlt?.trim(),`Missing image description for ${card.id}`);
    }
    if (card.kind === 'Visual study') assert.ok(card.imageNote?.trim(),`Describe the nature and source of ${card.id}`);
  }
});
test('empty, malformed, unsafe media becomes a text card', () => {
  for (const source of [undefined,'','  ','javascript:alert(1)','data:image/svg+xml,test','//external.example/image.jpg','https://user:pass@example.com/image.jpg','/images/../secret.jpg']) assert.equal(mediaSource(source),undefined);
  assert.equal(mediaSource('/images/platform/citrus.webp'),'/images/platform/citrus.webp');
  assert.equal(mediaSource('https://example.com/photo.webp'),'https://example.com/photo.webp');
});
test('invalid links and colors fall back without allowing executable URLs or CSS', () => {
  for (const value of ['javascript:alert(1)','//example.com','/\\example.com','https://user:pass@example.com']) assert.equal(safeDestination(value),undefined);
  const card = creativeCards[0];
  assert.equal(cardDestination({...card,link:'javascript:alert(1)'}),`/work/${card.id}/`);
  assert.equal(cardColors({...card,textColor:'red;position:fixed'}).color,cardColors(card).color);
});
test('inquiry draft preserves punctuation and newlines without injecting email headers', () => {
  const brief = {name:'Example Name',email:'example@example.com',service:'AI Video Production',description:'A&B + 50%\nA product story?',budget:''};
  const uri = new URL(briefMailto(brief));
  assert.equal(uri.protocol,'mailto:');
  assert.equal(uri.pathname,'boehnerhuang@gmail.com');
  assert.equal(uri.searchParams.get('body'),briefText(brief));
  assert.match(uri.searchParams.get('body'),/Budget: To discuss/);
  assert.deepEqual([...uri.searchParams.keys()],['subject','body']);
});
