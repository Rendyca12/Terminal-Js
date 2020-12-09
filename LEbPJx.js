var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);
  
  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {

/////    (Hallo)
        case 'halo':
          var url = args.join(' ');
          if (!url) {
            output('<h1 style="text-align: center; font-size: 15px; color: red;">(Rendyca12 》 Hallo.)</h1><br><h1 style="text-align: center; font-size: 15px; color: red;">Enter "R12.help" for more information.</h1>');
            break;
          }
          $.get( url, function(data) {
            var encodedStr = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
               return '&#'+i.charCodeAt(0)+';';
            });
            output('<pre>' + encodedStr + '</pre>');
          });          
          break;
          
          case 'hallo':
          var url = args.join(' ');
          if (!url) {
            output('<h1 style="text-align: center; font-size: 15px; color: red;">(Rendyca12 》 Hallo.)</h1><br><h1 style="text-align: center; font-size: 15px; color: red;">Enter "R12.help" for more information.</h1>');
            break;
          }
          $.get( url, function(data) {
            var encodedStr = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
               return '&#'+i.charCodeAt(0)+';';
            });
            output('<pre>' + encodedStr + '</pre>');
          });          
          break;
          
          case 'helo':
          var url = args.join(' ');
          if (!url) {
            output('<h1 style="text-align: center; font-size: 15px; color: red;">(Rendyca12 》 Hallo.)</h1><br><h1 style="text-align: center; font-size: 15px; color: red;">Enter "R12.help" for more information.</h1>');
            break;
          }
          $.get( url, function(data) {
            var encodedStr = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
               return '&#'+i.charCodeAt(0)+';';
            });
            output('<pre>' + encodedStr + '</pre>');
          });          
          break;
/////    (Hallo)
          
/////    (Salam)
          case 'assalamualaikum':
            output('<h1 style="text-align: center; font-size: 12px; color: red;">WaalaikumSalam Ukhti😁</h1>');
            break;
            
            case 'asalamualaikum':
            output('<h1 style="text-align: center; font-size: 12px; color: red;">WaalaikumSalam Ukhti😁</h1>');
            break;
            
            case 'asalammualaikum':
            output('<h1 style="text-align: center; font-size: 12px; color: red;">WaalaikumSalam Ukhti😁</h1>');
            break;      
/////    (Salam)
          
/////    (Pembersih)
        case 'r12.clear':
          output_.innerHTML = '';
          this.value = '';
          output('<img align="left" src="https://rendyca12.github.io/Terminal-Js/20200815_213053.png" width="100" height="100" style="padding: 0px 10px 20px 0px"><h2 style="letter-spacing: 4px">BroColi Web Terminal</h2><p>' + new Date() + '</p><p>Enter "R12.help-1" for more information.</p>');
          return;
/////    (Pembersih)

/////    (Jam)
        case 'r12.clock':
          var appendDiv = jQuery($('.clock-container')[0].outerHTML);
          appendDiv.attr('style', 'display:inline-block');
          output_.appendChild(appendDiv[0]);
          break;
/////    (Jam)

/////    (Date)
        case 'r12.date':
          output( new Date() );
          break;
/////    (Date)
          
/////    (Live Html)
        case 'r12.html':
          output( args.join(' ') );
          break;
/////    (Live Html)

/////    (Pribadi)
        case 'rendyca12':
          output_.innerHTML = '';
          this.value = '';
          output('<h1 style="text-align: center; font-size: 15px; color: #00FFF4;">Kode Ini Sedang Di Buat, Mohon Bersabar☺, Btw Anda Kepo:v</h1><h1 style="text-align: center; font-size: 10px; color: red;">Jika Anda Ingin Tampilan Awal, Ketik "R12.clear"</h1>');
/////    (Pribadi)

/////    (Creator)
        case 'r12.creator':
          output('<h1 style="text-align: center; font-size: 15px; color: Red;">Mohon Bersabar, Saya Akan Membuat Nya...</h1>');
          break;
/////    (Creator)
          
