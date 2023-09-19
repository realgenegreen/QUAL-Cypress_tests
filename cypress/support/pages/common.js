export class DeleteJob {
    DeleteUser () {
        let id

    cy.request({
      method: 'POST',
      url: 'http://localhost:5001/login',
      form: true,
      body: 'grant_type=&username=string&password=string&scope=&client_id=&client_secret='
    }) 

    cy.request({
      method: 'GET',
      url: 'http://localhost:5001/users/whoami',

      }).then(response => {
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('object')
          expect(response.body.id).to.exist

      id = response.body.id

      cy.request({
        method: 'DELETE',
        url: 'http://localhost:5001/user/' + id
        })
      })

    }
}

export const CleanUP = new DeleteJob