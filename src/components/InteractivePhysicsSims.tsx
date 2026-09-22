import React, { useState } from 'react';
import { Play, RotateCcw, Sparkles, CheckCircle2, Award, Zap, Sliders, ArrowRight } from 'lucide-react';

interface InteractivePhysicsSimsProps {
  onAddXP: (amount: number) => void;
}

export const InteractivePhysicsSims: React.FC<InteractivePhysicsSimsProps> = ({ onAddXP }) => {
  const [activeSim, setActiveSim] = useState<'kinetic' | 'potential'>('kinetic');

  // --- SIMULATION 1: KINETIC RAMP ---
  const [ballMass, setBallMass] = useState<number>(0.1); // kg (100g)
  const [rampHeight, setRampHeight] = useState<number>(0.2); // m (20cm)
  const [isRampRunning, setIsRampRunning] = useState(false);
  const [ballPosition, setBallPosition] = useState(0); // 0 (top) to 100 (bottom)
  const [blockShift, setBlockShift] = useState(0); // cm
  const [rampTestedCount, setRampTestedCount] = useState(0);
  const [rampQuizAnswer, setRampQuizAnswer] = useState<number | null>(null);

  // Theoretical calculations
  // v = sqrt(2 * g * h) with g = 9.8 m/s^2
  const velocity = Math.sqrt(2 * 9.8 * rampHeight);
  const kineticEnergy = 0.5 * ballMass * Math.pow(velocity, 2); // Wd = 1/2 m v^2 = m * g * h
  // Shift proportional to kinetic energy: e.g. 1 Joule moves 10 cm
  const calculatedShift = Math.round(kineticEnergy * 15 * 10) / 10;

  const runRampSimulation = () => {
    if (isRampRunning) return;
    setIsRampRunning(true);
    setBallPosition(0);
    setBlockShift(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 4;
      setBallPosition(step);
      if (step >= 100) {
        clearInterval(interval);
        setBlockShift(calculatedShift);
        setIsRampRunning(false);
        setRampTestedCount(prev => prev + 1);
        onAddXP(15);
      }
    }, 25);
  };

  const resetRamp = () => {
    setBallPosition(0);
    setBlockShift(0);
    setIsRampRunning(false);
  };

  // --- SIMULATION 2: POTENTIAL PILE DRIVER ---
  const [hammerMass, setHammerMass] = useState<number>(2); // kg
  const [dropHeight, setDropHeight] = useState<number>(1.5); // m
  const [isHammerDropping, setIsHammerDropping] = useState(false);
  const [hammerY, setHammerY] = useState(0); // 0 (top) to 100 (contact)
  const [pileDepth, setPileDepth] = useState(0); // cm
  const [potentialTestedCount, setPotentialTestedCount] = useState(0);
  const [potentialQuizAnswer, setPotentialQuizAnswer] = useState<number | null>(null);

  const potentialEnergy = hammerMass * 9.8 * dropHeight; // Wt = m * g * h
  // Pile sink depth in cm: e.g. 10 Joules sinks 1.2 cm
  const calculatedSink = Math.round((potentialEnergy / 25) * 10) / 10;

  const runHammerSimulation = () => {
    if (isHammerDropping) return;
    setIsHammerDropping(true);
    setHammerY(0);
    setPileDepth(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setHammerY(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setPileDepth(calculatedSink);
        setIsHammerDropping(false);
        setPotentialTestedCount(prev => prev + 1);
        onAddXP(15);
      }
    }, 20);
  };

  const resetHammer = () => {
    setHammerY(0);
    setPileDepth(0);
    setIsHammerDropping(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tab Switcher - Geometric Balance */}
      <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs flex gap-2">
        <button
          onClick={() => setActiveSim('kinetic')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            activeSim === 'kinetic'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Thí Nghiệm 1: Máng Nghiêng Va Chạm (Động Năng Wđ)</span>
        </button>
        <button
          onClick={() => setActiveSim('potential')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            activeSim === 'potential'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Thí Nghiệm 2: Búa Máy Đóng Cọc (Thế Năng Wt)</span>
        </button>
      </div>

      {/* SIMULATION 1: KINETIC RAMP */}
      {activeSim === 'kinetic' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Mô phỏng thí nghiệm Hình 2.1 SGK</span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Khảo Sát Động Năng Qua Máng Nghiêng</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                Đã thử nghiệm: {rampTestedCount} lần
              </span>
              <button
                onClick={resetRamp}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
              </button>
            </div>
          </div>

          {/* Interactive Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {/* Control 1: Ball Mass */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Khối lượng viên bi (m):</span>
                <span className="font-mono font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {(ballMass * 1000).toFixed(0)} gam ({ballMass} kg)
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.05"
                value={ballMass}
                disabled={isRampRunning}
                onChange={(e) => {
                  setBallMass(parseFloat(e.target.value));
                  resetRamp();
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>50g (Bi nhỏ)</span>
                <span>150g (Bi vừa)</span>
                <span>300g (Bi thép lớn)</span>
              </div>
            </div>

            {/* Control 2: Ramp Height */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Độ cao thả bi trên máng (h):</span>
                <span className="font-mono font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {(rampHeight * 100).toFixed(0)} cm ({rampHeight} m)
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.4"
                step="0.05"
                value={rampHeight}
                disabled={isRampRunning}
                onChange={(e) => {
                  setRampHeight(parseFloat(e.target.value));
                  resetRamp();
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10cm (Dốc thấp)</span>
                <span>25cm (Dốc vừa)</span>
                <span>40cm (Dốc cao)</span>
              </div>
            </div>
          </div>

          {/* SVG Animated Stage */}
          <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-4 h-56 flex flex-col justify-end overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Ground & Ramp Slope */}
              <line x1="20" y1="170" x2="580" y2="170" stroke="#94A3B8" strokeWidth="4" />
              <path d="M 40 50 L 180 170 L 40 170 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />

              {/* Height indicator */}
              <line x1="30" y1="50" x2="30" y2="170" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="12" y="115" fontSize="10" fill="#2563EB" fontWeight="bold">h</text>

              {/* Rolling Ball (Animated) */}
              {/* Path calculation from (50, 50) to (180, 160) to (180 + blockShift * 10, 160) */}
              {(() => {
                let bx = 50;
                let by = 55;
                if (ballPosition <= 70) {
                  const t = ballPosition / 70;
                  bx = 50 + t * (175 - 50);
                  by = 55 + t * (160 - 55);
                } else {
                  const t = (ballPosition - 70) / 30;
                  bx = 175 + t * (blockShift * 8);
                  by = 160;
                }
                const r = 8 + (ballMass * 20); // visual radius scales with mass
                return (
                  <g>
                    <circle cx={bx} cy={by} r={r} fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
                    <circle cx={bx - r/3} cy={by - r/3} r={r/3} fill="#93C5FD" />
                  </g>
                );
              })()}

              {/* Wooden Block */}
              {(() => {
                const initialBlockX = 185;
                const currentBlockX = initialBlockX + (blockShift * 8);
                return (
                  <g>
                    <rect 
                      x={currentBlockX} 
                      y="130" 
                      width="35" 
                      height="40" 
                      fill="#D97706" 
                      stroke="#B45309" 
                      strokeWidth="2" 
                      rx="3"
                    />
                    <text x={currentBlockX + 6} y="155" fontSize="11" fill="#FFFFFF" fontWeight="bold">Gỗ</text>
                    
                    {/* Shift distance indicator */}
                    {blockShift > 0 && (
                      <g>
                        <line x1={initialBlockX + 35} y1="185" x2={currentBlockX + 35} y2="185" stroke="#DC2626" strokeWidth="2" />
                        <text x={initialBlockX + 35 + (blockShift * 4) - 15} y="198" fontSize="10" fill="#DC2626" fontWeight="bold">
                          s = {blockShift} cm
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}
            </svg>

            {/* Launch Action Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={runRampSimulation}
                disabled={isRampRunning}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isRampRunning ? 'Đang lăn...' : 'Thả Viên Bi'}</span>
              </button>
            </div>
          </div>

          {/* Real-time Math Feedback Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-1">
              <div className="text-slate-500 font-medium">Tốc độ chân dốc (v):</div>
              <div className="text-lg font-bold text-blue-700 font-mono">
                {velocity.toFixed(2)} m/s
              </div>
              <div className="text-[10px] text-slate-400">v = √(2·g·h)</div>
            </div>

            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs space-y-1">
              <div className="text-emerald-800 font-medium">Động năng viên bi (Wđ):</div>
              <div className="text-lg font-bold text-emerald-700 font-mono">
                {kineticEnergy.toFixed(3)} J
              </div>
              <div className="text-[10px] text-emerald-800">Wđ = 1/2 · m · v²</div>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1">
              <div className="text-amber-800 font-medium">Độ dời miếng gỗ (s):</div>
              <div className="text-lg font-bold text-amber-700 font-mono">
                {blockShift > 0 ? `${blockShift} cm` : 'Chưa va chạm'}
              </div>
              <div className="text-[10px] text-amber-800">Tỉ lệ thuận với động năng Wđ</div>
            </div>
          </div>

          {/* Mini Interactive Reflection Check */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Câu hỏi kiểm tra nhanh từ thí nghiệm vừa quan sát:</span>
            </div>
            <p className="text-xs text-slate-700">
              Để miếng gỗ bị đẩy trượt một quãng đường <strong>dài hơn gấp 2 lần</strong>, ta có thể:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setRampQuizAnswer(1);
                  onAddXP(30);
                }}
                className={`p-2.5 text-xs text-left rounded-lg border font-medium transition-colors ${
                  rampQuizAnswer === 1
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
                }`}
              >
                A. Tăng khối lượng viên bi m lên gấp 2 lần từ cùng độ cao
              </button>
              <button
                onClick={() => setRampQuizAnswer(2)}
                className={`p-2.5 text-xs text-left rounded-lg border font-medium transition-colors ${
                  rampQuizAnswer === 2
                    ? 'bg-red-50 border-red-400 text-red-900 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
                }`}
              >
                B. Giảm khối lượng viên bi xuống 2 lần
              </button>
            </div>
            {rampQuizAnswer === 1 && (
              <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                🎉 Chính xác! Wđ = 1/2 m v². Khi m tăng 2 lần (v không đổi) thì Wđ tăng 2 lần, công sinh ra tăng 2 lần làm miếng gỗ trượt xa gấp đôi (+30 XP)!
              </div>
            )}
            {rampQuizAnswer === 2 && (
              <div className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-200">
                Chưa đúng. Giảm m sẽ làm giảm động năng, khiến miếng gỗ trượt ngắn hơn.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SIMULATION 2: POTENTIAL PILE DRIVER */}
      {activeSim === 'potential' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Mô phỏng thí nghiệm Hình 2.3 SGK</span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Khảo Sát Thế Năng Búa Máy Đóng Cọc</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                Đã thử nghiệm: {potentialTestedCount} lần
              </span>
              <button
                onClick={resetHammer}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
              </button>
            </div>
          </div>

          {/* Interactive Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {/* Control 1: Hammer Mass */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Khối lượng quả nặng búa (m):</span>
                <span className="font-mono font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {hammerMass} kg (P ≈ {(hammerMass * 9.8).toFixed(1)} N)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={hammerMass}
                disabled={isHammerDropping}
                onChange={(e) => {
                  setHammerMass(parseInt(e.target.value));
                  resetHammer();
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 kg</span>
                <span>3 kg</span>
                <span>6 kg (Rất nặng)</span>
              </div>
            </div>

            {/* Control 2: Drop Height */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Độ cao thả búa (h so với đầu cọc):</span>
                <span className="font-mono font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {dropHeight.toFixed(1)} mét
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.5"
                value={dropHeight}
                disabled={isHammerDropping}
                onChange={(e) => {
                  setDropHeight(parseFloat(e.target.value));
                  resetHammer();
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.5 m</span>
                <span>1.5 m</span>
                <span>3.0 m (Rất cao)</span>
              </div>
            </div>
          </div>

          {/* SVG Animated Stage */}
          <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-4 h-64 flex flex-col justify-end overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
              {/* Sand / Earth Layer */}
              <rect x="150" y="160" width="300" height="70" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="4" />
              <text x="160" y="215" fontSize="12" fill="#B45309" fontWeight="bold">Nền Cát Xốp (Khay cát)</text>

              {/* Measuring vertical scale */}
              <line x1="220" y1="20" x2="220" y2="160" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
              <text x="200" y="80" fontSize="11" fill="#64748B" fontWeight="bold">h={dropHeight}m</text>

              {/* Wooden Pile */}
              {(() => {
                const initialTopY = 110;
                const sinkOffset = pileDepth * 3.5;
                const pileY = initialTopY + (isHammerDropping ? (hammerY / 100) * sinkOffset : sinkOffset);
                return (
                  <g>
                    <rect x="280" y={pileY} width="40" height="90" fill="#92400E" stroke="#78350F" strokeWidth="2" rx="2" />
                    <text x="290" y={pileY + 30} fontSize="11" fill="#FFFFFF" fontWeight="bold">Cọc</text>
                    {pileDepth > 0 && (
                      <text x="330" y={pileY + 20} fontSize="11" fill="#DC2626" fontWeight="bold">
                        Lún: {pileDepth} cm
                      </text>
                    )}
                  </g>
                );
              })()}

              {/* Hammer (Falling Weight) */}
              {(() => {
                const startY = 30 + (3.0 - dropHeight) * 25;
                const targetY = 85 + (pileDepth * 3.5);
                const currentY = startY + (hammerY / 100) * (targetY - startY);
                const hammerW = 30 + hammerMass * 6;
                const hammerH = 25 + hammerMass * 3;
                const hammerX = 300 - hammerW / 2;

                return (
                  <g>
                    {/* Hanging rope */}
                    <line x1="300" y1="0" x2="300" y2={currentY} stroke="#475569" strokeWidth="2" />
                    <rect 
                      x={hammerX} 
                      y={currentY} 
                      width={hammerW} 
                      height={hammerH} 
                      fill="#1E293B" 
                      stroke="#0F172A" 
                      strokeWidth="2" 
                      rx="4" 
                    />
                    <text x={300 - 10} y={currentY + hammerH / 2 + 4} fontSize="10" fill="#FFFFFF" fontWeight="bold">
                      {hammerMass}kg
                    </text>
                  </g>
                );
              })()}
            </svg>

            {/* Launch Action Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={runHammerSimulation}
                disabled={isHammerDropping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isHammerDropping ? 'Đang rơi...' : 'Thả Rơi Búa'}</span>
              </button>
            </div>
          </div>

          {/* Real-time Math Feedback Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-1">
              <div className="text-slate-500 font-medium">Trọng lượng búa (P):</div>
              <div className="text-lg font-bold text-blue-700 font-mono">
                {(hammerMass * 9.8).toFixed(1)} N
              </div>
              <div className="text-[10px] text-slate-400">P = m · g (g = 9.8 m/s²)</div>
            </div>

            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs space-y-1">
              <div className="text-emerald-800 font-medium">Thế năng ban đầu (Wt):</div>
              <div className="text-lg font-bold text-emerald-700 font-mono">
                {potentialEnergy.toFixed(1)} J
              </div>
              <div className="text-[10px] text-emerald-800">Wt = P · h = m · g · h</div>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1">
              <div className="text-amber-800 font-medium">Độ lún của cọc vào cát:</div>
              <div className="text-lg font-bold text-amber-700 font-mono">
                {pileDepth > 0 ? `${pileDepth} cm` : 'Chưa va chạm'}
              </div>
              <div className="text-[10px] text-amber-800">Tỉ lệ thuận với thế năng Wt</div>
            </div>
          </div>

          {/* Mini Interactive Reflection Check */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Câu hỏi kiểm tra nhanh từ thí nghiệm búa máy:</span>
            </div>
            <p className="text-xs text-slate-700">
              Nếu giữ nguyên độ cao h = 1.5 m nhưng <strong>tăng khối lượng búa từ 2 kg lên 4 kg</strong>, thế năng và độ lún cọc thay đổi thế nào?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setPotentialQuizAnswer(1);
                  onAddXP(30);
                }}
                className={`p-2.5 text-xs text-left rounded-lg border font-medium transition-colors ${
                  potentialQuizAnswer === 1
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
                }`}
              >
                A. Cả thế năng Wt và độ lún của cọc đều tăng gấp đôi (2 lần)
              </button>
              <button
                onClick={() => setPotentialQuizAnswer(2)}
                className={`p-2.5 text-xs text-left rounded-lg border font-medium transition-colors ${
                  potentialQuizAnswer === 2
                    ? 'bg-red-50 border-red-400 text-red-900 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
                }`}
              >
                B. Thế năng tăng gấp 4 lần vì tỉ lệ với m²
              </button>
            </div>
            {potentialQuizAnswer === 1 && (
              <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                🎉 Hoàn toàn chuẩn xác! Wt = m.g.h tỉ lệ thuận bậc nhất với khối lượng m. Do đó khi m tăng gấp 2 thì Wt tăng gấp 2, cọc lún sâu gấp đôi (+30 XP)!
              </div>
            )}
            {potentialQuizAnswer === 2 && (
              <div className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-200">
                Chưa chính xác. Thế năng Wt = m.g.h tỉ lệ thuận bậc nhất với m, không có bình phương m².
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
