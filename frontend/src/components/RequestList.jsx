import React from 'react';
import { PencilSquareIcon, TrashIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const RequestList = ({ requests, totalPages, currentPage, onPageChange, onSearch, onEdit, onDelete, onNew }) => {
  
  const getPriorityColor = (p) => {
    switch(p) {
      case 'CRITICAL': return 'bg-red-100 text-red-700';
      case 'HIGH': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">IT 서비스 요청 관리</h1>
        <button onClick={onNew} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="w-5 h-5" /> 새 요청 등록
        </button>
      </div>

      {/* 검색 필터 영역 */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input placeholder="제목..." className="p-2 border rounded-lg outline-none focus:border-blue-500" onChange={e => onSearch(p => ({...p, title: e.target.value}))} />
        <input placeholder="요청자..." className="p-2 border rounded-lg outline-none focus:border-blue-500" onChange={e => onSearch(p => ({...p, requester: e.target.value}))} />
        <input type="date" className="p-2 border rounded-lg outline-none focus:border-blue-500" onChange={e => onSearch(p => ({...p, requestDate: e.target.value}))} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">분류/중요도</th>
              <th className="px-4 py-3">제목/내용</th>
              <th className="px-4 py-3">요청자/부서</th>
              <th className="px-4 py-3">담당자</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">요청일/목표일</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {requests.map(req => (
              <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 text-slate-400">#{req.id}</td>
                <td className="px-4 py-4">
                  <div className="font-bold text-blue-600 text-[11px] mb-1">{req.category}</div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityColor(req.priority)}`}>
                    {req.priority}
                  </span>
                </td>
                <td className="px-4 py-4 max-w-xs">
                  <div className="font-bold text-slate-800 truncate">{req.title}</div>
                  <div className="text-xs text-slate-400 truncate">{req.content}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium">{req.requester}</div>
                  <div className="text-xs text-slate-400">{req.department}</div>
                </td>
                <td className="px-4 py-4 text-slate-600">{req.assignee || '-'}</td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold">
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  <div>R: {req.requestDate}</div>
                  <div className="text-red-400">T: {req.targetDate || '미지정'}</div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => onEdit(req)} className="p-1.5 hover:text-blue-600"><PencilSquareIcon className="w-5 h-5"/></button>
                    <button onClick={() => onDelete(req.id)} className="p-1.5 hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이징 제어 */}
        <div className="p-4 bg-slate-50 border-t flex justify-between items-center">
          <span className="text-xs text-slate-500 font-bold uppercase">Page {currentPage} of {totalPages}</span>
          <div className="flex gap-2">
            <button onClick={() => onPageChange(currentPage-1)} disabled={currentPage===1} className="p-1 border rounded bg-white disabled:opacity-30"><ChevronLeftIcon className="w-5 h-5"/></button>
            <button onClick={() => onPageChange(currentPage+1)} disabled={currentPage===totalPages} className="p-1 border rounded bg-white disabled:opacity-30"><ChevronRightIcon className="w-5 h-5"/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestList;