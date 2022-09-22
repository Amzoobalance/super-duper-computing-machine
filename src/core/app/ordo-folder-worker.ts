self.addEventListener(
  "connect",
  (event: any) => {
    const port = event.ports[0]

    port.addEventListener(
      "message",
      (e: any) => {
        port.postMessage(e.data)
      },
      false
    )

    port.start()
  },
  false
)

export {}
