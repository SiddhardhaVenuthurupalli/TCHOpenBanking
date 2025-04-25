import React, { useState } from 'react';

function BankConsole() {
    const styles = {
        container: {
            marginTop: '1rem',
        },
        header: {
            marginBottom: '1rem',
            textAlign: 'center',
        },
        card: {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '1rem',
        },
        cardHeader: {
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '0.75rem 1.25rem',
        },
        cardBody: {
            padding: '1.25rem',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        tableHeader: {
            backgroundColor: '#343a40',
            color: '#fff',
        },
        tableRow: {
            borderBottom: '1px solid #dee2e6',
        },
        textDanger: {
            color: 'red',
        },
        textSuccess: {
            color: 'green',
        },
        list: {
            margin: '0.5rem 0',
            padding: '0',
            listStyleType: 'none',
        },
        listItem: {
            marginBottom: '0.5rem',
        },
    };

    const merchantData = [
        {
            merchantName: 'Corporate Client A',
            tieUpBanks: [
                {
                    bankName: 'US Bank',
                    accountNumber: '123456',
                    balance: 125000,
                    transactions: [
                        { date: '01-Apr-25', type: 'Dr', amount: -175000, description: 'Iron vendor', reference: 'Cheque - ABC234568' },
                        { date: '03-Apr-25', type: 'Cr', amount: 400000, description: 'Sales to ABC', reference: 'PBB-US Bank -987232' },
                    ],
                },
                {
                    bankName: 'Citi Bank',
                    accountNumber: '987654',
                    balance: 175000,
                    transactions: [
                        { date: '01-Apr-25', type: 'Dr', amount: -175000, description: 'Iron vendor', reference: 'Cheque - ABC234568' },
                        { date: '03-Apr-25', type: 'Cr', amount: 400000, description: 'Sales to JAY', reference: 'PBB-US Bank -987232' },
                    ],
                },
            ],
            vendors: ['Vendor X', 'Vendor Y'],
        },
        {
            merchantName: 'Corporate Client B',
            tieUpBanks: [
                {
                    bankName: 'Wells Fargo',
                    accountNumber: '654321',
                    balance: 200000,
                    transactions: [
                        { date: '02-Apr-25', type: 'Dr', amount: -50000, description: 'Office Supplies', reference: 'INV-12345' },
                        { date: '04-Apr-25', type: 'Cr', amount: 300000, description: 'Sales Revenue', reference: 'INV-67890' },
                    ],
                },
                {
                    bankName: 'Chase Bank',
                    accountNumber: '789012',
                    balance: 300000,
                    transactions: [
                        { date: '01-Apr-25', type: 'Dr', amount: -100000, description: 'Marketing Expenses', reference: 'INV-54321' },
                        { date: '05-Apr-25', type: 'Cr', amount: 500000, description: 'Sales Revenue', reference: 'INV-98765' },
                    ],
                },
            ],
            vendors: ['Vendor Z', 'Vendor W'],
        },
    ];

    const [selectedMerchants, setSelectedMerchants] = useState([]);

    const handleMerchantSelection = (event) => {
        const { value, checked } = event.target;
        setSelectedMerchants((prevSelected) =>
            checked ? [...prevSelected, value] : prevSelected.filter((merchant) => merchant !== value)
        );
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>360° Customer View</h1>

            {/* Multi-select Dropdown */}
            <div style={{ marginBottom: '1rem' }}>
                <h5>Select Merchants:</h5>
                {merchantData.map((merchant, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`merchant-${index}`}
                            value={merchant.merchantName}
                            onChange={handleMerchantSelection}
                        />
                        <label htmlFor={`merchant-${index}`} style={{ marginLeft: '0.5rem' }}>
                            {merchant.merchantName}
                        </label>
                    </div>
                ))}
            </div>

            {/* Display Selected Merchants */}
            <div className="row">
                {merchantData
                    .filter((merchant) => selectedMerchants.includes(merchant.merchantName))
                    .map((merchant, index) => (
                        <div key={index} className="col-md-6 mb-4">
                            <div style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <h5>{merchant.merchantName}</h5>
                                </div>
                                <div style={styles.cardBody}>
                                    <h6>Tie-Up Banks:</h6>
                                    {merchant.tieUpBanks.map((bank, idx) => (
                                        <div key={idx} style={{ marginBottom: '1rem' }}>
                                            <p><strong>Bank Name:</strong> {bank.bankName}</p>
                                            <p><strong>Account Number:</strong> {bank.accountNumber}</p>
                                            <p><strong>Balance:</strong> ${bank.balance.toLocaleString()}</p>
                                            <div className="table-responsive">
                                                <table style={styles.table}>
                                                    <thead style={styles.tableHeader}>
                                                        <tr>
                                                            <th>Transaction Date</th>
                                                            <th>Dr/Cr</th>
                                                            <th>Amount</th>
                                                            <th>Description</th>
                                                            <th>Txn Reference</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {bank.transactions.map((transaction, tIdx) => (
                                                            <tr key={tIdx} style={styles.tableRow}>
                                                                <td>{transaction.date}</td>
                                                                <td>{transaction.type}</td>
                                                                <td style={transaction.type === 'Dr' ? styles.textDanger : styles.textSuccess}>
                                                                    {Math.abs(transaction.amount).toLocaleString()}
                                                                </td>
                                                                <td>{transaction.description}</td>
                                                                <td>{transaction.reference}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                    <h6>Vendors:</h6>
                                    <ul style={styles.list}>
                                        {merchant.vendors.map((vendor, idx) => (
                                            <li key={idx} style={styles.listItem}>
                                                {vendor}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default BankConsole;