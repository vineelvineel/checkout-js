// Import your custom payment method class
import { CustomPaymentMethod } from './custom-payment';

// Ensure the window.checkout object exists
if (!window.checkout) {
    console.error('Checkout object not found. Ensure Checkout SDK is loaded properly.');
} else {
    // Register the custom payment method
    window.checkout.registerPaymentMethod({
        id: 'custom-payment',
        type: 'custom-payment',
        initializePayment: (options) => {
            const customPayment = new CustomPaymentMethod(options);
            return customPayment.initializePayment(options);
        },
        validatePayment: (payment) => {
            const customPayment = new CustomPaymentMethod();
            return customPayment.validatePayment(payment);
        },
        submitPayment: (payment) => {
            const customPayment = new CustomPaymentMethod();
            return customPayment.submitPayment(payment);
        },
    });

    console.log('Custom payment method registered successfully.');
}
