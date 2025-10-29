// api/notion-proxy.js
export default async function handler(req, res) {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_VERSION = process.env.NOTION_VERSION || '2022-06-28';

  const { method, path } = req.query; // ex: ?path=databases/<id>/query
  const url = `https://api.notion.com/v1/${path}`;

  const fetchOptions = {
    method: req.method,
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json'
    },
    body: ['GET','HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body)
  };

  try {
    const r = await fetch(url, fetchOptions);
    const data = await r.text();
    res.status(r.status).send(data);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
