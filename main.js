// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const errorModal = document.querySelector('#modal');

document.addEventListener('DOMContentLoaded', () => {
  errorModal.classList.add('hidden')
  clickedListener();
})

function hidenError() {
  errorModal.classList.add('hidden')
}

function likeFinder() {
  const likeArray = document.querySelectorAll('.like-glyph')
  likeArray.forEach((oneLike) => {
    oneLike.addEventListener('click', () => console.log('Liked!'))
  }
  )
}

function clickedListener() {
  document.addEventListener('click', (event) => {
    if (event.target.classList[0] === 'like-glyph') {
      mimicServerCall()
        .then((resp) => {
          const heartActivated = event.target.classList.contains('activated-heart')
          if (heartActivated) {
            event.target.classList.remove('activated-heart');
            event.target.innerHTML = EMPTY_HEART
          } else {
            event.target.classList.add('activated-heart')
            event.target.innerHTML = FULL_HEART
          }
          heartActivated
        })
        .catch((error) => {
          errorModal.remove('hidden')
          setTimeout(() => {
            hidenError()
          }, 3000)
        })
    }
  })
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
