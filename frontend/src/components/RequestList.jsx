import React from 'react';
import { PencilSquareIcon, TrashIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const RequestList = ({ requests, totalPages, currentPage, onPageChange, onSearch, onEdit, onDelete, onNew }) => {
  
  const getPriorityColor = (p) => {
    switch(p) {
      case 'CRITICAL': return 'bg-red-100 text-red-700';
      case 'HIGH': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  // 입력 핸들러: 기존 검색 조건을 유지하며 업데이트
  const handleFilterChange = (key, value) => {
    onSearch(prev => ({
      ...prev,          // 중요: 기존의 requester, title 등 다른 검색 조건을 유지함
      [key]: value,
      page: 0           // 검색 조건이 바뀌면 1페이지(인덱스 0)로 리셋
    }));
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">IT 서비스 요청 관리</h1>
        <button onClick={onNew} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
          <PlusIcon className="w-5 h-5 stroke-2" /> 새 요청 등록
        </button>
      </div>

      {/* 검색 필터 영역 - 백엔드 파라미터와 1:1 매칭 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input 
            placeholder="고객사명으로 검색..." 
            className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50" 
            onChange={e => handleFilterChange('company', e.target.value)} 
          />
        </div>
        <input 
          placeholder="요청자명..." 
          className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50" 
          onChange={e => handleFilterChange('requester', e.target.value)} 
        />
        <input 
          placeholder="제목 키워드..." 
          className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50" 
          onChange={e => handleFilterChange('title', e.target.value)} 
        />
        <input 
          type="date" 
          className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 text-slate-500" 
          onChange={e => handleFilterChange('requestDate', e.target.value)} 
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50/50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">고객사</th>
              <th className="px-6 py-4">분류/중요도</th>
              <th className="px-6 py-4">제목/내용</th>
              <th className="px-6 py-4">요청자/부서</th>
              <th className="px-6 py-4">담당자</th>
              <th className="px-6 py-4">상태</th>
              <th className="px-6 py-4">요청일/목표일</th>
              <th className="px-6 py-4 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {requests && requests.length > 0 ? (
              requests.map(req => (
                <tr key={req.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{req.company || '일반'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-600 text-[11px] mb-1 uppercase">{req.category}</div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${getPriorityColor(req.priority)}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{req.title}</div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">{req.content}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-700">{req.requester}</div>
                    <div className="text-[11px] text-slate-400">{req.department}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{req.assignee || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100">
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-slate-500 leading-relaxed">
                    <div className="flex items-center gap-1"><span className="text-slate-300 font-bold">R</span> {req.requestDate}</div>
                    <div className="flex items-center gap-1 text-orange-400"><span className="text-orange-200 font-bold">T</span> {req.targetDate || '미지정'}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEdit(req)} className="p-2 hover:bg-white hover:text-blue-600 rounded-lg shadow-sm border border-transparent hover:border-slate-100 transition-all">
                        <PencilSquareIcon className="w-4 h-4"/>
                      </button>
                      <button onClick={() => onDelete(req.id)} className="p-2 hover:bg-white hover:text-red-500 rounded-lg shadow-sm border border-transparent hover:border-slate-100 transition-all">
                        <TrashIcon className="w-4 h-4"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-20 text-center text-slate-400 font-medium">
                  조회된 요청 사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 페이징 제어 */}
        <div className="p-5 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">Page {currentPage} of {totalPages}</span>
          <div className="flex gap-2">
            <button 
              onClick={() => onPageChange(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-30 transition-colors shadow-sm"
            >
              <ChevronLeftIcon className="w-5 h-5 text-slate-600"/>
            </button>
            <button 
              onClick={() => onPageChange(currentPage + 1)} 
              disabled={currentPage === totalPages || totalPages === 0} 
              className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-30 transition-colors shadow-sm"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestList;