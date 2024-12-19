export class CustomPaymentMethod {
    constructor(options) {
        this.options = options || {};
        this.state = {
            method: 'custom-payment',
            customerId: null,
            paymentData: null,
        };
        // Add your payment gateway client ID
        this.clientId = 'YOUR_APP_CLIENT_ID';
    }

    // Required method to initialize the payment form
    initializePayment(options) {
        return new Promise((resolve, reject) => {
            console.log('Initializing custom payment...');

            // Check if the container exists
            const container = document.querySelector('#checkout-payment-container');
            if (!container) {
                return reject(new Error('Payment container not found.'));
            }

            // Create and append the payment form
            const paymentForm = document.createElement('div');
            paymentForm.innerHTML = `
                <div class="form-group">
                    <label for="payment-details">Payment Details</label>
                    <input type="text" id="payment-details" class="form-control" placeholder="Enter payment info" required>
                </div>
                <button id="submit-custom-payment" class="btn btn-primary">Submit Payment</button>
            `;
            container.appendChild(paymentForm);

            // Add event listener to the submit button
            const submitButton = document.querySelector('#submit-custom-payment');
            submitButton.addEventListener('click', () => {
                this.state.paymentData = document.querySelector('#payment-details').value;
                console.log('Payment data captured:', this.state.paymentData);
            });

            resolve({
                type: 'custom-payment',
                payment: this.state,
            });
        });
    }

    // Required method to validate the payment form
    validatePayment() {
        return new Promise((resolve, reject) => {
            console.log('Validating payment...');
            if (this.state.paymentData && this.state.paymentData.length > 0) {
                resolve();
            } else {
                reject(new Error('Payment validation failed. Please enter valid payment details.'));
            }
        });
    }

    // Required method to submit the payment
    submitPayment() {
        return new Promise((resolve, reject) => {
            console.log('Submitting payment...');
            // Simulate an API call to process the payment
            setTimeout(() => {
                if (this.state.paymentData) {
                    console.log('Payment submitted successfully:', this.state.paymentData);
                    resolve({
                        type: 'custom-payment',
                        paymentData: this.state.paymentData,
                    });
                } else {
                    reject(new Error('Payment submission failed. No payment data provided.'));
                }
            }, 1000);
        });
    }
}

export class DellPaymentMethod {
    constructor(options) {
        this.options = options || {};
        this.state = {
            method: 'dell-payment',
            customerId: null,
            paymentData: null,
            methodId: 'dell_payment',
            gateway: 'dell_payment_gateway',
        };
    }

    initializePayment(options) {
        return new Promise((resolve, reject) => {
            console.log('Initializing Dell payment...');
            
            // Create Dell payment form
            const container = document.querySelector('#dell-payment-container');
            if (!container) {
                return reject(new Error('Dell payment container not found.'));
            }

            const paymentForm = document.createElement('div');
            paymentForm.innerHTML = `
                <div class="form-group dell-payment-form">
                    <label for="dell-account-number">Dell Account Number</label>
                    <input 
                        type="text" 
                        id="dell-account-number" 
                        class="form-control" 
                        placeholder="Enter Dell Account Number" 
                        required
                    >
                    <label for="dell-purchase-order">Purchase Order Number</label>
                    <input 
                        type="text" 
                        id="dell-purchase-order" 
                        class="form-control" 
                        placeholder="Enter PO Number" 
                        required
                    >
                </div>
            `;
            container.appendChild(paymentForm);

            resolve({
                methodId: this.state.methodId,
                gateway: this.state.gateway
            });
        });
    }

    validatePayment() {
        return new Promise((resolve, reject) => {
            const accountNumber = document.querySelector('#dell-account-number')?.value;
            const poNumber = document.querySelector('#dell-purchase-order')?.value;

            if (accountNumber && poNumber) {
                this.state.paymentData = {
                    accountNumber,
                    poNumber
                };
                resolve();
            } else {
                reject(new Error('Please enter both Dell Account Number and PO Number'));
            }
        });
    }

    submitPayment() {
        return new Promise((resolve, reject) => {
            if (this.state.paymentData) {
                resolve({
                    methodId: this.state.methodId,
                    paymentData: {
                        formattedPayload: {
                            method: this.state.method,
                            dell_account_number: this.state.paymentData.accountNumber,
                            purchase_order_number: this.state.paymentData.poNumber
                        }
                    }
                });
            } else {
                reject(new Error('Payment submission failed. No payment data provided.'));
            }
        });
    }
}
