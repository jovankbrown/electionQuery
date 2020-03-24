context('CNN Election Query', () => {
    
    beforeEach(() => {
        const apikey = Cypress.env('apiKey');
        cy.request('https://www.googleapis.com/civicinfo/v2/elections?key=' + apikey ).as('electionQuery');
    })

    describe('API Test', () => {
        it('Validates the header', () => {
            cy.get('@electionQuery')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json; charset=UTF-8');
        });

        it('Validate the status code', () => {
            cy.get('@electionQuery')
                .its('status')
                .should('equal', 200);
        });

        it('Validate the body and properties', () => {
            cy.get('@electionQuery')
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('kind')
                expect(response.body).to.have.property('elections')
                expect(response.body).to.deep.equal({
                    "kind": "civicinfo#electionsQueryResponse",
                    "elections": [
                        {
                            "id": "2000",
                            "name": "VIP Test Election",
                            "electionDay": "2021-06-06",
                            "ocdDivisionId": "ocd-division/country:us"
                        },
                        {
                            "id": "4934",
                            "name": "Oklahoma Board of Education General Elections/Special Elections",
                            "electionDay": "2020-04-07",
                            "ocdDivisionId": "ocd-division/country:us/state:ok"
                        },
                        {
                            "id": "4980",
                            "name": "Rhode Island Providence Ward 1 Special Election",
                            "electionDay": "2020-04-07",
                            "ocdDivisionId": "ocd-division/country:us/state:ri"
                        }
                    ]
                })
              })
        });
    })
  
    
  })
  