#Copy code
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 6000 }, // naik ke 6000 pengguna dalam 1 menit
        { duration: '10m', target: 6000 }, // tetap di 6000 pengguna selama 10 menit
        { duration: '1m', target: 0 }, // turun kembali ke 0 pengguna dalam 1 menit
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% dari request harus di bawah 2 detik
    },
    ext: {
        loadimpact: {
            projectID: 123456, // ganti dengan project ID Load Impact Anda jika menggunakan Load Impact
            // k6 API token dari Load Impact
            // token: 'YOUR_API_TOKEN', 
        }
    }
};

export default function () {
    let res = http.get('https://example.com/video-stream'); // ganti dengan URL endpoint aplikasi video Anda
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1); // istirahat 1 detik antara permintaan
}
