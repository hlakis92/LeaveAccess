var express = require('express');
var router = express.Router();
let middleware = require('./../server/middleware');

/* GET users listing. */
// router.get('/index', function(req, res, next) {
//   // res.send('respond with a resource');
//   res.render('index', { title: 'LAM' });
// });


router.get('/users', middleware.checkAccessToken,function (req, res, next) {
  // res.send('respond with a resource');
  res.status(200);
  res.render('user/list', {title: 'User List'});
});



// SHOW LIST OF USERS
/*router.get('/users',async  function(req, res, next) {
    let userService = require('./../server/api/user/user.service')
    let getUserList = await userService.getUserListService(req);
    console.log( getUserList.data);
    if (getUserList.status === true) {
        getUserListData = getUserList.data;
        //planMaximumDuration = employeeLeaveClaimInfoResult.data.planMaximumDuration;
        //planStatus = employeeLeaveClaimInfoResult.data.planStatus
    } else {
       // req.flash('error', getUserList.error)
        res.render('user/list', {
            title: 'User List', 
            data: ''
        })
    }
        res.render('user/list', {
        title: 'User List',
        data: getUserListData
    });
})*/


router.get('/users/edit/:id',middleware.checkAccessToken, async  function(req, res, next) {
    let userService = require('./../server/api/user/user.service')
    let getUser = await userService.getUserService(req);
    if (getUser.status === true) {
        getUserData = getUser.data;
    } else {
       // req.flash('error', getUser.error)
        res.render('user/edit', {
            title: 'User Edit`', 
            data: ''
        })
    }
    //console.log("tttt"+getUserData);
    res.render('user/edit', {
        title: 'User Edit',
        user_id: getUserData.user_id,
        name: getUserData.name,
        usertype: getUserData.usertype,
        email: getUserData.email,
        status: getUserData.status  
    });
})

/*router.post('/users/edit/:id', async function(req, res, next) {
    //var user = { id: req.params.id }
    let userService = require('./../server/api/user/user.service')
    let UserUpdate = await userService.userUpdateService(req);
    //console.log( UserUpdate);
    if (UserUpdate.status === true) {        
        res.redirect('/users');        
    } 
})*/
router.get('/users/add',middleware.checkAccessToken, async function (req, res, next) {
  res.render('user/add', {
        title: 'Add New User',
        name: '',
        usertype: '',
        email: '',
        password: ''       
    })
});

/*router.post('/users/add/', async function(req, res, next) {
    //var user = { id: req.params.id }
    let userService = require('./../server/api/user/user.service');
    let UserAdd = await userService.addUserService(req);
    //console.log( UserUpdate);
    if (UserAdd.status === true) {        
        res.redirect('/users');        
    } 
})*/
// SHOW ADD USER FORM

 
// ADD NEW USER POST ACTION
router.post('/add', function(req, res, next){    
    req.assert('name', 'Name is required').notEmpty()           //Validate name
    req.assert('usertype', 'User Type is required').notEmpty()             //Validate usertype
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
 
    var errors = req.validationErrors();
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        /********************************************
         * Express-validator module
         
        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';
 
        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var user = {
            name: req.sanitize('name').escape().trim(),
            usertype: req.sanitize('usertype').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO tbl_usermaster SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/add', {
                        title: 'Add New User',
                        name: user.name,
                        usertype: user.usertype,
                        email: user.email                    
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/add', {
                        title: 'Add New User',
                        name: '',
                        usertype: '',
                        email: ''                    
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('user/add', { 
            title: 'Add New User',
            name: req.body.name,
            usertype: req.body.usertype,
            email: req.body.email
        })
    }
})
// DELETE USER
/*router.post('/users/delete/:id', async function(req, res, next) {
    //var user = { id: req.params.id }
    let userService = require('./../server/api/user/user.service')
    let UserDelete = await userService.userDeleteService(req);
    //console.log( UserDelete);
    if (UserDelete.status === true) {        
        //res.redirect('/users');        
    } 
})*/
module.exports = router;
