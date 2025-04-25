import React, { useState } from 'react';

function MerchantConsole() {
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
            cursor: 'pointer',
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
    };

    const bankData = [
        {
            accountNumber: '123456',
            accountType: 'Chequing',
            bankName: 'US Bank',
            bankCode: '789123567',
            balance: 125000,
            transactions: [
                { date: '01-Apr-25', type: 'Dr', amount: -175000, description: 'Iron vendor', reference: 'Cheque - ABC234568' },
                { date: '03-Apr-25', type: 'Cr', amount: 400000, description: 'Sales to ABC', reference: 'PBB-US Bank -987232' },
                { date: '04-Apr-25', type: 'Dr', amount: -300000, description: 'Employee Salary', reference: 'SAL-BMO 13467' },
                { date: '04-Apr-25', type: 'Cr', amount: 200000, description: 'Sales to MCD', reference: 'Cheque - MCD567432' },
            ],
        },
        {
            accountNumber: '987654',
            accountType: 'Chequing',
            bankName: 'Citi Bank',
            bankCode: '234568889',
            balance: 175000,
            transactions: [
                { date: '01-Apr-25', type: 'Dr', amount: -175000, description: 'Iron vendor', reference: 'Cheque - ABC234568' },
                { date: '03-Apr-25', type: 'Cr', amount: 400000, description: 'Sales to JAY', reference: 'PBB-US Bank -987232' },
                { date: '04-Apr-25', type: 'Dr', amount: -300000, description: 'Insurance CBC', reference: 'SAL-BMO 13467' },
                { date: '04-Apr-25', type: 'Cr', amount: 250000, description: 'Sales to KFC', reference: 'Cheque - MCD567432' },
            ],
        },
    ];

    const [selectedBanks, setSelectedBanks] = useState([]);

    const handleBankSelection = (event) => {
        const { value, checked } = event.target;
        setSelectedBanks((prevSelected) =>
            checked ? [...prevSelected, value] : prevSelected.filter((bank) => bank !== value)
        );
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Merchant Consolidated Statement</h1>

            {/* Multi-select Dropdown */}
            <div style={{ marginBottom: '1rem' }}>
                <h5>Select Banks:</h5>
                {bankData.map((bank, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`bank-${index}`}
                            value={bank.bankName}
                            onChange={handleBankSelection}
                        />
                        <label htmlFor={`bank-${index}`} style={{ marginLeft: '0.5rem' }}>
                            {bank.bankName} - {bank.accountType}
                        </label>
                    </div>
                ))}
            </div>

            {/* Display Selected Banks */}
            <div className="row">
                {bankData
                    .filter((bank) => selectedBanks.includes(bank.bankName))
                    .map((bank, index) => (
                        <div key={index} className="col-md-6 mb-4">
                            <div style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <h5>{bank.bankName} - {bank.accountType}</h5>
                                </div>
                                <div style={styles.cardBody}>
                                    <p><strong>Account Number:</strong> {bank.accountNumber}</p>
                                    <p><strong>Bank Code:</strong> {String(bank.bankCode)}</p>
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
                                                {bank.transactions.map((transaction, idx) => (
                                                    <tr key={idx} style={styles.tableRow}>
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
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MerchantConsole;