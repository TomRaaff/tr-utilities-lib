import mergeObjects from './MergeObjects';

describe('mergeObject', () => {
    it('should return an updated object', () => {
        const base = {
            field1: 1,
            field2: true,
            field3: 'SomeString'
        };
        const updates = {
            field2: false
        }
        const expected = {
            field1: 1,
            field2: false,
            field3: 'SomeString'
        };
        const result = mergeObjects(base, updates);
        expect(result).toEqual(expected);
    });
    it('should return an updated nested object', () => {
        const base = {
            field1: 1,
            field2: true,
            field3: 'SomeString',
            field4: {
                nested1: 'NestedString',
                nested2: true
            }
        };
        const updates = {
            field1: 5,
            field4: {
                nested2: false
            }
        }
        const expected = {
            field1: 5,
            field2: true,
            field3: 'SomeString',
            field4: {
                nested1: 'NestedString',
                nested2: false
            }
        };

        const result = mergeObjects(base, updates);
        expect(result).toEqual(expected);
    });
    it('should return an updated deep nested object', () => {
        const base = {
            field1: 1,
            field2: true,
            field3: 'SomeString',
            field4: {
                nested1: 'NestedString',
                nested2: true,
                nested3: {
                    deep1: 1,
                    deep2: true,
                    deep3: 'DeepString'
                }
            }
        };
        const updates = {
            field1: 5,
            field4: {
                nested2: false,
                nested3: {
                    deep1: 3,
                    deep3: 'NewDeepString'
                }
            }
        }
        const expected = {
            field1: 5,
            field2: true,
            field3: 'SomeString',
            field4: {
                nested1: 'NestedString',
                nested2: false,
                nested3: {
                    deep1: 3,
                    deep2: true,
                    deep3: 'NewDeepString'
                }
            }
        };
        const result = mergeObjects(base, updates);
        expect(result).toEqual(expected);
    });


    it('should return an updated object with primitive arrays', () => {
        const base = {
            field1: 1,
            field2: true,
            field3: 'SomeString',
            field4: [1, 2, 3, 4]
        };

        const updates = {
            field2: false,
            field4: [5, 4, 3, 2]
        }

        const expected = {
            field1: 1,
            field2: false,
            field3: 'SomeString',
            field4: [5, 4, 3, 2]
        };

        const result = mergeObjects(base, updates);
        expect(result).toEqual(expected);
    });

    it('should return an updated object with object arrays', () => {
        const base = {
            field1: 1,
            field2: true,
            field3: 'SomeString',
            field4: [
                { id: 'someID1', arr1: 1, arr2: 2 },
                { id: 'someID2', arr1: 4, arr2: 5 },
            ]
        };

        const updates = {
            field2: false,
            field4: [
                { arr2: 222 },
                { arr2: 555 },
            ]
        }

        const expected = {
            field1: 1,
            field2: false,
            field3: 'SomeString',
            field4: [
                { id: 'someID1', arr1: 1, arr2: 222 },
                { id: 'someID2', arr1: 4, arr2: 555 },
            ]
        };

        const result = mergeObjects(base, updates);
        expect(result).toEqual(expected);
    });

    it('should ADD update objects when there are MORE objects in the updates array than in the base array', () => {
        const baseArr = {
            arr: [
                { field1: 1, field2: true, field3: 'string' },
            ]
        };
        const updatesArr = {
            arr: [
                { field2: false },
                { field1: 2, field2: true },
                { field1: 3, field3: 'newString' },
            ]
        };
        const expected = {
            arr: [
                { field1: 1, field2: false, field3: 'string' },
                { field1: 2, field2: true },
                { field1: 3, field3: 'newString' },
            ]
        };
        const result = mergeObjects(baseArr, updatesArr);
        expect(result).toEqual(expected);
    });

    it('should REMOVE objects when there are LESS objects in the updates array than in the base array', () => {
        const baseArr = {
            arr: [
                { field1: 1, field2: true, field3: 'string' },
                { field1: 2, field2: true },
                { field1: 3, field3: 'string' },
            ]
        };
        const updatesArr = {
            arr: [
                { field1: 6, field3: 'newString' },
            ]
        };
        const expected = {
            arr: [
                { field1: 6, field2: true, field3: 'newString' },
            ]
        };
        const result = mergeObjects(baseArr, updatesArr);
        expect(result).toEqual(expected);
    });

    it('should merge zakelijkrechtverzoek properly', () => {
        const base = {
            id: "1234",
            aangemaaktOp: "2020-05-13T00:00:00",
            behandelaar: "Tom de Graaf",
            caseId: "S001145",
            meldingsnummer: "",
            percelen: [
                {
                    isNew: false,
                    perceel: undefined,
                    bevatStation: true,
                    csDocumentUrl: "https://tst-contentserver.alliander.com/cs/llisapi.dll/open/9357275",
                    eigenaren: [
                        {
                            aandeel: "1/2",
                            achternaam: "Vries",
                            adres: {
                                huisnummer: "3a",
                                postcode: "1012AA",
                                straat: "Dorpsstraat",
                                woonplaats: "Amsterdam"
                            },
                            email: "jandevries@mail.com",
                            kadastraleID: "NL.IMKAD.Persoon.9287346",
                            overleden: false,
                            telefoonnummer: "+31612345678",
                            voornaam: "Jan",
                            voorvoegsel: "de"
                        },
                        {
                            aandeel: "1/2",
                            adres: {
                                huisnummer: "3a",
                                postcode: "1012AA",
                                straat: "Dorpsstraat",
                                woonplaats: "Amsterdam"
                            },
                            email: null,
                            kadastraleID: "NL.IMKAD.Persoon.9287353",
                            overleden: false,
                            statutaireNaam: "Vereniging van eigenaren",
                            telefoonnummer: null
                        }
                    ],
                    kadastraleAanduiding: "AHM01P4326G0000",
                    kadastraleGemeente: "AHM01",
                    perceelnummer: 4326,
                    sectie: "P",
                    status: "STANDARD",
                    zakelijkRechtType: "PrivateGrond",
                    zakelijkRechtVestigen: true
                }
            ],
            statussen: [
                {
                    status: "AANGEMAAKT",
                    toegekendOp: "2020-05-13T00:00:00"
                }
            ]
        };
        const update = {
            behandelaar: 'Tom Raaff',
            percelen: [
                {
                    eigenaren: [
                        {
                            email: 'jansnieuwe@email.com',
                            overleden: true,
                            telefoonnummer: '1234567890'
                        }
                    ]
                }
            ]
        };
        const expected = {
            id: "1234",
            aangemaaktOp: "2020-05-13T00:00:00",
            behandelaar: "Tom Raaff",
            caseId: "S001145",
            meldingsnummer: "",
            percelen: [
                {
                    isNew: false,
                    perceel: undefined,
                    bevatStation: true,
                    csDocumentUrl: "https://tst-contentserver.alliander.com/cs/llisapi.dll/open/9357275",
                    eigenaren: [
                        {
                            aandeel: "1/2",
                            achternaam: "Vries",
                            adres: {
                                huisnummer: "3a",
                                postcode: "1012AA",
                                straat: "Dorpsstraat",
                                woonplaats: "Amsterdam"
                            },
                            email: 'jansnieuwe@email.com',
                            kadastraleID: "NL.IMKAD.Persoon.9287346",
                            overleden: true,
                            telefoonnummer: '1234567890',
                            voornaam: "Jan",
                            voorvoegsel: "de"
                        }
                    ],
                    kadastraleAanduiding: "AHM01P4326G0000",
                    kadastraleGemeente: "AHM01",
                    perceelnummer: 4326,
                    sectie: "P",
                    status: "STANDARD",
                    zakelijkRechtType: "PrivateGrond",
                    zakelijkRechtVestigen: true
                }
            ],
            statussen: [
                {
                    status: "AANGEMAAKT",
                    toegekendOp: "2020-05-13T00:00:00"
                }
            ]
        };
        const result = mergeObjects(base, update);
        expect(result).toEqual(expected);
    })
});
