import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30m', target: 50 },
        { duration: '50m', target: 100 },
        { duration: '30m', target: 50 },
        { duration: '50m', target: 100 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2 seconds
    },
};

export default function () {
    let res = http.get('https://api-sipencatar.dephub.go.id/v1/kesehatan'); // Fitur import hasil tes kesehatan
    check(res, {
        'status was 200': (r) => r.status === 200,
        'response time under 2s': (r) => r.timings.duration < 2000, // Optional: Check response time
    });
    sleep(1);
}