// gen-backend.js
// SAFE DEMO: This file intentionally does NOT produce real/usable credit card numbers.
// It only creates placeholder/demo formatted strings for UI testing.

(function(){
  // Simple helper - produce 16-digit random string but mark as demo (not Luhn validated)
  function generateDemoNumber() {
    var digits = '';
    for (var i = 0; i < 16; i++) {
      digits += Math.floor(Math.random() * 10).toString();
    }
    // Insert space every 4 digits
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }

  function randomExpiry() {
    var mm = ('' + (Math.floor(Math.random() * 12) + 1)).padStart(2, '0');
    var yy = ('' + (Math.floor(Math.random() * 6) + 25)); // 25..30 as future years
    return mm + '/' + yy;
  }

  function randomCVC() {
    return ('' + Math.floor(100 + Math.random() * 900));
  }

  // Vue app for the generator form
  if (typeof Vue !== 'undefined') {
    // Mount generator form
    new Vue({
      el: '#generator-form',
      data: {
        quantity: 5,
        issuer: 'DEMO'
      },
      methods: {
        generate: function() {
          var qty = Math.max(1, Math.min(20, parseInt(this.quantity) || 1));
          var list = [];
          for (var i = 0; i < qty; i++) {
            list.push({
              number: generateDemoNumber(),
              expiry: randomExpiry(),
              cvc: randomCVC(),
              issuer: this.issuer,
              note: 'FOR DEMO ONLY - NOT FOR TRANSACTIONS'
            });
          }
          // send to output Vue instance
          if (window.__demo_output_vm) {
            window.__demo_output_vm.items = list;
          } else {
            // fallback: store on window
            window.__demo_items = list;
          }
        }
      }
    });

    // Mount generator output separate VM
    window.__demo_output_vm = new Vue({
      el: '#generator-output',
      data: {
        items: []
      }
    });
  } else {
    console.warn('Vue not found - gen-backend.js requires Vue to mount UI.');
  }

})();