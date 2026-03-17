import React, { useState, useEffect, useCallback } from 'react';
import { requestService } from './services/api';
import RequestList from './components/RequestList';
import RequestModal from './components/RequestModal';

function App() {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState({ requester: '', content: '', title: '' });

  const loadData = useCallback(async (page = 0) => {
    try {
      const data = await requestService.getAll(page, 5, searchTerm);
      setRequests(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number + 1);
    } catch (err) {
      alert(err.message);
    }
  }, [searchTerm]);

  useEffect(() => { loadData(0); }, [loadData]);

  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        await requestService.update(formData.id, formData);
      } else {
        await requestService.create(formData);
      }
      setIsModalOpen(false);
      loadData(currentPage - 1);
    } catch (err) { alert("저장 실패"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await requestService.delete(id);
      loadData(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <RequestList 
        requests={requests}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(p) => loadData(p - 1)}
        onSearch={setSearchTerm}
        onEdit={(req) => { setSelectedRequest(req); setIsModalOpen(true); }}
        onDelete={handleDelete}
        onNew={() => { setSelectedRequest(null); setIsModalOpen(true); }}
      />
      {isModalOpen && (
        <RequestModal 
          initialData={selectedRequest}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;