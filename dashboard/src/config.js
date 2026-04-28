// API エンドポイントの設定
// VITE_API_URL が指定されていれば（本番など）それを使用。
// 未指定なら空文字をデフォルトとし、相対パス（dev では Vite が proxy）になる。

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (path) => {
    if (path.startsWith('http')) return path;
    // path の先頭に / が無ければ付与
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_BASE_URL}${normalizedPath}`;
};
