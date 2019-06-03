import * as functions from 'firebase-functions';
const fbInit = require("./initFB");
let admin = fbInit.getAdmin();


export const workWithTime = functions.firestore.document('/crops/{cropId}').onUpdate((change, context) => {
    const db = admin.firestore()
    const item = change.after.data();

    return db
        .collection('comments')
        .where('item_id', '==', "1")
        .get()
        .then(querySnap => {
            const comments = querySnap.docs.map(doc => {
                const comment = doc.data()

                comment.cropMeta = {
                    created: item.created,
                }

                return comment
            })


            const writeBatch = db.batch()

            comments.forEach(comment => {

                console.log(comment)
                writeBatch.set(db.collection('comments').doc("1"), comment)
            })



            return writeBatch.commit().then((result) => {
                console.log(result)
            })
        })
}
