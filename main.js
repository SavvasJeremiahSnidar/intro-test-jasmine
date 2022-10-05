//Unit Testing 

/**
 * Test Suite
 */
describe('Person', () => {
    // arrange
    let model;

    beforeEach(() => {
        // act
        model = new Person();
    });

    describe('default values', () => {
        it('first name defaults to empty string', () => {
            // assert
            expect(model.firstName).toBe('');
        });

        it('middle name defaults to empty string', () => {
            // assert
            expect(model.middleName).toBe('');
        });

        it('last name defaults to empty string', () => {
            // assert
            expect(model.lastName).toBe('');
        });
    })

    describe('full name', () => {

        beforeEach(() => {
            // arrange
            model.firstName = 'John'
            model.lastName = 'Doe'
        })

        it('gets full name with middle initial when middle name exists', () => {
            // arrange
            model.middleName = 'Edward';

            // act
            const result = model.fullName;

            // audit
            const {firstName: fn, lastName: ln, middleName: mn } = model;
            
            // assert
            // expect shouldn't have any logic in it
            expect(result).toBe(`${fn} ${mn[0]} ${ln}`);
        });

        it('when NO middle name returns first name and last name', () => {
            
            // act
            const result = model.fullName;

            // audit
            const {firstName: fn, lastName: ln, middleName: mn } = model;
            
            // assert
            expect(result).toBe(`${fn} ${ln}`);
        });

    })

    
    describe('say my name', () => {
        
        it('alerts the full name of user', () => {
            // arrange
            model.firstName = 'Dylan';
            model.lastName = 'Israel'
            spyOn(window, 'alert');

            // act
            model.sayMyName();

            // assert
            expect(window.alert).toHaveBeenCalledWith(model.fullName);
        });
    })

    describe('getMyFullSUerData', () => {

        beforeEach(() => {
            const data = {
                firstName: 'Dylan',
                middleName: 'Christopher',
                lastName: 'Israel',
                id: 1
            }

            mockPersonService = {
                lastId: null,
                getUserById(id) {
                    this.lastId = id;
                    return this.user;
                }
            }

            model = new Person(data, mockPersonService)
        });

        it('gets user data by id', async () => {
            // arrange
            mockPersonService.lastId = null;
            mockPersonService. user = {
                firstName: 'Dylan',
                middleName: 'Christopher',
                lastName: 'Israel',
                id: 1
            }

            // act
            const result = await model.getMyFullUserData();
            // assert
            expect(mockPersonService.lastId).toBe(1);
        });
    });

    describe('get code name', () => {
 
        it('when confirmed is a coding / testing god', () => {
            // arrange
            spyOn(window, 'confirm').and.returnValue(true);
            // act
            const result = model.getCodeName();
            // assert
            expect(result).toBe(`TESTING GOD!`)
        });

        it('when not confirmed is just another scrub', () => {
             // arrange
             spyOn(window, 'confirm').and.returnValue(false);
             // act
             const result = model.getCodeName();
             // assert
             expect(result).toBe(`Scrub skipping tests is in his best friend's ride!`)
        });
    });
})