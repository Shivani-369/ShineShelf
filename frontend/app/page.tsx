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
        <div className="min-h-screen bg-neutral-950 flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl text-white/90 font-bold text-white">Dashboard</h1>
                        <p className="text-neutral-400">Welcome back, happy reading!</p>
                    </div>
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-950 transition">
                        Browse Books
                    </button>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardStatCard
                        title="Active Loans"
                        value={stats.activeLoans}
                        icon={<span className="text-2xl text-white/90">📚</span>}
                        color="bg-blue-600 text-white shadow-lg border-blue-500"
                    />
                    <DashboardStatCard
                        title="Total Fines"
                        value={`₹${stats.totalFines.toFixed(2)}`}
                        icon={<span className="text-2xl text-white/90">⚠️</span>}
                        trend="+ ₹2.50 this week"
                        color="bg-red-600 text-white shadow-lg border-red-500"
                    />
                    <DashboardStatCard
                        title="Books Read"
                        value="12"
                        icon={<span className="text-2xl text-white/90">✅</span>}
                        color="bg-sky-500 text-white shadow-lg border-sky-400"
                    />
                    <DashboardStatCard
                        title="Badges Earned"
                        value="5"
                        icon={<span className="text-2xl text-white/90">🏆</span>}
                        color="bg-neutral-800 text-white shadow-lg border-neutral-700"
                    />
                </section>

                <section>
                    <ActiveLoansTable loans={loans} />
                </section>
            </main>
        </div>
    );
}
