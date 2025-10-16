import Parser from 'rss-parser';
const parser = new Parser();
export const fetchRSS = async (url: string) => {
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
  const feed = await parser.parseURL(proxyUrl);
  return feed.items.map(item => ({
    title: item.title,
    description: item.contentSnippet || item.summary || '',
    link: item.link,
    source: feed.title
  }));
};