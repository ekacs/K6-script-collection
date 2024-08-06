import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30m', target: 50 }, // Meningkatkan pengguna ke 50 selama 30 menit
        { duration: '50m', target: 100 }, // Meningkatkan pengguna ke 100 selama 50 menit
        { duration: '30m', target: 50 }, // Mengurangi pengguna kembali ke 50 selama 30 menit
        { duration: '50m', target: 100 }, // Meningkatkan lagi pengguna ke 100 selama 50 menit
        { duration: '2m', target: 0 }, // Menurunkan pengguna menjadi 0 selama 2 menit
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% dari permintaan harus di bawah 2 detik
    },
};

export default function () {
    let res = http.get('https://api-sipencatar.dephub.go.id/v1/admin/login'); // Fitur login admin
    check(res, {
        'status was 200': (r) => r.status === 200,
        'response time under 2s': (r) => r.timings.duration < 2000, // Opsional: Memeriksa waktu respons
    });
    sleep(1); // Tidur selama 1 detik antara permintaan untuk meniru perilaku pengguna
}