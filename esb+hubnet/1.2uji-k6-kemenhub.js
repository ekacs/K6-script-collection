import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 6666 }, // naik ke 6666 pengguna dalam 1 menit
        { duration: '10m', target: 6666 }, // tetap di 6666 pengguna selama 10 menit
        { duration: '1m', target: 0 }, // turun kembali ke 0 pengguna dalam 1 menit
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% dari request harus di bawah 2 detik
    },
};

export default function () {
    let res = http.get('https://www.youtube.com/watch?v=c54pb_wqNCA'); // URL endpoint aplikasi video
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1); // istirahat 1 detik antara permintaan
}