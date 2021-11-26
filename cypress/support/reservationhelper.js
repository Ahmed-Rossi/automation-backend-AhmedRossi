const ENDPOINT_POST_RESERVATION = 'http://localhost:3000/api/reservation/new'
const ENDPOINT_GET_RESERVATIONS = 'http://localhost:3000/api/reservations'
const ENDPOINT_GET_RESERVATION = 'http://localhost:3000/api/reservation/'



function createReservationRequest(cy) {
    cy.authenticateSession().then((response => {
        const payload =
        {"client":1,"room":1,"bill":2,"start":"2021-11-12","end":"2022-11-10"}
        // post request to create a reservation
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_RESERVATION,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: payload
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(payload.start)
        }))



    }))
}

function getReservationAndDelete(cy){
    cy.authenticateSession().then((response =>{

    cy.request({
        method: "GET",
        url: ENDPOINT_GET_RESERVATIONS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{

        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_RESERVATION +lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },

        })

    }))
}))

    


}
module.exports ={

   createReservationRequest,
   getReservationAndDelete
}