/////    (Bantuan)
          case 'r12.help-1':
            output('<marquee behavior="scroll" direction="left" scrollamount="100" scrolldelay="2" width="100%"><font color="#96b38a" face="monospace" size="4px">____________________________________________________________________________</font> </marquee>');
            output('<h1 style="text-align: center; font-size: 15px; color: Red;">Using Dot (R12.) For Command!!!</h1><h1 style="text-align: center; font-size: 14px; color: Red;">Penjelasan Lebih Lanjut Ketik "R12.help-2"</h1>');
            output('<style src="https://rendyca12.github.io/Terminal-Js/jquery-2.1.1.min.js"></style></style><table id="customers"><tr><th>Code</th><th>-=☆=-</th></tr><tr><td>R12.Status</td><td>Cek Status Anda</td></tr><tr><td>R12.html</td><td>Pertinjau Html Buatan Anda</td></tr><tr><td>R12.clock</td><td>Untuk Menampilkan Jam Di Layar</td></tr><tr><td>R12.Status</td><td>Cek Status Anda</td></tr><tr><td>R12.creator</td><td>Upload Html Anda, Agar Bisa Di Akses Oleh Semua Org</td></tr></table>');
            output('<marquee behavior="scroll" direction="Right" scrollamount="100" scrolldelay="2" width="100%"><font color="#96b38a" face="monospace" size="4px">____________________________________________________________________________</font> </marquee>');
          break;
          
          case 'r12.help-2':
            output('<marquee behavior="scroll" direction="left" scrollamount="100" scrolldelay="2" width="100%"><font color="#96b38a" face="monospace" size="4px">____________________________________________________________________________</font> </marquee>');
            output('<h1 style="text-align: center; font-size: 15px; color: Red;">Using Dot (R12.) For Command!!!</h1><h1 style="text-align: center; font-size: 14px; color: Red;">Contoh: (R12.clear)</h1>');
            output('<style src="https://rendyca12.github.io/Terminal-Js/jquery-2.1.1.min.js"></style></style><table id="customers"><tr><th>Code</th><th>-=☆=-</th></tr><tr><td>R12.Status</td><td>Untuk Melihat Status Anda</td></tr><tr><td>R12.html</td><td>Jika Anda Ingin Menampilkan Html Anda, Silakan Masukan Kode "R12.html" (spasi) Trus Paste Kode Html Nya Setelah Itu Enter</td></tr><tr><td>R12.clock</td><td>Untuk Menampilkan Jam Di Layar, Kalian Cukup Ketikan Kode "R12.clock"</td></tr><tr><td>R12.creator</td><td>Jika Anda Ingin Mempublikasikan Html Buatan Anda / Agar Bisa Di Lihat Oleh Orang, Ketik "R12.creator" Setelah Itu Ikutin Perintah Nya</td></tr></table>');
            output('<marquee behavior="scroll" direction="Right" scrollamount="100" scrolldelay="2" width="100%"><font color="#96b38a" face="monospace" size="4px">____________________________________________________________________________</font> </marquee>');
          break;
/////    (Bantuan)

/////    (status)
        case 'r12.status':
          output(navigator.appVersion);
          break;
/////    (status)


        case 'whoami':
          var result = "<img src=\"" + codehelper_ip["Flag"]+ "\"><br><br>";
          for (var prop in codehelper_ip)
            result += prop + ": " + codehelper_ip[prop] + "<br>";
          output(result);
          break;
        
          
        default:
          if (cmd) {
            output(cmd + '❌ <h1 style="text-align: center; font-size: 21px; color: #E0E3F0;">code not found<h1 style="text-align: center; font-size: 21px; color: #FF0019;">ERROR 404</h1>');
          }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function() {
      output('<img align="left" src="https://rendyca12.github.io/Terminal-Js/20200815_213053.png" width="100" height="100" style="padding: 0px 10px 20px 0px"><h2 style="letter-spacing: 4px">BroColi Web Terminal</h2><p>' + new Date() + '</p><p>Enter "R12.help-1" for more information.</p>');
    },
    output: output
  }
};
