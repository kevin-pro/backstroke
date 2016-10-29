// Setup code that should run before all tests.


// Give mongoose a promise implementation.
import Promise from 'bluebird';
import mongoose from 'mongoose';
mongoose.Promise = Promise;

// make mixpanel null
global.mixpanel = {
  track() { return null; },
  identify() { return null; },
};
