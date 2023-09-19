export class DeleteJob {
    DeleteUser () {

        let id

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

export class RegJob {
    RegUser (user, full_name, password) {

        cy.request({
            method: 'POST',
            url: 'http://localhost:5001/register',
            body: {
              'username': user, 
              'full_name': full_name, 
              'password': password}
      
          }).then((response) => {
              expect(response.status, 'status').to.eq(200)
              }) 
    }
}

export class LoginJob {
    LoginUser (user, password) {
        
        cy.request({
          method: 'POST',
          url: 'http://localhost:5001/login',
          form: true,
          body: 'grant_type=&username='+user+'&password='+password+'&scope=&client_id=&client_secret='
        }) 

    }
}

export const Add = new RegJob
export const Enter = new LoginJob 
export const CleanUP = new DeleteJob