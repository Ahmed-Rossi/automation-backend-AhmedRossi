const ENDPOINT_POST_BILL = 'http://localhost:3000/api/bill/new'
const ENDPOINT_GET_BILLS = 'http://localhost:3000/api/bills'
const ENDPOINT_GET_BILL = 'http://localhost:3000/api/bill/'



function createBillRequest(cy) {
    cy.authenticateSession().then((response => {
        const payload =
        {
            "value": 450,
            "paid": true
        }
        // post request to create a room
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_BILL,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: payload
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(payload.value)
        }))



    }))
}

function getBillAndDelete(cy){
    cy.authenticateSession().then((response =>{

    cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{

        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_BILL +lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },

        })

    }))
}))

    


}
module.exports ={

    createBillRequest,
    getBillAndDelete
}