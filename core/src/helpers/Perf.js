const { performance } = require('perf_hooks');

const startPerf = (message) => {
    const t0 = performance.now();

    console.log(`${Date.now()}> ${message}`);

    return t0;
};

const endPerf = (t0, message) => {
    const t1 = performance.now();

    const tTime = (t1 - t0).toFixed(2);

    console.log(`${Date.now()}> ${message} @ ${tTime}ms`);
};

module.exports = {
    startPerf,
    endPerf,
};
