let RssFeedEmitter = require('rss-feed-emitter');
let feeder = new RssFeedEmitter();
//let feeder = new RssFeedEmitter({ userAgent: 'Your UA string' });

feeder.add({
  url: 'http://www.nintendolife.com/feeds/news',
  refresh: 2000
});

feeder.add({
  url: 'https://www.weltfussball.de/rss/',
  refresh: 2000
});

feeder.on('new-item', function(item) {
  console.log(JSON.stringify(item.title, null, 2));
})
