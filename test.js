import test from 'ava';
import m from './';

test('main', async t => {
	t.is(await m('fixture/google'), 'https://google.com');
});

test('with extension', async t => {
	t.is(await m('fixture/google.webloc'), 'https://google.com');
});

test('unknown shortcut', t => {
	t.throws(m('fixture/unknown.webloc'), 'Couldn\'t find a web shortcut with the name `unknown.webloc`');
});
