# Mobile Inspection - Microservice EBCC Validation

## Daftar API Service

| Resource                    | Method | Decription                                        |
|:----------------------------|:-------|:---------------------------------------------------
| `/ebcc/kualitas` | POST | Untuk membuat data TM_KUALITAS jika belum terbentuk, dan mengupdate data jika sudah ada. |
| `/sync-mobile/kualitas/{tanggal_terakhir_sync}/{tanggal_sekarang}` | GET | Untuk mengambil data TM_KUALITAS untuk sinkronisasi dengan mobile |
| `/ebcc/kualitas/{doi}` | POST | Untuk membuat data TM_KUALITAS jika belum terbentuk, dan mengupdate data jika sudah ada. |
