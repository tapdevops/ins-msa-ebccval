# Mobile Inspection - Microservice EBCC Validation

## Daftar API Service

| resource                    | description                       |
|:----------------------------|:----------------------------------|
| `/works/{doi}`      | returns information about the specified Crossref `DOI` |
| `/funders/{funder_id}/works`| returns list of works associated with the specified `funder_id` |
| `/types/{type_id}/works` | returns list of works of type `type` |
| `/prefixes/{owner_prefix}/works` | returns list of works associated with specified `owner_prefix` |
| `/members/{member_id}/works` | returns list of works associated with a Crossref member (deposited by a Crossref member) |
| `/journals/{issn}/works` | returns a list of works in the given journal |