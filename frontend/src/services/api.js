//const API_BASE_URL = 'http://192.168.55.191:3000/api/requests';
const API_BASE_URL = 'http://192.168.55.162:3000/api/requests';

export const requestService = {
  async getAll(page, size, search) {
    const params = new URLSearchParams({
      page,
      size,
      company: search.company || '', // 추가
      requester: search.requester || '',
      //content: search.content || '',
      title: search.title || '',
      requestDate: search.requestDate || ''
    });
    const res = await fetch(`${API_BASE_URL}?${params.toString()}`);
    if (!res.ok) throw new Error('데이터 로드 실패');
    return res.json();
  },

  async create(data) {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async update(id, data) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async delete(id) {
    await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
  }
};