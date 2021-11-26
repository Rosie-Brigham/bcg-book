const slides = document.querySelectorAll('section div.slides')
const colors = ['#FAF6DC','#F5F1E4','#FAF0DC', '#C3CBDE']

slides.forEach((slide) => {
  let current = 0
  let z = 1000000
  const quotes = slide.querySelectorAll('div.quote')

  quotes.forEach((quote) => {
    z = z - 1
    quote.style.zIndex = z
    quote.style.backgroundColor = colors[Math.floor((Math.random() * 4))]
  })

  gsap.set(quotes, {opacity: 0})

  // imagesLoaded(quotes, function () {
    const timeline = gsap.timeline()

    timeline
      .set(quotes, {
        x: () => {
          return 500 * Math.random() - 250
        },
        y: '500%',
        rotation: () => {
          return 20 * Math.random() - 5
        },
        opacity: 1
      })
      .to(quotes, { x: 0, y: 0, stagger: -0.05 })
      .to(quotes, {
        rotation: () => {
          return 16 * Math.random() - 8
        },
      })
  // })

  slide.addEventListener('click', function () {
    z = z - 1

    let direction = '150%'
    let midAngle = 15

    if (Math.random() > 0.5) {
      direction = '-150%'
      midAngle = -15
    }

    const currentQuote = quotes[current]
    const flipTimeline = gsap.timeline()

    flipTimeline
      .set(currentQuote, { x: 0 })
      .to(currentQuote, {
        x: direction,
        rotation: midAngle,
        scale: 1.1
      })
      .set(currentQuote, { zIndex: z })
      .to(currentQuote, {
        x: 0,
        rotation: () => {
          return 16 * Math.random() - 8
        },
        scale: 1
      })

    current = current + 1
    current = current % quotes.length
  })
})
