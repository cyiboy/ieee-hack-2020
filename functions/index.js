const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
  origin: true
});
const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBzpImzx8Wba75ymXH2wKnbFqExfsyMUd0",
  authDomain: "serverless-b0271.firebaseapp.com",
  databaseURL: "https://serverless-b0271.firebaseio.com",
  projectId: "serverless-b0271",
  storageBucket: "serverless-b0271.appspot.com",
  messagingSenderId: "721933585026",
  appId: "1:721933585026:web:d693d5b28234999686029b",
  measurementId: "G-MRB40NNTZV"
};
firebase.initializeApp(firebaseConfig);

admin.initializeApp();
const database = firebase.database().ref('/user');

const getItemsFromDatabase = (res) => {
  let items = [];

  return database.on('value', (snapshot) => {
    snapshot.forEach((item) => {
      items.push({
        id: item.key,
        item: item.val().item
      });
    });
    res.status(200).json(items);
  }, (error) => {
    res.status(error.code).json({
      message: `Something went wrong. ${error.message}`
    })
  })
};

exports.createStudent = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)

    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const faculty = req.body.faculty
    const deptartment = req.body.deptartment
    const Matnumber = req.body.matNumber


    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        const uid = userRecord.uid;

        const database = firebase.database().ref('student/').child(uid);


        database.set({
            email,
            password,
            uid,
            firstName,
            lastName,
            phoneNumber,
            Matnumber,
            deptartment,
            faculty
          })
          .then(
            database.once('value')
            .then(function (snapshot) {

              console.log(snapshot.val());

              res.status(200).json(snapshot.val())
            }, (error) => {
              res.status(error.code).json({
                message: `Something went wrong. ${error.message}`
              })

            })


          ).catch(function (error) {
              console.log('write', error.code)
              res.status(error.code).json({
                message: `Something went wrong. ${error.message}`
              })

            }

          );





      })
      .catch(function (error) {
        // Handle Errors here.
        if (error.code === "auth/email-already-in-use") {
          console.log('for auth ', error.code)
          res.status(302).json({
            message: `email areadly exist`
          })
        } else

          res.status(300).json({
            message: `Something went wrong. ${error.message}`
          })
 
  })
})})

exports.createTeacher = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)

    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const faculty = req.body.faculty
    const deptartment = req.body.deptartment


    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        const uid = userRecord.uid;

        const database = firebase.database().ref('teacher/').child(uid);


        database.set({
            email,
            password,
            uid,
            firstName,
            lastName,
            deptartment,
            faculty
          })
          .then(
            database.once('value')
            .then(function (snapshot) {

              console.log(snapshot.val());

              res.status(200).json(snapshot.val())
            }, (error) => {
              res.status(error.code).json({
                message: `Something went wrong. ${error.message}`
              })

            })


          ).catch(function (error) {
              console.log('write', error.code)
              res.status(error.code).json({
                message: `Something went wrong. ${error.message}`
              })

            }

          );





      })
      .catch(function (error) {
        // Handle Errors here.
        if (error.code === "auth/email-already-in-use") {
          console.log('for auth ', error.code)
          res.status(302).json({
            message: `email areadly exist`
          })
        } else

          res.status(300).json({
            message: `Something went wrong. ${error.message}`
          })
 
  })
})})




exports.loginStudent = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)

    const email = req.body.email
    const password = req.body.password

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        const uid = userRecord.uid;

        const database = firebase.database().ref('student/').child(uid);


        database.once('value').then(function (snapshot) {

          console.log(snapshot.val());

          res.status(200).json(snapshot.val())
        }, (error) => {
          res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
          })

        })





      })

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  });

})

exports.loginTeacher = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)

    const email = req.body.email
    const password = req.body.password

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        const uid = userRecord.uid;

        const database = firebase.database().ref('teacher/').child(uid);


        database.once('value').then(function (snapshot) {

          console.log(snapshot.val());

          res.status(200).json(snapshot.val())
        }, (error) => {
          res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
          })

        })





      })

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  });

})


exports.newsLetter = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(404).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)
    const email = req.body.email
    const status = true

    // See the UserRecord reference doc for the contents of userRecord.


    const database = firebase.database().ref('newsletter');


    database.set({
      email,
      status
    }).then(

      res.status(200).json({
        message: `successfull.`
      })


    ).catch(function (error) {
        console.log('write', error.code)
        res.status(error.code).json({
          message: `Something went wrong. ${error.message}`
        })

      }

    );
  })
})

exports.getTeacher = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)
   const uid = req.body.uid;

        const database = firebase.database().ref('teacher/').child(uid);


        database.once('value').then(function (snapshot) {

          console.log(snapshot.val());

          res.status(200).json(snapshot.val())
        }, (error) => {
          res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
          })

        })






})})

exports.getStudent = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)
   const uid = req.body.uid;

        const database = firebase.database().ref('teacher/').child(uid);


        database.once('value').then(function (snapshot) {

          console.log(snapshot.val());

          res.status(200).json(snapshot.val())
        }, (error) => {
          res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
          })

        })






})})

exports.createCourse = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)

    const courseTitle = req.body.courseTitle
    const courseCode = req.body.courseCode 
    const teacherId = req.body.teacherId
     
    const faculty = req.body.faculty
     


   

    const data = firebase.database().ref('course/').push()
    var key = data.key;
    const database = firebase.database().ref('course/').child(key);


    database.set({
        courseCode,
        courseTitle,
        teacherId,
        faculty,
        
      })
      .then(
        database.once('value')
        .then(function (snapshot) {

          console.log(snapshot.val());

          res.status(200).json(snapshot.val())
        }, (error) => {
          res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
          })

        })


      ).catch(function (error) {
          console.log('write', error.code)
          res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
          })

        }

      );

})})
  
exports.Course = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'GET') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
     
   

    const course = [];
    const database = firebase.database().ref('teacher/')
    database.once('value').then(function (snapshot) {
      Snapshot.forEach(
        (doc) => {
           course.push({
               doc
            });
        }
    )
      

      res.status(200).json(snapshot.val())
    }

  
    
     

    
    


      ).catch(function (error) {
          console.log('write', error.code)
          res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
          })

        }

      );

})})
 