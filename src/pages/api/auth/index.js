// Basic認証のレスポンス
export default function handler(req, res) {
  res.status(401).setHeader('WWW-Authenticate', 'Basic realm="GAURA STUDIO"').end('Authentication required');
}
