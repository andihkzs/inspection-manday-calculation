/**
 * HistoryModal.tsx - Modal for displaying calculation history
 * Exports: HistoryModal component
 * Side effects: fetches calculation history from Supabase
 */

import { useEffect, useState } from 'react';
import { X, Calendar, TrendingUp, Trash2 } from 'lucide-react';
import { loadCalculations, deleteCalculation, deleteAllCalculations, type SavedCalculation } from '../lib/api/calculations';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadCalculation: (calculation: SavedCalculation) => void;
  isAdmin: boolean;
}

export function HistoryModal({ isOpen, onClose, onLoadCalculation, isAdmin }: HistoryModalProps) {
  const [calculations, setCalculations] = useState<SavedCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchCalculations();
    }
  }, [isOpen]);

  const fetchCalculations = async () => {
    setLoading(true);
    const { data } = await loadCalculations(20);
    if (data) {
      setCalculations(data);
    }
    setLoading(false);
  };

  const handleDeleteSingle = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this calculation?')) {
      return;
    }

    const response = await deleteCalculation(id);
    if (response.success) {
      setDeleteMessage('Calculation deleted successfully');
      setTimeout(() => setDeleteMessage(''), 3000);
      fetchCalculations();
    } else {
      alert('Failed to delete calculation: ' + response.error);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete ALL calculations? This action cannot be undone!')) {
      return;
    }

    const response = await deleteAllCalculations();
    if (response.success) {
      setDeleteMessage('All calculations deleted successfully');
      setTimeout(() => setDeleteMessage(''), 3000);
      fetchCalculations();
    } else {
      alert('Failed to delete all calculations: ' + response.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Calculation History</h2>
            {deleteMessage && (
              <p className="text-sm text-green-600 mt-1">{deleteMessage}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && calculations.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading history...</p>
            </div>
          ) : calculations.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No calculations saved yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {calculations.map((calc) => (
                <div
                  key={calc.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer relative"
                  onClick={() => {
                    onLoadCalculation(calc);
                    onClose();
                  }}
                >
                  {isAdmin && (
                    <button
                      onClick={(e) => handleDeleteSingle(e, calc.id)}
                      className="absolute top-2 right-2 p-2 hover:bg-red-100 rounded-lg transition-colors group"
                      title="Delete this calculation"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                    </button>
                  )}
                  <div className="mb-3 pr-8">
                    {calc.custom_name && (
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{calc.custom_name}</h3>
                    )}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(calc.created_at).toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {calc.total_man_days.toFixed(2)} days
                        </p>
                        <p className="text-sm text-gray-600">{calc.total_samples} samples</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Inspection Level</p>
                      <p className="font-semibold text-gray-800">{calc.inspection_level}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">AQL Major/Minor</p>
                      <p className="font-semibold text-gray-800">
                        {calc.aql_major}/{calc.aql_minor}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Purchase Orders</p>
                      <p className="font-semibold text-gray-800">{calc.pos.length} POs</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Quantity</p>
                      <p className="font-semibold text-gray-800">
                        {calc.pos.reduce((sum, po) => sum + po.quantity, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      POs: {calc.pos.map(po => po.poNumber).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
