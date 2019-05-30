import test from 'ava';
import shortcutUrl from '.';

test('main', async t => {
	t.is(await shortcutUrl('fixture/google'), 'https://google.com');
});

test('with extension', async t => {
	t.is(await shortcutUrl('fixture/google.webloc'), 'https://google.com');
});

test('webloc with query, #2', async t => {
	t.is(await shortcutUrl('fixture/youtube-with-query.webloc'), 'https://youtube.com/watch?v=XXXXXXXXXXX');
});

test('webloc complex query, #2', async t => {
	t.is(await shortcutUrl('fixture/youtube-with-complex-query.webloc'), 'https://youtube.com/watch?complex=true&v=XXXXXXXXXXX');
});

test('unknown shortcut', async t => {
	await t.throwsAsync(shortcutUrl('fixture/unknown.webloc'), 'Couldn\'t find a web shortcut with the name `unknown.webloc`');
});
