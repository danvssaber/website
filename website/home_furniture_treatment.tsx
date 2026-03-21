import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const TreatmentEffectGraph = () => {
  // Data extracted from the image
  const data = [
    { month: '2020m3', control: 0.28, treatment: 0.30 },
    { month: '2020m4', control: 0.27, treatment: 0.28 },
    { month: '2020m5', control: 0.27, treatment: 0.28 },
    { month: '2020m6', control: 0.29, treatment: 0.30 },
    { month: '2020m7', control: 0.26, treatment: 0.28 },
    { month: '2020m8', control: 0.26, treatment: 0.27 },
    { month: '2020m9', control: 0.25, treatment: 0.28 },
    { month: '2020m10', control: 0.25, treatment: 0.28 },
    { month: '2020m11', control: 0.25, treatment: 0.28 },
    { month: '2020m12', control: 0.25, treatment: 0.30 },
    { month: '2021m1', control: 0.26, treatment: 0.30 },
    { month: '2021m2', control: 0.26, treatment: 0.32 },
    { month: '2021m3', control: 0.29, treatment: 0.35 },
    { month: '2021m4', control: 0.26, treatment: 0.32 },
    { month: '2021m5', control: 0.26, treatment: 0.31 },
    { month: '2021m6', control: 0.27, treatment: 0.32 },
    { month: '2021m7', control: 0.27, treatment: 0.33 },
    { month: '2021m8', control: 0.27, treatment: 0.35 },
    { month: '2021m9', control: 0.26, treatment: 0.36 },
    { month: '2021m10', control: 0.25, treatment: 0.38 },
    { month: '2021m11', control: 0.26, treatment: 0.40 },
    { month: '2021m12', control: 0.26, treatment: 0.36 },
    { month: '2022m1', control: 0.24, treatment: 0.38 },
    { month: '2022m2', control: 0.19, treatment: 0.44 },
    { month: '2022m3', control: 0.23, treatment: 0.48 },
    { month: '2022m4', control: 0.23, treatment: 0.50 },
    { month: '2022m5', control: 0.24, treatment: 0.58 },
    { month: '2022m6', control: 0.30, treatment: 0.56 }
  ];

  // Calculate the difference between treatment and control
  const dataWithDiff = data.map(item => ({
    ...item,
    difference: (item.treatment - item.control).toFixed(2)
  }));

  // Find the intervention point (vertical dashed line in the original graph)
  const interventionPoint = '2021m7';

  // Customized tooltip to show all values
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded">
          <p className="font-bold">{label}</p>
          <p className="text-blue-600">Control: {payload[0].value.toFixed(2)}</p>
          <p className="text-red-600">Treatment: {payload[1].value.toFixed(2)}</p>
          <p className="text-purple-600">Difference: {(payload[1].value - payload[0].value).toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  // Toggle to show difference
  const [showDifference, setShowDifference] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Treatment Effect of Delegating Partner Selection Rights</h2>
      
      <div className="mb-4 flex justify-end">
        <button 
          onClick={() => setShowDifference(!showDifference)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          {showDifference ? "Hide Difference" : "Show Difference"}
        </button>
      </div>
      
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataWithDiff}
            margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="month" 
              angle={-45} 
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
              tickMargin={15}
            />
            <YAxis 
              label={{ value: 'Project Quality', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              domain={[0, 'auto']}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            
            <ReferenceLine 
              x={interventionPoint} 
              stroke="#000" 
              strokeDasharray="3 3"
              label={{ value: 'Intervention', position: 'top', fill: '#000', fontSize: 12 }}
            />
            
            <Line 
              type="monotone" 
              dataKey="control" 
              name="Control Group" 
              stroke="#1e88e5" 
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="treatment" 
              name="Treatment Group" 
              stroke="#e53935" 
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            {showDifference && (
              <Line 
                type="monotone" 
                dataKey="difference" 
                name="Treatment Effect" 
                stroke="#9c27b0" 
                strokeDasharray="5 5"
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      

    </div>
  );
};

export default TreatmentEffectGraph;
