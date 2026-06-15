import React from "react";

const kpis = [
  { label: "Code Quality", value: 92 },
  { label: "Delivery on Time", value: 88 },
  { label: "Team Collaboration", value: 95 },
  { label: "Innovation", value: 85 },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-400"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Simple sparkline SVG trend chart
function TrendChart() {
  const points = [
    3.2, 3.0, 3.5, 3.8, 3.4, 3.6, 3.9, 4.0, 3.7, 4.1, 4.3, 4.0, 4.2, 4.4, 4.3, 4.5,
  ];
  const w = 260;
  const h = 80;
  const minVal = Math.min(...points);
  const maxVal = Math.max(...points);
  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * w,
    y: h - ((p - minVal) / (maxVal - minVal)) * h,
  }));
  const pathD =
    coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const fillD = `${pathD} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#chartFill)" />
      <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PerformanceTab() {
  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Performance Overview</h2>
        <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Initiate New Review
        </button>
      </div>

      {/* Current Month Breakdown */}
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-700">Current Month Breakdown</p>
        </div>

        {/* Latest Review Card */}
        <div className="bg-gray-900 rounded-xl m-4 p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Latest Performance Review</p>
            <span className="text-xs text-gray-400">Q1 2026</span>
          </div>
          <StarRating rating={4.5} />
          <p className="text-2xl font-bold mt-1">
            4.5 <span className="text-base font-normal text-gray-400">/ 5.0</span>
          </p>
          <p className="text-xs text-gray-400 mb-4">Exceeds Expectations</p>

          <p className="text-xs text-gray-400 font-medium mb-3">Key Performance Indicators</p>
          <div className="space-y-2.5">
            {kpis.map((kpi) => (
              <div key={kpi.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{kpi.label}</span>
                  <span className="text-white font-medium">{kpi.value}%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${kpi.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Trend + Manager Comments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Performance Trend */}
        <div className="border border-gray-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-800">Performance Trend</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              Rating
            </div>
          </div>
          <TrendChart />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Q3 2023</span>
            <span>Q3 2023</span>
            <span>Q3 2023</span>
          </div>
        </div>

        {/* Manager Comments */}
        <div className="border border-gray-100 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-800 mb-3">Manager Comments</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
              OK
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Omar Khalil Ibrahim</p>
              <p className="text-xs text-gray-400">Engineering Manager • March 15, 2026</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Ahmed has consistently demonstrated exceptional technical skills and leadership qualities.
            His contributions to the team's recent projects have been invaluable. He mentors junior
            developers effectively and maintains high code quality standards. Looking forward to
            seeing his continued growth in the next quarter.
          </p>
        </div>
      </div>
    </div>
  );
}