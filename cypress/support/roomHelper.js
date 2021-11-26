const ENDPOINT_POST_ROOM = 'http://localhost:3000/api/room/new'
const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms/'
const ENDPOINT_GET_ROOM ='http://localhost:3000/api/room/'



function createRoomRequest(cy) {
    cy.authenticateSession().then((response => {
        const payload = {
            "features": ["ensuite" ],
            "category": "twin",
            "number": 2,
            "floor": 2,
            "available": true,
            "price": 800,

        }

        // post request to create a room
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: payload
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(payload.price)
        }))



    }))
}
function getRoomAndDelete(cy){
    cy.authenticateSession().then((response =>{

    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{

        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_ROOM +lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },

        })

    }))
}))

    


}
function getRoomAndEdit(cy){
    cy.authenticateSession().then((response =>{

    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{

        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_ROOM +lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        
            body: 
            {"id":lastId+1,
            "created":"2020-01-04T12:00:00.000Z",
            "category":"double",
            "floor":1,
            "number":102,
            "available":true,
            "price":2000,
            "features":["sea_view"]}
           /* {
                "features": ["ensuite" ],
                "category": "double",
                "number": 1,
                "floor": 1,
                "available": true,
                "price": 400,
    
            }
*/
        })

    }))
}))

    


}


module.exports = {
    createRoomRequest,
    getRoomAndDelete ,
    getRoomAndEdit
}