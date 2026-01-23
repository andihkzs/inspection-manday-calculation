/**
 * Calculator.tsx - Main calculator interface with input forms and results
 * Exports: Calculator component
 * Side effects: performs AQL calculations on user input changes
 */

import { useState, useEffect } from 'react';
import { Plus, Trash2, Image } from 'lucide-react';
import type { InspectionLevel, AQLLevel, CalculationResult } from '../lib/aql/types';
import { calculateAQL } from '../lib/aql/engine';
import { ResultsTable } from './ResultsTable';
import { CalculationExplanation } from './CalculationExplanation';
import { Sidebar } from './Sidebar';
import { Logo } from './Logo';
import { PrintableResults } from './PrintableResults';
import { VERSION } from '../lib/version';
import { exportToJPG } from '../lib/export';

interface PO {
  id: string;
  poNumber: string;
  quantity: string;
  functionalTestLevel: InspectionLevel;
  functionalTestTimePerUnit: string;
}

export function Calculator() {
  const [inspectionLevel, setInspectionLevel] = useState<InspectionLevel>('II');
  const [aqlMajor, setAqlMajor] = useState<AQLLevel>('2.5');
  const [aqlMinor, setAqlMinor] = useState<AQLLevel>('4.0');
  const [preparationTime, setPreparationTime] = useState('30');
  const [samplingTime, setSamplingTime] = useState('10');
  const [inspectionTime, setInspectionTime] = useState('2.5');
  const [packingCheckTime, setPackingCheckTime] = useState('30');
  const [reportTime, setReportTime] = useState('45');
  const [travelTime, setTravelTime] = useState('180');
  const [includeTravelTime, setIncludeTravelTime] = useState(false);
  const [travelRoute, setTravelRoute] = useState('');
  const [pos, setPos] = useState<PO[]>([
    { id: '1', poNumber: 'PO-001', quantity: '1000', functionalTestLevel: 'S-3', functionalTestTimePerUnit: '0' }
  ]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState<'help' | 'privacy' | 'terms'>('help');
  const [isScrolled, setIsScrolled] = useState(false);

  const addPO = () => {
    const newId = (Math.max(...pos.map(p => parseInt(p.id)), 0) + 1).toString();
    setPos([...pos, { id: newId, poNumber: `PO-${String(newId).padStart(3, '0')}`, quantity: '', functionalTestLevel: 'S-3', functionalTestTimePerUnit: '0' }]);
  };

  const addMultiplePOs = () => {
    const count = prompt('How many POs would you like to add?');
    if (!count) return;

    const numToAdd = parseInt(count);
    if (isNaN(numToAdd) || numToAdd < 1 || numToAdd > 50) {
      alert('Please enter a valid number between 1 and 50');
      return;
    }

    const currentMaxId = Math.max(...pos.map(p => parseInt(p.id)), 0);
    const newPOs: PO[] = [];

    for (let i = 1; i <= numToAdd; i++) {
      const newId = (currentMaxId + i).toString();
      newPOs.push({
        id: newId,
        poNumber: `PO-${String(newId).padStart(3, '0')}`,
        quantity: '',
        functionalTestLevel: 'S-3',
        functionalTestTimePerUnit: '0'
      });
    }

    setPos([...pos, ...newPOs]);
  };

  const removePO = (id: string) => {
    if (pos.length > 1) {
      setPos(pos.filter(p => p.id !== id));
    }
  };

  const updatePO = (id: string, field: keyof PO, value: string | InspectionLevel) => {
    setPos(pos.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleCalculate = () => {
    const validPos = pos.filter(p => p.poNumber && p.quantity && parseInt(p.quantity) > 0);

    if (validPos.length === 0) {
      alert('Please add at least one PO with valid quantity');
      return;
    }

    const calculationResult = calculateAQL({
      inspectionLevel,
      aqlMajor,
      aqlMinor,
      pos: validPos.map(p => ({
        poNumber: p.poNumber,
        quantity: parseInt(p.quantity),
        functionalTestLevel: p.functionalTestLevel,
        functionalTestTimePerUnit: parseFloat(p.functionalTestTimePerUnit) || 0,
      })),
      preparationTimeMinutes: parseFloat(preparationTime),
      samplingTimeMinutes: parseFloat(samplingTime),
      inspectionTimePerUnitMinutes: parseFloat(inspectionTime),
      packingCheckTimeMinutes: parseFloat(packingCheckTime),
      reportTimeMinutes: parseFloat(reportTime),
      travelTimeMinutes: parseFloat(travelTime),
      includeTravelTime,
      travelRoute: travelRoute.trim() || undefined,
    });

    setResult(calculationResult);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        addPO();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pos]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16 sm:pt-20">
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/60 backdrop-blur-lg shadow-lg'
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <Logo size="md" />
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => {
                  setSidebarContent('help');
                  setSidebarOpen(true);
                }}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                title="Help"
              >
                <span className="text-sm">Help</span>
              </button>
              <button
                onClick={() => {
                  setSidebarContent('privacy');
                  setSidebarOpen(true);
                }}
                className="hidden md:flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                title="Privacy Policy"
              >
                <span className="text-sm">Privacy</span>
              </button>
              <button
                onClick={() => {
                  setSidebarContent('terms');
                  setSidebarOpen(true);
                }}
                className="hidden md:flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                title="Terms of Service"
              >
                <span className="text-sm">Terms</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-48 sm:pb-52">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">AQL Configuration</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inspection Level
                  </label>
                  <select
                    value={inspectionLevel}
                    onChange={(e) => setInspectionLevel(e.target.value as InspectionLevel)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="I">General I</option>
                    <option value="II">General II (Default)</option>
                    <option value="S-3">Special S-3</option>
                    <option value="S-4">Special S-4</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AQL Major
                    </label>
                    <select
                      value={aqlMajor}
                      onChange={(e) => setAqlMajor(e.target.value as AQLLevel)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="2.5">2.5</option>
                      <option value="4.0">4.0</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AQL Minor
                    </label>
                    <select
                      value={aqlMinor}
                      onChange={(e) => setAqlMinor(e.target.value as AQLLevel)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="2.5">2.5</option>
                      <option value="4.0">4.0</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-3">Time Breakdown</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      A. Preparation (min)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">Check POs, specs, factory briefing</p>
                    <input
                      type="number"
                      value={preparationTime}
                      onChange={(e) => setPreparationTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      B. Sampling Time per PO (min)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">Open cartons, count, pick samples</p>
                    <input
                      type="number"
                      value={samplingTime}
                      onChange={(e) => setSamplingTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      C. Inspection Time per Unit (min)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">Visual, function, tests per sample</p>
                    <input
                      type="number"
                      value={inspectionTime}
                      onChange={(e) => setInspectionTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      D. Packing & Marking Check (min)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">Check carton markings, stickers</p>
                    <input
                      type="number"
                      value={packingCheckTime}
                      onChange={(e) => setPackingCheckTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E. Report & Upload (min)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">Photos, write report, upload</p>
                    <input
                      type="number"
                      value={reportTime}
                      onChange={(e) => setReportTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        id="includeTravelTime"
                        checked={includeTravelTime}
                        onChange={(e) => setIncludeTravelTime(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="includeTravelTime" className="text-sm font-medium text-gray-700 cursor-pointer">
                        F. Include Travel Time (one-way, min)
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Examples: Shenzhen → factory, Ningbo → factory</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Route (City → Factory)</label>
                        <input
                          type="text"
                          value={travelRoute}
                          onChange={(e) => setTravelRoute(e.target.value)}
                          disabled={!includeTravelTime}
                          placeholder="e.g., Shenzhen → Factory A"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Time (minutes)</label>
                        <input
                          type="number"
                          value={travelTime}
                          onChange={(e) => setTravelTime(e.target.value)}
                          disabled={!includeTravelTime}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:text-gray-500"
                          min="0"
                          step="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Purchase Orders</h2>
                <div className="flex gap-2">
                  <button
                    onClick={addMultiplePOs}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    title="Add multiple POs at once"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Multiple</span>
                  </button>
                  <button
                    onClick={addPO}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    title="Add PO (Ctrl+P or ⌘+P)"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add PO</span>
                    <span className="hidden sm:inline text-xs text-blue-200 ml-1">(Ctrl+P)</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {pos.map((po) => (
                  <div key={po.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <input
                        type="text"
                        value={po.poNumber}
                        onChange={(e) => updatePO(po.id, 'poNumber', e.target.value)}
                        placeholder="PO Number"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={po.quantity}
                          onChange={(e) => updatePO(po.id, 'quantity', e.target.value)}
                          placeholder="Quantity"
                          className="flex-1 sm:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                          min="1"
                        />
                        <button
                          onClick={() => removePO(po.id)}
                          disabled={pos.length === 1}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Functional Test (Optional)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Inspection Level
                          </label>
                          <select
                            value={po.functionalTestLevel}
                            onChange={(e) => updatePO(po.id, 'functionalTestLevel', e.target.value as InspectionLevel)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                          >
                            <option value="I">Level I</option>
                            <option value="II">Level II</option>
                            <option value="S-3">Special Level S-3 (Reduced)</option>
                            <option value="S-4">Special Level S-4 (Tightened)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Test Time per Unit (min)
                          </label>
                          <input
                            type="number"
                            value={po.functionalTestTimePerUnit}
                            onChange={(e) => updatePO(po.id, 'functionalTestTimePerUnit', e.target.value)}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                            min="0"
                            step="0.1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div className="space-y-6">
            {result && (
              <>
                <div className="space-y-3">
                  <ResultsTable result={result} />
                  <button
                    onClick={() => exportToJPG('printable-results', `aql-calculation-${new Date().toISOString().split('T')[0]}.jpg`)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
                    title="Export as JPG"
                  >
                    <Image className="w-4 h-4" />
                    <span>Export as JPG</span>
                  </button>
                </div>
                <CalculationExplanation
                  result={result}
                  inspectionLevel={inspectionLevel}
                  aqlMajor={aqlMajor}
                  aqlMinor={aqlMinor}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <button
            onClick={handleCalculate}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors shadow-md text-base sm:text-lg"
          >
            Calculate Man-Days
          </button>
          {result && (
            <div className="mt-3 flex justify-center gap-6 text-sm sm:text-base">
              <div className="text-center">
                <p className="text-gray-600 font-medium">Total Hours</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{result.totalHours.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 font-medium">Total Man Days</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{result.totalManDays.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        content={sidebarContent}
      />

      {result && (
        <div className="fixed -left-[9999px] top-0 pointer-events-none">
          <PrintableResults result={result} />
        </div>
      )}

      <footer className="bg-white border-t border-gray-200 mt-8 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-600">
              © Mega Step (HK) Ltd. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">Version {VERSION}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
