import { useState } from 'react';
import { Upload, CheckCircle2, X, RefreshCw, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { ANIMALS } from '../../data/mockData';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 12,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

const EXCEL_COLUMNS = ['Animal Name', 'Type', 'Breed', 'Sex', 'Weight (lbs)', 'DOB', 'Chip #', 'Notes'];
const LOOPET_FIELDS = ['name', 'species', 'breed', 'gender', 'weight', 'birthdate', 'microchipId', 'medicalNotes'];
const FIELD_LABELS: Record<string, string> = {
  name: 'Name', species: 'Species', breed: 'Breed', gender: 'Gender',
  weight: 'Weight (kg)', birthdate: 'Date of Birth', microchipId: 'Microchip ID',
  medicalNotes: 'Medical Notes', status: 'Status',
};

export default function BatchOnboarding() {
  const [uploadState, setUploadState] = useState<'idle' | 'dragging' | 'processing' | 'mapped' | 'syncing' | 'done'>('idle');
  const [mapping, setMapping] = useState<Record<string, string>>(
    Object.fromEntries(EXCEL_COLUMNS.map((col, i) => [col, LOOPET_FIELDS[i] || '']))
  );
  const [successCount, setSuccessCount] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);

  const simulateUpload = () => {
    setUploadState('processing');
    setTimeout(() => setUploadState('mapped'), 1500);
  };

  const handleSync = () => {
    setUploadState('syncing');
    setTimeout(() => {
      setSuccessCount(previewData.length);
      setUploadState('done');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
    }, 2000);
  };

  const previewData = ANIMALS.filter(a => a.species === 'Cat').slice(0, 5).map(a => ({
    'Animal Name': a.name,
    'Type': a.species,
    'Breed': a.breed,
    'Sex': a.gender,
    'Weight (lbs)': (a.weight * 2.205).toFixed(1),
    'DOB': a.intakeDate,
    'Chip #': a.microchipId || 'None',
    'Notes': a.medicalNotes.slice(0, 40) + '...',
  }));

  return (
    <div className="p-5 lg:p-7" style={{ fontFamily: FONT, background: '#FBF9F8', minHeight: '100%' }}>
      {/* Toast */}
      {toastVisible && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 text-white" style={{ background: '#23967F', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
          <CheckCircle2 className="w-5 h-5" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>{successCount} animal profiles synced successfully!</span>
          <button onClick={() => setToastVisible(false)}><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div>
          <h4 style={{ color: '#090C02', marginBottom: 2 }}>Batch Onboarding</h4>
          <p style={{ fontSize: 14, color: '#53584A' }}>Import existing data from Excel — Flow V2</p>
        </div>

        {/* Upload zone */}
        {(uploadState === 'idle' || uploadState === 'dragging') && (
          <div
            onDragOver={e => { e.preventDefault(); setUploadState('dragging'); }}
            onDragLeave={() => setUploadState('idle')}
            onDrop={e => { e.preventDefault(); simulateUpload(); }}
            className="p-8 text-center transition-all"
            style={{ ...CARD, border: `2px dashed ${uploadState === 'dragging' ? '#23967F' : '#135346'}`, background: uploadState === 'dragging' ? '#EAF5F2' : 'white' }}
          >
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ borderRadius: 12, background: '#EAF5F2' }}>
              <FileSpreadsheet className="w-8 h-8" style={{ color: '#23967F' }} />
            </div>
            <p style={{ fontWeight: 600, fontSize: 16, color: '#090C02', marginBottom: 6 }}>Upload Excel File</p>
            <p style={{ fontSize: 14, color: '#53584A', marginBottom: 20 }}>Drag & drop your .xlsx file here, or click to browse</p>
            <button
              onClick={simulateUpload}
              className="flex items-center gap-2 px-6 py-2.5 text-white mx-auto"
              style={{ background: '#23967F', borderRadius: 8, fontSize: 14, fontWeight: 500 }}
            >
              <Upload className="w-4 h-4" />Choose File
            </button>
            <p style={{ fontSize: 12, color: '#53584A', marginTop: 12 }}>Supported: .xlsx, .xls, .csv — max 50MB</p>
          </div>
        )}

        {/* Processing state */}
        {uploadState === 'processing' && (
          <div style={CARD} className="p-8 text-center">
            <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#23967F', borderTopColor: 'transparent' }} />
            <p style={{ fontWeight: 500, fontSize: 15, color: '#090C02' }}>Parsing your Excel file...</p>
            <p style={{ fontSize: 13, color: '#53584A', marginTop: 4 }}>Detecting columns and data types</p>
          </div>
        )}

        {/* Data mapping */}
        {(uploadState === 'mapped' || uploadState === 'syncing' || uploadState === 'done') && (
          <>
            <div style={CARD} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02' }}>Data Mapping</p>
                  <p style={{ fontSize: 12, color: '#53584A', marginTop: 2 }}>Map legacy Excel columns to Loopet fields</p>
                </div>
                <button
                  onClick={() => setUploadState('idle')}
                  className="flex items-center gap-1.5 px-3 py-1.5"
                  style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#53584A', fontSize: 13 }}
                >
                  <RefreshCw className="w-3 h-3" />Re-upload
                </button>
              </div>
              <div className="space-y-2">
                {EXCEL_COLUMNS.map(col => (
                  <div key={col} className="flex items-center gap-3 p-3" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 11, fontWeight: 500, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Excel Column</p>
                      <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }} className="truncate">{col}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#53584A' }} />
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 11, fontWeight: 500, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Loopet Field</p>
                      <select
                        value={mapping[col]}
                        onChange={e => setMapping(m => ({ ...m, [col]: e.target.value }))}
                        style={{ width: '100%', padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(9,12,2,0.1)', background: '#ffffff', color: '#090C02', fontSize: 13, fontFamily: FONT, outline: 'none' }}
                      >
                        <option value="">— Skip —</option>
                        {LOOPET_FIELDS.map(f => <option key={f} value={f}>{FIELD_LABELS[f] || f}</option>)}
                      </select>
                    </div>
                    {mapping[col] && <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#23967F' }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Preview table */}
            <div style={CARD} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02' }}>Data Preview</p>
                  <p style={{ fontSize: 12, color: '#53584A', marginTop: 2 }}>{previewData.length} records ready to import</p>
                </div>
                <span className="rounded-full px-3 py-1" style={{ background: '#23967F', color: '#ffffff', fontSize: 12, fontWeight: 700 }}>{previewData.length} rows</span>
              </div>
              <div className="overflow-x-auto -mx-2">
                <table className="w-full" style={{ fontSize: 13 }}>
                  <thead>
                    <tr>
                      {Object.keys(previewData[0] || {}).slice(0, 6).map(col => (
                        <th key={col} className="text-left px-3 py-2" style={{ fontSize: 11, fontWeight: 500, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, i) => (
                      <tr key={i} style={{ borderTop: '1px solid rgba(9,12,2,0.06)' }}>
                        {Object.values(row).slice(0, 6).map((val, j) => (
                          <td key={j} className="px-3 py-2" style={{ fontSize: 13, color: '#090C02' }}>
                            {String(val).length > 20 ? String(val).slice(0, 20) + '...' : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {uploadState !== 'done' && (
              <button
                onClick={handleSync}
                disabled={uploadState === 'syncing'}
                className="w-full py-4 text-white flex items-center justify-center gap-3 transition-all"
                style={{ background: '#23967F', borderRadius: 12, fontWeight: 600, fontSize: 15 }}
              >
                {uploadState === 'syncing' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Syncing {previewData.length} profiles...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Sync All — Generate Pet IDs for {previewData.length} animals
                  </>
                )}
              </button>
            )}

            {uploadState === 'done' && (
              <div style={CARD} className="p-6 text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3" style={{ borderRadius: '50%', background: '#EAF5F2' }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: '#23967F' }} />
                </div>
                <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02', marginBottom: 4 }}>Sync Complete!</p>
                <p style={{ fontSize: 14, color: '#53584A', marginBottom: 16 }}>{successCount} animal profiles created successfully</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: 'Profiles Created', val: successCount, color: '#23967F', bg: '#EAF5F2' },
                    { label: 'Pet IDs Issued',  val: successCount,  color: '#23967F', bg: '#EAF5F2' },
                  ].map(s => (
                    <div key={s.label} className="p-3" style={{ background: s.bg, borderRadius: 8 }}>
                      <p style={{ fontSize: 11, color: s.color, fontWeight: 500, opacity: 0.7 }}>{s.label}</p>
                      <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setUploadState('idle')} className="px-6 py-2 text-white" style={{ background: '#23967F', borderRadius: 8, fontWeight: 500, fontSize: 14 }}>
                  Upload Another Batch
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
