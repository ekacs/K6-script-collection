import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 100 },
        { duration: '2m', target: 200 },
        { duration: '2m', target: 400 },
        { duration: '2m', target: 600 },
        { duration: '10m', target: 600 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],
    },
};

export default function () {
    let res = http.get('https://hubnet.kemenhub.go.id', { timeout: '30s' }); // Menambahkan timeout 30 detik
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}