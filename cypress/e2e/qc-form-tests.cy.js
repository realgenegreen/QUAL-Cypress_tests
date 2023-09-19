/// <reference types="Cypress" />
import { FormTypingEx } from "../support/pages/forms"

describe('reglog-forms-tests', () => {

    context('register_form', () => {

        it('runs', () => {
            
            cy.visit ('localhost:8080/register')

            cy.get('.register-btn')
                .click()
                // .get('.user-card')
                // .should('contain.text', 'Ошибка')
                // .wait(2000)
            cy.contains('Ошибка')
                .wait(500)
            
            FormTypingEx.typeUsername('string')
            
            FormTypingEx.typePassword('string')

            cy.get('#password')
                .should('be.empty')
                .get('.input-group-append > .btn')
                .click()
                .get('#password')
                .should('be.empty')
                .should('have.value', 'string')
            
            cy.intercept('POST', 'http://localhost:5001/register').as('getStatus')

            cy.get('.d-flex > .btn')
                .click()
                // .wait(2000)
            
            cy.wait('@getStatus', {timeout: 1000})
                .then(interception => {
                    expect(interception.response.statusCode).to.equal(200)
                    })
   
        })

    })

    context('login_form', () => {

        it('runs', () => {
            
            cy.visit ('localhost:8080/login')

            FormTypingEx.typeUsername('string')

            FormTypingEx.typePassword('string')

            cy.intercept('POST', 'http://localhost:5001/login').as('getStatus')

            cy.get('.btn')
                .click()

            cy.wait('@getStatus', {timeout: 1000})
                .then(interception => {
                    expect(interception.response.statusCode).to.equal(200)
                    })
                    
        })
    })

})