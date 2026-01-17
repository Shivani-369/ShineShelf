"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardStatCard from '@/components/DashboardStatCard';
import ActiveLoansTable from '@/components/ActiveLoansTable';

export default function Home() {
    // Mock data for display (Frontend connected to backend effectively requires auth token which we simulate or skip for UI demo)
    const stats = {
        activeLoans: 3,
        totalFines: 15.50
    };

    const loans = [
        { id: 1, title: 'The Great Gatsby', due_date: '2025-01-20', fine_amount: 0 },
        { id: 2, title: 'Clean Code', due_date: '2025-01-10', fine_amount: 5.50 },
        { id: 3, title: 'Design Patterns', due_date: '2025-01-05', fine_amount: 10.00 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500">Welcome back, happy reading!</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition">
                        Browse Books
                    </button>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardStatCard
                        title="Active Loans"
                        value={stats.activeLoans}
                        icon={<span className="text-2xl">📚</span>}
                        color="bg-blue-50 border-blue-100"
                    />
                    <DashboardStatCard
                        title="Total Fines"
                        value={`$${stats.totalFines.toFixed(2)}`}
                        icon={<span className="text-2xl">⚠️</span>}
                        trend="+ $2.50 this week"
                        color="bg-red-50 border-red-100"
                    />
                    <DashboardStatCard
                        title="Books Read"
                        value="12"
                        icon={<span className="text-2xl">✅</span>}
                        color="bg-green-50 border-green-100"
                    />
                    <DashboardStatCard
                        title="Badges Earned"
                        value="5"
                        icon={<span className="text-2xl">🏆</span>}
                        color="bg-yellow-50 border-yellow-100"
                    />
                </section>

                <section>
                    <ActiveLoansTable loans={loans} />
                </section>
            </main>
        </div>
    );
}
