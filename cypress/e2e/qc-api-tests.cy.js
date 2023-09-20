/// <reference types="Cypress" />
import { Job } from "../support/pages/common"

describe('qc-api-tests', () => {

context('by_hands', () => {
//register
  it('register', () => {
 
    cy.visit('localhost:5001/docs#/')

    cy.get('#operations-default-create_user_register_post > div:nth-child(1) > button:nth-child(1) > svg:nth-child(4)')
      .click()
    cy.get('.try-out__btn')
      .click()
    cy.get('.body-param__text')
      .clear()
      .type('{{}{enter}"username": "string", {enter}"full_name": "string", {enter}"password": "string"{enter}{}}')
    cy.get('.execute').click()
      cy.reload()
  })

//login
  it('login', () => {

    cy.visit('localhost:5001/docs#/')

    cy.get('#operations-default-login_login_post > div:nth-child(1) > button:nth-child(1) > svg:nth-child(4)')
      .click()
    cy.get('#operations-default-login_login_post > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)')
      .click()
    cy.get('tr.parameters:nth-child(2) > td:nth-child(2) > div:nth-child(1) > input:nth-child(1)')
      .click()
      .type('string')
//    cy.get('#operations-default-login_login_post > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)')
//      .should('be.disabled')
    cy.get('tr.parameters:nth-child(3) > td:nth-child(2) > div:nth-child(1) > input:nth-child(1)')
      .click()
      .type('string')
    cy.get('#operations-default-login_login_post > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)')
      .should('not.be.disabled')
      .click()

  })

//logout
  it('logout', () => {
 
    cy.visit('localhost:5001/docs#/')

    cy.get('#operations-default-logout_logout_post > div:nth-child(1) > button:nth-child(1) > svg:nth-child(4)')
      .click()
    cy.get('.try-out__btn')
      .click()
    cy.get('.execute').click()
    cy.reload()
  })
  
//delete
  it('delete', () => {
 
    cy.visit('localhost:5001/docs#/')

    Job.LoginUser('string', 'string')

    let id

    cy.request({
      method: 'GET',
      url: 'http://localhost:5001/users/whoami',

    }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('object')
        expect(response.body.id).to.exist
  
      id = response.body.id

      cy.get('.opblock-summary-delete > button:nth-child(1) > svg:nth-child(4)')
        .click()
      cy.get('.try-out__btn')
        .click()
      cy.get('table.parameters > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > input:nth-child(1)')
        .click()
        .type(id.toString())
      cy.get('.execute').click()
      cy.reload()
      })
  })
  
})



//requests

  context('by_requests', () => {
  it ('login+logout, whoami and false delete jobs', () => {

    let usr = 'string'
    let fnm = 'string'
    let pwd = 'string'

    cy.visit('localhost:5001/docs#/') //cause don't like to see blank pages
    
    Job.RegUser(usr, fnm, pwd)
    Job.LoginUser(usr, pwd)

//false delete    
    let id

    cy.request({
      method: 'GET',
      url: 'http://localhost:5001/users/whoami',

      }).then(response => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('username', usr)
          expect(response.body).to.have.property('full_name', pwd)
          expect(response.body).to.be.an('object')
          expect(response.body.id).to.exist

        id = response.body.id

        cy.request({
          method: 'POST',
          url: 'http://localhost:5001/logout',

       }).then((response) => {
            expect(response.status, 'status').to.eq(200)
            expect(response.body).to.have.property('message', 'logged out')
          })

        cy.request({
          method: 'DELETE',
          url: 'http://localhost:5001/user/' + id,
          failOnStatusCode: false

         }).then((response) => {
            expect(response.status, 'status').to.eq(401)
            expect(response.body).to.have.property('detail', 'Not authenticated')
          })  
        })
    
    Job.LoginUser(usr, pwd)
    Job.DeleteUser() 
  })

  })

})





