# Mobile Inspection - Microservice EBCC Validation

<!-- TOC depthFrom:1 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->
- [Mobile Inspection - Microservice EBCC Validation](#mobile-inspection---microservice-ebcc-validation)
	- [EBCC Kualitas Collections](#ebcc-kualitas-collections)
		- [Create Or Update [POST] [/ebcc/kualitas]](#create-or-update-post-ebcckualitas)
		- [Find [GET] [/ebcc/kualitas]](#find-get-ebcckualitas)
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

