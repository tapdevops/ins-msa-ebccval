# Mobile Inspection - Microservice EBCC Validation

## Daftar API Service

### EBCC Kualitas Collections [/ebcc/kualitas]

#### Create Or Update [POST] 

Untuk membuat data TM_KUALITAS jika belum terbentuk, dan mengupdate data jika sudah ada.

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