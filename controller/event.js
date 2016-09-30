'use strict'

const express = require('express')
const router = express.Router()

const eventModel = require('../model/event_query')

router.get('/', (req, res, next) => {
  eventModel.findAllEvents()
    .then((data) => {
      res.render('event/event', {
        data:data
      })
    })
})

router.get('/view/:id', (req, res, next) => {
  eventModel.findEventbyID(req.params.id)
  .then(function(events){
    res.render('event/event_single', {
      title: 'iVolunteer',
      events: JSON.stringify(events),
      eventsRender: events
    })
  })
})

router.get('/new', (req, res, next) => {
  res.render('event/event_new')
})

router.post('/new', (req, res, next) => {
  eventModel.addEvent(req.body, req.user.id)
    .then(() => {
      res.redirect('/organization/dashboard/')
    })
})

router.get('/update/:id', (req, res, next) => {
  eventModel.findEventbyID(req.params.id)
    .then((data) => { // arg name may change
      res.render('event/event_update', {
        data: data
      })
    })
})

router.post('/update/:id', (req, res, next) => {
  eventModel.updateEvent(req.params.id, req.user.id, req.body)
    .then(() => { // arg name may change
      res.redirect('/organization/dashboard')
    })
})

router.get('/register/:id', (req, res, next) => {
  console.log(parseInt(req.params.id), req.user.id);
  eventModel.registerVolforEvent(parseInt(req.params.id), req.user.id)
    .then((data)=>{
      console.log('User is registered for event id #' + req.params.id)
      // res.redirect('/event/view/' + req.params.id)
    })
})

router.get('/unregister/:id', (req, res, next) => {
  eventModel.unregisterVolfromEvent(req.params.id, req.user.id)
    .then((data)=>{
      console.log(data)
      // res.redirect('/event')
    })
})

router.get('/delete/:id', (req, res, next) => {
  eventModel.deleteEvent(req.params.id)
    .then(() => {
      res.redirect('/organization/dashboard')
    })
})

// //THIS DOESN'T WORK
// router.get('/delete/:id', (req, res, next) => {
//   eventModel.findHostIDOfEvent(req.params.id)
//     .then((eventData) => {p[]
//       if (eventData.organization_id === req.user.id){
//         eventModel.deleteEvent(eventData.id)
//     })
//     .then(() => {
//       res.redirect('/organization/dashboard')
//     })
// })

module.exports = router
