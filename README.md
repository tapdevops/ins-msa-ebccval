# Mobile Inspection - Microservice EBCC Validation

<!-- TOC depthFrom:1 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->
- [Mobile Inspection - Microservice EBCC Validation](#mobile-inspection---microservice-ebcc-validation)
	- [EBCC Kualitas Collections](#ebcc-kualitas-collections-ebcckualitas)
	- [EBCC Kualitas Collections](#ebcc-kualitas-collections-ebcckualitas)
<!-- /TOC -->

## EBCC Kualitas Collections [/ebcc/kualitas]

### Create Or Update [POST] 

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