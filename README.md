# Mobile Inspection - Microservice EBCC Validation

Table of contents:

<!-- TOC depthFrom:1 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->
- [Mobile Inspection - Microservice EBCC Validation](#mobile-inspection---microservice-ebcc-validation)
	- [EBCC Kualitas Collections](#ebcc-kualitas-collections)
	- [EBCC Sync Mobile Collections](#ebcc-sync-mobile-collections)
	- [EBCC Sync TAP Collections](#ebcc-sync-tap-collections)
	- [EBCC Validation Collections](#ebcc-validation-collections)
	- [Documentation History](#documentation-history)
<!-- /TOC -->

Seluruh penggunaan API menggunakan header sebagai berikut :
``` json
{
	"Authorization": "Bearer ACC3SS_T0k3N",
	"Content-Type": "application/json",
	"accept-version": "1.0.0"
}
```

Pengaturan dan Konfigurasi:

| Resource | Decription |
|:---------|:-----------|
| Config | Berisi pengaturan-pengaturan untuk menjalankan program, contohnya seperti jika anda mengganti environment dari `developent` ke `production`, maka database akan ikut berubah. Lokasi file: `APP_PATH/config/config.js` |
| Database | Berisi kumpulan koneksi Database. Lokasi file: `APP_PATH/config/database.js` |

## EBCC Kualitas Collections 

### Create [POST] [/ebcc/kualitas]

Untuk membuat data TM_KUALITAS baru.

**Request: (application/json)**

``` json
{
	"ID_KUALITAS": "14",
	"NAMA_KUALITAS": "Buah Matahari",
	"UOM": "PKK",
	"GROUP_KUALITAS": "PENALTY MANDOR",
	"ACTIVE_STATUS": "YES",
	"PENALTY_STATUS": "Y",
	"SHORT_NAME": "SF"
}
```

**Response**

``` json
{
	"status": true,
	"message": "Success! ",
	"data": {}
}
```

### Find [GET] [/ebcc/kualitas]

Untuk mengambil seluruh data di TM_KUALITAS. Service ini digunakan untuk pengambilan data saat pertama kali sync dan report.

**Response: (application/json)**

``` json
{
	"status": true,
	"message": "Success!",
	"data": [
		{
			"ID_KUALITAS": "10",
			"NAMA_KUALITAS": "Alas Brondolan(TPH)",
			"UOM": "TPH",
			"GROUP_KUALITAS": "PENALTY DI TPH",
			"ACTIVE_STATUS": "YES",
			"PENALTY_STATUS": "Y",
			"SHORT_NAME": "AB"
		},
		{
			"ID_KUALITAS": "14",
			"NAMA_KUALITAS": "Buah Matahari",
			"UOM": "PKK",
			"GROUP_KUALITAS": "PENALTY MANDOR",
			"ACTIVE_STATUS": "YES",
			"PENALTY_STATUS": "Y",
			"SHORT_NAME": "SF"
		}
	]
}
```

## EBCC Sync Mobile Collections 

### Get Data Mobile Sync [POST] [/sync-mobile/kualitas/{date1}/{date2}]

Untuk mengambil data pada saat mobile melakukan sinkronisasi.

**Response: (application/json)**

``` json
{
	"status": true,
	"message": "Data Sync tanggal 2019-01-01 s/d 2019-01-02",
	"data": {
		"hapus": [],
		"simpan": [
			{
				"ID_KUALITAS": "10",
				"NAMA_KUALITAS": "Alas Brondolan(TPH)",
				"UOM": "TPH",
				"GROUP_KUALITAS": "PENALTY DI TPH",
				"ACTIVE_STATUS": "YES",
				"PENALTY_STATUS": "Y",
				"SHORT_NAME": "AB"
			},
			{
				"ID_KUALITAS": "14",
				"NAMA_KUALITAS": "Buah Matahari",
				"UOM": "PKK",
				"GROUP_KUALITAS": "PENALTY MANDOR",
				"ACTIVE_STATUS": "YES",
				"PENALTY_STATUS": "Y",
				"SHORT_NAME": "SF"
			}
		],
		"ubah": [
			{
				"ID_KUALITAS": "10",
				"NAMA_KUALITAS": "Alas Brondolan(TPH)",
				"UOM": "TPH",
				"GROUP_KUALITAS": "PENALTY DI TPH",
				"ACTIVE_STATUS": "YES",
				"PENALTY_STATUS": "Y",
				"SHORT_NAME": "AB"
			},
			{
				"ID_KUALITAS": "14",
				"NAMA_KUALITAS": "Buah Matahari",
				"UOM": "PKK",
				"GROUP_KUALITAS": "PENALTY MANDOR",
				"ACTIVE_STATUS": "YES",
				"PENALTY_STATUS": "Y",
				"SHORT_NAME": "SF"
			}
		]
	}
}
```

## EBCC Sync TAP Collections

### Create Or Update [POST] [/sync-tap/kualitas]

Digunakan untuk mengisi tabel TM_KUALITAS, service ini dijalankan dengan **Cronjob**, berfungsi untuk sinkronisasi TM_KUALITAS di Database TAP ke Database Cloud MongoDB.

**Request: (application/json)**

``` json
{
	"ID_KUALITAS": "14",
	"NAMA_KUALITAS": "Buah Matahari",
	"UOM": "PKS",
	"GROUP_KUALITAS": "PENALTY MANDOR",
	"ACTIVE_STATUS": "YES",
	"PENALTY_STATUS": "Y",
	"SHORT_NAME": "SCF"
}
```

**Response**

``` json
{
	"status": true,
	"message": "Success! ",
	"data": {}
}
```

## EBCC Validation Collections

### Create Header [POST] [/ebcc/validation/header]

Service untuk membuat EBCC Validation Header.

**Request: (application/json)**

``` json
{
	"EBCC_VALIDATION_CODE": "V0000002A0F00101",
	"WERKS": "4121",
	"AFD_CODE": "A",
	"BLOCK_CODE": "001",
	"NO_TPH": "1",
	"STATUS_TPH_SCAN": "AUTOMATIC",
	"ALASAN_MANUAL": "1",
	"LAT_TPH": "14.593999",
	"LON_TPH": "120.99426",
	"DELIVERY_CODE": "ABC",
	"STATUS_DELIVERY_CODE": "YES",
	"STATUS_SYNC": "SYNC",
	"SYNC_TIME": 20190101000000,
	"INSERT_USER": "0017",
	"INSERT_TIME": 20190101000000,
	"UPDATE_USER": "",
	"UPDATE_TIME": 0
}
```

**Response**

``` json
{
	"status": true,
	"message": "Success! ",
	"data": {}
}
```

### Create Detail [POST] [/ebcc/validation/detail]

Service untuk membuat EBCC Validation Detail.

**Request: (application/json)**

``` json
{
	"EBCC_VALIDATION_CODE": "V0000002A0F00101",
	"ID_KUALITAS": "200",
	"JUMLAH": 20,
	"STATUS_SYNC": "SYNC",
	"SYNC_TIME": 20190101000000,
	"INSERT_USER": "0017",
	"INSERT_TIME": 20190101000000,
	"UPDATE_USER": "",
	"UPDATE_TIME": 0
}
```

**Response**

``` json
{
	"status": true,
	"message": "Success! ",
	"data": {}
}
```

## Documentation History
- Versi 1.0.0 :
	- A
	- B
- Versi 1.1.0 :
	- A
	- B

