const projectId = 'dummy'
const firebase = require('@firebase/testing')

const admin = firebase.initializeAdminApp({projectId, databaseName: projectId})
const test = require('firebase-functions-test')({projectId, databaseName: projectId})
const fbInit = require('../lib/initFB')

fbInit.initializeMockApp(admin)

// this will inject the mocked admin

const chai = require('chai')
const assert = chai.assert

describe('Cloud functions', () => {
  let myFunctions

  before(() => {
    myFunctions = require('../lib/index')
  })

  after(() => {
    test.cleanup()
  })

  describe('workWithTime', () => {
    let dummyItem = {
      prop: 1,
      created: new Date('2019-06-03T06:12:15.643Z'),
    }

    let dummyComment = {
      key: '1',
      item_id: "1",
      created: new Date('2019-06-03T06:14:15.643Z'),
      text: 'Test 12',
      date_prop: new Date('2019-05-03T09:02:05.538Z'),
    }

    before(async () => {
      const commentRef = admin.firestore().collection('comments')
        .doc('1')

      await commentRef.set(dummyComment)
    })

    it('shouldn\'t modify comments if no watched property changes', async () => {

      const beforeSnap = test.firestore.makeDocumentSnapshot(dummyItem, 'item/1')

      const afterSnap = test.firestore.makeDocumentSnapshot(dummyItem, 'item/1')

      const change = test.makeChange(beforeSnap, afterSnap)

      const wrapped = test.wrap(myFunctions.workWithTime)

      return wrapped(change).then(async (snapshot) => {


        throw Error('not asserted yet')
      })
    })

  })

})

