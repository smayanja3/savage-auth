var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const id = this.parentNode.parentNode.childNodes[1].dataset.userId
        // const name = this.parentNode.parentNode.childNodes[1].innerText
        // const msg = this.parentNode.parentNode.childNodes[3].innerText
        // const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText) //is used to accept the string and convert it into a floating-point number (decimal)
        console.log(element)
        fetch('thumbUp', { // has to match the server path
          method: 'put', // making a change to somethign can create but not always
          headers: {'Content-Type': 'application/json'}, // meta data about request(INFO) type of content 
          body: JSON.stringify({ //sending toserver
            'uniqueId' : id,
            // 'name': name,
            // 'msg': msg,
            //'thumbUp':thumbUp  // addding to the parseFloat # we got from line 9
          })
        })
        .then(response => { //<- actually reponse NOT the Promise
          if (response.ok) return response.json()// promise is a container for any work that might take time
        })
        .then(data => { //<- then === after the promise is done 
          // console.log(data)
          // console.log(name,msg,thumbUp)
          window.location.reload(true)// <- refreshes the page after the click function has completed 
        })
      });  
});

Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const id = this.parentNode.parentNode.childNodes[1].dataset.userId
        // const name = this.parentNode.parentNode.childNodes[1].innerText
        // const msg = this.parentNode.parentNode.childNodes[3].innerText
        // const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('thumbDown', {
          method: 'put', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'uniqueId' : id,
            // 'name': name,
            // 'msg': msg,
            //'thumbUp':thumbDown 
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const id = this.parentNode.parentNode.childNodes[1].dataset.userId
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('trash', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'uniqueId' : id,
            // 'name': name,
            // 'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
