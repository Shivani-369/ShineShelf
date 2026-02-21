import React from 'react';

interface Loan {
    id: number;
    title: string;
    due_date: string;
    fine_amount: number;
}

interface ActiveLoansTableProps {
    loans: Loan[];
    onReturn: (transactionId: number) => void;
}

export default function ActiveLoansTable({ loans, onReturn }: ActiveLoansTableProps) {
    return (
        <div className="bg-neutral-900 border-neutral-800 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-white">Active Loans</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-neutral-800 text-xs uppercase text-gray-500 font-semibold">
                        <tr>
                            <th className="px-6 py-4">Book Title</th>
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Fine</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {Array.isArray(loans) && loans.length > 0 ? (
                            loans.map((loan) => (
                                <tr key={loan.id} className="hover:bg-neutral-800 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{loan.title}</td>
                                    <td className="px-6 py-4">{new Date(loan.due_date).toLocaleDateString('en-US')}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-red-500 font-medium">
                                        {loan.fine_amount > 0 ? `₹${loan.fine_amount}` : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => onReturn(loan.id)}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-3 rounded-lg text-xs transition-colors"
                                        >
                                            Return
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-neutral-500 italic">
                                    No active loans found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
