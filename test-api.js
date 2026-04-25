import handler from './api/generate.js';

const req = {
  method: 'POST',
  body: {
    messageType: 'Professional',
    context: 'Asking for leave'
  }
};

const res = {
  status: (code) => {
    console.log('Status:', code);
    return {
      json: (data) => {
        console.log('Data:', data);
      }
    };
  }
};

handler(req, res).catch(console.error);
