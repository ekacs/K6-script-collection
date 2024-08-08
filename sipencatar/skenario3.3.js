import http from 'k6/http';
import { check, sleep } from 'k6';
import encoding from 'k6/encoding';

export let options = {
    stages: [
        { duration: '10m', target: 100 },
        { duration: '20m', target: 200 },
        { duration: '10m', target: 300 },
        { duration: '20m', target: 400 },
        { duration: '10m', target: 500 },
        { duration: '10m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% dari permintaan harus kurang dari 0.5 detik
        http_req_waiting: ['p(95)<300'], // 95% dari waktu tunggu harus kurang dari 0.3 detik
    },
};

export default function () {
    let credentials = 'Latihan:123';
    let encodedCredentials = `Basic ${encoding.b64encode(credentials)}`;

    let params = {
        headers: {
            'Authorization': encodedCredentials,
            'Accept-Encoding': 'gzip, deflate', // Mengaktifkan kompresi
        },
    };

    let res = http.get('https://api-sipencatar.dephub.go.id/v1/kesehatan', params);
    
    check(res, {
        'status was 200': (r) => r.status === 200,
        'response time under 0.5s': (r) => r.timings.duration < 500, // Memeriksa waktu respons
        'waiting time under 0.3s': (r) => r.timings.waiting < 300, // Memeriksa waktu tunggu
    });
    sleep(1);
}
