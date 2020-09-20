function calculate_fib(data) {
    if(data <= 2) {
        return 1;
    }

    return calculate_fib(data - 1) + calculate_fib(data - 2);
}

module.exports = calculate_fib;