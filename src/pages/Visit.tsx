import React from 'react';

export default function Visit() {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-white px-6 py-12">
        <h1 className="font-display text-4xl font-bold mb-2 text-gray-900">Find Us</h1>
        <div className="divider-wine my-4 w-20" style={{ height: '2px', background: '#6B1A2A' }} />
        
        <div className="space-y-6 mt-8">
          <div className="flex gap-4 items-start">
            <span style={{ fontSize: '24px' }} className="mt-1">📍</span>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Location</h3>
              <p className="text-sm text-gray-600 mt-1">5PM Hotel, Nirema Drive, Nairobi</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span style={{ fontSize: '24px' }} className="mt-1">🕒</span>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Hours</h3>
              <p className="text-sm text-gray-600 mt-1">Open Daily: 24 hrs</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span style={{ fontSize: '24px' }} className="mt-1">📞</span>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Contact</h3>
              <p className="text-sm text-gray-600 mt-1">+254 700 000000</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}