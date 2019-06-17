import Zil from '../../lib/hw-app-zil/src/zil'


const typeMSG = {
  init: 'ledger_bridge_ready',
  res: 'ledger_bridge_response',
  fail: 'ledger_bridge_reject',
  req: 'ledger_bridge_request'
};

var transport;

async function transportInit() {
  return await Zil.create();
}

function sendResponse(origin, payload, response) {
  const type = typeMSG.res;
  const msg = Object.assign(new Object(), payload, { type }, response);
  console.log(msg.type);
  window.top.postMessage(msg, origin);
}

async function handler({ origin, data }) {
  if (typeof data !== 'object') {
    return null;
  } else if (!data.type || data.type != typeMSG.req) {
    return null;
  }

  try {
    const zil = new Zil(transport);
    const resolve = await zil[data.method](...data.args);
    sendResponse(origin, data, { resolve });
  } catch(err) {
    console.log(err);
    sendResponse(origin, data, { reject: err.message });
  }
}

transportInit().then(t => {
  let type = typeMSG.init;

  try {
    transport = t;
    console.log('ledger transport:', 'init');
    window.top.postMessage({ type, resolve: true }, '*');
  } catch(err) {
    type = typeMSG.fail;
    window.top.postMessage({ type, reject: false }, '*');
    console.error('ledger transport:', err.message);
  }
});

window.addEventListener('message', data => handler(data));
