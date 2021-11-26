import * as roomHelpers from '../support/roomHelper'
import * as clientHelpers from '../support/clientHelper'
import * as billHelpers from '../support/billshelper'
import * as reservationHelpers from '../support/reservationhelper'


describe('testing auth', function () {

    it('create and delete room', function () {
        roomHelpers.createRoomRequest(cy)
        roomHelpers.getRoomAndDelete(cy)
    })
    it('create and delete a client', function () {
        clientHelpers.createClientRequest(cy)
        clientHelpers.getClientAndDelete(cy)
    })
    it('create and delete bill', function () {
        billHelpers.createBillRequest(cy)
        billHelpers.getBillAndDelete(cy)
    })
    it('create and delete a reservation', function () {
        reservationHelpers.createReservationRequest(cy)
        reservationHelpers.getReservationAndDelete(cy)
    })

    it('create and edit a room', function () {
        roomHelpers.createRoomRequest(cy)
        roomHelpers.getRoomAndEdit(cy)
        roomHelpers.getRoomAndDelete(cy)
     

    })

})