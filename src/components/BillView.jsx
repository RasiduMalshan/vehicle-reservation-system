import React from 'react';

const BillView = ({ billAmount }) => {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Bill Details</h1>
            <p className="text-lg">Total Amount: ${billAmount}</p>
        </div>
    );
};

export default BillView;