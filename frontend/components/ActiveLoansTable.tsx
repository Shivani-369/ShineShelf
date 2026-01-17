import React from 'react';

interface Loan {
    id: number;
    title: string;
    due_date: string;
    fine_amount: number;
}

interface ActiveLoansTableProps {
    loans: Loan[];
}

export default function ActiveLoansTable({ loans }: ActiveLoansTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Active Loans</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                        <tr>
                            <th className="px-6 py-4">Book Title</th>
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Fine</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loans.map((loan) => (
                            <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{loan.title}</td>
                                <td className="px-6 py-4">{new Date(loan.due_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-red-500 font-medium">
                                    {loan.fine_amount > 0 ? `₹${loan.fine_amount}` : '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Return</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}