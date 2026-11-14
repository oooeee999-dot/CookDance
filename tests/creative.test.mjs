import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { creativeCards, services, cardRatio, cardColors, mediaSource, safeDestination, cardDestination, briefMailto, briefText } from '../src/data/creative.ts';

test('all 20 original wall positions retain their original ratios, with or without media', () => {
  const ratios = ['3 / 5','5 / 8','3 / 5','3 / 5','4 / 5','4 / 5','1 / 1','1 / 1','4 / 5','4 / 5','1 / 1','3 / 4','1 / 1','4 / 3','4 / 5','4 / 5','3 / 4','4 / 3','4 / 3','1 / 1'];
  assert.deepEqual(creativeCards.map(cardRatio), ratios);
  for (const card of creativeCards) assert.equal(cardRatio({...card,image:undefined}), cardRatio({...card,image:'/images/new-photo.webp'}));
});
test('configured cards have unique routes, real local assets, and an existing service', () => {
  assert.equal(new Set(creativeCards.map(card => card.id)).size,creativeCards.length);
  assert.ok(creativeCards.some(card => !card.image));
  assert.ok(creativeCards.some(card => card.image));
  for (const card of creativeCards) {
    assert.match(card.id,/^[a-z0-9-]+$/);
    assert.ok(services.some(service => service.id === card.service));
    if (card.image) assert.ok(existsSync(new URL(`../public${card.image}`, import.meta.url)));
    if (card.kind === 'Visual study') assert.match(card.imageNote,/not a commissioned campaign/);
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
