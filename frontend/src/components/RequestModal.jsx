import React, { useState, useEffect } from 'react';

const ENUMS = {
  CATEGORY: ['HARDWARE', 'SOFTWARE', 'NETWORK', 'ACCESS_PERMISSION', 'INFORMATION', 'OTHERS'],
  PRIORITY: ['LOW', 'NORMAL', 'HIGH', 'CRITICAL'],
  STATUS: ['OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED']
};

const RequestModal = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState({
    title: '', requester: '', department: '', content: '',
    assignee: '', category: 'SOFTWARE', priority: 'NORMAL', status: 'OPEN',
    requestDate: new Date().toISOString().split('T')[0],
    targetDate: '', resolution: ''
  });

  useEffect(() => {
    if (initialData) setForm({ ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">{initialData ? '요청 상세 정보' : '신규 서비스 요청'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-500">요청 제목</label>
              <input name="title" required className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500 font-medium" 
                     value={form.title} onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500">요청자</label>
              <input name="requester" required className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500" 
                     value={form.requester} onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500">부서</label>
              <input name="department" className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500" 
                     value={form.department} onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500">카테고리</label>
              <select name="category" className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500 bg-white" 
                      value={form.category} onChange={handleChange}>
                {ENUMS.CATEGORY.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500">우선순위</label>
              <select name="priority" className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500 bg-white" 
                      value={form.priority} onChange={handleChange}>
                {ENUMS.PRIORITY.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500">현재 상태</label>
              <select name="status" className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500 bg-white font-bold text-blue-600" 
                      value={form.status} onChange={handleChange}>
                {ENUMS.STATUS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500">담당자</label>
              <input name="assignee" className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500" 
                     value={form.assignee} onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500">요청일</label>
              <input name="requestDate" type="date" required className="w-full mt-1 p-2 border rounded-lg outline-none" 
                     value={form.requestDate} onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500">목표 완료일</label>
              <input name="targetDate" type="date" className="w-full mt-1 p-2 border rounded-lg outline-none" 
                     value={form.targetDate} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500">상세 요청 내용</label>
            <textarea name="content" rows="3" className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500" 
                      value={form.content} onChange={handleChange} />
          </div>

          {/* Resolved/Closed 상태일 때만 보이는 해결 내용 섹션 */}
          {(form.status === 'RESOLVED' || form.status === 'CLOSED') && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-in fade-in duration-300">
              <label className="text-xs font-bold text-emerald-700">해결 방법 및 결과 기록</label>
              <textarea name="resolution" rows="2" className="w-full mt-1 p-2 border border-emerald-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" 
                        value={form.resolution} onChange={handleChange} />
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">취소</button>
            <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg">저장하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;