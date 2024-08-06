import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 1000 },
        { duration: '2m', target: 2000 },
        { duration: '2m', target: 4000 },
        { duration: '2m', target: 6000 },
        { duration: '10m', target: 6000 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],
    },
};

export default function () {
    let res = http.get('https://hubnet.kemenhub.go.id/portal/page/layanan', { timeout: '30s' }); // Menambahkan timeout 30 detik
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
