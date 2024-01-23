const States = {
    canceled: 'warning',
    not_valid: 'danger',
    created: 'info',
    pay_expired: 'danger',
    pay_cancelled: 'danger',
    pay_pending: 'warning',
    pay_paid: 'success',
    pay_refunded: 'warning',
    default: 'info'
}

export const getBookingState = (stateKey) => {
    return States[stateKey] || States.default
}