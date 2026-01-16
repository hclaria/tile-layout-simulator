// Calepinage Pro - Main Application Component

const { useState } = React;

function AdvancedTileSimulator() {
    // --- Language ---
    const [language, setLanguage] = useState(getInitialLanguage);
    const { t } = useTranslation(language);

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        localStorage.setItem('calepinage_lang', newLang);
    };

    // --- Configuration ---
    const [roomL, setRoomL] = useState(2.6);
    const [roomW, setRoomW] = useState(1.4);
    const [tileL, setTileL] = useState(100);
    const [tileW, setTileW] = useState(15);
    const [jointSize, setJointSize] = useState(2);
    const [peripheral, setPeripheral] = useState(5);
    
    // --- Layout ---
    const [pattern, setPattern] = useState('random_stagger'); 
    const [alignmentMode, setAlignmentMode] = useState('start');
    const [rotation, setRotation] = useState(0);

    // --- Manual Sequence ---
    const [manualSequence, setManualSequence] = useState({}); 
    const [nextNumber, setNextNumber] = useState(1);

    // --- Interaction ---
    const [hoveredTile, setHoveredTile] = useState(null);

    // --- Constants ---
    const MARGIN = 40; 

    // --- Calculation Engine ---
    const analysis = useTileCalculation({
        roomL, roomW, tileL, tileW,
        jointSize, peripheral, pattern,
        alignmentMode, rotation, manualSequence
    });

    // --- UI Handlers ---
    const handleTileClick = (tileId) => {
        setManualSequence(prev => {
            const newSeq = { ...prev };
            if (newSeq[tileId] !== undefined) {
                if (newSeq[tileId] === nextNumber - 1) {
                    delete newSeq[tileId];
                    setNextNumber(n => n - 1);
                }
                return newSeq;
            }
            newSeq[tileId] = nextNumber;
            setNextNumber(n => n + 1);
            return newSeq;
        });
    };

    const undoLast = () => {
        if (nextNumber > 1) {
            const lastNum = nextNumber - 1;
            const entry = Object.entries(manualSequence).find(([k, v]) => v === lastNum);
            if (entry) {
                const newSeq = { ...manualSequence };
                delete newSeq[entry[0]];
                setManualSequence(newSeq);
                setNextNumber(lastNum);
            }
        }
    };

    const resetSequence = () => {
        if (window.confirm(t('orderConfirmClear'))) {
            setManualSequence({});
            setNextNumber(1);
        }
    };

    const handleMouseEnter = (e, tile) => {
        setHoveredTile({ data: tile, x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (hoveredTile) {
            setHoveredTile(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
        }
    };

    const handleMouseLeave = () => {
        setHoveredTile(null);
    };

    const vbWidth = analysis.dimsCM.w + (MARGIN * 2); 
    const vbHeight = analysis.dimsCM.h + (MARGIN * 2);

    // Help text helpers
    const getPatternHelp = () => {
        if (pattern === 'straight') return t('helpStraight');
        if (pattern === 'offset_50') return t('helpOffset50');
        if (pattern === 'offset_33') return t('helpOffset33');
        if (pattern === 'random_stagger') return t('helpRandom');
        return "";
    };

    const getAlignHelp = () => {
        if (pattern === 'random_stagger') return t('helpRandomAlign');
        if (alignmentMode === 'start') return t('helpStartCorner');
        if (alignmentMode === 'center_tile') return t('helpStartCenterTile');
        if (alignmentMode === 'center_joint') return t('helpStartCenterJoint');
        return "";
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            
            {/* Header with language selector */}
            <header className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-slate-800">{t('appTitle')}</h1>
                <div className="flex items-center gap-2">
                    <IconGlobe />
                    <select 
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="lang-selector bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.label}</option>
                        ))}
                    </select>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-6 p-6 flex-1 bg-gray-100">
            
                {/* --- SIDEBAR --- */}
                <div className="w-full lg:w-96 flex-shrink-0 space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-700">
                            <IconMaximize /> {t('roomTitle')}
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase">{t('roomLength')}</label>
                                <input type="number" step="0.01" value={roomL} onChange={e => setRoomL(Number(e.target.value))} className="w-full mt-1 p-2 border rounded" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase">{t('roomWidth')}</label>
                                <input type="number" step="0.01" value={roomW} onChange={e => setRoomW(Number(e.target.value))} className="w-full mt-1 p-2 border rounded" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-700">
                            <IconGrid /> {t('tilesTitle')}
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase">{t('tileLength')}</label>
                                <input type="number" value={tileL} onChange={e => setTileL(Number(e.target.value))} className="w-full mt-1 p-2 border rounded" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase">{t('tileWidth')}</label>
                                <input type="number" value={tileW} onChange={e => setTileW(Number(e.target.value))} className="w-full mt-1 p-2 border rounded" />
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase flex justify-between">
                                    <span>{t('jointBetween')}</span>
                                    <span className="text-blue-600">{jointSize} mm</span>
                                </label>
                                <input type="range" min="1" max="10" step="0.5" value={jointSize} onChange={e => setJointSize(Number(e.target.value))} className="w-full mt-1" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase flex justify-between">
                                    <span>{t('jointPeripheral')}</span>
                                    <span className="text-blue-600">{peripheral} mm</span>
                                </label>
                                <input type="range" min="0" max="20" step="1" value={peripheral} onChange={e => setPeripheral(Number(e.target.value))} className="w-full mt-1" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-700">
                            <IconMove /> {t('layoutTitle')}
                        </h2>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">{t('layoutType')}</label>
                                <select value={pattern} onChange={e => setPattern(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                                    <option value="straight">{t('layoutStraight')}</option>
                                    <option value="offset_50">{t('layoutOffset50')}</option>
                                    <option value="offset_33">{t('layoutOffset33')}</option>
                                    <option value="random_stagger">{t('layoutRandom')}</option>
                                </select>
                                <div className="mt-2 text-xs text-blue-800 bg-blue-50 p-2 rounded flex items-start gap-2">
                                    <span className="mt-0.5 flex-shrink-0"><IconHelp /></span>
                                    {getPatternHelp()}
                                </div>
                            </div>

                            <div className={pattern === 'random_stagger' ? 'opacity-50 pointer-events-none' : ''}>
                                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">{t('startPoint')}</label>
                                <select value={alignmentMode} onChange={e => setAlignmentMode(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                                    <option value="start">{t('startCorner')}</option>
                                    <option value="center_tile">{t('startCenterTile')}</option>
                                    <option value="center_joint">{t('startCenterJoint')}</option>
                                </select>
                                <div className="mt-2 text-xs text-blue-800 bg-blue-50 p-2 rounded flex items-start gap-2">
                                    <span className="mt-0.5 flex-shrink-0"><IconHelp /></span>
                                    {getAlignHelp()}
                                </div>
                            </div>

                            <button 
                                onClick={() => setRotation(r => r === 0 ? 90 : 0)}
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium transition"
                            >
                                <IconRotate /> {t('rotateTiles')} ({rotation}°)
                            </button>
                        </div>
                    </div>

                    {/* --- MANUAL ORDER SECTION --- */}
                    <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-200">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-lg font-bold flex items-center gap-2 text-blue-800">
                                <IconPen /> {t('orderTitle')}
                            </h2>
                            <div className="bg-white px-2 py-1 rounded border border-blue-200 font-mono text-lg font-bold text-blue-600">
                                #{nextNumber}
                            </div>
                        </div>
                        <p className="text-xs text-blue-700 mb-4">
                            {t('orderHelp')}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                             <button 
                                onClick={undoLast}
                                disabled={nextNumber <= 1}
                                className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <IconUndo /> {t('orderUndo')}
                            </button>
                            <button 
                                onClick={resetSequence}
                                className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded text-sm font-semibold transition"
                            >
                                <IconEraser /> {t('orderClear')}
                            </button>
                        </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="bg-slate-800 text-white p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">{t('statsTotal')}</span>
                            <span className="text-2xl font-bold">{analysis.totalTiles}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">{t('statsCuts')}</span>
                            <span className="font-semibold">{analysis.cuts}</span>
                        </div>
                        {analysis.riskyCuts.length > 0 && (
                            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-sm text-red-100 flex items-start gap-2">
                                <span className="mt-0.5 flex-shrink-0"><IconAlert /></span>
                                <span>{t('statsWarning', { count: analysis.riskyCuts.length })}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- VISUALIZER --- */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden relative" style={{minHeight: "500px"}}>
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                           <IconClick /> {t('viewTitle')}
                        </h3>
                        <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-100 border border-blue-300"></div> {t('legendFull')}</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-100 border border-amber-300"></div> {t('legendCutOk')}</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-200 border border-red-400"></div> {t('legendProblem')}</div>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-auto p-4 flex items-start justify-center bg-slate-100 relative cursor-crosshair user-select-none">
                    
                    <svg 
                        width="100%" 
                        height="100%" 
                        viewBox={`0 0 ${vbWidth} ${vbHeight}`} 
                        preserveAspectRatio="xMidYMin meet"
                    >
                        <defs>
                            <clipPath id="roomInnerClip">
                                <rect 
                                    x={MARGIN + analysis.periphCM} 
                                    y={MARGIN + analysis.periphCM} 
                                    width={analysis.dimsCM.w - (2 * analysis.periphCM)} 
                                    height={analysis.dimsCM.h - (2 * analysis.periphCM)} 
                                />
                            </clipPath>
                        </defs>

                        {/* Background */}
                        <rect 
                            x={MARGIN} y={MARGIN} 
                            width={analysis.dimsCM.w} 
                            height={analysis.dimsCM.h} 
                            fill="#e2e8f0" 
                            stroke="#cbd5e1"
                            strokeWidth="0.5"
                        />

                        {/* Tiles */}
                        <g clipPath={analysis.isRandomMode ? undefined : "url(#roomInnerClip)"}>
                        {analysis.tiles.map((tile, i) => {
                            let fillColor = "#dbeafe";
                            let strokeColor = "#93c5fd";
                            let strokeW = "0.5";
                            
                            if (tile.isCut) {
                                fillColor = "#fef3c7";
                                strokeColor = "#fcd34d";
                            }
                            if (tile.isRisky) {
                                fillColor = "#fecaca";
                                strokeColor = "#f87171";
                            }

                            const isHovered = hoveredTile && hoveredTile.data.id === tile.id;
                            const isNumbered = tile.orderIndex !== null;

                            if (isHovered) {
                                strokeColor = "#3b82f6";
                                strokeW = "2"; 
                            }
                            
                            if (isNumbered) {
                                strokeColor = "#1e40af"; 
                                strokeW = "1.5";
                                if (!tile.isCut && !tile.isRisky) fillColor = "#bfdbfe";
                            }

                            const fontSize = Math.min(10, Math.min(tile.visibleW, tile.visibleH) / 2);
                            const showNumber = tile.visibleW > 4 && tile.visibleH > 4;

                            const dX = analysis.isRandomMode ? 0 : tile.deltaVisX;
                            const dY = analysis.isRandomMode ? 0 : tile.deltaVisY;
                            const textX = MARGIN + tile.gridX + dX + (tile.visibleW / 2);
                            const textY = MARGIN + tile.gridY + dY + (tile.visibleH / 2);

                            return (
                                <g 
                                    key={tile.id} 
                                    className="tile-interactive"
                                    onClick={() => handleTileClick(tile.id)}
                                    onMouseEnter={(e) => handleMouseEnter(e, tile)}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <rect
                                        x={MARGIN + tile.gridX}
                                        y={MARGIN + tile.gridY}
                                        width={tile.width}
                                        height={tile.height}
                                        fill={fillColor}
                                        stroke={strokeColor}
                                        strokeWidth={strokeW}
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    {showNumber && isNumbered && (
                                        <g>
                                            <circle cx={textX} cy={textY} r={fontSize * 1.2} fill="#1e40af" opacity="0.9" />
                                            <text
                                                x={textX}
                                                y={textY}
                                                dy=".35em"
                                                textAnchor="middle"
                                                fontSize={fontSize}
                                                fill="white"
                                                fontWeight="bold"
                                                style={{ pointerEvents: 'none' }}
                                            >
                                                {tile.orderIndex}
                                            </text>
                                        </g>
                                    )}
                                    {showNumber && isHovered && !isNumbered && (
                                        <text
                                            x={textX}
                                            y={textY}
                                            dy=".35em"
                                            textAnchor="middle"
                                            fontSize={fontSize}
                                            fill="#3b82f6"
                                            fontWeight="bold"
                                            opacity="0.5"
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            {nextNumber}
                                        </text>
                                    )}
                                </g>
                            )
                        })}
                        </g>

                        {/* Peripheral joint */}
                        <path 
                            d={`
                                M ${MARGIN} ${MARGIN} 
                                H ${MARGIN + analysis.dimsCM.w} 
                                V ${MARGIN + analysis.dimsCM.h} 
                                H ${MARGIN} Z 
                                M ${MARGIN + analysis.periphCM} ${MARGIN + analysis.periphCM} 
                                V ${MARGIN + analysis.dimsCM.h - analysis.periphCM} 
                                H ${MARGIN + analysis.dimsCM.w - analysis.periphCM} 
                                V ${MARGIN + analysis.periphCM} Z
                            `} 
                            fill="#94a3b8" 
                            fillOpacity="0.4"
                            fillRule="evenodd"
                            style={{ pointerEvents: 'none' }}
                        />
                        
                        <rect 
                            x={MARGIN} y={MARGIN} 
                            width={analysis.dimsCM.w} 
                            height={analysis.dimsCM.h} 
                            fill="none" 
                            stroke="#1e293b" 
                            strokeWidth="1"
                            pointerEvents="none"
                        />
                        
                        {/* Dimension - Bottom */}
                        <g transform={`translate(0, 15)`}>
                            <line 
                                x1={MARGIN} y1={MARGIN + analysis.dimsCM.h} 
                                x2={MARGIN + analysis.dimsCM.w} y2={MARGIN + analysis.dimsCM.h} 
                                stroke="#64748b" strokeWidth="1" 
                            />
                            <line 
                                x1={MARGIN} y1={MARGIN + analysis.dimsCM.h - 2} 
                                x2={MARGIN} y2={MARGIN + analysis.dimsCM.h + 2} 
                                stroke="#64748b" strokeWidth="1" 
                            />
                            <line 
                                x1={MARGIN + analysis.dimsCM.w} y1={MARGIN + analysis.dimsCM.h - 2} 
                                x2={MARGIN + analysis.dimsCM.w} y2={MARGIN + analysis.dimsCM.h + 2} 
                                stroke="#64748b" strokeWidth="1" 
                            />
                            <text 
                                x={MARGIN + analysis.dimsCM.w / 2} 
                                y={MARGIN + analysis.dimsCM.h - 3} 
                                textAnchor="middle" 
                                fontSize="5" 
                                fontWeight="bold"
                                fill="#475569"
                            >
                                {roomL} m
                            </text>
                        </g>

                        {/* Dimension - Left */}
                        <g transform={`translate(-15, 0)`}>
                            <line 
                                x1={MARGIN} y1={MARGIN} 
                                x2={MARGIN} y2={MARGIN + analysis.dimsCM.h} 
                                stroke="#64748b" strokeWidth="1" 
                            />
                            <line 
                                x1={MARGIN - 2} y1={MARGIN} 
                                x2={MARGIN + 2} y2={MARGIN} 
                                stroke="#64748b" strokeWidth="1" 
                            />
                            <line 
                                x1={MARGIN - 2} y1={MARGIN + analysis.dimsCM.h} 
                                x2={MARGIN + 2} y2={MARGIN + analysis.dimsCM.h} 
                                stroke="#64748b" strokeWidth="1" 
                            />
                            <text 
                                x={MARGIN - 4} 
                                y={MARGIN + analysis.dimsCM.h / 2} 
                                textAnchor="middle" 
                                fontSize="5" 
                                fontWeight="bold"
                                fill="#475569"
                                transform={`rotate(-90, ${MARGIN - 4}, ${MARGIN + analysis.dimsCM.h / 2})`}
                            >
                                {roomW} m
                            </text>
                        </g>
                    </svg>

                    {/* Tooltip */}
                    {hoveredTile && (
                        <div 
                            className="fixed bg-white/95 backdrop-blur shadow-xl rounded-lg border border-slate-200 p-3 z-50 pointer-events-none w-64 text-sm tooltip-enter"
                            style={{ 
                                top: hoveredTile.y + 15, 
                                left: hoveredTile.x + 15,
                            }}
                        >
                            <div className="font-bold text-slate-800 mb-1 border-b border-slate-100 pb-1 flex justify-between">
                                <span>{hoveredTile.data.isCut ? t('tooltipCutDetail') : t('tooltipFullTile')}</span>
                                {hoveredTile.data.orderIndex && <span className="text-blue-600">N° {hoveredTile.data.orderIndex}</span>}
                            </div>
                            
                            <div className="space-y-1 text-slate-600">
                                <div className="flex justify-between">
                                    <span>{t('tooltipVisibleDims')}</span>
                                    <span className="font-mono text-slate-900">
                                        {hoveredTile.data.visibleW.toFixed(1)} x {hoveredTile.data.visibleH.toFixed(1)} cm
                                    </span>
                                </div>
                                
                                {hoveredTile.data.isCut && (
                                    <>
                                        <div className="flex justify-between">
                                            <span>{t('tooltipRemainLength')}</span>
                                            <span className="font-mono">
                                                {hoveredTile.data.percentW}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>{t('tooltipRemainWidth')}</span>
                                            <span className="font-mono">
                                                {hoveredTile.data.percentH}%
                                            </span>
                                        </div>
                                    </>
                                )}

                                {hoveredTile.data.isRisky && (
                                    <div className="mt-2 text-red-600 flex flex-col gap-1 bg-red-50 p-2 rounded text-xs border border-red-100">
                                        <div className="flex items-center gap-1 font-bold">
                                            <IconAlert size={14}/> <span>{t('tooltipProblem')}</span>
                                        </div>
                                        <div>{t(hoveredTile.data.riskReason)}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    </div>
                </div>
            </div>
        </div>
    );
}

// Mount the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdvancedTileSimulator />);
