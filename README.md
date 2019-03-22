# Mobile Inspection - Microservice EBCC Validation

Table of contents:

<!-- TOC depthFrom:1 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->
- [Mobile Inspection - Microservice EBCC Validation](#mobile-inspection---microservice-ebcc-validation)
	- [EBCC Kualitas Collections](#ebcc-kualitas-collections)
	- [EBCC Sync Mobile Collections](#ebcc-sync-mobile-collections)
<!-- /TOC -->

## EBCC Kualitas Collections 

### Create Or Update [POST] [/ebcc/kualitas]

Untuk membuat data TM_KUALITAS jika belum terbentuk, dan mengupdate data jika sudah ada.

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