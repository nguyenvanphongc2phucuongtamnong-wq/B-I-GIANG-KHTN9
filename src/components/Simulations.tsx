import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  RotateCcw, 
  Eye, 
  Flame, 
  Sun, 
  Layers, 
  Info,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

// 1. Galvanometer & Induction Coil Simulation
export const GalvanometerSim: React.FC = () => {
  const [magnetPos, setMagnetPos] = useState<number>(0); // -100 to 100
  const [needleAngle, setNeedleAngle] = useState<number>(0); // degrees: negative = left, positive = right
  const [ledStatus, setLedStatus] = useState<'none' | 'led1' | 'led2'>('none');
  const [lastAction, setLastAction] = useState<string>('Thanh nam châm đang đứng yên');

  const moveMagnet = (direction: 'in' | 'out' | 'stop') => {
    if (direction === 'in') {
      setMagnetPos(60);
      setNeedleAngle(35); // deflects right
      setLedStatus('led1'); // Red LED lights up
      setLastAction('Đưa cực Bắc nam châm LẠI GẦN cuộn dây ➔ Dòng điện cảm ứng xuất hiện, kim lệch SANG PHẢI, đèn LED Đ1 sáng');
    } else if (direction === 'out') {
      setMagnetPos(-60);
      setNeedleAngle(-35); // deflects left
      setLedStatus('led2'); // Yellow LED lights up
      setLastAction('Rút cực Bắc nam châm RA XA cuộn dây ➔ Dòng điện cảm ứng ĐỔI CHIỀU, kim lệch SANG TRÁI, đèn LED Đ2 sáng');
    } else {
      setMagnetPos(0);
      setNeedleAngle(0); // center zero
      setLedStatus('none');
      setLastAction('Nam châm đứng yên ➔ Số đường sức từ không đổi, KHÔNG có dòng điện cảm ứng, kim ở vạch 0');
    }
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
            <Zap className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Điện kế Kim Giữa & Cuộn Dây 2 Đèn LED</h4>
            <p className="text-xs text-slate-400">Hình 1.4 & Hình 1.6 SGK KHTN 9 (trang 7)</p>
          </div>
        </div>
        <button 
          onClick={() => moveMagnet('stop')}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded flex items-center gap-1 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
        </button>
      </div>

      {/* Visual Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
        {/* Left: Magnet & Coil */}
        <div className="relative h-48 bg-slate-900/60 rounded-lg p-3 flex flex-col justify-between overflow-hidden border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">Tương tác di chuyển nam châm:</div>
          
          {/* Track */}
          <div className="relative flex items-center justify-center h-24">
            {/* Coil */}
            <div className="relative z-10 w-24 h-24 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-lg border-2 border-amber-500 shadow-lg flex flex-col items-center justify-center p-2">
              <div className="w-16 h-16 border-2 border-dashed border-amber-300 rounded-full flex items-center justify-center bg-slate-950/80">
                <span className="text-[10px] text-amber-300 font-mono font-bold text-center leading-tight">CUỘN<br/>DÂY</span>
              </div>
            </div>

            {/* Moving Magnet */}
            <div 
              className="absolute z-20 flex items-center transition-all duration-300 ease-out shadow-2xl cursor-grab"
              style={{ transform: `translateX(${magnetPos}px)` }}
            >
              <div className="w-12 h-8 bg-red-600 text-white font-bold text-xs flex items-center justify-center rounded-l border-y border-l border-red-400">
                N (Bắc)
              </div>
              <div className="w-12 h-8 bg-blue-600 text-white font-bold text-xs flex items-center justify-center rounded-r border-y border-r border-blue-400">
                S (Nam)
              </div>
            </div>
          </div>

          {/* LED Indicators */}
          <div className="flex items-center justify-around bg-slate-950/90 py-1.5 px-3 rounded-md border border-slate-800">
            <div className="flex items-center gap-1.5">
              <div className={`w-3.5 h-3.5 rounded-full border transition-all ${ledStatus === 'led1' ? 'bg-red-500 border-red-300 shadow-[0_0_12px_rgba(239,68,68,0.9)] animate-pulse' : 'bg-red-950 border-red-900 opacity-40'}`} />
              <span className={`text-[11px] font-medium ${ledStatus === 'led1' ? 'text-red-400 font-bold' : 'text-slate-500'}`}>LED Đ1 (Đỏ)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-3.5 h-3.5 rounded-full border transition-all ${ledStatus === 'led2' ? 'bg-amber-400 border-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse' : 'bg-amber-950 border-amber-900 opacity-40'}`} />
              <span className={`text-[11px] font-medium ${ledStatus === 'led2' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>LED Đ2 (Vàng)</span>
            </div>
          </div>
        </div>

        {/* Right: Galvanometer Dial */}
        <div className="flex flex-col items-center justify-center bg-slate-900/60 p-4 rounded-lg border border-slate-800">
          <div className="text-xs font-semibold text-slate-300 mb-2">ĐIỆN KẾ (Vạch 0 ở chính giữa)</div>
          
          {/* Dial Face */}
          <div className="relative w-44 h-28 bg-amber-50 rounded-t-full border-4 border-slate-700 shadow-inner flex flex-col items-center justify-end overflow-hidden pt-2 px-2">
            {/* Scale Markings */}
            <div className="absolute top-2 w-36 flex justify-between text-[9px] font-bold text-slate-700">
              <span>-30</span>
              <span>-20</span>
              <span>-10</span>
              <span className="text-red-600 font-black text-xs">0</span>
              <span>+10</span>
              <span>+20</span>
              <span>+30</span>
            </div>

            {/* Arc */}
            <div className="w-32 h-16 border-t-2 border-slate-400 rounded-t-full mb-1"></div>

            {/* Pointer Needle */}
            <div 
              className="absolute bottom-0 w-1 h-20 bg-red-600 origin-bottom transition-transform duration-300 ease-out shadow-md"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-2.5 h-2.5 bg-red-800 rounded-full -ml-0.75 absolute -bottom-1"></div>
            </div>
          </div>

          <div className="mt-2 text-xs text-center font-mono">
            Độ lệch kim: <span className={needleAngle > 0 ? 'text-emerald-400 font-bold' : needleAngle < 0 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
              {needleAngle > 0 ? `+${needleAngle}° (Sang Phải)` : needleAngle < 0 ? `${needleAngle}° (Sang Trái)` : '0° (Chính Giữa)'}
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => moveMagnet('in')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-xl shadow flex items-center gap-1.5 transition-all active:scale-95"
        >
          <ArrowRight className="w-4 h-4" /> Đưa nam châm lại gần cuộn dây
        </button>
        <button
          onClick={() => moveMagnet('out')}
          className="bg-sky-600 hover:bg-sky-500 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-xl shadow flex items-center gap-1.5 transition-all active:scale-95"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Rút nam châm ra xa cuộn dây
        </button>
        <button
          onClick={() => moveMagnet('stop')}
          className="bg-slate-700 hover:bg-slate-600 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95"
        >
          Dừng nam châm
        </button>
      </div>

      {/* Status Box */}
      <div className="mt-3 p-2.5 bg-slate-800/80 rounded-xl text-xs text-slate-200 border border-slate-700 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300">Hiện tượng quan sát: </span>
          {lastAction}
        </div>
      </div>
    </div>
  );
};

// 2. Separatory Funnel Simulation
export const SeparatoryFunnelSim: React.FC = () => {
  const [valveOpen, setValveOpen] = useState(false);
  const [waterLevel, setWaterLevel] = useState(50); // percentage of water remaining in funnel (0 = drained)
  const [beakerWater, setBeakerWater] = useState(0); // water collected in beaker
  const [statusMsg, setStatusMsg] = useState('Hỗn hợp dầu ăn (nổi trên) và nước (chìm dưới) đã phân lớp hoàn toàn.');

  const toggleValve = () => {
    if (!valveOpen) {
      setValveOpen(true);
      setStatusMsg('Van đang mở: Lớp nước nặng hơn đang từ từ chảy xuống cốc hứng bên dưới.');
      const interval = setInterval(() => {
        setWaterLevel((prev) => {
          if (prev <= 5) {
            clearInterval(interval);
            setValveOpen(false);
            setStatusMsg('Đã khoá van kịp thời! Tách hoàn toàn nước ra cốc, giữ lại 100% dầu ăn trong phễu chiết.');
            return 0;
          }
          return prev - 5;
        });
        setBeakerWater((prev) => Math.min(prev + 5, 50));
      }, 250);
    } else {
      setValveOpen(false);
      setStatusMsg('Đã đóng khoá van.');
    }
  };

  const resetFunnel = () => {
    setValveOpen(false);
    setWaterLevel(50);
    setBeakerWater(0);
    setStatusMsg('Đã đổ lại hỗn hợp dầu ăn và nước vào phễu chiết.');
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <Layers className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Tách Chất Lỏng Bằng Phễu Chiết</h4>
            <p className="text-xs text-slate-400">Hình 1.8b SGK KHTN 9 (trang 8)</p>
          </div>
        </div>
        <button 
          onClick={resetFunnel}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded flex items-center gap-1 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Làm lại
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
        {/* Visual Graphic */}
        <div className="flex flex-col items-center justify-center p-2">
          {/* Funnel Outline */}
          <div className="relative w-36 h-48 flex flex-col items-center">
            {/* Funnel Bulb */}
            <div className="w-28 h-32 rounded-b-[45px] border-2 border-sky-400/50 bg-slate-900/60 overflow-hidden relative shadow-lg">
              {/* Oil Layer (Top, always stays ~40%) */}
              <div className="w-full h-14 bg-amber-400/80 border-b border-amber-300 flex items-center justify-center text-[11px] font-bold text-amber-950 shadow-inner">
                DẦU ĂN (nhẹ hơn)
              </div>
              {/* Water Layer (Bottom, drains) */}
              <div 
                className="w-full bg-cyan-500/70 transition-all duration-200 flex items-center justify-center text-[11px] font-bold text-cyan-950"
                style={{ height: `${waterLevel}%` }}
              >
                {waterLevel > 10 ? 'NƯỚC (nặng hơn)' : ''}
              </div>
            </div>

            {/* Funnel Stem & Valve */}
            <div className="w-4 h-12 bg-sky-400/40 relative flex items-center justify-center border-x border-sky-400/60">
              {/* Valve switch */}
              <button 
                onClick={toggleValve}
                className={`absolute w-7 h-3 rounded transition-colors ${valveOpen ? 'bg-emerald-500 rotate-90 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-red-500'}`}
                title="Bấm để đóng / mở khoá van"
              />
              {/* Water droplet stream */}
              {valveOpen && (
                <div className="w-1.5 h-full bg-cyan-400 animate-pulse" />
              )}
            </div>
          </div>

          {/* Beaker Below */}
          <div className="w-24 h-16 border-2 border-slate-500 rounded-b-lg bg-slate-900/50 overflow-hidden relative mt-1 flex flex-col justify-end">
            <div 
              className="w-full bg-cyan-500/80 transition-all duration-200 flex items-center justify-center text-[9px] text-cyan-950 font-bold"
              style={{ height: `${(beakerWater / 50) * 100}%` }}
            >
              {beakerWater > 10 ? 'Nước thu được' : ''}
            </div>
          </div>
        </div>

        {/* Explanations & Controls */}
        <div className="space-y-3">
          <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
            <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Nguyên lý phương pháp chiết:
            </div>
            <p className="text-slate-300 leading-relaxed">
              Áp dụng cho hai chất lỏng <strong>không hoà tan vào nhau</strong> và có khối lượng riêng khác nhau. Chất lỏng nặng hơn chìm xuống dưới, chất lỏng nhẹ hơn nổi lên trên.
            </p>
          </div>

          <button
            onClick={toggleValve}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              valveOpen 
                ? 'bg-amber-600 hover:bg-amber-500 text-white animate-pulse' 
                : waterLevel === 0 
                  ? 'bg-emerald-700 text-white cursor-default' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
            }`}
          >
            {valveOpen ? '🛑 KHÓA VAN LẠI NGAY!' : waterLevel === 0 ? '✅ ĐÃ TÁCH XONG HOÀN TOÀN' : '🚰 MỞ KHOÁ VAN ĐỂ XẢ NƯỚC'}
          </button>

          <div className="p-2.5 bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-700">
            <span className="text-amber-400 font-semibold">Trạng thái: </span>
            {statusMsg}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Thermal Mesh & Glassware Simulation
export const ThermalMeshSim: React.FC = () => {
  const [hasMesh, setHasMesh] = useState<boolean>(true);
  const [isHeating, setIsHeating] = useState<boolean>(false);
  const [glassBroken, setGlassBroken] = useState<boolean>(false);

  const startHeating = () => {
    setIsHeating(true);
    setGlassBroken(false);
    setTimeout(() => {
      if (!hasMesh) {
        setGlassBroken(true);
      }
    }, 1200);
  };

  const resetHeating = () => {
    setIsHeating(false);
    setGlassBroken(false);
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-orange-500/20 text-orange-400 rounded-lg">
            <Flame className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Vai Trò Của Lưới Tản Nhiệt</h4>
            <p className="text-xs text-slate-400">Hình 1.10 & Câu hỏi 2 SGK KHTN 9 (trang 8)</p>
          </div>
        </div>
        <button 
          onClick={resetHeating}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded flex items-center gap-1 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Thử lại
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
        {/* Graphic */}
        <div className="relative h-56 bg-slate-900/80 rounded-xl p-3 flex flex-col items-center justify-end overflow-hidden border border-slate-800">
          {/* Glass Beaker */}
          <div className={`relative w-24 h-28 border-2 ${glassBroken ? 'border-red-500 border-dashed animate-bounce' : 'border-cyan-400'} rounded-b-md bg-cyan-900/20 flex flex-col justify-end p-1`}>
            {glassBroken ? (
              <div className="text-center text-[10px] text-red-400 font-bold p-1 bg-red-950/80 rounded">
                ⚡ VỠ CỐC!<br/>Do sốc nhiệt cục bộ!
              </div>
            ) : (
              <div className="w-full h-16 bg-cyan-500/40 rounded-b flex items-center justify-center text-[9px] text-cyan-200">
                {isHeating ? 'Đang sôi êm dịu...' : 'Dung dịch cần đun'}
              </div>
            )}
          </div>

          {/* Thermal Mesh */}
          <div className="relative w-32 h-3 my-1">
            {hasMesh ? (
              <div className="w-full h-full bg-neutral-400 border border-neutral-300 rounded flex items-center justify-center shadow-md">
                <div className="w-16 h-2 bg-neutral-200 rounded-sm"></div>
              </div>
            ) : (
              <div className="w-full h-full border border-dashed border-red-500/40 rounded flex items-center justify-center text-[9px] text-red-400">
                Không có lưới tản nhiệt
              </div>
            )}
          </div>

          {/* Burner Flame */}
          <div className="flex flex-col items-center">
            {isHeating ? (
              <div className="w-6 h-8 bg-gradient-to-t from-orange-600 via-amber-400 to-transparent rounded-full animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
            ) : (
              <div className="w-2 h-4 bg-slate-600 rounded-t" />
            )}
            <div className="w-16 h-8 bg-amber-900/60 rounded-t border-t border-amber-700 flex items-center justify-center text-[10px] text-amber-200 font-medium">
              Đèn cồn
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">Chọn cấu hình thí nghiệm:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setHasMesh(true); resetHeating(); }}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  hasMesh ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Có Lưới Tản Nhiệt
              </button>
              <button
                onClick={() => { setHasMesh(false); resetHeating(); }}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  !hasMesh ? 'bg-red-600/30 border-red-400 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Bỏ Lưới Tản Nhiệt
              </button>
            </div>
          </div>

          <button
            onClick={startHeating}
            disabled={isHeating}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 ${
              isHeating ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg'
            }`}
          >
            <Flame className="w-4 h-4" /> {isHeating ? 'Đang cấp nhiệt đèn cồn...' : 'Châm lửa đốt đèn cồn'}
          </button>

          <div className="p-2.5 bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-700">
            {hasMesh ? (
              <span className="text-emerald-300 font-medium">
                ✅ Lưới tản nhiệt phân tán đều nhiệt lượng khắp đáy cốc thuỷ tinh ➔ Dung dịch sôi an toàn, không nứt vỡ.
              </span>
            ) : (
              <span className="text-red-300 font-medium">
                ⚠️ Không có lưới tản nhiệt ➔ Nhiệt tụ lại 1 điểm khiến thuỷ tinh giãn nở cục bộ, dẫn đến vỡ cốc và đổ hoá chất!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Amber Bottle / Light Sensitive Chemical Simulation
export const AmberBottleSim: React.FC = () => {
  const [bottleType, setBottleType] = useState<'amber' | 'clear'>('amber');
  const [lightOn, setLightOn] = useState<boolean>(false);
  const [degraded, setDegraded] = useState<boolean>(false);

  const toggleLight = () => {
    const nextLight = !lightOn;
    setLightOn(nextLight);
    if (nextLight && bottleType === 'clear') {
      setTimeout(() => setDegraded(true), 600);
    } else if (!nextLight) {
      setDegraded(false);
    }
  };

  const handleBottleChange = (type: 'amber' | 'clear') => {
    setBottleType(type);
    setDegraded(false);
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
            <Sun className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Bảo Quản Hoá Chất Nhạy Sáng (AgNO3, KMnO4)</h4>
            <p className="text-xs text-slate-400">Mục II SGK KHTN 9 (trang 9)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
        {/* Visual Graphic */}
        <div className="relative h-48 bg-slate-900/60 rounded-xl p-3 flex flex-col items-center justify-center border border-slate-800">
          {/* Light Rays */}
          {lightOn && (
            <div className="absolute top-2 w-full flex justify-center gap-3 animate-pulse">
              <span className="text-xs font-bold text-amber-300">☀️ Tia sáng mặt trời / Ánh sáng đèn mạnh</span>
            </div>
          )}

          {/* Bottle Graphic */}
          <div className="relative w-24 h-36 flex flex-col items-center mt-4">
            {/* Cap */}
            <div className="w-8 h-4 bg-slate-700 rounded-t border-t border-slate-500"></div>
            {/* Neck */}
            <div className={`w-6 h-3 ${bottleType === 'amber' ? 'bg-amber-900 border-amber-950' : 'bg-slate-200/30 border-slate-400'} border-x`}></div>
            {/* Body */}
            <div className={`w-20 h-28 rounded-lg relative overflow-hidden border-2 flex flex-col items-center justify-center p-1.5 ${
              bottleType === 'amber' 
                ? 'bg-amber-950/90 border-amber-800 text-amber-200' 
                : 'bg-slate-100/20 border-slate-400 text-slate-100'
            }`}>
              {/* Chemical Substance inside */}
              <div className={`w-full h-16 rounded transition-colors duration-500 flex flex-col items-center justify-center text-[10px] font-bold p-1 text-center ${
                bottleType === 'amber' 
                  ? 'bg-amber-900 text-amber-200' 
                  : degraded 
                    ? 'bg-slate-900 text-red-400 border border-red-500' 
                    : 'bg-sky-100/40 text-slate-800'
              }`}>
                {degraded ? (
                  <span>❌ KẾT TỦA ĐEN<br/>(Bị phân huỷ quang hoá)</span>
                ) : (
                  <span>Dung dịch AgNO3 tinh khiết</span>
                )}
              </div>
              <span className="text-[9px] mt-1 font-mono font-bold bg-white/10 px-1 rounded">
                {bottleType === 'amber' ? 'Lọ nâu sẫm' : 'Lọ trong suốt'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Chọn loại lọ chứa:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleBottleChange('amber')}
                className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                  bottleType === 'amber' ? 'bg-amber-600/30 border-amber-400 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Lọ Tối Màu (Nâu sẫm)
              </button>
              <button
                onClick={() => handleBottleChange('clear')}
                className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                  bottleType === 'clear' ? 'bg-sky-600/30 border-sky-400 text-sky-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Lọ Trong Suốt
              </button>
            </div>
          </div>

          <button
            onClick={toggleLight}
            className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              lightOn ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <Sun className="w-4 h-4" /> {lightOn ? 'Tắt nguồn sáng chiếu vào' : 'Chiếu ánh sáng vào lọ hoá chất'}
          </button>

          <div className="p-2.5 bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-700">
            {bottleType === 'amber' ? (
              <span className="text-emerald-300 font-medium">
                ✅ Lọ tối màu (hoặc bọc giấy đen) hấp thụ ánh sáng, ngăn cản phản ứng quang hoá ➔ Hoá chất giữ nguyên phẩm chất tinh khiết!
              </span>
            ) : degraded ? (
              <span className="text-red-400 font-medium">
                ❌ Ánh sáng kích hoạt phản ứng quang hoá: 2AgNO3 ➔ 2Ag (đen) + 2NO2 + O2 ➔ Hoá chất bị hư hỏng hoàn toàn!
              </span>
            ) : (
              <span className="text-slate-300">
                Hãy bật nguồn sáng để kiểm tra xem điều gì xảy ra với lọ hoá chất trong suốt!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Immersion Oil Microscopy Simulation
export const ImmersionOilSim: React.FC = () => {
  const [hasOil, setHasOil] = useState<boolean>(true);

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg">
            <Eye className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Quan Sát NST Dưới Vật Kính 100x & Dầu Soi</h4>
            <p className="text-xs text-slate-400">Hình 1.11 SGK KHTN 9 (trang 8)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
        {/* Microscope View */}
        <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-slate-600 bg-black overflow-hidden flex items-center justify-center shadow-2xl">
          {hasOil ? (
            /* Clear Chromosomes */
            <div className="relative w-full h-full bg-slate-900/90 flex flex-col items-center justify-center p-4">
              <div className="flex gap-4 items-center animate-pulse">
                {/* Chromosome Pair 1 */}
                <div className="w-3 h-14 bg-purple-500 rounded-full rotate-12 shadow-[0_0_8px_rgba(168,85,247,0.8)] border border-purple-200"></div>
                <div className="w-3 h-14 bg-purple-500 rounded-full -rotate-12 shadow-[0_0_8px_rgba(168,85,247,0.8)] border border-purple-200"></div>
                {/* Chromosome Pair 2 */}
                <div className="w-2.5 h-10 bg-indigo-400 rounded-full rotate-45 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></div>
              </div>
              <div className="absolute bottom-3 text-[10px] text-emerald-400 font-mono font-bold bg-slate-950/80 px-2 py-0.5 rounded">
                1000x: Sắc nét từng sợi NST
              </div>
            </div>
          ) : (
            /* Blurry Dark View */
            <div className="relative w-full h-full bg-slate-950/95 flex flex-col items-center justify-center p-4 filter blur-[2px] opacity-40">
              <div className="w-8 h-8 bg-purple-900 rounded-full"></div>
              <div className="absolute bottom-3 text-[10px] text-red-400 font-mono font-bold bg-black/90 px-2 py-0.5 rounded">
                Mờ tối, tán xạ ánh sáng!
              </div>
            </div>
          )}
        </div>

        {/* Comparison & Controls */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setHasOil(true)}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                hasOil ? 'bg-purple-600/40 border-purple-400 text-purple-200 shadow' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              💧 Nhỏ giọt dầu soi (n = 1,515)
            </button>
            <button
              onClick={() => setHasOil(false)}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                !hasOil ? 'bg-red-600/40 border-red-400 text-red-200 shadow' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              🚫 Không dùng dầu soi
            </button>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800 space-y-1.5">
            <div className="font-bold text-purple-300">Giải thích hiện tượng khúc xạ:</div>
            <p className="leading-relaxed">
              Chiết suất của dầu soi (n ≈ 1,515) bằng với chiết suất của thuỷ tinh lamen. Nhờ vậy chùm tia sáng đi thẳng vào thấu kính vật kính 100x hẹp mà <strong>không bị khúc xạ lệch ra không khí</strong>, thu đủ quang năng để hiện rõ từng nhiễm sắc thể!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Optics & Magnifying Glass Simulation (SGK KHTN 9 Trang 6)
export const OpticsSim: React.FC = () => {
  const [distance, setDistance] = useState<number>(6); // cm
  const focalLength = 10; // cm

  // Khi d < f: Cho ảnh ảo, cùng chiều, lớn hơn vật
  const isVirtual = distance < focalLength;
  const magnification = isVirtual ? Math.round((focalLength / (focalLength - distance)) * 10) / 10 : 1;

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
            <Eye className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Quan sát qua Kính lúp & Thấu kính hội tụ</h4>
            <p className="text-xs text-slate-400">Hình 1.1 SGK KHTN 9 (trang 6)</p>
          </div>
        </div>
        <button
          onClick={() => setDistance(6)}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded flex items-center gap-1 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
        {/* Visual Stage */}
        <div className="relative h-52 bg-slate-900/70 rounded-xl p-3 flex flex-col items-center justify-center border border-slate-800 overflow-hidden">
          {/* Magnified view circle */}
          <div className="relative w-36 h-36 rounded-full border-4 border-sky-400/80 bg-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <div 
              className="transition-transform duration-200 text-center flex flex-col items-center justify-center"
              style={{ transform: `scale(${Math.min(magnification, 3.5)})` }}
            >
              <div className="w-8 h-8 rounded-full border border-emerald-400 bg-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-200 font-bold">
                Tế bào
              </div>
              <span className="text-[7px] text-emerald-300 font-mono">d={distance}cm</span>
            </div>
            {/* Lens handle visual */}
            <div className="absolute -bottom-8 w-3 h-10 bg-gradient-to-b from-slate-400 to-slate-700 rounded-b shadow-lg -rotate-45 translate-x-12 translate-y-3" />
          </div>

          <div className="mt-2 text-xs font-mono text-sky-300">
            Độ phóng đại ảnh: <b>{magnification}x</b> ({isVirtual ? 'Ảnh ảo, cùng chiều' : 'Ngoài tiêu cự'})
          </div>
        </div>

        {/* Controls & Science Explanation */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Khoảng cách từ vật đến kính lúp (d):</span>
              <span className="font-bold text-sky-400">{distance} cm</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>2 cm (Rất gần)</span>
              <span className="text-amber-400 font-bold">Tiêu cự f = 10 cm</span>
              <span>15 cm (Ngoài f)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800 space-y-1.5">
            <div className="font-bold text-sky-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Quy tắc tạo ảnh của kính lúp (SGK KHTN 9):
            </div>
            <p className="leading-relaxed text-slate-300">
              Kính lúp là thấu kính hội tụ có tiêu cự ngắn. Khi đặt vật nằm <strong>trong khoảng tiêu cự (d &lt; f)</strong>, kính cho ảnh ảo, cùng chiều và lớn hơn vật, giúp mắt quan sát các chi tiết siêu nhỏ một cách rõ nét!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Aliases for compatibility
export const ChemistrySeparationSim = SeparatoryFunnelSim;

// ============================================================================
// BÀI 2 SGK KHTN 9: MÔ PHỎNG ĐỘNG NĂNG (Hình 2.1 & 2.2 SGK trang 15 - 16)
// Công thức chuẩn: Wđ = 1/2 * m * v²
// ============================================================================
export const KineticEnergySim: React.FC = () => {
  const [mass, setMass] = useState<number>(2); // kg
  const [velocity, setVelocity] = useState<number>(10); // m/s (36 km/h)
  const [objectType, setObjectType] = useState<'hammer' | 'car' | 'ball'>('hammer');

  // Tính động năng chuẩn Wđ = 1/2 * m * v²
  const kineticEnergy = 0.5 * mass * Math.pow(velocity, 2);
  const velocityKmh = (velocity * 3.6).toFixed(1);

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
            <Zap className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Khảo Sát Động Năng Wđ = ½ · m · v²</h4>
            <p className="text-xs text-slate-400">Bám sát Hình 2.1 & Hình 2.2 SGK KHTN 9 (trang 15 - 16)</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setMass(5); setVelocity(8); setObjectType('hammer'); }}
            className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${objectType === 'hammer' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Búa đóng đập thép
          </button>
          <button
            onClick={() => { setMass(1200); setVelocity(20); setObjectType('car'); }}
            className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${objectType === 'car' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Ô tô cao tốc
          </button>
          <button
            onClick={() => { setMass(0.45); setVelocity(15); setObjectType('ball'); }}
            className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${objectType === 'ball' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Quả bóng đá (0,45kg)
          </button>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 items-center">
        {/* Visual representation */}
        <div className="relative h-56 bg-slate-900/70 rounded-xl p-4 flex flex-col justify-between overflow-hidden border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300">
              {objectType === 'hammer' && 'Búa cơ học va chạm thanh thép (Hình 2.1 SGK)'}
              {objectType === 'car' && 'Ô tô di chuyển trên đường (Hình 2.2b SGK)'}
              {objectType === 'ball' && 'Quả bóng đá bay với vận tốc v (SGK trang 16)'}
            </span>
            <span className="px-2 py-0.5 bg-blue-900/60 border border-blue-700 text-blue-300 rounded text-[11px] font-mono">
              v = {velocity} m/s ({velocityKmh} km/h)
            </span>
          </div>

          {/* Animation track */}
          <div className="relative h-28 border-b-2 border-slate-600 flex items-end px-4 pb-1">
            {/* Object moving */}
            <div 
              className="transition-all duration-200 flex flex-col items-center"
              style={{ transform: `translateX(${Math.min(220, (velocity / 30) * 200)}px)` }}
            >
              {objectType === 'hammer' && (
                <div className="text-4xl filter drop-shadow-[0_4px_8px_rgba(59,130,246,0.5)]">🔨</div>
              )}
              {objectType === 'car' && (
                <div className="text-4xl filter drop-shadow-[0_4px_8px_rgba(59,130,246,0.5)]">🚗</div>
              )}
              {objectType === 'ball' && (
                <div className="text-4xl filter drop-shadow-[0_4px_8px_rgba(59,130,246,0.5)]">⚽</div>
              )}
              <span className="text-[10px] font-bold text-slate-400 mt-1 font-mono">m = {mass} kg</span>
            </div>

            {/* Target block */}
            <div className="absolute right-4 bottom-0 w-10 h-16 bg-gradient-to-t from-slate-600 to-slate-400 rounded-t border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-900 text-center leading-tight">
              Thanh<br/>thép
            </div>
          </div>

          {/* Metric gauge */}
          <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400">Động năng tính toán:</span>
            <span className="text-base font-black text-amber-400 font-mono">
              Wđ = {kineticEnergy >= 1000 ? `${(kineticEnergy / 1000).toFixed(2)} kJ` : `${kineticEnergy.toFixed(1)} J`}
            </span>
          </div>
        </div>

        {/* Sliders & Physics controls */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Khối lượng vật (m):</span>
              <span className="font-bold text-blue-400">{mass} kg</span>
            </div>
            <input
              type="range"
              min={objectType === 'ball' ? "0.1" : objectType === 'hammer' ? "1" : "500"}
              max={objectType === 'ball' ? "1.0" : objectType === 'hammer' ? "20" : "3000"}
              step={objectType === 'ball' ? "0.05" : objectType === 'hammer' ? "1" : "50"}
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Tốc độ chuyển động (v):</span>
              <span className="font-bold text-amber-400">{velocity} m/s ({velocityKmh} km/h)</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 m/s (3.6 km/h)</span>
              <span>20 m/s (72 km/h)</span>
              <span>40 m/s (144 km/h)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Quy luật bình phương vận tốc (SGK trang 16):
            </div>
            <p className="leading-relaxed text-slate-300">
              Khi tốc độ v tăng gấp đôi (2 lần), động năng Wđ tăng <strong>2² = 4 lần</strong>. Đây là lí do các phương tiện giao thông chạy tốc độ cao có lực va chạm và khoảng cách phanh dừng nguy hiểm gấp nhiều lần!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// BÀI 2 SGK KHTN 9: MÔ PHỎNG THẾ NĂNG TRỌNG TRƯỜNG (Hình 2.3 SGK trang 16 - 17)
// Công thức chuẩn: Wt = P * h = 10 * m * h
// ============================================================================
export const PotentialEnergySim: React.FC = () => {
  const [height, setHeight] = useState<number>(20); // mét
  const [weight, setWeight] = useState<number>(500); // Niutơn (P)
  const [referencePoint, setReferencePoint] = useState<'ground' | 'roof'>('ground');

  // Tính độ cao thực tế so với mốc
  const effectiveHeight = referencePoint === 'ground' ? height : Math.max(0, height - 15);
  // Công thức SGK: Wt = P * h
  const potentialEnergy = weight * effectiveHeight;

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Layers className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Khảo Sát Thế Năng Trọng Trường Wt = P · h</h4>
            <p className="text-xs text-slate-400">Bám sát Hình 2.3 (Thuỷ điện) & Bài tập 2 (Bao xi măng 500N) SGK trang 16 - 17</p>
          </div>
        </div>

        {/* Chọn mốc thế năng */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1">Mốc thế năng:</span>
          <button
            onClick={() => setReferencePoint('ground')}
            className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${referencePoint === 'ground' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Mặt đất (h = 0)
          </button>
          <button
            onClick={() => setReferencePoint('roof')}
            className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${referencePoint === 'roof' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Sàn thượng (h0 = 15m)
          </button>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 items-center">
        {/* Hydroelectric Dam & Height Graphic */}
        <div className="relative h-60 bg-slate-900/80 rounded-xl p-4 flex flex-col justify-between overflow-hidden border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300">Đập thuỷ điện & Hồ chứa nước trên cao (Hình 2.3)</span>
            <span className="px-2 py-0.5 bg-emerald-900/60 border border-emerald-700 text-emerald-300 rounded text-[11px] font-mono">
              h = {effectiveHeight} m so với mốc
            </span>
          </div>

          {/* Diagram of water level and dam */}
          <div className="relative h-32 w-full flex items-end justify-between border-b-2 border-emerald-600 px-2 pb-1">
            {/* Water column in reservoir */}
            <div 
              className="w-24 bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg transition-all duration-300 relative flex items-center justify-center text-center p-1"
              style={{ height: `${Math.max(25, (effectiveHeight / 40) * 110)}px` }}
            >
              <span className="text-[10px] font-bold text-white leading-tight">HỒ NƯỚC<br/>P = {weight} N</span>
            </div>

            {/* Water pipe to turbine */}
            <div className="flex-1 h-2 bg-slate-700 relative">
              <div className="absolute inset-0 bg-sky-400/50 animate-pulse" />
            </div>

            {/* Turbine at the bottom */}
            <div className="w-16 h-16 bg-slate-800 border-2 border-amber-500 rounded-full flex flex-col items-center justify-center text-center p-1 shadow-lg">
              <span className="text-[9px] font-black text-amber-300">TUA-BIN</span>
              <span className="text-[8px] text-slate-400">Máy phát điện</span>
            </div>
          </div>

          {/* Metric gauge */}
          <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400">Thế năng trọng trường:</span>
            <span className="text-base font-black text-emerald-400 font-mono">
              Wt = {potentialEnergy >= 1000 ? `${(potentialEnergy / 1000).toFixed(2)} kJ` : `${potentialEnergy} J`}
            </span>
          </div>
        </div>

        {/* Sliders & Physics controls */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Trọng lượng vật (P = 10m):</span>
              <span className="font-bold text-amber-400">{weight} N (m ≈ {Math.round(weight / 10)} kg)</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>50 N (Vật nhỏ)</span>
              <span>500 N (Bao xi măng SGK)</span>
              <span>1000 N (Khối nước lớn)</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Độ cao so với mặt đất (h):</span>
              <span className="font-bold text-emerald-400">{height} mét</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 m (Mặt đất)</span>
              <span>20 m (Toà nhà cao tầng)</span>
              <span>40 m (Đập thuỷ điện lớn)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800 space-y-1.5">
            <div className="font-bold text-sky-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Tính tương đối của mốc thế năng (SGK trang 17):
            </div>
            <p className="leading-relaxed text-slate-300">
              Thế năng phụ thuộc vào vị trí chọn làm mốc. Với cùng vật đó, khi chọn mốc tại mặt đất thì <strong>Wt = {weight * height} J</strong>; nhưng khi chọn mốc tại sàn thượng thì <strong>Wt = {weight * Math.max(0, height - 15)} J</strong>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// THÍ NGHIỆM ẢO BÀI 3: BẢO TOÀN CƠ NĂNG (SGK TRANG 19)
// ============================================================================
export const MechanicalEnergySim: React.FC = () => {
  const [mass, setMass] = useState<number>(1.5); // kg (chuẩn SGK trang 19)
  const [initHeight, setInitHeight] = useState<number>(4); // mét (chuẩn SGK)
  const [currentHeight, setCurrentHeight] = useState<number>(4);
  const [velocity, setVelocity] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [airResistance, setAirResistance] = useState<boolean>(false);

  // g = 10 m/s²
  const g = 10;
  const initialPotential = mass * g * initHeight; // J
  const currentPotential = Math.max(0, mass * g * currentHeight);
  const currentKinetic = 0.5 * mass * velocity * velocity;
  const heatLoss = Math.max(0, initialPotential - (currentPotential + currentKinetic));
  const totalMechanical = currentPotential + currentKinetic;

  // Animation frame loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const update = (now: number) => {
      const dt = Math.min(0.04, (now - lastTime) / 1000);
      lastTime = now;

      if (isRunning) {
        setVelocity(prevV => {
          let accel = g;
          if (airResistance) {
            accel = Math.max(2, g - 0.25 * prevV);
          }
          const nextV = prevV + accel * dt;
          return nextV;
        });

        setCurrentHeight(prevH => {
          const nextH = prevH - velocity * dt;
          if (nextH <= 0) {
            setIsRunning(false);
            return 0;
          }
          return nextH;
        });
      }

      if (isRunning) {
        animId = requestAnimationFrame(update);
      }
    };

    if (isRunning) {
      lastTime = performance.now();
      animId = requestAnimationFrame(update);
    }

    return () => cancelAnimationFrame(animId);
  }, [isRunning, velocity, airResistance, g]);

  const handleDrop = () => {
    if (currentHeight <= 0) {
      setCurrentHeight(initHeight);
      setVelocity(0);
    }
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentHeight(initHeight);
    setVelocity(0);
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-700 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
            <Zap className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Khảo Sát Định Luật Bảo Toàn Cơ Năng</h4>
            <p className="text-xs text-slate-400">Bài toán thả rơi tự do m = 1,5 kg từ độ cao h = 4 m (SGK KHTN 9 trang 19)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleReset}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1 border border-slate-700 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Drop Simulation Canvas */}
        <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-between min-h-[300px] relative overflow-hidden">
          {/* Height Scale Meter on Left */}
          <div className="absolute left-3 top-4 bottom-8 w-10 flex flex-col justify-between items-start text-[10px] text-slate-500 font-mono border-r border-slate-800 pr-1">
            <span>{initHeight}m (Đỉnh)</span>
            <span>{(initHeight * 0.75).toFixed(1)}m</span>
            <span>{(initHeight * 0.5).toFixed(1)}m</span>
            <span>{(initHeight * 0.25).toFixed(1)}m</span>
            <span className="text-emerald-400 font-bold">0m (Đất)</span>
          </div>

          {/* Falling Bob Viewport */}
          <div className="relative w-full flex-1 mx-12 flex flex-col justify-end items-center pb-2">
            {/* Bob Object */}
            <div 
              className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.6)] border-2 border-amber-200 flex flex-col items-center justify-center transition-all duration-75"
              style={{ 
                bottom: `${(currentHeight / initHeight) * 200 + 10}px` 
              }}
            >
              <span className="text-[9px] font-black text-slate-950">{mass} kg</span>
            </div>

            {/* Ground Line */}
            <div className="w-full h-3 bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-800 rounded-full border-t border-emerald-400 shadow-md flex items-center justify-center">
              <span className="text-[8px] font-bold text-white tracking-widest uppercase">Mặt Đất (Gốc Thế Năng h = 0)</span>
            </div>
          </div>

          {/* Real-time telemetry */}
          <div className="w-full grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center text-xs">
            <div className="bg-slate-900/90 p-1.5 rounded-lg">
              <div className="text-[10px] text-slate-400">Độ cao h:</div>
              <div className="font-mono font-bold text-emerald-400">{currentHeight.toFixed(2)} m</div>
            </div>
            <div className="bg-slate-900/90 p-1.5 rounded-lg">
              <div className="text-[10px] text-slate-400">Vận tốc v:</div>
              <div className="font-mono font-bold text-sky-400">{velocity.toFixed(2)} m/s</div>
            </div>
            <div className="bg-slate-900/90 p-1.5 rounded-lg">
              <div className="text-[10px] text-slate-400">Cơ năng Wc:</div>
              <div className="font-mono font-bold text-amber-400">{totalMechanical.toFixed(1)} J</div>
            </div>
          </div>
        </div>

        {/* Energy Bar Chart & Controls */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          {/* Energy Chart */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>BIỂU ĐỒ NĂNG LƯỢNG THỜI GIAN THỰC</span>
              <span className="text-[10px] text-slate-400 font-mono">Tổng: {initialPotential.toFixed(1)} J</span>
            </div>

            {/* Potential Energy Wt */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">Thế năng Wt = P · h:</span>
                <span className="text-emerald-400 font-bold">{currentPotential.toFixed(1)} J</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-75 rounded-full"
                  style={{ width: `${Math.min(100, (currentPotential / Math.max(1, initialPotential)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Kinetic Energy Wđ */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-sky-400 font-semibold">Động năng Wđ = 1/2 m v²:</span>
                <span className="text-sky-400 font-bold">{currentKinetic.toFixed(1)} J</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-500 transition-all duration-75 rounded-full"
                  style={{ width: `${Math.min(100, (currentKinetic / Math.max(1, initialPotential)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Heat Loss if air resistance */}
            {airResistance && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-rose-400 font-semibold">Nhiệt năng do lực cản Q:</span>
                  <span className="text-rose-400 font-bold">{heatLoss.toFixed(1)} J</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 transition-all duration-75 rounded-full"
                    style={{ width: `${Math.min(100, (heatLoss / Math.max(1, initialPotential)) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Khối lượng vật (m):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.5"
                    value={mass}
                    disabled={isRunning}
                    onChange={(e) => {
                      setMass(Number(e.target.value));
                      handleReset();
                    }}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <span className="text-xs font-mono font-bold text-amber-400 shrink-0">{mass} kg</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Độ cao thả (h):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="1"
                    value={initHeight}
                    disabled={isRunning}
                    onChange={(e) => {
                      const h = Number(e.target.value);
                      setInitHeight(h);
                      setCurrentHeight(h);
                      setVelocity(0);
                    }}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">{initHeight} m</span>
                </div>
              </div>
            </div>

            {/* Toggle Air Resistance */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-300 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${airResistance ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                Lực cản không khí (ma sát):
              </span>
              <button
                onClick={() => {
                  setAirResistance(!airResistance);
                  handleReset();
                }}
                className={`text-xs px-2.5 py-1 rounded font-medium border ${
                  airResistance 
                    ? 'bg-rose-900/50 border-rose-600 text-rose-300' 
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {airResistance ? 'BẬT (Có hao phí nhiệt)' : 'TẮT (Cơ năng bảo toàn 100%)'}
              </button>
            </div>

            {/* Main Action Button */}
            <button
              onClick={handleDrop}
              disabled={isRunning}
              className={`w-full py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                isRunning 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/30'
              }`}
            >
              {isRunning ? '⏳ VẬT ĐANG RƠI VÀ CHUYỂN HOÁ NĂNG LƯỢNG...' : '🚀 THẢ RƠI VẬT TỪ ĐỘ CAO ' + initHeight + ' M'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// THÍ NGHIỆM ẢO CON LẮC ĐƠN (HÌNH 3.2 SGK TRANG 19)
// ============================================================================
export const PendulumEnergySim: React.FC = () => {
  const [angle, setAngle] = useState<number>(35); // degrees
  const [isSwinging, setIsSwinging] = useState<boolean>(true);
  const [hasFriction, setHasFriction] = useState<boolean>(false);
  const [currentAngle, setCurrentAngle] = useState<number>(35);
  const [amplitude, setAmplitude] = useState<number>(35);

  useEffect(() => {
    let animId: number;
    let t = 0;

    const animate = () => {
      if (isSwinging) {
        t += 0.05;
        let decay = hasFriction ? Math.exp(-0.02 * t) : 1;
        const currentAmp = amplitude * decay;
        if (currentAmp < 0.5 && hasFriction) {
          setCurrentAngle(0);
          setIsSwinging(false);
          return;
        }
        const ang = currentAmp * Math.cos(t * 3);
        setCurrentAngle(ang);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isSwinging, hasFriction, amplitude]);

  const maxPotential = 100;
  // At angle = 0, Wt = 0, Wđ = max
  const ratio = Math.pow(currentAngle / amplitude, 2);
  const wt = Math.min(100, Math.round(maxPotential * ratio));
  const wd = Math.max(0, 100 - wt);

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-700 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-sky-500/20 text-sky-400 rounded-lg">
            <Zap className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Chuyển Hoá Năng Lượng Của Con Lắc Đơn</h4>
            <p className="text-xs text-slate-400">Hình 3.2 SGK KHTN 9 (trang 19) • Khảo sát dao động qua các vị trí A, O, B</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setHasFriction(!hasFriction);
              setCurrentAngle(angle);
              setAmplitude(angle);
              setIsSwinging(true);
            }}
            className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
              hasFriction 
                ? 'bg-rose-900/60 border-rose-600 text-rose-300' 
                : 'bg-emerald-900/60 border-emerald-600 text-emerald-300'
            }`}
          >
            {hasFriction ? 'Lực cản: BẬT (Thực tế - tắt dần)' : 'Lực cản: TẮT (Lý tưởng - bảo toàn)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {/* SVG Con lắc dao động */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px] relative">
          <svg width="240" height="200" className="overflow-visible">
            {/* Giá treo */}
            <line x1="80" y1="15" x2="160" y2="15" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="120" cy="15" r="4" fill="#38bdf8" />

            {/* Dây treo và vật nặng (A - O - B) */}
            {(() => {
              const rad = (currentAngle * Math.PI) / 180;
              const len = 140;
              const bobX = 120 + len * Math.sin(rad);
              const bobY = 15 + len * Math.cos(rad);

              return (
                <g>
                  {/* Quỹ đạo cong mờ */}
                  <path
                    d="M 60 135 Q 120 165 180 135"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  {/* Nhãn điểm A, O, B */}
                  <text x="45" y="130" fill="#f59e0b" fontSize="11" fontWeight="bold">A (Biên)</text>
                  <text x="115" y="180" fill="#38bdf8" fontSize="11" fontWeight="bold">O (Cực đại)</text>
                  <text x="175" y="130" fill="#f59e0b" fontSize="11" fontWeight="bold">B (Biên)</text>

                  {/* Sợi dây */}
                  <line x1="120" y1="15" x2={bobX} y2={bobY} stroke="#e2e8f0" strokeWidth="2" />
                  {/* Quả nặng */}
                  <circle cx={bobX} cy={bobY} r="14" fill="#f59e0b" stroke="#fde68a" strokeWidth="2" />
                </g>
              );
            })()}
          </svg>

          <div className="text-[11px] text-slate-400 font-mono mt-2">
            Vị trí hiện tại: <span className="text-amber-400 font-bold">{Math.abs(currentAngle) < 3 ? 'Điểm O (Thấp nhất)' : currentAngle > 0 ? 'Phía B' : 'Phía A'}</span>
          </div>
        </div>

        {/* Biểu đồ năng lượng & Lời giải thích */}
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300">NĂNG LƯỢNG CON LẮC TẠI VỊ TRÍ HIỆN TẠI</div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">Thế năng Wt:</span>
                <span className="text-emerald-400 font-bold">{wt}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-75" style={{ width: `${wt}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-sky-400 font-semibold">Động năng Wđ:</span>
                <span className="text-sky-400 font-bold">{wd}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 transition-all duration-75" style={{ width: `${wd}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Kết luận khoa học (SGK trang 19):
            </div>
            <p className="leading-relaxed text-slate-300 text-[11px]">
              • Khi từ <strong>A về O</strong>: Thế năng giảm, động năng tăng (chuyển hoá thành động năng).<br/>
              • Khi từ <strong>O lên B</strong>: Động năng giảm, thế năng tăng (chuyển hoá thành thế năng).<br/>
              • Trong thực tế: Do có <strong>lực cản không khí</strong>, cơ năng chuyển hoá dần thành nhiệt năng khiến độ cao giảm dần!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// THÍ NGHIỆM ẢO: CÔNG CƠ HỌC & CÔNG SUẤT (BÀI 4 SGK KHTN 9 TRANG 21 - 24)
// ============================================================================
export const WorkPowerSim: React.FC = () => {
  const [pullForce, setPullForce] = useState<number>(150); // N (50 - 300)
  const [angleDeg, setAngleDeg] = useState<number>(0); // 0, 30, 60, 90 degrees
  const [distance, setDistance] = useState<number>(6); // m (2 - 10)
  const [timeDuration, setTimeDuration] = useState<number>(4); // s (2 - 8)
  const [hasFriction, setHasFriction] = useState<boolean>(true); // Friction force = 30 N

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 to 100%

  // Calculations
  const angleRad = (angleDeg * Math.PI) / 180;
  const cosAlpha = Math.cos(angleRad);
  const frictionForce = hasFriction ? 30 : 0;
  
  // Work by pulling force: A_F = F * s * cos(alpha)
  const workForce = Math.round(pullForce * distance * cosAlpha);
  // Work by gravity: A_P = 0 (since P is perpendicular to displacement)
  const workGravity = 0;
  // Work by friction: A_ms = - F_ms * s
  const workFriction = -Math.round(frictionForce * distance);
  // Total work
  const totalWork = workForce + workFriction;
  // Power: P = A_F / t
  const powerWatts = Math.round(workForce / timeDuration);
  const powerHp = (powerWatts / 746).toFixed(2);

  const handleStartPull = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);

    const stepMs = 30;
    const totalSteps = (timeDuration * 1000) / stepMs;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(currentProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setIsRunning(false);
      }
    }, stepMs);
  };

  const handleReset = () => {
    setProgress(0);
    setIsRunning(false);
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-700 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
            <Zap className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Khảo Sát Công Cơ Học & Công Suất</h4>
            <p className="text-xs text-slate-400">Hình 4.1 & Hình 4.2 SGK KHTN 9 (trang 21 - 22) • A = F · s và P = A / t</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          disabled={isRunning}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-700 disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
        </button>
      </div>

      {/* Main Grid: Visual Simulation & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Visual Track (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Mặt sàn nằm ngang (s = {distance} m)</span>
            <span className="font-mono text-amber-400 font-bold">
              Tiến độ: {progress}% (đã đi {(distance * (progress / 100)).toFixed(1)} m)
            </span>
          </div>

          {/* SVG Canvas */}
          <div className="relative h-48 bg-gradient-to-b from-slate-900/60 to-slate-950 rounded-lg p-2 border border-slate-800/80 overflow-hidden flex flex-col justify-end">
            <svg width="100%" height="160" className="overflow-visible">
              {/* Mặt sàn */}
              <line x1="20" y1="120" x2="98%" y2="120" stroke="#64748b" strokeWidth="4" />
              {/* Các vạch chia khoảng cách trên sàn */}
              {[0, 25, 50, 75, 100].map((pct, idx) => (
                <g key={idx} transform={`translate(${40 + (pct * 2.2)}, 120)`}>
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="-6" y="20" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    {((distance * pct) / 100).toFixed(0)}m
                  </text>
                </g>
              ))}

              {/* Thùng hàng trượt */}
              {(() => {
                const boxX = 40 + (progress * 2.2);
                const boxY = 70;
                const boxW = 55;
                const boxH = 48;
                const centerBoxX = boxX + boxW / 2;
                const centerBoxY = boxY + boxH / 2;

                // Force vectors
                const forceLen = 45;
                const fVecX = centerBoxX + forceLen * Math.cos(angleRad);
                const fVecY = centerBoxY - forceLen * Math.sin(angleRad);

                return (
                  <g>
                    {/* Thùng hàng gỗ */}
                    <rect
                      x={boxX}
                      y={boxY}
                      width={boxW}
                      height={boxH}
                      rx="4"
                      fill="#b45309"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    {/* Họa tiết thùng hàng */}
                    <line x1={boxX} y1={boxY} x2={boxX + boxW} y2={boxY + boxH} stroke="#78350f" strokeWidth="1.5" />
                    <line x1={boxX + boxW} y1={boxY} x2={boxX} y2={boxY + boxH} stroke="#78350f" strokeWidth="1.5" />
                    <text x={boxX + 10} y={boxY + 28} fill="#fde68a" fontSize="10" fontWeight="bold">
                      20 kg
                    </text>

                    {/* Vector Lực kéo F */}
                    <line
                      x1={centerBoxX}
                      y1={centerBoxY}
                      x2={fVecX}
                      y2={fVecY}
                      stroke="#f59e0b"
                      strokeWidth="3"
                      markerEnd="url(#arrow-f)"
                    />
                    <text x={fVecX + 4} y={fVecY - 2} fill="#f59e0b" fontSize="11" fontWeight="bold">
                      F = {pullForce}N ({angleDeg}°)
                    </text>

                    {/* Vector Trọng lực P (hướng thẳng đứng xuống) */}
                    <line
                      x1={centerBoxX}
                      y1={centerBoxY}
                      x2={centerBoxX}
                      y2={centerBoxY + 38}
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />
                    <text x={centerBoxX + 4} y={centerBoxY + 36} fill="#ef4444" fontSize="9" fontWeight="bold">
                      P (A=0)
                    </text>

                    {/* Vector Phản lực N (hướng thẳng đứng lên) */}
                    <line
                      x1={centerBoxX}
                      y1={centerBoxY}
                      x2={centerBoxX}
                      y2={centerBoxY - 35}
                      stroke="#a855f7"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />
                    <text x={centerBoxX + 4} y={centerBoxY - 28} fill="#a855f7" fontSize="9" fontWeight="bold">
                      N (A=0)
                    </text>

                    {/* Vector Lực ma sát F_ms (ngược hướng chuyển động) */}
                    {hasFriction && (
                      <g>
                        <line
                          x1={boxX}
                          y1={boxY + boxH}
                          x2={boxX - 28}
                          y2={boxY + boxH}
                          stroke="#ec4899"
                          strokeWidth="2.5"
                        />
                        <text x={boxX - 42} y={boxY + boxH - 4} fill="#ec4899" fontSize="9" fontWeight="bold">
                          Fms
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Special Science Insight Banner */}
          {angleDeg === 90 ? (
            <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-600 text-xs text-rose-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Hiện tượng đặc biệt SGK:</strong> Lực kéo vuông góc với sàn (α = 90°, cos 90° = 0) nên <strong>Công A_F = 0 Jun</strong>! Lực kéo không làm vật tăng tốc theo phương ngang nên KHÔNG SINH CÔNG!
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Lực kéo tạo góc {angleDeg}° với sàn: Công cơ học <strong>A = {workForce} J</strong>; Công suất <strong>P = {powerWatts} W</strong>.
              </span>
            </div>
          )}
        </div>

        {/* Controls & Metrics Panel (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-500" /> Bảng Thông Số & Kết Quả Đo
          </div>

          {/* Live Data Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Công lực kéo (A):</span>
              <span className="text-lg font-mono font-bold text-amber-400">{workForce} J</span>
              <span className="text-[10px] text-slate-500 block">({(workForce / 1000).toFixed(2)} kJ)</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Công suất kéo (P):</span>
              <span className="text-lg font-mono font-bold text-sky-400">{powerWatts} W</span>
              <span className="text-[10px] text-slate-500 block">(≈ {powerHp} HP)</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Công trọng lực (A_P):</span>
              <span className="text-sm font-mono font-bold text-rose-400">0 J (Vuông góc)</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Công cản ma sát:</span>
              <span className="text-sm font-mono font-bold text-pink-400">{workFriction} J</span>
            </div>
          </div>

          {/* Parameter Sliders */}
          <div className="space-y-3 pt-1 border-t border-slate-800 text-xs">
            {/* Lực kéo F */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Lực kéo (F):</span>
                <span className="font-mono font-bold text-amber-400">{pullForce} N</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="25"
                value={pullForce}
                disabled={isRunning}
                onChange={(e) => setPullForce(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Góc kéo alpha */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Góc hợp với phương ngang (α):</span>
                <span className="font-mono font-bold text-indigo-400">{angleDeg}° (cos α = {cosAlpha.toFixed(2)})</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 30, 60, 90].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setAngleDeg(deg)}
                    disabled={isRunning}
                    className={`py-1 rounded text-[11px] font-bold border ${
                      angleDeg === deg
                        ? 'bg-amber-600 border-amber-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>

            {/* Quãng đường & Thời gian */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Quãng đường (s):</label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={distance}
                  disabled={isRunning}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-[11px] font-mono text-emerald-400 font-bold">{distance} m</span>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Thời gian (t):</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={timeDuration}
                  disabled={isRunning}
                  onChange={(e) => setTimeDuration(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <span className="text-[11px] font-mono text-sky-400 font-bold">{timeDuration} s</span>
              </div>
            </div>

            {/* Toggle Lực ma sát */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">Lực ma sát sàn (30 N):</span>
              <button
                onClick={() => setHasFriction(!hasFriction)}
                disabled={isRunning}
                className={`text-[11px] px-2 py-0.5 rounded border font-medium ${
                  hasFriction ? 'bg-pink-950/80 border-pink-600 text-pink-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {hasFriction ? 'BẬT (30 N)' : 'TẮT (Mặt sàn trơn)'}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleStartPull}
            disabled={isRunning}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              isRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/40'
            }`}
          >
            {isRunning ? '⏳ ĐANG KÉO HÒM HÀNG...' : `🚀 KÉO HÒM HÀNG ĐI ${distance} M`}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// THÍ NGHIỆM ẢO: CẦN CẨU NÂNG HÀNG & CÔNG SUẤT ĐỘNG CƠ (SGK TRANG 23 - 24)
// ============================================================================
export const CranePowerSim: React.FC = () => {
  const [loadMass, setLoadMass] = useState<number>(500); // kg (200 - 1500)
  const [liftHeight, setLiftHeight] = useState<number>(12); // m (5 - 20)
  const [enginePowerKw, setEnginePowerKw] = useState<number>(6); // 3, 6, 12 kW

  const [isLifting, setIsLifting] = useState<boolean>(false);
  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Calculations
  const g = 10; // m/s^2
  const loadWeight = loadMass * g; // P_tl = m * g (N)
  const totalWork = loadWeight * liftHeight; // A = P * h (J)
  const enginePowerWatts = enginePowerKw * 1000; // P in W
  const requiredTime = totalWork / enginePowerWatts; // t = A / P (s)
  const liftSpeed = liftHeight / requiredTime; // v = P / F (m/s)

  const handleStartLift = () => {
    if (isLifting) return;
    setIsLifting(true);
    setCurrentHeight(0);
    setElapsedTime(0);

    const intervalMs = 40;
    const totalSteps = (requiredTime * 1000) / intervalMs;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentH = Math.min(liftHeight, (step / totalSteps) * liftHeight);
      const currentT = Math.min(requiredTime, (step * intervalMs) / 1000);
      setCurrentHeight(currentH);
      setElapsedTime(currentT);

      if (step >= totalSteps) {
        clearInterval(timer);
        setIsLifting(false);
      }
    }, intervalMs);
  };

  const handleReset = () => {
    setCurrentHeight(0);
    setElapsedTime(0);
    setIsLifting(false);
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-700 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-sky-500/20 text-sky-400 rounded-lg">
            <Zap className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Thí nghiệm Ảo: Cần Cẩu Nâng Khối Bê Tông & Khảo Sát Công Suất</h4>
            <p className="text-xs text-slate-400">Hình 4.3 SGK KHTN 9 (trang 23) • So sánh tốc độ sinh công P = A / t giữa các động cơ</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          disabled={isLifting}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-700 disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Crane Animation SVG (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Cần cẩu tháp công trình cao tầng</span>
            <span className="font-mono text-sky-400 font-bold">
              Độ cao nâng: {currentHeight.toFixed(1)} / {liftHeight} m ({elapsedTime.toFixed(1)} s)
            </span>
          </div>

          <div className="relative h-64 bg-slate-900/60 rounded-lg p-2 border border-slate-800 overflow-hidden flex flex-col justify-end">
            <svg width="100%" height="240" className="overflow-visible">
              {/* Mặt đất */}
              <line x1="10" y1="210" x2="98%" y2="210" stroke="#475569" strokeWidth="4" />

              {/* Tháp cần cẩu (Cột đứng) */}
              <line x1="60" y1="210" x2="60" y2="30" stroke="#f59e0b" strokeWidth="6" />
              {/* Giằng chéo tháp */}
              <line x1="57" y1="180" x2="63" y2="150" stroke="#d97706" strokeWidth="2" />
              <line x1="57" y1="140" x2="63" y2="110" stroke="#d97706" strokeWidth="2" />
              <line x1="57" y1="100" x2="63" y2="70" stroke="#d97706" strokeWidth="2" />

              {/* Tay cần ngang (Boom) */}
              <line x1="20" y1="30" x2="88%" y2="30" stroke="#f59e0b" strokeWidth="5" />
              {/* Buồng lái & Cáp néo đỉnh */}
              <polygon points="50,30 60,10 70,30" fill="#f59e0b" />
              <line x1="60" y1="10" x2="85%" y2="30" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

              {/* Xe con lăn trên tay cần */}
              <rect x="180" y="24" width="24" height="12" rx="2" fill="#38bdf8" />

              {/* Dây cáp tời rủ xuống và khối bê tông */}
              {(() => {
                const cableStartX = 192;
                const cableStartY = 36;
                const groundY = 210;
                const maxLiftPx = 140; // Pixel range for liftHeight
                const liftRatio = liftHeight > 0 ? currentHeight / liftHeight : 0;
                const hookY = (groundY - 25) - (liftRatio * maxLiftPx);

                return (
                  <g>
                    {/* Dây cáp kim loại */}
                    <line
                      x1={cableStartX}
                      y1={cableStartY}
                      x2={cableStartX}
                      y2={hookY}
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />
                    {/* Móc cẩu */}
                    <circle cx={cableStartX} cy={hookY} r="4" fill="#94a3b8" />

                    {/* Dây xích giữ khối tải */}
                    <line x1={cableStartX} y1={hookY} x2={cableStartX - 15} y2={hookY + 12} stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1={cableStartX} y1={hookY} x2={cableStartX + 15} y2={hookY + 12} stroke="#94a3b8" strokeWidth="1.5" />

                    {/* Khối bê tông tải trọng */}
                    <rect
                      x={cableStartX - 25}
                      y={hookY + 12}
                      width="50"
                      height="30"
                      rx="3"
                      fill="#64748b"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                    />
                    <text x={cableStartX - 20} y={hookY + 31} fill="#ffffff" fontSize="10" fontWeight="bold">
                      {loadMass} kg
                    </text>
                  </g>
                );
              })()}

              {/* Thước đo độ cao cạnh công trình */}
              <line x1="280" y1="210" x2="280" y2="70" stroke="#475569" strokeWidth="2" strokeDasharray="2 2" />
              <text x="286" y="208" fill="#94a3b8" fontSize="9">0m (Mặt đất)</text>
              <text x="286" y="75" fill="#38bdf8" fontSize="9" fontWeight="bold">h = {liftHeight}m</text>
            </svg>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLifting ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              Trạng thái: <strong className="text-white">{isLifting ? 'ĐANG NÂNG TẢI...' : currentHeight >= liftHeight ? 'HOÀN THÀNH ĐỘ CAO' : 'CHỜ LỆNH NÂNG'}</strong>
            </span>
            <span className="font-mono text-amber-400">
              Vận tốc kéo: <strong>{liftSpeed.toFixed(2)} m/s</strong>
            </span>
          </div>
        </div>

        {/* Controls & Power Engine Selection (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-sky-400" /> Chọn Động Cơ & Tải Trọng
          </div>

          {/* Engine Selector */}
          <div>
            <label className="text-[11px] text-slate-400 block mb-1.5">Chọn loại Động cơ Cần cẩu:</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { kw: 3, label: 'ĐC 3 kW', desc: 'Mini' },
                { kw: 6, label: 'ĐC 6 kW', desc: 'Tiêu chuẩn' },
                { kw: 12, label: 'ĐC 12 kW', desc: 'Siêu tốc' },
              ].map((eng) => (
                <button
                  key={eng.kw}
                  onClick={() => setEnginePowerKw(eng.kw)}
                  disabled={isLifting}
                  className={`p-2 rounded-lg text-center border transition-all ${
                    enginePowerKw === eng.kw
                      ? 'bg-sky-950/80 border-sky-400 text-sky-200 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs">{eng.label}</div>
                  <div className="text-[9px] text-slate-500">{eng.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Load & Height Sliders */}
          <div className="space-y-3 pt-1 border-t border-slate-800 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Khối lượng hàng nâng (m):</span>
                <span className="font-mono font-bold text-amber-400">{loadMass} kg (P = {loadWeight} N)</span>
              </div>
              <input
                type="range"
                min="200"
                max="1500"
                step="100"
                value={loadMass}
                disabled={isLifting}
                onChange={(e) => setLoadMass(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Độ cao cần nâng (h):</span>
                <span className="font-mono font-bold text-emerald-400">{liftHeight} m</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={liftHeight}
                disabled={isLifting}
                onChange={(e) => setLiftHeight(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Công cơ học cần sinh (A = P·h):</span>
              <span className="font-mono font-bold text-amber-400">{totalWork.toLocaleString()} J ({(totalWork / 1000).toFixed(1)} kJ)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Công suất động cơ (P):</span>
              <span className="font-mono font-bold text-sky-400">{enginePowerKw} kW ({enginePowerWatts} W)</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-1.5">
              <span className="text-slate-300 font-semibold">Thời gian nâng lý thuyết (t = A/P):</span>
              <span className="font-mono font-bold text-emerald-400">{requiredTime.toFixed(1)} giây</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleStartLift}
            disabled={isLifting}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              isLifting
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-900/40'
            }`}
          >
            {isLifting ? '⏳ ĐANG VẬN HÀNH NÂNG HÀNG...' : `🏗️ BẮT ĐẦU NÂNG HÀNG LÊN ${liftHeight} M`}
          </button>
        </div>
      </div>
    </div>
  );
};




