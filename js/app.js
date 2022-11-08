setup = ()=> {

  let labels = document.querySelectorAll ("#content-browser label")


  let options = {
    root: null, rootMargin: '0px', threshold: 1
  }

  visible_map = new WeakMap ()

  observerEntryHandler = (entry, cb)=> {

    if (!entry.isIntersecting) return

    let elem      = entry.target
    let isVisible = visible_map.get (elem)
    let bool      = !isVisible? true : false

    visible_map.set (elem, bool)

    if (bool == true) cb (entry.target)
      
  }

  
  observer = new IntersectionObserver(entries=> {

    entries.forEach(entry => observerEntryHandler (entry, elem=> {}))
  }, options);

  observer.observe ($("#contact-location"))


  labels.forEach (label=> {
    observer.observe (label)
  })

}

init = ()=> {

}

window.onload = init ()