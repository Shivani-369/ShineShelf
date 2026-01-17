import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: string;
    color?: string;
}

export default function DashboardStatCard({ title, value, icon, trend, color = "bg-white" }: StatCardProps) {
    return (
        <div className={`${color} p-6 rounded-xl shadow-sm border border-gray-100`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <div className="text-gray-400">{icon}</div>
            </div>
            <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-900">{value}</span>
                {trend && <span className="text-green-500 text-sm font-medium">{trend}</span>}
            </div>
        </div>
    );
}
